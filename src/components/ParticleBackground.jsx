import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 25;
const CONNECTION_DIST = 130;
const CURSOR_ATTRACT_DIST = 180;
const CURSOR_FORCE = 0.012;
const BASE_SPEED = 0.45;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

// Palette: soft whites & grays matching dark black/charcoal background
const COLORS = [
  "rgba(255,255,255,",   // pure white
  "rgba(200,200,200,",  // light gray
  "rgba(160,160,160,",  // mid gray
  "rgba(220,220,220,",  // off-white
];

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse
    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    // Init particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: randomBetween(-BASE_SPEED, BASE_SPEED),
        vy: randomBetween(-BASE_SPEED, BASE_SPEED),
        radius: randomBetween(1.2, 2.8),
        color,
        alpha: randomBetween(0.4, 1),
        pulseOffset: Math.random() * Math.PI * 2,
      };
    });

    let frame = 0;

    const draw = () => {
      frame++;
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      ctx.clearRect(0, 0, W, H);

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor attraction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CURSOR_ATTRACT_DIST && dist > 0) {
          const force = (CURSOR_ATTRACT_DIST - dist) / CURSOR_ATTRACT_DIST;
          p.vx += dx / dist * force * CURSOR_FORCE * 6;
          p.vy += dy / dist * force * CURSOR_FORCE * 6;
        }

        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > BASE_SPEED * 4) {
          p.vx = (p.vx / speed) * BASE_SPEED * 4;
          p.vy = (p.vy / speed) * BASE_SPEED * 4;
        }
        if (speed < BASE_SPEED * 0.3) {
          p.vx += randomBetween(-0.05, 0.05);
          p.vy += randomBetween(-0.05, 0.05);
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Pulse alpha
        const pulse = 0.15 * Math.sin(frame * 0.03 + p.pulseOffset);
        const alpha = Math.min(1, Math.max(0.2, p.alpha + pulse));

        // Glow near cursor
        const glowFactor = dist < CURSOR_ATTRACT_DIST
          ? 1 + 2.5 * (1 - dist / CURSOR_ATTRACT_DIST)
          : 1;
        const r = p.radius * glowFactor;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        gradient.addColorStop(0, `${p.color}${alpha})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(1, alpha + 0.2)})`;
        ctx.fill();
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.4;

            // Check if either particle is near cursor for extra glow
            const aDist = Math.hypot(mx - a.x, my - a.y);
            const bDist = Math.hypot(mx - b.x, my - b.y);
            const nearCursor = aDist < CURSOR_ATTRACT_DIST || bDist < CURSOR_ATTRACT_DIST;
            const lineOpacity = nearCursor ? opacity * 2.5 : opacity;

            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `${a.color}${lineOpacity})`);
            grad.addColorStop(1, `${b.color}${lineOpacity})`);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = nearCursor ? 1.2 : 0.5;
            ctx.stroke();
          }
        }
      }

      // Cursor ripple aura
      if (mx > 0) {
        const auraGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
        auraGrad.addColorStop(0, "rgba(168,85,247,0.08)");
        auraGrad.addColorStop(0.5, "rgba(0,212,255,0.04)");
        auraGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(mx, my, 80, 0, Math.PI * 2);
        ctx.fillStyle = auraGrad;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
