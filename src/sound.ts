// Tap click sound. Two modes:
//   1. If you drop the real sound file at /public/tap.mp3 (or .wav), it is
//      loaded once and played — use this to match ktz.dk exactly.
//   2. Otherwise a soft synthesized "pop" is generated via the Web Audio API,
//      so the app stays self-contained with no asset files required.

let ctx: AudioContext | null = null;
let sample: AudioBuffer | null = null;
let sampleTried = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

// Attempt to load an optional real sound file, once.
function loadSample(ac: AudioContext) {
  if (sampleTried) return;
  sampleTried = true;
  fetch("/tap.mp3")
    .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject()))
    .then((buf) => ac.decodeAudioData(buf))
    .then((decoded) => {
      sample = decoded;
    })
    .catch(() => {
      /* no sample file — synthesized fallback is used instead */
    });
}

function playSample(ac: AudioContext) {
  if (!sample) return false;
  const src = ac.createBufferSource();
  const gain = ac.createGain();
  gain.gain.value = 0.9;
  src.buffer = sample;
  src.connect(gain).connect(ac.destination);
  src.start();
  return true;
}

// Soft synthesized "pop" — a short sine that drops in pitch, low-pass filtered
// for a rounded, pleasant click.
function playSynth(ac: AudioContext) {
  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const filter = ac.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(520, now);
  osc.frequency.exponentialRampToValueAtTime(230, now + 0.055);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1500, now);
  filter.Q.value = 0.7;

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.09, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

  osc.connect(filter).connect(gain).connect(ac.destination);
  osc.start(now);
  osc.stop(now + 0.12);
}

export function playTap(): void {
  const ac = getCtx();
  if (!ac) return;
  loadSample(ac);
  if (!playSample(ac)) playSynth(ac);
}

// ---------------------------------------------------------------------------
// "On repeat" song player.
// Plays /public/on-repeat.mp3 if present; otherwise a warm, looping ballad
// melody is synthesized so the record still plays music with no asset files.
// ---------------------------------------------------------------------------

export interface SongHandle {
  stop: () => void;
}

function playNote(
  ac: AudioContext,
  dest: AudioNode,
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType,
  vol: number,
) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(vol, start + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(gain).connect(dest);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

// Slow I–V–vi–IV ballad phrase. [frequency, beats]; freq 0 = rest.
const MELODY: [number, number][] = [
  [659.25, 1], [587.33, 1], [523.25, 2], // E5 D5 C5
  [587.33, 1], [659.25, 1], [783.99, 2], // D5 E5 G5
  [880.0, 1.5], [783.99, 0.5], [659.25, 1], [587.33, 1], // A5 G5 E5 D5
  [523.25, 4], // C5
];
const BASS: [number, number][] = [
  [130.81, 4], // C3
  [98.0, 4], // G2
  [110.0, 4], // A2
  [87.31, 4], // F2
];

function synthSong(ac: AudioContext, onEnd?: () => void): SongHandle {
  const bpm = 66;
  const beat = 60 / bpm;
  let stopped = false;
  const timers: number[] = [];

  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, ac.currentTime);
  master.gain.exponentialRampToValueAtTime(0.5, ac.currentTime + 0.6);
  master.connect(ac.destination);

  const loopBeats = MELODY.reduce((s, [, b]) => s + b, 0);
  const loopLen = loopBeats * beat;

  const scheduleLoop = (startTime: number) => {
    let t = startTime;
    for (const [f, b] of MELODY) {
      if (f > 0) playNote(ac, master, f, t, b * beat * 0.92, "triangle", 0.16);
      t += b * beat;
    }
    let tb = startTime;
    for (const [f, b] of BASS) {
      if (f > 0) playNote(ac, master, f, tb, b * beat * 0.9, "sine", 0.13);
      tb += b * beat;
    }
    const id = window.setTimeout(() => {
      if (!stopped) scheduleLoop(ac.currentTime + 0.03);
    }, loopLen * 1000 - 70);
    timers.push(id);
  };
  scheduleLoop(ac.currentTime + 0.12);

  return {
    stop() {
      stopped = true;
      timers.forEach((id) => window.clearTimeout(id));
      const now = ac.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.0001, now + 0.25);
      onEnd?.();
    },
  };
}

/**
 * Start the "on repeat" song. Prefers a real /on-repeat.mp3, falling back to a
 * synthesized looping melody. Returns a handle whose stop() halts playback.
 */
export function playSong(onEnd?: () => void): SongHandle | null {
  const ac = getCtx();
  if (!ac) return null;

  const audio = new Audio("/on-repeat.mp3");
  audio.loop = true;
  let synth: SongHandle | null = null;

  audio.play().catch(() => {
    // No real file — synthesize the melody so music still plays.
    synth = synthSong(ac, onEnd);
  });

  return {
    stop() {
      audio.pause();
      audio.currentTime = 0;
      synth?.stop();
    },
  };
}
