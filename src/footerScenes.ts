// Backdrops for the footer game. Each theme draws its own sky, far skyline, near street and ground,
// all in code. Colors for game pieces (spikes, bugs, gems, HUD) also come from the theme so they
// stay readable on light and dark skies.

export type ThemeId = "india" | "japan" | "paris" | "sf" | "nl";

export interface Theme {
  id: ThemeId;
  label: string;
  sky: [string, string, string];
  far: string;
  ground: string;
  line: string;
  hud: string;
  spike: string;
  bug: string;
  gem: string;
  gemGlow: string;
  night: boolean;
}

export const THEMES: Theme[] = [
  { id: "india", label: "India", sky: ["#070b22", "#16296b", "#3b6cf6"], far: "#1b3384", ground: "#0a1233", line: "#60a5fa", hud: "rgba(219,234,254,0.9)", spike: "#dbeafe", bug: "#e0ecff", gem: "#93c5fd", gemGlow: "rgba(147,197,253,0.25)", night: true },
  { id: "japan", label: "Japan", sky: ["#9fb8e8", "#d9c6e6", "#f6d5df"], far: "#8193c8", ground: "#3a2740", line: "#f4a7c4", hud: "rgba(42,30,60,0.8)", spike: "#3a2740", bug: "#3a2740", gem: "#2563eb", gemGlow: "rgba(37,99,235,0.18)", night: false },
  { id: "paris", label: "Paris", sky: ["#2a2350", "#7b4b8a", "#f29e7b"], far: "#3a2d5c", ground: "#1d1733", line: "#f2b08a", hud: "rgba(255,236,220,0.9)", spike: "#fde7d6", bug: "#fde7d6", gem: "#bfdbfe", gemGlow: "rgba(191,219,254,0.3)", night: false },
  { id: "sf", label: "San Francisco", sky: ["#4f7fc9", "#9cc0ea", "#e6eef8"], far: "#6a86b5", ground: "#2b3550", line: "#e6eef8", hud: "rgba(20,30,60,0.8)", spike: "#1f2a44", bug: "#1f2a44", gem: "#2563eb", gemGlow: "rgba(37,99,235,0.18)", night: false },
  { id: "nl", label: "Netherlands", sky: ["#5b8fd6", "#9cc4f0", "#dfeeff"], far: "#4a6ba3", ground: "#1f3f73", line: "#9cc4f0", hud: "rgba(20,30,60,0.8)", spike: "#13284d", bug: "#13284d", gem: "#2563eb", gemGlow: "rgba(37,99,235,0.18)", night: false },
];

type Ctx = CanvasRenderingContext2D;
export interface SceneState {
  stars: { x: number; y: number; r: number; p: number }[];
  near: { x: number; w: number; h: number; v: number }[];
  petals: { x: number; y: number; s: number; p: number }[];
}

export function makeSceneState(): SceneState {
  return {
    stars: Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random() * 0.6, r: Math.random() < 0.15 ? 1.6 : 1, p: Math.random() * 6 })),
    near: Array.from({ length: 12 }, (_, i) => ({ x: i * 90, w: 46 + Math.random() * 28, h: 22 + Math.random() * 32, v: Math.random() })),
    petals: Array.from({ length: 34 }, () => ({ x: Math.random(), y: Math.random(), s: 0.5 + Math.random(), p: Math.random() * 6 })),
  };
}

const NEAR_SPAN = 12 * 90;

// ---------- far skylines (each repeats every `period` px) ----------

function farIndia(ctx: Ctx, x: number, g: number) {
  ctx.beginPath();
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
}

