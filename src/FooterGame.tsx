import { useEffect, useRef } from "react";

// "Design Run": a tiny endless runner for the footer. Jump over bugs, collect skills,
// get a career title at the end. Drawn entirely in code on a canvas, in the portfolio's blues.

const SKILLS = [
  "Figma", "Research", "Prototyping", "A11y", "Design Systems", "AI", "Empathy",
  "User Flows", "Wireframes", "Usability Tests", "Storytelling", "Data Viz", "Handoff", "Motion",
];

const TITLES: [number, string][] = [
  [0, "Design Intern"],
  [3, "Junior Designer"],
  [6, "UI/UX Designer"],
  [10, "Product Designer"],
  [16, "Senior Product Designer"],
  [25, "Design Lead"],
  [40, "फर्क पड़ता है level"],
];
const titleFor = (n: number) => TITLES.reduce((t, [min, name]) => (n >= min ? name : t), TITLES[0][1]);

// 10 x 14 pixel sprite, two running frames. h hair, s skin, e eye, b top, w white, p pants, k shoes.
const BODY = [
  "...hhh....",
  "..hhhhh...",
  "..hhhhhh..",
  ".hhsssshh.",
  ".hsessesh.",
  ".hsssssh..",
  "..sssss...",
  "..bbbbbb..",
  ".bbbbbbbb.",
  ".sbbwbbbs.",
  "..bbbbbb..",
];
const LEGS_A = ["..pp..pp..", "..pp..pp..", ".kk....kk."];
const LEGS_B = ["...pp.pp..", "...p..p...", "..kk.kk..."];
const LEGS_JUMP = ["..pppppp..", "..pp..pp..", "..kk..kk.."];
const PAL: Record<string, string> = {
  h: "#0f1530", s: "#f1c9a5", e: "#0f1530", b: "#60a5fa", w: "#ffffff", p: "#1e3a8a", k: "#0a0f24",
};
const PX = 2;
const PW = 10 * PX;
const PH = 14 * PX;

type Obstacle = { x: number; w: number; h: number; kind: "spikes" | "bug" };
type Gem = { x: number; y: number; label: string; taken: boolean };
type Pop = { x: number; y: number; text: string; t: number };

