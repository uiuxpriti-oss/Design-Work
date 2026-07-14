// Tap click sound. The real recording is inlined as a base64 data URI
// (see tap-sound.ts) and decoded once, so the actual tap always plays —
// no runtime fetch of /tap.mp3 (which fails on static/single-file hosting
// and made the synthesized fallback "pop" play instead). The synth pop
// only ever runs as a last resort if Web Audio decoding is unavailable.

import { TAP_SOUND_DATA_URI } from "./tap-sound";

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

// Decode the inlined tap recording once. Data URIs resolve with no server,
// so this works identically in dev, static builds, and single-file HTML.
function loadSample(ac: AudioContext) {
  if (sampleTried) return;
  sampleTried = true;
  fetch(TAP_SOUND_DATA_URI)
    .then((res) => res.arrayBuffer())
    .then((buf) => ac.decodeAudioData(buf))
    .then((decoded) => {
      sample = decoded;
    })
    .catch(() => {
      /* decoding unavailable — synthesized fallback is used instead */
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

// Warm up the AudioContext + decode the tap sample on the first user gesture
// anywhere on the page, so the real recording is ready before the first tap
// (otherwise that first tap falls back to the synthesized pop).
if (typeof window !== "undefined") {
  const warm = () => {
    const ac = getCtx();
    if (ac) loadSample(ac);
    window.removeEventListener("pointerdown", warm);
    window.removeEventListener("keydown", warm);
  };
  window.addEventListener("pointerdown", warm, { once: true, passive: true });
  window.addEventListener("keydown", warm, { once: true });
}

// ---------------------------------------------------------------------------
// "On repeat" song player.
// Plays the real recording from /public/on-repeat.mp3 inline when present.
// If that file isn't bundled, an inline instrumental stand-in is synthesized so
// the record always plays audible music (no network, no pop-ups required).
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

// Gentle looping ballad phrase. [frequency, beats]; freq 0 = rest.
const MELODY: [number, number][] = [
  [659.25, 1], [587.33, 1], [523.25, 2],
  [587.33, 1], [659.25, 1], [783.99, 2],
  [880.0, 1.5], [783.99, 0.5], [659.25, 1], [587.33, 1],
  [523.25, 4],
];
const BASS: [number, number][] = [
  [130.81, 4], [98.0, 4], [110.0, 4], [87.31, 4],
];

function synthSong(ac: AudioContext): SongHandle {
  if (ac.state === "suspended") void ac.resume();
  const beat = 60 / 66;
  let stopped = false;
  const timers: number[] = [];

  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, ac.currentTime);
  master.gain.exponentialRampToValueAtTime(0.5, ac.currentTime + 0.6);
  master.connect(ac.destination);

  const loopLen = MELODY.reduce((s, [, b]) => s + b, 0) * beat;
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
  scheduleLoop(ac.currentTime + 0.1);

  return {
    stop() {
      stopped = true;
      timers.forEach((id) => window.clearTimeout(id));
      const now = ac.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.0001, now + 0.25);
    },
  };
}

/**
 * Start the "on repeat" song. Plays /on-repeat.mp3 inline if present, otherwise
 * an inline instrumental stand-in so the record always makes sound.
 */
export function playSong(onEnd?: () => void): SongHandle {
  const audio = new Audio("on-repeat.mp3");
  audio.loop = true;
  audio.addEventListener("ended", () => onEnd?.());
  let synth: SongHandle | null = null;

  audio.play().catch(() => {
    const ac = getCtx();
    if (ac) synth = synthSong(ac);
  });

  return {
    stop() {
      audio.pause();
      audio.currentTime = 0;
      synth?.stop();
    },
  };
}
