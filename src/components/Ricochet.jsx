import { useEffect, useRef, useState } from "react";

// 5x7 pixel font for the letters we need.
const FONT = {
  H: ["10001","10001","10001","11111","10001","10001","10001"],
  E: ["11111","10000","10000","11110","10000","10000","11111"],
  L: ["10000","10000","10000","10000","10000","10000","11111"],
  O: ["01110","10001","10001","10001","10001","10001","01110"],
  W: ["10001","10001","10001","10101","10101","11011","10001"],
  R: ["11110","10001","10001","11110","10100","10010","10001"],
  D: ["11110","10001","10001","10001","10001","10001","11110"],
};
const WORDS = ["HELLO", "WORLD"]; // change the text here (use letters in FONT)
const COLS = 29, ROWS = 16;
const BALL_SPEED = 1.3; // 1 = original speed, higher = faster

function buildCells() {
  const map = new Map();
  WORDS.forEach((word, wi) =>
    [...word].forEach((ch, ci) =>
      FONT[ch].forEach((row, ry) =>
        [...row].forEach((v, rx) => {
          if (v === "1") { const c = ci * 6 + rx, r = wi * 9 + ry; map.set(c + "," + r, { c, r, alive: true }); }
        })
      )
    )
  );
  return map;
}

export default function Ricochet() {
  const wrap = useRef(null), cv = useRef(null);
  const g = useRef({ cells: buildCells(), left: 0, playing: false, px: 0 });
  const [playing, setPlaying] = useState(false);
  const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    const s = g.current, ctx = cv.current.getContext("2d");
    s.left = s.cells.size;
    let w, h, cell, ox, oy, pw, py, speed, visible = true, raf;
    const ph = 8, r = 6;
    const ball = { x: 0, y: 0, vx: 0, vy: 0 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = cv.current.clientWidth; h = cv.current.clientHeight;
      cv.current.width = w * dpr; cv.current.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.min((w * 0.8) / COLS, (h * 0.5) / ROWS);
      ox = (w - COLS * cell) / 2; oy = h * 0.14;
      pw = Math.max(90, w * 0.14); py = h - 48; speed = Math.max(4.5, h / 170) * BALL_SPEED;
      if (!s.px) s.px = w / 2;
    };
    resize();

    const cellAt = (x, y) => {
      const c = Math.floor((x - ox) / cell), rr = Math.floor((y - oy) / cell);
      const k = s.cells.get(c + "," + rr);
      return k && k.alive ? k : null;
    };
    const reset = () => { s.playing = false; setPlaying(false); };

    const step = () => {
      if (!s.playing) { ball.x = s.px; ball.y = py - r - 2; return; }
      let nx = ball.x + ball.vx, ny = ball.y + ball.vy;
      if (nx < r || nx > w - r) { ball.vx = -ball.vx; nx = ball.x + ball.vx; }
      if (ny < r) { ball.vy = -ball.vy; ny = ball.y + ball.vy; }
      const hx = cellAt(nx + Math.sign(ball.vx) * r, ball.y);
      if (hx) { hx.alive = false; s.left--; ball.vx = -ball.vx; nx = ball.x + ball.vx; }
      else {
        const hy = cellAt(ball.x, ny + Math.sign(ball.vy) * r);
        if (hy) { hy.alive = false; s.left--; ball.vy = -ball.vy; ny = ball.y + ball.vy; }
      }
      if (ball.vy > 0 && ny + r >= py && ny + r <= py + ph + ball.vy && nx >= s.px - pw / 2 && nx <= s.px + pw / 2) {
        const ang = ((nx - s.px) / (pw / 2)) * 1.0;
        ball.vx = speed * Math.sin(ang); ball.vy = -speed * Math.cos(ang); ny = py - r;
      }
      if (ny > h + r) reset();
      ball.x = nx; ball.y = ny;
      if (s.left === 0) { s.cells = buildCells(); s.left = s.cells.size; reset(); }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#f4f4f5";
      s.cells.forEach((k) => { if (k.alive) ctx.fillRect(ox + k.c * cell + 1, oy + k.r * cell + 1, cell - 2, cell - 2); });
      ctx.beginPath(); ctx.roundRect(s.px - pw / 2, py, pw, ph, 4); ctx.fill();
      ctx.beginPath(); ctx.arc(ball.x, ball.y, r, 0, 6.283); ctx.fill();
    };

    const loop = () => { if (visible) { step(); draw(); } raf = requestAnimationFrame(loop); };
    loop();

    const move = (e) => {
      const b = cv.current.getBoundingClientRect();
      s.px = Math.min(w - pw / 2, Math.max(pw / 2, e.clientX - b.left));
    };
    cv.current.addEventListener("pointermove", move);
    cv.current.addEventListener("pointerdown", move);
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.1 });
    io.observe(wrap.current);
    s.launch = () => {
      if (s.left === 0) { s.cells = buildCells(); s.left = s.cells.size; }
      ball.vx = speed * 0.5 * (Math.random() > 0.5 ? 1 : -1); ball.vy = -speed;
      s.playing = true; setPlaying(true);
    };
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section ref={wrap} onClick={() => { if (!g.current.playing) g.current.launch(); }}
      className="relative h-svh min-h-[560px] bg-black cursor-pointer flex items-center justify-center px-4">
      <div className="relative w-[min(94vw,1040px)] h-[min(78svh,660px)] overflow-hidden">
        <p className="absolute top-4 left-5 text-sm underline underline-offset-4 decoration-white/40 z-10">
          Break it if you can. It still ships.
        </p>
        <canvas ref={cv} className="absolute inset-0 w-full h-full" style={{ touchAction: "pan-y" }} />
        {!playing && (
          <span className="pointer-events-none absolute bottom-4 right-4 z-10 border border-white/30 px-4 py-2 text-xs tracking-widest animate-pulse">
            {touch ? "TAP" : "CLICK"} ANYWHERE TO PLAY
          </span>
        )}
      </div>
    </section>
  );
}