const FONT = "'JetBrains Mono', ui-monospace, monospace";

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function FooterGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jumpRef = useRef<() => void>(() => {});

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 600;
    let H = 220;
    let ground = H - 38;
    let best = 0;
    try {
      best = Number(localStorage.getItem("designRunBest") || 0) || 0;
    } catch {
      /* storage unavailable */
    }

    let state: "idle" | "playing" | "over" = "idle";
    let speed = 260;
    let dist = 0;
    let score = 0;
    let newBest = false;
    let py = 0;
    let vy = 0;
    let onGround = true;
    let holding = false;
    let obstacles: Obstacle[] = [];
    let gems: Gem[] = [];
    let pops: Pop[] = [];
    let nextObs = 1.2;
    let nextGem = 0.6;
    let skillIdx = 0;
    let overAt = 0;
    let clock = 0;

    const stars = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random() * 0.6, r: Math.random() < 0.15 ? 1.6 : 1, p: Math.random() * 6 }));
    // Far skyline: domes, minarets and a temple spire, repeated every 520px.
    const far = (x: number) => {
      ctx.beginPath();
      const g = ground;
      ctx.moveTo(x, g);
      ctx.lineTo(x, g - 34);
      ctx.lineTo(x + 40, g - 34);
      ctx.lineTo(x + 40, g - 52);
      ctx.arc(x + 62, g - 52, 22, Math.PI, 0);
      ctx.lineTo(x + 84, g - 34);
      ctx.lineTo(x + 112, g - 34);
      ctx.lineTo(x + 112, g - 92);
      ctx.lineTo(x + 116, g - 100);
      ctx.lineTo(x + 120, g - 92);
      ctx.lineTo(x + 120, g - 30);
      ctx.lineTo(x + 170, g - 30);
      ctx.lineTo(x + 182, g - 64);
      ctx.lineTo(x + 194, g - 84);
      ctx.lineTo(x + 206, g - 64);
      ctx.lineTo(x + 218, g - 30);
      ctx.lineTo(x + 280, g - 30);
      ctx.lineTo(x + 280, g - 46);
      ctx.arc(x + 300, g - 46, 20, Math.PI, 0);
      ctx.lineTo(x + 320, g - 26);
      ctx.lineTo(x + 380, g - 26);
      ctx.lineTo(x + 380, g - 58);
      ctx.lineTo(x + 420, g - 58);
      ctx.lineTo(x + 420, g - 24);
      ctx.lineTo(x + 470, g - 24);
      ctx.lineTo(x + 470, g - 80);
      ctx.lineTo(x + 474, g - 88);
      ctx.lineTo(x + 478, g - 80);
      ctx.lineTo(x + 478, g - 24);
      ctx.lineTo(x + 520, g - 24);
      ctx.lineTo(x + 520, g);
      ctx.closePath();
      ctx.fill();
    };
    const near = Array.from({ length: 12 }, (_, i) => ({ x: i * 90, w: rand(46, 74), h: rand(22, 54) }));

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(280, r.width);
      H = W < 480 ? 190 : 230;
      ground = H - 38;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      draw();
    };

    const reset = () => {
      speed = W < 480 ? 220 : 260;
      dist = 0;
      score = 0;
      newBest = false;
      py = 0;
      vy = 0;
      onGround = true;
      obstacles = [];
      gems = [];
      pops = [];
      nextObs = 1.1;
      nextGem = 0.5;
    };

    const jump = () => {
      if (state === "idle") {
        reset();
        state = "playing";
        return;
      }
      if (state === "over") {
        if (clock - overAt < 0.45) return;
        reset();
        state = "playing";
        return;
      }
      if (onGround) {
        vy = -640;
        onGround = false;
        holding = true;
      }
    };
    jumpRef.current = jump;
    const release = () => (holding = false);

    const px = () => Math.min(90, W * 0.14);

    const update = (dt: number) => {
      clock += dt;
      if (state !== "playing") return;
      speed = Math.min(W < 480 ? 460 : 560, speed + 7 * dt);
      const dx = speed * dt;
      dist += dx;

      // Hold to jump a little higher.
      const g = holding && vy < 0 ? 1500 : 2600;
      vy += g * dt;
      py += vy * dt;
      if (py >= 0) {
        py = 0;
        vy = 0;
        onGround = true;
      }

      nextObs -= dt;
      if (nextObs <= 0) {
        const bug = Math.random() < 0.35;
        obstacles.push(bug ? { x: W + 20, w: 24, h: 22, kind: "bug" } : { x: W + 20, w: [16, 28, 40][Math.floor(Math.random() * 3)], h: 18, kind: "spikes" });
        nextObs = rand(0.85, 1.6) * (300 / speed) + 0.35;
      }
      nextGem -= dt;
      if (nextGem <= 0) {
        gems.push({ x: W + 20, y: ground - rand(46, 96), label: SKILLS[skillIdx++ % SKILLS.length], taken: false });
        nextGem = rand(0.9, 1.7);
      }
      obstacles.forEach((o) => (o.x -= dx));
      gems.forEach((gm) => (gm.x -= dx));
      obstacles = obstacles.filter((o) => o.x + o.w > -20);
      gems = gems.filter((gm) => gm.x > -20 && !gm.taken);
      pops.forEach((p) => (p.t += dt));
      pops = pops.filter((p) => p.t < 0.9);

      const x0 = px() + 3;
      const y1 = ground + py;
      const y0 = y1 - PH + 4;
      const x1 = x0 + PW - 6;
      for (const o of obstacles) {
        if (x1 > o.x + 3 && x0 < o.x + o.w - 3 && y1 > ground - o.h + 4) {
          state = "over";
          overAt = clock;
          if (score > best) {
            best = score;
            newBest = true;
            try {
              localStorage.setItem("designRunBest", String(best));
            } catch {
              /* ignore */
            }
          }
          return;
        }
      }
      for (const gm of gems) {
        if (!gm.taken && x1 > gm.x - 9 && x0 < gm.x + 9 && y1 > gm.y - 9 && y0 < gm.y + 9) {
          gm.taken = true;
          score++;
          pops.push({ x: gm.x, y: gm.y, text: `+${gm.label}`, t: 0 });
        }
      }
    };

    const sprite = (x: number, y: number) => {
      const running = state === "playing";
      const legs = !onGround ? LEGS_JUMP : running && Math.floor(dist / 26) % 2 ? LEGS_B : LEGS_A;
      const rows = [...BODY, ...legs];
      rows.forEach((row, r) => {
        for (let c = 0; c < row.length; c++) {
          const ch = row[c];
          if (ch === ".") continue;
          ctx.fillStyle = PAL[ch];
          ctx.fillRect(Math.round(x + c * PX), Math.round(y + r * PX), PX, PX);
        }
      });
    };

    const draw = () => {
      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, ground);
      sky.addColorStop(0, "#070b22");
      sky.addColorStop(0.55, "#16296b");
      sky.addColorStop(1, "#3b6cf6");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      for (const s of stars) {
        ctx.globalAlpha = 0.35 + 0.35 * Math.sin(clock * 1.6 + s.p);
        ctx.fillStyle = "#dbeafe";
        ctx.fillRect(Math.round(s.x * W), Math.round(s.y * ground), s.r, s.r);
      }
      ctx.globalAlpha = 1;

      // Moon
      const mx = W - 70;
      const my = 46;
      const glow = ctx.createRadialGradient(mx, my, 6, mx, my, 60);
      glow.addColorStop(0, "rgba(191,219,254,0.45)");
      glow.addColorStop(1, "rgba(191,219,254,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(mx - 60, my - 60, 120, 120);
      ctx.fillStyle = "#e0ecff";
      ctx.beginPath();
      ctx.arc(mx, my, 15, 0, Math.PI * 2);
      ctx.fill();

      // Far skyline
      ctx.fillStyle = "#1b3384";
      const fo = (dist * 0.15) % 520;
      for (let x = -fo; x < W; x += 520) far(x);

      // Near buildings with lit windows
      const span = near.length * 90;
      const no = (dist * 0.4) % span;
      for (const b of near) {
        let x = b.x - no;
        if (x + b.w < 0) x += span;
        if (x > W) continue;
        ctx.fillStyle = "#0f1d4f";
        ctx.fillRect(Math.round(x), ground - b.h, Math.round(b.w), b.h);
        ctx.fillStyle = "rgba(147,197,253,0.55)";
        for (let wy = ground - b.h + 7; wy < ground - 8; wy += 9)
          for (let wx = x + 6; wx < x + b.w - 6; wx += 10)
            if ((Math.floor(wx * 7 + wy * 3 + b.h) % 5) < 2) ctx.fillRect(Math.round(wx), wy, 3, 3);
      }

      // Ground
      ctx.fillStyle = "#0a1233";
      ctx.fillRect(0, ground, W, H - ground);
      ctx.fillStyle = "#60a5fa";
      ctx.fillRect(0, ground, W, 2);
      ctx.fillStyle = "rgba(96,165,250,0.25)";
      const go = dist % 24;
      for (let x = -go; x < W; x += 24) ctx.fillRect(Math.round(x), ground + 10, 10, 2);
      for (let x = -((dist * 1.0 + 12) % 36); x < W; x += 36) ctx.fillRect(Math.round(x), ground + 22, 4, 2);

      // Gems (skills)
      for (const gm of gems) {
        const bob = Math.sin(clock * 4 + gm.x * 0.05) * 3;
        const y = gm.y + bob;
        ctx.fillStyle = "rgba(147,197,253,0.25)";
        ctx.beginPath();
        ctx.arc(gm.x, y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#93c5fd";
        ctx.beginPath();
        ctx.moveTo(gm.x, y - 8);
        ctx.lineTo(gm.x + 7, y);
        ctx.lineTo(gm.x, y + 8);
        ctx.lineTo(gm.x - 7, y);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(gm.x - 2, y - 4, 2, 4);
      }

      // Obstacles
      for (const o of obstacles) {
        if (o.kind === "spikes") {
          ctx.fillStyle = "#dbeafe";
          for (let x = o.x; x < o.x + o.w - 1; x += 12) {
            ctx.beginPath();
            ctx.moveTo(x, ground);
            ctx.lineTo(x + 6, ground - o.h);
            ctx.lineTo(x + 12, ground);
            ctx.closePath();
            ctx.fill();
          }
        } else {
          // A little pixel bug
          const x = Math.round(o.x);
          const y = ground - o.h;
          ctx.fillStyle = "#0a0f24";
          const leg = Math.floor(clock * 10) % 2;
          for (let i = 0; i < 3; i++) {
            ctx.fillRect(x + 3 + i * 8, ground - 4 + (i % 2 === leg ? 0 : 1), 3, 4);
          }
          ctx.fillStyle = "#e0ecff";
          ctx.fillRect(x + 2, y + 6, o.w - 4, o.h - 9);
          ctx.fillRect(x + 4, y + 3, o.w - 8, 4);
          ctx.fillStyle = "#2563eb";
          ctx.fillRect(x + o.w / 2 - 1, y + 4, 2, o.h - 8);
          ctx.fillStyle = "#0a0f24";
          ctx.fillRect(x - 2, y + 7, 5, 5);
          ctx.fillRect(x + 2, y, 2, 4);
          ctx.fillRect(x + 6, y - 1, 2, 4);
        }
      }

      // Player
      sprite(px(), ground + py - PH);

      // Pops
      ctx.font = `600 11px ${FONT}`;
      ctx.textAlign = "center";
      for (const p of pops) {
        ctx.globalAlpha = 1 - p.t / 0.9;
        ctx.fillStyle = "#ffffff";
        ctx.fillText(p.text, p.x, p.y - 14 - p.t * 30);
      }
      ctx.globalAlpha = 1;

      // HUD
      ctx.font = `600 11px ${FONT}`;
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(219,234,254,0.9)";
      ctx.fillText(`SKILLS ${score}`, 16, 24);
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(219,234,254,0.6)";
      ctx.fillText(`BEST ${best}`, W - 16, 24);

      // Overlays
      if (state !== "playing") {
        ctx.fillStyle = "rgba(5,8,25,0.55)";
        ctx.fillRect(0, 0, W, H);
        ctx.textAlign = "center";
        const cx = W / 2;
        if (state === "idle") {
          ctx.fillStyle = "#ffffff";
          ctx.font = `700 ${W < 480 ? 16 : 20}px ${FONT}`;
          ctx.fillText("DESIGN RUN", cx, H / 2 - 18);
          ctx.font = `500 12px ${FONT}`;
          ctx.fillStyle = "rgba(219,234,254,0.85)";
          ctx.fillText("Jump the bugs. Collect skills. See where you land.", cx, H / 2 + 6);
          ctx.fillStyle = Math.floor(clock * 2) % 2 ? "#93c5fd" : "#ffffff";
          ctx.font = `700 12px ${FONT}`;
          ctx.fillText(W < 480 ? "TAP TO PLAY" : "CLICK OR PRESS SPACE TO PLAY", cx, H / 2 + 34);
        } else {
          const bw = Math.min(380, W - 40);
          const by = H / 2 - 66;
          ctx.fillStyle = "rgba(10,18,51,0.92)";
          ctx.strokeStyle = "rgba(147,197,253,0.6)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(cx - bw / 2, by, bw, 132, 14);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "rgba(219,234,254,0.7)";
          ctx.font = `600 11px ${FONT}`;
          ctx.fillText("GAME OVER · YOU'RE NOW A", cx, by + 26);
          ctx.fillStyle = "#ffffff";
          ctx.font = `700 ${W < 480 ? 16 : 19}px ${FONT}`;
          ctx.fillText(titleFor(score).toUpperCase(), cx, by + 54);
          ctx.fillStyle = "#93c5fd";
          ctx.font = `600 12px ${FONT}`;
          ctx.fillText(`${score} skill${score === 1 ? "" : "s"} collected${newBest ? " · new best!" : ""}`, cx, by + 82);
          ctx.fillStyle = "rgba(219,234,254,0.6)";
          ctx.font = `500 11px ${FONT}`;
          ctx.fillText(W < 480 ? "Tap to play again" : "Click or press Space to play again", cx, by + 110);
        }
      }
    };

    let raf = 0;
    let last = 0;
    let visible = false;
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0);
      last = t;
      update(dt);
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(wrap);

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        if (!e.repeat) jump();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") release();
    };
    const onDown = () => {
      canvas.focus({ preventScroll: true });
      jump();
    };
    canvas.addEventListener("keydown", onKey);
    canvas.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", release);
    canvas.addEventListener("pointercancel", release);
    // A started game keeps listening to Space while it's on screen, even if focus moved.
    const onWinKey = (e: KeyboardEvent) => {
      if (document.activeElement === canvas || !visible || state !== "playing") return;
      onKey(e);
    };
    window.addEventListener("keydown", onWinKey);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("keydown", onKey);
      canvas.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", release);
      canvas.removeEventListener("pointercancel", release);
      window.removeEventListener("keydown", onWinKey);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div className="mt-20 sm:mt-28">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">Take a break</p>
        <p className="text-[12px] text-white/55">Space or tap to jump · hold for higher</p>
      </div>
      <div ref={wrapRef} className="overflow-hidden rounded-[22px] border border-white/10 shadow-[0_30px_60px_-30px_rgba(37,99,235,0.6)]">
        <canvas
          ref={canvasRef}
          tabIndex={0}
          aria-label="Design Run, a mini game. Press Space or tap to jump over bugs and collect skills."
          className="block w-full cursor-pointer touch-manipulation select-none outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
        />
      </div>
    </div>
  );
}
