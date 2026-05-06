
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";

// --- Helper Functions ---
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : { r: 0, g: 0, b: 0 };
}

// --- BackgroundCircles Component ---
export function BackgroundCircles({ className = "" }) {
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center overflow-hidden bg-[#0a0a0a] ${className}`}
        >
            {/* Center glow */}
            <div
                className="absolute rounded-full bg-cyan-500/10 blur-[120px]"
                style={{
                    width: "min(60vw, 60vh)",
                    height: "min(60vw, 60vh)",
                }}
            />

            {/* Circles container */}
            <div className="relative h-full w-full">
                {/* Circle 1 */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{
                        width: "min(20vw, 20vh)",
                        height: "min(20vw, 20vh)",
                        background:
                            "conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.5) 60deg, transparent 120deg, transparent 360deg)",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                        WebkitMask:
                            "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                    }}
                />

                {/* Circle 2 */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{
                        width: "min(35vw, 35vh)",
                        height: "min(35vw, 35vh)",
                        background:
                            "conic-gradient(from 180deg, rgba(6, 182, 212, 0.4) 0deg, transparent 40deg, transparent 90deg, rgba(6, 182, 212, 0.3) 130deg, transparent 170deg, transparent 270deg, rgba(6, 182, 212, 0.2) 310deg, transparent 350deg)",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                        WebkitMask:
                            "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                    }}
                />

                {/* Circle 3 */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{
                        width: "min(50vw, 50vh)",
                        height: "min(50vw, 50vh)",
                        background:
                            "conic-gradient(from 90deg, transparent 0deg, rgba(20, 184, 166, 0.4) 30deg, rgba(20, 184, 166, 0.6) 60deg, transparent 90deg, transparent 180deg, rgba(20, 184, 166, 0.3) 210deg, transparent 240deg, transparent 360deg)",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                        WebkitMask:
                            "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                    }}
                />

                {/* Circle 4 */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{
                        width: "min(65vw, 65vh)",
                        height: "min(65vw, 65vh)",
                        background:
                            "conic-gradient(from 270deg, rgba(45, 212, 191, 0.3) 0deg, transparent 50deg, transparent 120deg, rgba(45, 212, 191, 0.2) 150deg, transparent 200deg, transparent 300deg, rgba(45, 212, 191, 0.25) 330deg, transparent 360deg)",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
                        WebkitMask:
                            "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
                    }}
                />

                {/* Circle 5 */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{
                        width: "min(80vw, 80vh)",
                        height: "min(80vw, 80vh)",
                        background:
                            "conic-gradient(from 0deg, rgba(100, 116, 139, 0.2) 0deg, transparent 30deg, transparent 180deg, rgba(100, 116, 139, 0.15) 200deg, transparent 230deg, transparent 360deg)",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
                        WebkitMask:
                            "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
                    }}
                />
            </div>
        </div>
    );
}

// --- DotPattern Component ---
export function DotPattern({
    className = "",
    dotSize = 1.5,
    gap = 24,
    baseColor = "#525252",
    glowColor = "#22d3ee",
    proximity = 120,
    glowIntensity = 1,
    waveSpeed = 0.5,
}) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const dotsRef = useRef([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef();
    const startTimeRef = useRef(Date.now());

    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
    const glowRgb = useMemo(() => hexToRgb(glowColor), [glowColor]);

    const buildGrid = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);

        const cellSize = dotSize + gap;
        const cols = Math.ceil(rect.width / cellSize) + 1;
        const rows = Math.ceil(rect.height / cellSize) + 1;

        const offsetX = (rect.width - (cols - 1) * cellSize) / 2;
        const offsetY = (rect.height - (rows - 1) * cellSize) / 2;

        const dots = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                dots.push({
                    x: offsetX + col * cellSize,
                    y: offsetY + row * cellSize,
                    baseOpacity: 0.3 + Math.random() * 0.2,
                });
            }
        }
        dotsRef.current = dots;
    }, [dotSize, gap]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

        const { x: mx, y: my } = mouseRef.current;
        const proxSq = proximity * proximity;
        const time = (Date.now() - startTimeRef.current) * 0.001 * waveSpeed;

        for (const dot of dotsRef.current) {
            const dx = dot.x - mx;
            const dy = dot.y - my;
            const distSq = dx * dx + dy * dy;

            const wave = Math.sin(dot.x * 0.02 + dot.y * 0.02 + time) * 0.5 + 0.5;
            const waveOpacity = dot.baseOpacity + wave * 0.15;
            const waveScale = 1 + wave * 0.2;

            let opacity = waveOpacity;
            let scale = waveScale;
            let r = baseRgb.r;
            let g = baseRgb.g;
            let b = baseRgb.b;
            let glow = 0;

            if (distSq < proxSq) {
                const dist = Math.sqrt(distSq);
                const t = 1 - dist / proximity;
                const easedT = t * t * (3 - 2 * t);

                r = Math.round(baseRgb.r + (glowRgb.r - baseRgb.r) * easedT);
                g = Math.round(baseRgb.g + (glowRgb.g - baseRgb.g) * easedT);
                b = Math.round(baseRgb.b + (glowRgb.b - baseRgb.b) * easedT);

                opacity = Math.min(1, waveOpacity + easedT * 0.7);
                scale = waveScale + easedT * 0.8;
                glow = easedT * glowIntensity;
            }

            const radius = (dotSize / 2) * scale;

            if (glow > 0) {
                const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, radius * 4);
                gradient.addColorStop(0, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.4})`);
                gradient.addColorStop(0.5, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.1})`);
                gradient.addColorStop(1, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0)`);
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius * 4, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.fill();
        }

        animationRef.current = requestAnimationFrame(draw);
    }, [proximity, baseRgb, glowRgb, dotSize, glowIntensity, waveSpeed]);

    useEffect(() => {
        buildGrid();
        const container = containerRef.current;
        if (!container) return;
        const ro = new ResizeObserver(buildGrid);
        ro.observe(container);
        return () => ro.disconnect();
    }, [buildGrid]);

    useEffect(() => {
        animationRef.current = requestAnimationFrame(draw);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [draw]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };
        const handleMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

        // Attach to window for robust capture
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 overflow-hidden ${className}`}
        >
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        </div>
    );
}

