import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Navbar() {
  const navItems = ["About", "Skills", "Experience", "Projects", "Contact"];
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide as soon as user starts scrolling — only visible at the very top
      setVisible(window.scrollY < 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="navbar"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: `
              0 8px 40px rgba(0,0,0,0.6),
              0 1px 0 rgba(255,255,255,0.1) inset,
              0 -1px 0 rgba(0,0,0,0.3) inset,
              0 0 0 1px rgba(255,255,255,0.04) inset
            `,
          }}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {/* Top highlight shimmer line */}
          <div
            className="absolute top-0 left-8 right-8 h-px rounded-full pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
          />

          <div className="px-5 py-2.5 flex items-center justify-center gap-3 md:gap-8 lg:gap-12 font-[Ubuntu]">
            {/* Logo */}
            <div className="flex-shrink-0 scale-90 md:scale-100">
              <Logo />
            </div>

            {/* Nav Links */}
            <ul className="hidden md:flex items-center space-x-6 lg:space-x-10 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="relative group text-gray-300 hover:text-yellow-300 transition-colors duration-300 whitespace-nowrap tracking-wide py-1"
                  >
                    {item}
                    {/* Yellow glow underline */}
                    <span
                      className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #facc15, #fbbf24)" ,
                               boxShadow: "0 0 6px rgba(250,204,21,0.7)" }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
