import { useEffect, useRef } from "react";

// Dark liquid-marble background (stand-in for the reference's looping video).
// To use a real video instead: put contact_bg.mp4 in src/assets/contact_assets/
// and swap this for <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
export default function ContactBg() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    const W = 192, H = 108;
    cv.width = W; cv.height = H;
    const img = ctx.createImageData(W, H);
    let raf, t = 0, visible = true;

    const frame = () => {
      const d = img.data;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const u = (x / H) * 2.4, v = (y / H) * 2.4;
          const a = u + 1.4 * Math.sin(v * 2.1 + t * 0.5), b = v + 1.4 * Math.sin(u * 2.3 - t * 0.4);
          const f = Math.sin(a * 1.7 + Math.sin(b * 1.3 + t * 0.3) * 2) * Math.sin(b * 1.5 + Math.cos(a * 1.1 - t * 0.2) * 2);
          const g = 10 + Math.pow(Math.abs(f), 1.4) * 70, i = (y * W + x) * 4;
          d[i] = g * 0.9; d[i + 1] = g * 0.95; d[i + 2] = g * 1.08; d[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    };
    const loop = () => { if (visible) { t += 0.012; frame(); } raf = requestAnimationFrame(loop); };
    loop();

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  return (
    <>
      <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ filter: "blur(1.5px)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
    </>
  );
}
