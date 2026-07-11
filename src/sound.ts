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

  // Soft, rounded tap: a mellow low sine through a low-pass filter, with a
  // gentle attack and a smooth release — no bright/harsh transient.
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const filter = ac.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(95, now + 0.09);

  // Tame any edge so it reads as a soft "thup" rather than a click.
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(700, now);
  filter.Q.value = 0.5;

  // Eased attack (~12ms) and a longer, smooth decay.
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.04, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

  osc.connect(filter).connect(gain).connect(ac.destination);
  osc.start(now);
  osc.stop(now + 0.18);
}