function farJapan(ctx: Ctx, x: number, g: number, color: string) {
  // Mountain with a snow cap
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + 20, g);
  ctx.lineTo(x + 210, g - 92);
  ctx.lineTo(x + 262, g - 120);
  ctx.lineTo(x + 318, g - 120);
  ctx.lineTo(x + 370, g - 92);
  ctx.lineTo(x + 560, g);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#f4f6ff";
  ctx.beginPath();
  ctx.moveTo(x + 232, g - 103);
  ctx.lineTo(x + 262, g - 120);
  ctx.lineTo(x + 318, g - 120);
  ctx.lineTo(x + 348, g - 103);
  ctx.lineTo(x + 330, g - 96);
  ctx.lineTo(x + 312, g - 104);
  ctx.lineTo(x + 292, g - 94);
  ctx.lineTo(x + 272, g - 104);
  ctx.lineTo(x + 252, g - 95);
  ctx.closePath();
  ctx.fill();
  // Pagoda
  ctx.fillStyle = "#6a76ad";
  const px = x + 640;
  for (let i = 0; i < 5; i++) {
    const w = 34 - i * 5;
    const y = g - 14 - i * 15;
    ctx.fillRect(px - w / 2 + 4, y, w - 8, 12);
    ctx.beginPath();
    ctx.moveTo(px - w / 2 - 6, y + 2);
    ctx.lineTo(px + w / 2 + 6, y + 2);
    ctx.lineTo(px + w / 2 - 2, y - 4);
    ctx.lineTo(px - w / 2 + 2, y - 4);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillRect(px - 1, g - 100, 2, 20);
}

function farParis(ctx: Ctx, x: number, g: number, color: string) {
  ctx.fillStyle = color;
  // Low rooftops and a dome
  ctx.fillRect(x, g - 22, 200, 22);
  ctx.fillRect(x + 60, g - 34, 50, 12);
  ctx.beginPath();
  ctx.arc(x + 85, g - 34, 18, Math.PI, 0);
  ctx.fill();
  ctx.fillRect(x + 84, g - 60, 2, 10);
  ctx.fillRect(x + 400, g - 26, 240, 26);
  // Tower
  const t = x + 300;
  ctx.beginPath();
  ctx.moveTo(t - 52, g);
  ctx.quadraticCurveTo(t - 18, g - 30, t - 10, g - 70);
  ctx.lineTo(t - 4, g - 120);
  ctx.lineTo(t, g - 154);
  ctx.lineTo(t + 4, g - 120);
  ctx.lineTo(t + 10, g - 70);
  ctx.quadraticCurveTo(t + 18, g - 30, t + 52, g);
  ctx.lineTo(t + 34, g);
  ctx.quadraticCurveTo(t, g - 44, t - 34, g);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(t - 20, g - 64, 40, 4);
  ctx.fillRect(t - 11, g - 106, 22, 3);
}

function farSF(ctx: Ctx, x: number, g: number, color: string, clock: number) {
  // Hills
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, g);
  ctx.quadraticCurveTo(x + 60, g - 50, x + 130, g - 26);
  ctx.quadraticCurveTo(x + 200, g - 8, x + 260, g - 20);
  ctx.lineTo(x + 260, g);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + 600, g);
  ctx.quadraticCurveTo(x + 700, g - 60, x + 820, g - 18);
  ctx.lineTo(x + 820, g);
  ctx.closePath();
  ctx.fill();
  // Bridge
  const red = "#c8553d";
  ctx.fillStyle = red;
  ctx.strokeStyle = red;
  ctx.fillRect(x + 80, g - 42, 600, 5);
  for (const tx of [x + 230, x + 530]) {
    ctx.fillRect(tx - 6, g - 124, 4, 124);
    ctx.fillRect(tx + 2, g - 124, 4, 124);
    for (const cy of [g - 120, g - 100, g - 76]) ctx.fillRect(tx - 6, cy, 12, 3);
  }
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + 80, g - 40);
  ctx.quadraticCurveTo(x + 160, g - 60, x + 230, g - 122);
  ctx.quadraticCurveTo(x + 380, g - 30, x + 530, g - 122);
  ctx.quadraticCurveTo(x + 600, g - 60, x + 680, g - 40);
  ctx.stroke();
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 1;
  for (let sx = x + 250; sx < x + 515; sx += 14) {
    const k = (sx - (x + 380)) / 150;
    const cy = g - 54 - 68 * k * k;
    ctx.beginPath();
    ctx.moveTo(sx, cy);
    ctx.lineTo(sx, g - 42);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  // Water shimmer under the bridge
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  const sh = (clock * 20) % 30;
  for (let wx = x + 80 - sh; wx < x + 680; wx += 30) ctx.fillRect(wx, g - 4, 12, 1);
}

