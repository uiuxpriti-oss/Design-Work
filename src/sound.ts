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
// Plays the real recording from /public/on-repeat.mp3 inline when present.
// If that file isn't bundled, the actual track is opened so it genuinely plays
// (a synthesized stand-in would not BE the song).
// ---------------------------------------------------------------------------

export interface SongHandle {
  stop: () => void;
  /** true when playback is happening in an external tab, not inline. */
  external?: boolean;
}

// The real track — opened when no local recording is bundled.
export const SONG_URL =
  "https://www.youtube.com/results?search_query=Nothing%27s+Gonna+Change+My+Love+for+You+George+Benson";

/**
 * Start the "on repeat" song. Plays /on-repeat.mp3 inline if present, otherwise
 * opens the real track. Returns a handle whose stop() halts inline playback.
 */
export function playSong(onEnd?: () => void): SongHandle {
  const audio = new Audio("/on-repeat.mp3");
  audio.loop = true;
  audio.addEventListener("ended", () => onEnd?.());

  const handle: SongHandle = {
    stop() {
      audio.pause();
      audio.currentTime = 0;
    },
  };

  audio.play().catch(() => {
    // No local recording bundled — open the real song so it actually plays.
    handle.external = true;
    window.open(SONG_URL, "_blank", "noopener,noreferrer");
  });

  return handle;
}
