
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";

const AboutProfile = ({ src }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Springs for smooth tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Rotations
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Parallax layers
    const bgX = useTransform(mouseX, [-0.5, 0.5], ["-20px", "20px"]);
    const bgY = useTransform(mouseY, [-0.5, 0.5], ["-20px", "20px"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className="relative w-80 h-96 sm:w-96 sm:h-[28rem] perspective-1000 cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="relative w-full h-full preserve-3d"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
                {/* === Layer 1: Back Decor (Wireframe/Tech) === */}
                <motion.div
                    className="absolute -inset-4 rounded-xl border-2 border-cyan-500/30 bg-black/50 backdrop-blur-sm -z-10"
                    style={{
                        x: bgX,
                        y: bgY,
                        transform: "translateZ(-40px)"
                    }}
                >
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 to-transparent" />

                    {/* Corner Accents */}
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-cyan-500" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-cyan-500" />
                </motion.div>

                {/* === Layer 2: Main Image Card === */}
                <motion.div
                    className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl shadow-purple-500/30 border border-white/10"
                    style={{ transform: "translateZ(0px)" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                    <img
                        src={src}
                        alt="Profile"
                        className="w-full h-full object-cover object-[35%_center]"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                </motion.div>

                {/* === Layer 3: Pop-out Elements (Floating Icons) === */}
                <motion.div
                    className="absolute -right-8 top-10 p-3 bg-gray-900/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg"
                    style={{ transform: "translateZ(60px)" }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FaReact className="text-3xl text-cyan-400" />
                </motion.div>

                <motion.div
                    className="absolute -left-6 bottom-20 p-3 bg-gray-900/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg"
                    style={{ transform: "translateZ(80px)" }}
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                    <FaNodeJs className="text-3xl text-green-500" />
                </motion.div>

                <motion.div
                    className="absolute right-4 -bottom-6 p-3 bg-gray-900/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg"
                    style={{ transform: "translateZ(50px)" }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <SiMongodb className="text-3xl text-green-400" />
                </motion.div>

                {/* === Layer 4: Glass Overlay UI (Name Tag) === */}
                <motion.div
                    className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 z-20"
                    style={{ transform: "translateZ(40px)" }}
                >
                    <h3 className="text-white font-bold text-lg font-[Syne]">Monisha Jaiganesh</h3>
                    <p className="text-cyan-300 text-xs tracking-wider">Software Engineer</p>
                </motion.div>

            </motion.div>
        </motion.div>
    );
};

export default AboutProfile;
