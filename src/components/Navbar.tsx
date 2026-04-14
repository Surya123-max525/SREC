import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ieeeLogo from "@/assets/ieee-logo.png";
import srecLogo from "@/assets/srec-logo.png";
import snrLogo from "@/assets/snr-trust-logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Societies", href: "/societies" },
  { label: "Activities", href: "/activities" },
  { label: "Team", href: "/Team" },
  { label: "Awards", href: "/awards" },
  { label: "Annual Plans", href: "/annual-plans" },
  { label: "Gallery", href: "/gallery" },
  { label: "Funding", href: "/funding" },
  { label: "Contact", href: "/contact" },
  { label: "VTools", href: "https://vtools.vtools.ieee.org/" },
  { label: "IEEE", href: "https://www.ieee.org/" },
  { label: "SREC", href: "https://srec.ac.in/" },
  { label: "Admin", href: "/admin" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } as any },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 20 } as any },
  };

  return (
    <header className="w-full relative z-50">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 shadow-sm">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={containerVariants}
          className="relative max-w-[1450px] mx-auto px-2 md:px-8 py-4 md:py-6"
        >
          <div className="grid grid-cols-3 items-center gap-2 md:gap-8">
            
            {/* LEFT LOGO (SREC) */}
            <motion.div variants={itemVariants} className="flex items-center justify-start md:justify-center">
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="rounded-xl md:rounded-2xl bg-white shadow-sm border border-slate-100 p-1.5 md:p-3 overflow-hidden cursor-pointer"
              >
                <img
                  src={srecLogo}
                  alt="SREC"
                  className="h-8 md:h-20 w-auto object-contain"
                />
              </motion.div>
            </motion.div>

            {/* CENTER TITLE (IEEE) */}
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center text-center cursor-pointer">
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="rounded-2xl md:rounded-[2rem] bg-white shadow-md border border-slate-100 px-3 py-1.5 md:px-6 md:py-3 mb-1.5 md:mb-2"
              >
                <img
                  src={ieeeLogo}
                  alt="IEEE"
                  className="h-10 md:h-24 w-auto object-contain"
                />
              </motion.div>
              <div className="mt-1 h-1 md:h-1.5 w-12 md:w-32 rounded-full bg-gradient-to-r from-blue-600 via-[#00a6d6] to-cyan-400" />
            </motion.div>

            {/* RIGHT LOGO (SNR TRUST) */}
            <motion.div variants={itemVariants} className="flex items-center justify-end md:justify-center">
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="rounded-xl md:rounded-2xl bg-white shadow-sm border border-slate-100 p-1.5 md:p-3 cursor-pointer"
              >
                <img
                  src={snrLogo}
                  alt="SNR Trust"
                  className="h-8 md:h-20 w-auto object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* NAVBAR */}
      <nav
        className={`w-full transition-all duration-500 ease-out z-50 ${
          scrolled
            ? "fixed top-0 left-0 bg-[#001730]/95 backdrop-blur-xl shadow-2xl py-2"
            : "relative bg-[#003764]"
        }`}
      >
        <div className="max-w-[1450px] mx-auto px-4 md:px-8 flex items-center h-14 md:h-16">
          {/* Desktop Nav */}
          <div className="hidden lg:flex w-full justify-center xl:justify-between items-center gap-1 xl:gap-0">
            {navLinks.map((l, index) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
                className="relative text-slate-200 px-2.5 py-2 text-[11px] xl:text-xs font-bold uppercase whitespace-nowrap tracking-widest transition-colors duration-300 hover:text-white group"
              >
                {l.label}
                <span className="absolute left-1/2 -bottom-0 h-[3px] w-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-t-full transition-all duration-300 ease-out group-hover:w-3/4 group-hover:-translate-x-1/2 opacity-0 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Nav Header */}
          <div className="flex lg:hidden w-full justify-between items-center text-white">
            <span className="font-bold uppercase text-xs tracking-[0.2em] text-cyan-400">
              Navigation
            </span>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus:ring-2 focus:ring-cyan-500"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={22} className="text-cyan-300" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden absolute top-full left-0 w-full bg-[#001730]/95 backdrop-blur-xl shadow-2xl border-t border-slate-700/50 overflow-hidden"
            >
              <div className="flex flex-col py-2 px-4 max-h-[70vh] overflow-y-auto">
                {navLinks.map((l, index) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="block px-6 py-3.5 text-slate-300 text-xs font-bold uppercase tracking-[0.15em] border-b border-slate-800 last:border-0 hover:bg-slate-800/50 hover:text-cyan-400 hover:pl-8 transition-all"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Back to Home Button globally visible across all pages except landing page */}
      {window.location.pathname !== "/" && (
        <a 
          href="/" 
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] bg-[#001730] border border-slate-700 text-cyan-400 p-3.5 md:px-5 md:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 hover:bg-[#003764] hover:border-cyan-500 hover:text-white transition-all hover:-translate-y-1 group"
          title="Back to Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          <span className="hidden md:inline font-bold text-sm tracking-widest uppercase">Home</span>
        </a>
      )}
    </header>
  );
};

export default Navbar;