function farNL(ctx: Ctx, x: number, g: number, color: string, clock: number) {
  ctx.fillStyle = color;
  ctx.fillRect(x, g - 10, 420, 10);
  for (const [mx, sz, sp] of [[x + 110, 1, 1.4], [x + 300, 0.8, 1.1]] as const) {
    const h = 66 * sz;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(mx - 15 * sz, g);
    ctx.lineTo(mx - 8 * sz, g - h);
    ctx.lineTo(mx + 8 * sz, g - h);
    ctx.lineTo(mx + 15 * sz, g);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(mx - 11 * sz, g - h);
    ctx.lineTo(mx, g - h - 12 * sz);
    ctx.lineTo(mx + 11 * sz, g - h);
    ctx.closePath();
    ctx.fill();
    // Turning sails
    const hx = mx;
    const hy = g - h + 2;
    ctx.strokeStyle = color;
    ctx.lineWidth = 6 * sz;
    ctx.lineCap = "round";
    for (let k = 0; k < 4; k++) {
      const a = clock * sp + (k * Math.PI) / 2;
      ctx.beginPath();
      ctx.moveTo(hx + Math.cos(a) * 6 * sz, hy + Math.sin(a) * 6 * sz);
      ctx.lineTo(hx + Math.cos(a) * 42 * sz, hy + Math.sin(a) * 42 * sz);
      ctx.stroke();
    }
    ctx.lineCap = "butt";
    ctx.fillStyle = "#dfeeff";
    ctx.beginPath();
    ctx.arc(hx, hy, 3 * sz, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ---------- near street (12 items, 90px apart) ----------

function nearItem(ctx: Ctx, id: ThemeId, b: SceneState["near"][number], x: number, g: number, i: number) {
  const w = Math.round(b.w);
  if (id === "india") {
    ctx.fillStyle = "#0f1d4f";
    ctx.fillRect(Math.round(x), g - b.h, w, b.h);
    ctx.fillStyle = "rgba(147,197,253,0.55)";
    for (let wy = g - b.h + 7; wy < g - 8; wy += 9)
      for (let wx = x + 6; wx < x + w - 6; wx += 10)
        if (Math.floor(wx * 7 + wy * 3 + b.h) % 5 < 2) ctx.fillRect(Math.round(wx), wy, 3, 3);
  } else if (id === "japan") {
    if (i % 4 === 3) {
      // Torii gate
      ctx.fillStyle = "#c2414b";
      ctx.fillRect(x + 8, g - 40, 4, 40);
      ctx.fillRect(x + 36, g - 40, 4, 40);
      ctx.fillRect(x + 2, g - 44, 44, 5);
      ctx.fillRect(x + 6, g - 34, 36, 3);
      return;
    }
    const cx = x + w / 2;
    const h = 22 + b.h * 0.5;
    ctx.fillStyle = "#4a3045";
    ctx.fillRect(Math.round(cx - 2), g - h, 4, h);
    ctx.fillStyle = b.v > 0.5 ? "#f4a7c4" : "#eb93b7";
    for (const [dx, dy, r] of [[-12, -h, 12], [10, -h - 2, 13], [0, -h - 12, 13], [-4, -h + 6, 10], [14, -h + 8, 9]] as const) {
      ctx.beginPath();
      ctx.arc(cx + dx, g + dy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (id === "paris") {
    const h = 30 + b.h * 0.5;
    ctx.fillStyle = "#2c2248";
    ctx.fillRect(Math.round(x), g - h, w, h);
    ctx.beginPath();
    ctx.moveTo(x - 2, g - h);
    ctx.lineTo(x + 6, g - h - 12);
    ctx.lineTo(x + w - 6, g - h - 12);
    ctx.lineTo(x + w + 2, g - h);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(Math.round(x + w - 16), g - h - 20, 6, 10);
    ctx.fillStyle = "rgba(255,214,153,0.75)";
    for (let wy = g - h + 6; wy < g - 10; wy += 11)
      for (let wx = x + 5; wx < x + w - 6; wx += 9)
        if (Math.floor(wx * 3 + wy * 5 + h) % 4 < 2) ctx.fillRect(Math.round(wx), wy, 3, 5);
  } else if (id === "sf") {
    const cols = ["#8fa9d6", "#d8a7b1", "#a9c8b5", "#e6d3a3"];
    const h = 30 + b.h * 0.4;
    ctx.fillStyle = cols[i % 4];
    ctx.fillRect(Math.round(x), g - h, w, h);
    ctx.fillStyle = "#3a4668";
    ctx.beginPath();
    ctx.moveTo(x - 3, g - h);
    ctx.lineTo(x + w / 2, g - h - 16);
    ctx.lineTo(x + w + 3, g - h);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    for (let wy = g - h + 6; wy < g - 12; wy += 12) {
      ctx.fillRect(Math.round(x + 6), wy, 6, 7);
      ctx.fillRect(Math.round(x + w - 12), wy, 6, 7);
    }
    ctx.fillStyle = "#3a4668";
    ctx.fillRect(Math.round(x + w / 2 - 4), g - 12, 8, 12);
  } else {
    // Canal house with a stepped gable
    const cols = ["#7a3b2e", "#3d4f73", "#5a3a2a", "#2f4b5c"];
    const h = 34 + b.h * 0.4;
    const ww = Math.min(w, 46);
    ctx.fillStyle = cols[i % 4];
    ctx.fillRect(Math.round(x), g - h, ww, h);
    const step = ww / 6;
    for (let s = 1; s <= 2; s++) ctx.fillRect(Math.round(x + step * s), g - h - 8 * s, Math.round(ww - step * 2 * s), 8);
    ctx.fillStyle = "#f4f7ff";
    for (let wy = g - h + 6; wy < g - 12; wy += 11)
      for (let wx = x + 5; wx < x + ww - 6; wx += 10) ctx.fillRect(Math.round(wx), wy, 5, 6);
  }
}

function clouds(ctx: Ctx, W: number, dist: number, clock: number, color: string) {
  ctx.fillStyle = color;
  for (let k = 0; k < 5; k++) {
    const span = W + 160;
    const x = ((k * 263 - dist * 0.08 - clock * 6) % span + span) % span - 80;
    const y = 26 + ((k * 37) % 50);
    ctx.fillRect(Math.round(x), y, 46, 8);
    ctx.fillRect(Math.round(x + 8), y - 6, 24, 6);
    ctx.fillRect(Math.round(x + 18), y - 10, 12, 4);
  }
}

export function drawScene(ctx: Ctx, t: Theme, s: SceneState, W: number, H: number, g: number, dist: number, clock: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, g);
  sky.addColorStop(0, t.sky[0]);
  sky.addColorStop(0.55, t.sky[1]);
  sky.addColorStop(1, t.sky[2]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  if (t.night) {
    for (const st of s.stars) {
      ctx.globalAlpha = 0.35 + 0.35 * Math.sin(clock * 1.6 + st.p);
      ctx.fillStyle = "#dbeafe";
      ctx.fillRect(Math.round(st.x * W), Math.round(st.y * g), st.r, st.r);
    }
    ctx.globalAlpha = 1;
  }

  // Sun or moon
  const body: Record<ThemeId, [number, number, string, string, number]> = {
    india: [W - 70, 46, "#e0ecff", "rgba(191,219,254,0.45)", 15],
    japan: [W * 0.72, 54, "#fff6f2", "rgba(255,240,235,0.7)", 18],
    paris: [W * 0.3, g - 26, "#ffd29a", "rgba(255,190,140,0.55)", 26],
    sf: [W - 90, 44, "#ffffff", "rgba(255,255,255,0.6)", 16],
    nl: [W - 80, 40, "#fff7d6", "rgba(255,247,214,0.6)", 16],
  };
  const [mx, my, mc, gc, mr] = body[t.id];
  const glow = ctx.createRadialGradient(mx, my, mr * 0.4, mx, my, mr * 4);
  glow.addColorStop(0, gc);
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(mx - mr * 4, my - mr * 4, mr * 8, mr * 8);
  ctx.fillStyle = mc;
  ctx.beginPath();
  ctx.arc(mx, my, mr, 0, Math.PI * 2);
  ctx.fill();

  if (!t.night) clouds(ctx, W, dist, clock, t.id === "paris" ? "rgba(255,220,210,0.35)" : "rgba(255,255,255,0.75)");

  // Far skyline
  const period: Record<ThemeId, number> = { india: 520, japan: 760, paris: 640, sf: 820, nl: 420 };
  const P = period[t.id];
  const fo = (dist * 0.15) % P;
  ctx.fillStyle = t.far;
  for (let x = -fo; x < W; x += P) {
    if (t.id === "india") farIndia(ctx, x, g);
    else if (t.id === "japan") farJapan(ctx, x, g, t.far);
    else if (t.id === "paris") farParis(ctx, x, g, t.far);
    else if (t.id === "sf") farSF(ctx, x, g, t.far, clock);
    else farNL(ctx, x, g, t.far, clock);
  }

  if (t.id === "sf") {
    // Fog bands
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    const fx = (clock * 10 + dist * 0.05) % (W + 300);
    ctx.fillRect(W - fx, g - 60, 300, 14);
    ctx.fillRect(W - ((fx + 420) % (W + 300)), g - 36, 240, 10);
  }

  // Near street
  const no = (dist * 0.4) % NEAR_SPAN;
  s.near.forEach((b, i) => {
    let x = b.x - no;
    if (x + b.w < 0) x += NEAR_SPAN;
    if (x > W) return;
    nearItem(ctx, t.id, b, x, g, i);
  });

  // Ground
  ctx.fillStyle = t.ground;
  ctx.fillRect(0, g, W, H - g);
  ctx.fillStyle = t.line;
  ctx.fillRect(0, g, W, 2);
  if (t.id === "nl") {
    // Canal ripples and a tulip strip
    ctx.fillStyle = "rgba(156,196,240,0.35)";
    for (let x = -((dist * 0.7) % 30); x < W; x += 30) ctx.fillRect(Math.round(x), g + 14, 14, 2);
    const tul = ["#ef4444", "#facc15", "#f472b6", "#fb923c"];
    for (let x = -(dist % 12), k = 0; x < W; x += 12, k++) {
      ctx.fillStyle = "#3f7d4a";
      ctx.fillRect(Math.round(x + 2), g - 5, 1, 5);
      ctx.fillStyle = tul[(k + Math.floor(dist / 12)) % 4];
      ctx.fillRect(Math.round(x + 1), g - 8, 3, 3);
    }
  } else {
    ctx.fillStyle = t.night ? "rgba(96,165,250,0.25)" : "rgba(255,255,255,0.18)";
    const go = dist % 24;
    for (let x = -go; x < W; x += 24) ctx.fillRect(Math.round(x), g + 10, 10, 2);
    for (let x = -((dist + 12) % 36); x < W; x += 36) ctx.fillRect(Math.round(x), g + 22, 4, 2);
  }

  if (t.id === "japan") {
    // Falling petals
    ctx.fillStyle = "#f9c5d8";
    for (const p of s.petals) {
      const y = ((p.y * H + clock * 22 * p.s) % H + H) % H;
      const x = (((p.x * W - dist * 0.5 - clock * 14 * p.s + Math.sin(clock + p.p) * 8) % W) + W) % W;
      ctx.fillRect(Math.round(x), Math.round(y), 3, 2);
    }
  }
}
