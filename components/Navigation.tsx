"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, Grid3x3, Mail, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { SiDiscord, SiX } from "react-icons/si";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    setShowContactMenu(!showContactMenu);
  };

  const contactOptions = [
    { icon: Mail, label: "Email", href: "mailto:segurosantiago05@gmail.com", color: "bg-blue-500", isLucide: true },
    { icon: SiDiscord, label: "Discord", href: "https://discord.com/users/santiseguro", color: "bg-indigo-600", isLucide: false },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/santiagoseguro", color: "bg-blue-600", isLucide: true },
    { icon: SiX, label: "X", href: "https://x.com/vfxseguro", color: "bg-gray-900", isLucide: false },
  ];

  return (
    <>
      {/* Contact Menu Overlay */}
      <AnimatePresence>
        {showContactMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactMenu(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Contact Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-light/30 shadow-2xl p-4">
                <div className="flex flex-col gap-2">
                  {contactOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <motion.a
                        key={option.label}
                        href={option.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gray-light/20 hover:bg-gray-light/40 transition-all duration-300 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-10 h-10 ${option.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-semibold text-gray-dark">{option.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 left-0 right-0 z-50 flex justify-center"
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] border border-gray-light/30 shadow-2xl px-3 py-3 flex flex-col gap-3">
          {/* Menu Buttons */}
          <div className="flex items-center gap-1">
            {/* Home Button */}
            <motion.button
              onClick={() => {
                scrollToSection("home");
                setShowContactMenu(false);
              }}
              className={`flex items-center justify-center w-16 h-16 rounded-[1.3rem] transition-all duration-300 ${
                activeSection === "home"
                  ? "bg-accent text-white"
                  : "bg-transparent text-gray-mid hover:bg-gray-light/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-6 h-6" />
            </motion.button>

            {/* Projects Button */}
            <motion.button
              onClick={() => {
                scrollToSection("projects");
                setShowContactMenu(false);
              }}
              className={`flex items-center justify-center w-16 h-16 rounded-[1.3rem] transition-all duration-300 ${
                activeSection === "projects"
                  ? "bg-accent text-white"
                  : "bg-transparent text-gray-mid hover:bg-gray-light/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid3x3 className="w-6 h-6" />
            </motion.button>

            {/* Divider */}
            <div className="w-px h-10 bg-gray-light/50 mx-2" />

            {/* Contact Button - same size, blue background */}
            <motion.button
              onClick={handleContactClick}
              className="flex items-center justify-center w-16 h-16 rounded-[1.3rem] bg-accent text-white transition-all duration-300 hover:bg-accent/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Progress Bar - Integrated inside menu */}
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mx-2">
            <motion.div
              className="h-full bg-accent rounded-full"
              style={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </motion.nav>
    </>
  );
}
