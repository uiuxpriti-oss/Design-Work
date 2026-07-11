// Tiny synthesized "tap" click sound via the Web Audio API — no asset files,
// so it stays self-contained. Created lazily on the first user gesture.

let ctx: AudioContext | null = null;

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

export function playTap(): void {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;

  // Low "body" of the tap — a short sine that drops in pitch and fades fast.
  const body = ac.createOscillator();
  const bodyGain = ac.createGain();
  body.type = "sine";
  body.frequency.setValueAtTime(180, now);
  body.frequency.exponentialRampToValueAtTime(110, now + 0.05);
  bodyGain.gain.setValueAtTime(0.0001, now);
  bodyGain.gain.exponentialRampToValueAtTime(0.1, now + 0.004);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
  body.connect(bodyGain).connect(ac.destination);
  body.start(now);
  body.stop(now + 0.07);

  // Bright attack transient — gives it the crisp "tick".
  const tick = ac.createOscillator();
  const tickGain = ac.createGain();
  tick.type = "triangle";
  tick.frequency.setValueAtTime(1100, now);
  tickGain.gain.setValueAtTime(0.045, now);
  tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
  tick.connect(tickGain).connect(ac.destination);
  tick.start(now);
  tick.stop(now + 0.025);
}
