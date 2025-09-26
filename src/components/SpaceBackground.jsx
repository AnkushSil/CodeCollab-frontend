import { useEffect, useRef } from 'react';

const random = (min, max) => Math.random() * (max - min) + min;

const createParticle = (w, h) => ({
  x: random(0, w),
  y: random(0, h),
  vx: random(-0.2, 0.2),
  vy: random(-0.2, 0.2),
  r: random(0.5, 2.2),
  alpha: random(0.2, 0.8),
  pulse: random(0.002, 0.008),
});

const SpaceBackground = ({ count = 220, className = '' }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const pulseDirRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      sizeRef.current.w = rect.width;
      sizeRef.current.h = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const debouncedResize = (() => {
      let t;
      return () => {
        clearTimeout(t);
        t = setTimeout(resize, 200);
      };
    })();

    resize();

    particlesRef.current = Array.from({ length: count }, () => createParticle(sizeRef.current.w, sizeRef.current.h));
    pulseDirRef.current = particlesRef.current.map(() => Math.random() > 0.5 ? 1 : -1);

    const step = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

        // pulsing alpha
        p.alpha += p.pulse * pulseDirRef.current[i];
        if (p.alpha > 0.9) pulseDirRef.current[i] = -1;
        if (p.alpha < 0.2) pulseDirRef.current[i] = 1;

        ctx.beginPath();
        const glow = `rgba(0, 212, 255, ${p.alpha * 0.6})`;
        ctx.fillStyle = glow;
        ctx.shadowColor = glow;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    window.addEventListener('resize', debouncedResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [count]);

  return (
    <canvas ref={canvasRef} className={`fixed inset-0 -z-10 w-full h-full ${className}`} />
  );
};

export default SpaceBackground;