// --- ConstellationBackground Component ---
export function ConstellationBackground({
    className = "",
    count = 80,
    connectionDistance = 150,
    nodeColor = "rgba(136, 196, 255, 1)",
    lineColor = "rgba(136, 196, 255, 0.15)",
    nodeSize = 2,
    mouseRadius = 100,
    glow = true,
}) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    // Use a ref to store the mouse coordinates
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = container.getBoundingClientRect();
        let width = rect.width;
        let height = rect.height;
        canvas.width = width;
        canvas.height = height;

        let animationId;

        // Create nodes
        const createNode = () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * nodeSize + nodeSize * 0.5,
        });

        const nodes = Array.from({ length: count }, createNode);

        // Mouse handlers - use window listeners just like DotPattern
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        // Resize handler
        const handleResize = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width;
            canvas.height = height;
        };

        const ro = new ResizeObserver(handleResize);
        ro.observe(container);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;

            // Update and draw nodes
            for (const node of nodes) {
                // Mouse repulsion
                if (mouseRadius > 0) {
                    const dx = node.x - mouseX;
                    const dy = node.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouseRadius && dist > 0) {
                        const force = ((mouseRadius - dist) / mouseRadius) * 0.02;
                        node.vx += (dx / dist) * force;
                        node.vy += (dy / dist) * force;
                    }
                }

                // Apply velocity with damping
                node.x += node.vx;
                node.y += node.vy;
                node.vx *= 0.99;
                node.vy *= 0.99;

                // Add slight random movement (Brownian)
                node.vx += (Math.random() - 0.5) * 0.01;
                node.vy += (Math.random() - 0.5) * 0.01;

                // Bounce off edges
                if (node.x < 0 || node.x > width) {
                    node.vx *= -1;
                    node.x = Math.max(0, Math.min(width, node.x));
                }
                if (node.y < 0 || node.y > height) {
                    node.vy *= -1;
                    node.y = Math.max(0, Math.min(height, node.y));
                }
            }

            // Draw connections
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const opacity = 1 - dist / connectionDistance;
                        ctx.globalAlpha = opacity * 0.5;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            ctx.globalAlpha = 1;
            for (const node of nodes) {
                // Glow effect
                if (glow) {
                    const gradient = ctx.createRadialGradient(
                        node.x,
                        node.y,
                        0,
                        node.x,
                        node.y,
                        node.radius * 4,
                    );
                    gradient.addColorStop(0, nodeColor.replace("1)", "0.3)"));
                    gradient.addColorStop(1, "transparent");
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Core
                ctx.fillStyle = nodeColor;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            ro.disconnect();
        };
    }, [count, connectionDistance, nodeColor, lineColor, nodeSize, mouseRadius, glow]);

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 overflow-hidden ${className}`}
        >
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        </div>
    );
}

// --- Main Export ---
export default function Background3D() {
    return (
        <>
            {/* Layer 1: HUD Circles (Deep Background) */}
            <BackgroundCircles className="-z-30 bg-[#0a0a0a]" />

            {/* Layer 2: Constellation (Connects nodes with lines, semi-transparent) */}
            <ConstellationBackground
                className="-z-20 bg-transparent"
                count={60} // Reduced count since we have other layers
                nodeColor="rgba(34, 211, 238, 0.8)" // Cyan to match theme
                lineColor="rgba(34, 211, 238, 0.15)"
                mouseRadius={150}
            />

            {/* Layer 3: Interactive Dots (Overlay, transparent bg) */}
            <DotPattern
                className="-z-10 bg-transparent"
                baseColor="#525252"
                glowColor="#22d3ee"
                proximity={100} // Slightly reduced to differentiate from Constellation
                dotSize={1}      // Smaller dots to reduce clutter
            />

            {/* Vignette Overlay for Depth */}
            <div
                className="fixed inset-0 pointer-events-none -z-5"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(10,10,10,0.8) 100%)",
                }}
            />
        </>
    );
}
