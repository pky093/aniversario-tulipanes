import React, { useEffect, useRef } from 'react';

const PETAL_COLORS = [
  'rgba(249, 220, 229, 0.72)', // Soft blush
  'rgba(244, 191, 208, 0.68)', // Pastel rose
  'rgba(236, 149, 178, 0.55)', // Medium tulip pink
  'rgba(255, 248, 250, 0.80)', // Silk cream pink
];

export function PetalCanvas({ enabled = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalCount = Math.min(26, Math.max(14, Math.floor(width / 65)));
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 7 + Math.random() * 9,
      speedY: 0.45 + Math.random() * 0.75,
      speedX: -0.35 + Math.random() * 0.7,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.018,
      swayOffset: Math.random() * Math.PI * 2,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }));

    let tick = 0;

    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      for (const p of petals) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick + p.swayOffset) * 0.45;
        p.angle += p.spin;

        if (p.y > height + 24) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 24) p.x = -20;
        if (p.x < -24) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Draw delicate tulip petal shape
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(
          p.size * 0.85,
          -p.size * 0.6,
          p.size * 0.75,
          p.size * 0.7,
          0,
          p.size
        );
        ctx.bezierCurveTo(
          -p.size * 0.75,
          p.size * 0.7,
          -p.size * 0.85,
          -p.size * 0.6,
          0,
          -p.size
        );
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
}
