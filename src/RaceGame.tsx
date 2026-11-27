import { useEffect, useRef, useState } from "react";
import { THEMES, type ThemeId } from "./footerScenes";
import { THEME_ICONS } from "./themeIcons";

// "Design Race": a pseudo-3D endless road for the footer. One car, arrow keys to steer,
// five themed worlds. Everything is drawn in code on a canvas.

type Prop = "palm" | "sakura" | "lamp" | "house" | "tulip";
type Mark = "taj" | "fuji" | "eiffel" | "gg" | "mill";
interface Pal {
  sky: [string, string, string];
  grass: [string, string];
  road: [string, string];
  rumble: [string, string];
  line: string;
  prop: Prop;
  mark: Mark;
  markC: [string, string];
  car: string;
}

const PALS: Record<ThemeId, Pal> = {
  india: { sky: ["#1b1040", "#8a3a5e", "#f6a85a"], grass: ["#c98a3a", "#bf7f33"], road: ["#3a3a46", "#34343f"], rumble: ["#ff8a1f", "#ffffff"], line: "#ffe9b0", prop: "palm", mark: "taj", markC: ["#f8ead8", "#d9b99a"], car: "#2563eb" },
  japan: { sky: ["#9fb8e8", "#d9c6e6", "#f6d5df"], grass: ["#7fbf7a", "#74b370"], road: ["#4a4256", "#443d4f"], rumble: ["#e0457b", "#ffffff"], line: "#fff3f7", prop: "sakura", mark: "fuji", markC: ["#5b6fb8", "#ffffff"], car: "#2563eb" },
  paris: { sky: ["#2a2350", "#7b4b8a", "#f29e7b"], grass: ["#3f6b4a", "#396243"], road: ["#3b3550", "#35304a"], rumble: ["#c9a8ff", "#ffffff"], line: "#fde7d6", prop: "lamp", mark: "eiffel", markC: ["#2b2347", "#4b3f78"], car: "#3b82f6" },
  sf: { sky: ["#4f7fc9", "#9cc0ea", "#e6eef8"], grass: ["#8fa66a", "#879e63"], road: ["#454a5a", "#3f4454"], rumble: ["#ff6a4a", "#ffffff"], line: "#ffffff", prop: "house", mark: "gg", markC: ["#d9402a", "#8f1b14"], car: "#2563eb" },
  nl: { sky: ["#5b8fd6", "#9cc4f0", "#dfeeff"], grass: ["#5cb85c", "#53ad53"], road: ["#444c5e", "#3e4658"], rumble: ["#ff7a1a", "#ffffff"], line: "#ffffff", prop: "tulip", mark: "mill", markC: ["#ffffff", "#c7d6ee"], car: "#2563eb" },
};

const TITLES: [number, string][] = [
  [0, "Learner licence"],
  [400, "Weekend driver"],
  [900, "Cab driver"],
  [1600, "Rally driver"],
  [2600, "F1 rookie"],
  [4000, "फर्क पड़ता है level"],
];
const titleFor = (s: number) => {
  let t = TITLES[0][1];
  for (const [n, name] of TITLES) if (s >= n) t = name;
  return t;
};

const K = 8; // perspective constant
const DMAX = 110; // draw distance in world units
const LANES = [-0.62, 0, 0.62];
const rand = (a: number, b: number) => a + Math.random() * (b - a);

interface Obj {
  kind: "car" | "coin" | "prop";
  D: number;
  lane: number;
  v: number;
  c: string;
}

