import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trailEl = trailRef.current;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      setHidden(false);
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    // Detect hoverable elements
    const addHover = () => {
      document.querySelectorAll(
        "a, button, [role=button], input, textarea, label, [data-cursor-hover]"
      ).forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };
    addHover();
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Smooth trailing dot
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.1;
      trail.current.y += (pos.current.y - trail.current.y) * 0.1;
      trailEl.style.left = `${trail.current.x}px`;
      trailEl.style.top = `${trail.current.y}px`;
      raf.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      observer.disconnect();
    };
  }, []);

  const scale = clicked ? 0.85 : hovered ? 1.15 : 1;
  const arrowColor = hovered ? "#FFD700" : "#FACC15";

  return (
    <>
      {/* Yellow Arrow Cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          zIndex: 99999,
          pointerEvents: "none",
          transform: `translate(0, 0) scale(${scale})`,
          transformOrigin: "top left",
          transition: "opacity 0.2s, transform 0.15s ease",
          opacity: hidden ? 0 : 1,
          willChange: "left, top, transform",
        }}
      >
        <svg
          width="32"
          height="36"
          viewBox="0 0 32 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: hovered
              ? `drop-shadow(0 0 8px rgba(250,204,21,0.9))`
              : `drop-shadow(0 0 4px rgba(250,204,21,0.5))`,
            transition: "filter 0.2s",
          }}
        >
          {/* Main arrow body */}
          <path
            d="M2 2 L28 16 L17 19 L12 32 Z"
            fill={arrowColor}
            stroke="#1a1000"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Inner highlight for depth */}
          <path
            d="M5 4.5 L24 15.5 L16 18 L11.5 29 Z"
            fill="rgba(255,255,180,0.18)"
          />
        </svg>
      </div>

      {/* Trailing glow dot */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          zIndex: 99998,
          pointerEvents: "none",
          width: hovered ? "14px" : "8px",
          height: hovered ? "14px" : "8px",
          borderRadius: "50%",
          background: "rgba(250,204,21,0.6)",
          boxShadow: "0 0 12px 4px rgba(250,204,21,0.3)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s, opacity 0.2s",
          opacity: hidden ? 0 : 0.7,
          willChange: "left, top",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
