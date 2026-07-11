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