function drawCar(ctx: CanvasRenderingContext2D, cx: number, by: number, w: number, color: string, lean = 0, flash = false) {
  const h = w * 0.64;
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(cx, by, w * 0.55, h * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#14161f";
  ctx.fillRect(cx - w * 0.5, by - h * 0.46, w * 0.17, h * 0.46);
  ctx.fillRect(cx + w * 0.33, by - h * 0.46, w * 0.17, h * 0.46);
  ctx.fillStyle = flash ? "#ffffff" : color;
  ctx.fillRect(cx - w * 0.44, by - h * 0.78, w * 0.88, h * 0.56);
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.fillRect(cx - w * 0.44, by - h * 0.32, w * 0.88, h * 0.1);
  const tx = lean * w * 0.05;
  ctx.fillStyle = flash ? "#e5ecff" : color;
  ctx.fillRect(cx - w * 0.3 + tx, by - h * 1.04, w * 0.6, h * 0.3);
  ctx.fillStyle = "#cfe3ff";
  ctx.fillRect(cx - w * 0.24 + tx, by - h * 0.98, w * 0.48, h * 0.18);
  ctx.fillStyle = "#ff3b3b";
  ctx.fillRect(cx - w * 0.4, by - h * 0.7, w * 0.16, h * 0.1);
  ctx.fillRect(cx + w * 0.24, by - h * 0.7, w * 0.16, h * 0.1);
}

function drawProp(ctx: CanvasRenderingContext2D, kind: Prop, x: number, y: number, u: number, col: string) {
  if (u < 1.5) return;
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(x - u * 0.5, y - u * 0.04, u, u * 0.08);
  if (kind === "palm") {
    ctx.fillStyle = "#7a4b25";
    ctx.fillRect(x - u * 0.06, y - u * 1.5, u * 0.12, u * 1.5);
    ctx.fillStyle = "#2f9e5b";
    for (const a of [-0.9, -0.3, 0.3, 0.9]) {
      ctx.beginPath();
      ctx.ellipse(x + a * u * 0.4, y - u * 1.5, u * 0.42, u * 0.12, a * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (kind === "sakura") {
    ctx.fillStyle = "#5a3a2e";
    ctx.fillRect(x - u * 0.07, y - u * 1.0, u * 0.14, u * 1.0);
    ctx.fillStyle = "#f7b6cf";
    ctx.beginPath();
    ctx.arc(x, y - u * 1.25, u * 0.62, 0, Math.PI * 2);
    ctx.arc(x - u * 0.4, y - u * 1.0, u * 0.4, 0, Math.PI * 2);
    ctx.arc(x + u * 0.4, y - u * 1.0, u * 0.4, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === "lamp") {
    ctx.fillStyle = "#1c1830";
    ctx.fillRect(x - u * 0.04, y - u * 1.6, u * 0.08, u * 1.6);
    ctx.fillStyle = "#ffe29a";
    ctx.beginPath();
    ctx.arc(x, y - u * 1.65, u * 0.16, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === "house") {
    ctx.fillStyle = col;
    ctx.fillRect(x - u * 0.5, y - u * 1.0, u, u * 1.0);
    ctx.fillStyle = "#8a3b30";
    ctx.beginPath();
    ctx.moveTo(x - u * 0.6, y - u * 1.0);
    ctx.lineTo(x, y - u * 1.45);
    ctx.lineTo(x + u * 0.6, y - u * 1.0);
    ctx.fill();
    ctx.fillStyle = "#fff6d8";
    ctx.fillRect(x - u * 0.28, y - u * 0.7, u * 0.18, u * 0.22);
    ctx.fillRect(x + u * 0.1, y - u * 0.7, u * 0.18, u * 0.22);
  } else {
    const cols = ["#ff4f7a", "#ffd23f", "#ff7a1a"];
    for (let i = -1; i <= 1; i++) {
      ctx.fillStyle = "#2f8a3f";
      ctx.fillRect(x + i * u * 0.35 - u * 0.03, y - u * 0.8, u * 0.06, u * 0.8);
      ctx.fillStyle = cols[i + 1];
      ctx.beginPath();
      ctx.ellipse(x + i * u * 0.35, y - u * 0.9, u * 0.16, u * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawMark(ctx: CanvasRenderingContext2D, m: Mark, c: [string, string], x: number, y: number, u: number, clock: number) {
  ctx.fillStyle = c[0];
  if (m === "taj") {
    ctx.fillRect(x - u * 0.7, y - u * 0.42, u * 1.4, u * 0.42);
    ctx.beginPath();
    ctx.ellipse(x, y - u * 0.56, u * 0.34, u * 0.42, 0, Math.PI, 0);
    ctx.fill();
    for (const s of [-1, 1]) {
      ctx.fillRect(x + s * u * 0.85 - u * 0.06, y - u * 0.9, u * 0.12, u * 0.9);
      ctx.beginPath();
      ctx.arc(x + s * u * 0.85, y - u * 0.9, u * 0.09, Math.PI, 0);
      ctx.fill();
    }
    ctx.fillStyle = c[1];
    ctx.fillRect(x - u * 0.06, y - u * 0.32, u * 0.12, u * 0.32);
  } else if (m === "fuji") {
    ctx.fillStyle = c[0];
    ctx.beginPath();
    ctx.moveTo(x - u * 1.5, y);
    ctx.lineTo(x - u * 0.28, y - u * 0.95);
    ctx.lineTo(x + u * 0.28, y - u * 0.95);
    ctx.lineTo(x + u * 1.5, y);
    ctx.fill();
    ctx.fillStyle = c[1];
    ctx.beginPath();
    ctx.moveTo(x - u * 0.28, y - u * 0.95);
    ctx.lineTo(x + u * 0.28, y - u * 0.95);
    ctx.lineTo(x + u * 0.46, y - u * 0.72);
    ctx.lineTo(x + u * 0.2, y - u * 0.8);
    ctx.lineTo(x, y - u * 0.7);
    ctx.lineTo(x - u * 0.2, y - u * 0.8);
    ctx.lineTo(x - u * 0.46, y - u * 0.72);
    ctx.fill();
  } else if (m === "eiffel") {
    ctx.fillStyle = c[1];
    ctx.beginPath();
    ctx.moveTo(x - u * 0.5, y);
    ctx.lineTo(x - u * 0.08, y - u * 1.2);
    ctx.lineTo(x, y - u * 1.45);
    ctx.lineTo(x + u * 0.08, y - u * 1.2);
    ctx.lineTo(x + u * 0.5, y);
    ctx.lineTo(x + u * 0.28, y);
    ctx.lineTo(x, y - u * 0.5);
    ctx.lineTo(x - u * 0.28, y);
    ctx.fill();
    ctx.fillRect(x - u * 0.2, y - u * 0.62, u * 0.4, u * 0.06);
  } else if (m === "gg") {
    for (const s of [-1, 1]) {
      ctx.fillStyle = c[0];
      ctx.fillRect(x + s * u * 0.8 - u * 0.07, y - u * 1.1, u * 0.14, u * 1.1);
      ctx.fillStyle = c[1];
      ctx.fillRect(x + s * u * 0.8 - u * 0.07, y - u * 0.8, u * 0.14, u * 0.05);
    }
    ctx.strokeStyle = c[0];
    ctx.lineWidth = Math.max(1, u * 0.03);
    ctx.beginPath();
    ctx.moveTo(x - u * 1.8, y - u * 0.2);
    ctx.quadraticCurveTo(x - u * 1.2, y - u * 0.25, x - u * 0.8, y - u * 1.08);
    ctx.quadraticCurveTo(x, y - u * 0.1, x + u * 0.8, y - u * 1.08);
    ctx.quadraticCurveTo(x + u * 1.2, y - u * 0.25, x + u * 1.8, y - u * 0.2);
    ctx.stroke();
    ctx.fillStyle = c[0];
    ctx.fillRect(x - u * 1.8, y - u * 0.2, u * 3.6, u * 0.06);
  } else {
    ctx.fillStyle = c[0];
    ctx.beginPath();
    ctx.moveTo(x - u * 0.28, y);
    ctx.lineTo(x - u * 0.16, y - u * 0.8);
    ctx.lineTo(x + u * 0.16, y - u * 0.8);
    ctx.lineTo(x + u * 0.28, y);
    ctx.fill();
    ctx.fillStyle = "#d6483a";
    ctx.beginPath();
    ctx.moveTo(x - u * 0.2, y - u * 0.8);
    ctx.lineTo(x, y - u * 0.98);
    ctx.lineTo(x + u * 0.2, y - u * 0.8);
    ctx.fill();
    ctx.strokeStyle = c[1];
    ctx.lineWidth = Math.max(1.5, u * 0.05);
    const a0 = clock * 0.8;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = a0 + (i * Math.PI) / 2;
      ctx.moveTo(x, y - u * 0.82);
      ctx.lineTo(x + Math.cos(a) * u * 0.8, y - u * 0.82 + Math.sin(a) * u * 0.8);
    }
    ctx.stroke();
  }
}

export default function RaceGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    try {
      const v = localStorage.getItem("designRaceTheme") as ThemeId | null;
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
      localStorage.setItem("designRaceTheme", id);
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

    let W = 800;
    let H = 340;
    let hy = 140;
    let roadHalf = 400;
    let best = 0;
    try {
      best = Number(localStorage.getItem("designRaceBest") || 0) || 0;
    } catch {
      /* ignore */
    }

    let state: "idle" | "playing" | "over" = "idle";
    let pos = 0;
    let px = 0;
    let speed = 30;
    let lives = 3;
    let coins = 0;
    let inv = 0;
    let shake = 0;
    let clock = 0;
    let newBest = false;
    let objs: Obj[] = [];
    let nextCar = 1;
    let nextCoin = 2;
    let nextProp = 0;
    const keys = { l: false, r: false, u: false, d: false };
    let touchDir = 0;
    let visible = false;
    let raf = 0;
    let last = 0;

    const pal = () => PALS[themeRef.current];
    const curveAt = (p: number) => Math.sin(p * 0.0035) * 0.8 + Math.sin(p * 0.0091) * 0.35;
    const halfW = (t: number) => roadHalf * t;
    const centre = (t: number, curve: number) => W / 2 + curve * (1 - t) * (1 - t) * W * 0.45 - px * halfW(t);

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(280, r.width);
      H = W < 520 ? 270 : 360;
      hy = Math.round(H * 0.4);
      roadHalf = Math.min(H * 1.25, W * 0.62);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const reset = () => {
      pos = 0;
      px = 0;
      speed = 30;
      lives = 3;
      coins = 0;
      inv = 0;
      shake = 0;
      newBest = false;
      objs = [];
      nextCar = 1;
      nextCoin = 2;
      nextProp = 0;
    };

    const score = () => Math.floor(pos + coins * 20);

    const begin = () => {
      reset();
      state = "playing";
    };

    const finish = () => {
      state = "over";
      const sc = score();
      if (sc > best) {
        best = sc;
        newBest = true;
        try {
          localStorage.setItem("designRaceBest", String(best));
        } catch {
          /* ignore */
        }
      }
    };

    const update = (dt: number) => {
      clock += dt;
      if (state !== "playing") {
        pos += 14 * dt;
        return;
      }
      const dir = (keys.r ? 1 : 0) - (keys.l ? 1 : 0) + touchDir;
      const curve = curveAt(pos);
      px += Math.max(-1, Math.min(1, dir)) * 2.3 * dt;
      px += curve * speed * 0.008 * dt;
      px = Math.max(-1.3, Math.min(1.3, px));
      const off = Math.abs(px) > 1.02;
      let target = 30 + Math.min(40, pos / 120);
      if (keys.u) target += 18;
      if (keys.d) target = Math.max(14, target - 22);
      if (off) target = Math.min(target, 15);
      speed += Math.max(-60 * dt, Math.min(30 * dt, target - speed));
      pos += speed * dt;
      inv = Math.max(0, inv - dt);
      shake = Math.max(0, shake - dt);
      if (off) shake = Math.max(shake, 0.08);

      nextCar -= dt;
      if (nextCar <= 0) {
        nextCar = rand(0.7, 1.4) * (45 / speed);
        objs.push({ kind: "car", D: DMAX, lane: LANES[Math.floor(Math.random() * 3)], v: rand(12, 24), c: ["#f59e0b", "#e0457b", "#10b981", "#a78bfa", "#f97316"][Math.floor(Math.random() * 5)] });
      }
      nextCoin -= dt;
      if (nextCoin <= 0) {
        nextCoin = rand(2, 3.4);
        const lane = LANES[Math.floor(Math.random() * 3)];
        for (let i = 0; i < 3; i++) objs.push({ kind: "coin", D: DMAX + i * 4, lane, v: 0, c: "#fbbf24" });
      }
      while (nextProp < pos + DMAX) {
        const side = Math.random() < 0.5 ? -1 : 1;
        objs.push({ kind: "prop", D: nextProp - pos, lane: side * rand(1.35, 1.9), v: 0, c: ["#f4a28c", "#8fb8e8", "#f2d27a"][Math.floor(Math.random() * 3)] });
        nextProp += rand(7, 13);
      }

      for (const o of objs) {
        o.D -= (speed - o.v) * dt;
        if (o.kind === "car" && inv <= 0 && o.D < 2.2 && o.D > -1 && Math.abs(o.lane - px) < 0.34) {
          o.D = -99;
          lives--;
          inv = 1.5;
          shake = 0.35;
          speed = Math.max(10, speed * 0.4);
        }
        if (o.kind === "coin" && o.D < 2.2 && o.D > -1 && Math.abs(o.lane - px) < 0.34) {
          o.D = -99;
          coins++;
        }
      }
      objs = objs.filter((o) => o.D > -3 && o.D < DMAX + 30);
      if (lives <= 0) finish();
    };

    const text = (s: string, x: number, y: number, align: CanvasTextAlign, size = 12, color = "#ffffff") => {
      ctx.font = `600 ${size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = align;
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(8,12,30,0.55)";
      ctx.strokeText(s, x, y);
      ctx.fillStyle = color;
      ctx.fillText(s, x, y);
    };

    const draw = () => {
      const p = pal();
      ctx.save();
      if (shake > 0) ctx.translate(rand(-3, 3) * Math.min(1, shake * 4), rand(-2, 2) * Math.min(1, shake * 4));
      const g = ctx.createLinearGradient(0, 0, 0, hy);
      g.addColorStop(0, p.sky[0]);
      g.addColorStop(0.6, p.sky[1]);
      g.addColorStop(1, p.sky[2]);
      ctx.fillStyle = g;
      ctx.fillRect(-6, -6, W + 12, hy + 8);
      ctx.fillStyle = "rgba(255,244,214,0.9)";
      ctx.beginPath();
      ctx.arc(W * 0.8 - px * 10, hy * 0.45, Math.max(14, H * 0.05), 0, Math.PI * 2);
      ctx.fill();
      const curve = curveAt(pos);
      const mx = W / 2 + curve * W * 0.2 - px * 24;
      drawMark(ctx, p.mark, p.markC, mx, hy + 2, H * 0.3, clock);
      for (let y = hy; y < H + 4; y += 2) {
        const t = Math.max(0.002, (y - hy + 1) / (H - hy));
        const D = K * (1 / t - 1);
        const s = Math.floor((pos + D) / 5) % 2 === 0 ? 0 : 1;
        const cx = centre(t, curve);
        const hw = halfW(t);
        ctx.fillStyle = p.grass[s];
        ctx.fillRect(-6, y, W + 12, 2);
        ctx.fillStyle = p.rumble[s];
        ctx.fillRect(cx - hw * 1.1, y, hw * 2.2, 2);
        ctx.fillStyle = p.road[s];
        ctx.fillRect(cx - hw, y, hw * 2, 2);
        if (s === 0) {
          ctx.fillStyle = p.line;
          const lw = Math.max(1, hw * 0.022);
          ctx.fillRect(cx - hw * 0.31 - lw / 2, y, lw, 2);
          ctx.fillRect(cx + hw * 0.31 - lw / 2, y, lw, 2);
        }
      }
      const list = [...objs].sort((a, b) => b.D - a.D);
      for (const o of list) {
        if (o.D < -2 || o.D > DMAX) continue;
        const t = 1 / (1 + Math.max(o.D, -1.5) / K);
        const x = centre(t, curve) + o.lane * halfW(t);
        const y = hy + (H - hy) * t;
        const u = halfW(t) * 0.22;
        if (o.kind === "prop") drawProp(ctx, p.prop, x, y, u * 1.4, o.c);
        else if (o.kind === "coin") {
          ctx.fillStyle = "rgba(251,191,36,0.3)";
          ctx.beginPath();
          ctx.arc(x, y - u * 0.55, u * 0.42, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = o.c;
          ctx.beginPath();
          ctx.ellipse(x, y - u * 0.55, u * 0.26 * Math.abs(Math.cos(clock * 4 + o.lane)), u * 0.3, 0, 0, Math.PI * 2);
          ctx.fill();
        } else drawCar(ctx, x, y, halfW(t) * 0.2, o.c);
      }
      const cw = roadHalf * 0.2;
      const flash = inv > 0 && Math.floor(clock * 14) % 2 === 0;
      const dir = (keys.r ? 1 : 0) - (keys.l ? 1 : 0) + touchDir;
      if (!(state === "playing" && flash)) drawCar(ctx, W / 2, H - 14, cw, p.car, state === "playing" ? dir : 0);
      ctx.restore();

      text(`SCORE ${score()}`, 16, 24, "left");
      text(`BEST ${best}`, W - 16, 24, "right");
      if (state === "playing") {
        text(`${Math.round(speed * 3)} KM/H`, 16, H - 14, "left");
        text(`LIVES ${"♥".repeat(Math.max(0, lives))}`, W - 16, H - 14, "right", 12, "#ff9aa8");
      }
      if (state === "idle") {
        text("DESIGN RACE", W / 2, H * 0.3, "center", 22);
        text("Arrow keys to steer. Dodge traffic, grab coins.", W / 2, H * 0.3 + 24, "center", 12);
        text("CLICK OR PRESS ANY ARROW TO START", W / 2, H * 0.3 + 48, "center", 12, "#fde68a");
      } else if (state === "over") {
        text("CRASHED", W / 2, H * 0.26, "center", 22);
        text(`${score()} pts · ${titleFor(score())}${newBest ? " · new best" : ""}`, W / 2, H * 0.26 + 24, "center", 13);
        text("CLICK OR PRESS ENTER TO RACE AGAIN", W / 2, H * 0.26 + 48, "center", 12, "#fde68a");
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      update(dt);
      draw();
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

    const setKey = (code: string, v: boolean) => {
      if (code === "ArrowLeft" || code === "KeyA") keys.l = v;
      else if (code === "ArrowRight" || code === "KeyD") keys.r = v;
      else if (code === "ArrowUp" || code === "KeyW") keys.u = v;
      else if (code === "ArrowDown" || code === "KeyS") keys.d = v;
      else return false;
      return true;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const focused = document.activeElement === canvas;
      if (!visible || (!focused && state !== "playing")) return;
      if (state !== "playing" && (e.code === "Enter" || e.code === "Space" || e.code.startsWith("Arrow"))) {
        e.preventDefault();
        if (!e.repeat) begin();
        setKey(e.code, true);
        return;
      }
      if (setKey(e.code, true) || e.code === "Space") e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      setKey(e.code, false);
    };
    const onDown = (e: PointerEvent) => {
      canvas.focus({ preventScroll: true });
      if (state !== "playing") begin();
      const r = canvas.getBoundingClientRect();
      touchDir = e.clientX - r.left < r.width / 2 ? -1 : 1;
    };
    const onMove = (e: PointerEvent) => {
      if (touchDir === 0) return;
      const r = canvas.getBoundingClientRect();
      touchDir = e.clientX - r.left < r.width / 2 ? -1 : 1;
    };
    const onUp = () => {
      touchDir = 0;
    };
    const onBlur = () => {
      keys.l = keys.r = keys.u = keys.d = false;
      touchDir = 0;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="mx-auto mb-4 flex max-w-[72rem] flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">Take a break</p>
        <div role="group" aria-label="Race theme" className="flex items-center gap-2.5">
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
          aria-label="Design Race, a mini racing game. Use the arrow keys to steer, or touch the left and right side of the road."
          className="block w-full cursor-pointer touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
        />
      </div>
      <p className="mx-auto mt-2.5 max-w-[72rem] px-4 text-[12px] text-white/55 sm:px-6">
        Arrow keys to steer, up to boost, down to brake · on touch, press the left or right side
      </p>
    </div>
  );
}
