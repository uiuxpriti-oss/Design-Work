// Tap click sound — "Silk Click": a tiny triangle-wave tick layered with a soft,
// low sine body. Synthesized with Web Audio, so there is no audio file to load
// and it plays instantly on every tap.

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

function tone(
  ac: AudioContext,
  type: OscillatorType,
  from: number,
  to: number,
  start: number,
  dur: number,
  peak: number,
  lowpass: number,
) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const filter = ac.createBiquadFilter();

  osc.type = type;
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(to, start + dur * 0.6);

  filter.type = "lowpass";
  filter.frequency.value = lowpass;

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

  osc.connect(filter).connect(gain).connect(ac.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

export function playTap(): void {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime + 0.005;
  tone(ac, "triangle", 900, 700, t, 0.04, 0.16, 2500);
  tone(ac, "sine", 260, 170, t + 0.005, 0.15, 0.3, 900);
}

// Wake the AudioContext on the first user gesture so the first tap isn't silent.
if (typeof window !== "undefined") {
  const warm = () => {
    getCtx();
    window.removeEventListener("pointerdown", warm);
    window.removeEventListener("keydown", warm);
  };
  window.addEventListener("pointerdown", warm, { once: true, passive: true });
  window.addEventListener("keydown", warm, { once: true });
}
