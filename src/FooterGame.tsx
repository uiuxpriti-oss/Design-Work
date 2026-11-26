import { useEffect, useRef, useState } from "react";
import { THEMES, drawScene, makeSceneState, type ThemeId } from "./footerScenes";
import { THEME_ICONS } from "./themeIcons";

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
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    try {
      const v = localStorage.getItem("designRunTheme") as ThemeId | null;
      if (v && THEMES.some((t) => t.id === v)) return v;
    } catch {
      /* ignore */
    }
    return "india";
  });
  const themeRef = useRef<ThemeId>(themeId);
  const pick = (id: ThemeId) => {
    themeRef.current = id;
    setThemeId(id);
    try {
      localStorage.setItem("designRunTheme", id);
    } catch {
      /* ignore */
    }
  };

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

    const scene = makeSceneState();
    const theme = () => THEMES.find((t) => t.id === themeRef.current) ?? THEMES[0];

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
      const t = theme();
      drawScene(ctx, t, scene, W, H, ground, dist, clock);

      // Gems (skills)
      for (const gm of gems) {
        const bob = Math.sin(clock * 4 + gm.x * 0.05) * 3;
        const y = gm.y + bob;
        ctx.fillStyle = t.gemGlow;
        ctx.beginPath();
        ctx.arc(gm.x, y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = t.gem;
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
          ctx.fillStyle = t.spike;
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
          ctx.fillStyle = t.night || t.id === "paris" ? "#0a0f24" : "#5b6b8c";
          const leg = Math.floor(clock * 10) % 2;
          for (let i = 0; i < 3; i++) {
            ctx.fillRect(x + 3 + i * 8, ground - 4 + (i % 2 === leg ? 0 : 1), 3, 4);
          }
          ctx.fillStyle = t.bug;
          ctx.fillRect(x + 2, y + 6, o.w - 4, o.h - 9);
          ctx.fillRect(x + 4, y + 3, o.w - 8, 4);
          ctx.fillStyle = "#2563eb";
          ctx.fillRect(x + o.w / 2 - 1, y + 4, 2, o.h - 8);
          ctx.fillStyle = t.night || t.id === "paris" ? "#0a0f24" : "#5b6b8c";
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
        ctx.fillStyle = t.hud;
        ctx.fillText(p.text, p.x, p.y - 14 - p.t * 30);
      }
      ctx.globalAlpha = 1;

      // HUD
      ctx.font = `600 11px ${FONT}`;
      ctx.textAlign = "left";
      ctx.fillStyle = t.hud;
      ctx.fillText(`SKILLS ${score}`, 16, 24);
      ctx.textAlign = "right";
      ctx.fillStyle = t.hud;
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
    <div className="relative left-1/2 mt-20 w-screen -translate-x-1/2 sm:mt-28">
      <div className="mx-auto mb-4 flex max-w-[72rem] flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">Take a break</p>
        <div role="group" aria-label="Game theme" className="flex items-center gap-2.5">
          {THEMES.map((t) => {
            const Icon = THEME_ICONS[t.id];
            const on = t.id === themeId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => pick(t.id)}
                aria-pressed={on}
                aria-label={t.label}
                title={t.label}
                className={`h-10 w-10 rounded-[13px] outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#60a5fa] sm:h-11 sm:w-11 ${
                  on
                    ? "-translate-y-0.5 scale-110 opacity-100 ring-2 ring-white shadow-[0_10px_22px_-6px_rgba(96,165,250,0.8)]"
                    : "opacity-60 saturate-75 hover:-translate-y-0.5 hover:opacity-100"
                }`}
              >
                <Icon />
              </button>
            );
          })}
        </div>
      </div>
      <div ref={wrapRef} className="overflow-hidden border-y border-white/10 shadow-[0_30px_60px_-30px_rgba(37,99,235,0.6)]">
        <canvas
          ref={canvasRef}
          tabIndex={0}
          aria-label="Design Run, a mini game. Press Space or tap to jump over bugs and collect skills."
          className="block w-full cursor-pointer touch-manipulation select-none outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
        />
      </div>
      <p className="mx-auto mt-2.5 max-w-[72rem] px-4 text-[12px] text-white/55 sm:px-6">Space or tap to jump · hold for higher</p>
    </div>
  );
}
