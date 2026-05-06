
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Profile3D = ({ src, alt = "Profile", className = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for 3D tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        const xPct = clientX / width - 0.5;
        const yPct = clientY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className={`relative perspective-1000 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Animated Glow Behind */}
            <div
                className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-purple-500 to-yellow-500 rounded-2xl blur-2xl opacity-50 animate-pulse -z-10"
                style={{ transform: "translateZ(-50px)" }}
            />

            {/* Main Glass Card */}
            <div
                className="w-full h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 relative overflow-hidden shadow-2xl"
                style={{ transform: "translateZ(20px)" }}
            >
                {/* Image Container with Pop-out Effect */}
                <div className="w-full h-full relative overflow-hidden rounded-xl bg-[#0a0a0a]">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                            console.error('Image failed to load:', src);
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

                {/* Holographic Border Effect */}
                <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
        </motion.div>
    );
};

export default Profile3D;
