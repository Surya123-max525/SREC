import { Code, Users, Rocket, Target, Cpu, Globe, ArrowRight } from "lucide-react";

const benefits = [
  {
    title: "Global Network",
    desc: "Connect with over 400,000+ technical professionals worldwide.",
    icon: Globe,
    colSpan: "md:col-span-2 lg:col-span-2",
    bg: "bg-sky-500",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    title: "Leadership",
    desc: "Build essential skills by leading massive student initiatives.",
    icon: Target,
    colSpan: "md:col-span-1 lg:col-span-1",
    bg: "bg-cyan-500",
    gradient: "from-cyan-300 to-cyan-500",
  },
  {
    title: "Technical Excellence",
    desc: "Access exclusive workshops, hackathons, and IEEE Xtreme.",
    icon: Code,
    colSpan: "md:col-span-1 lg:col-span-1",
    bg: "bg-teal-400",
    gradient: "from-teal-300 to-cyan-400",
  },
  {
    title: "Research Opportunities",
    desc: "Collaborate on cutting-edge publications and impactful projects.",
    icon: Rocket,
    colSpan: "md:col-span-2 lg:col-span-2",
    bg: "bg-blue-400",
    gradient: "from-blue-400 to-sky-300",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-cyan-50/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-50/50 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-500 font-semibold text-xs tracking-widest uppercase mb-6 border border-cyan-100 shadow-sm">
              <Cpu size={14} className="animate-pulse" />
              <span>Why Join Us</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Unlock Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">True Potential</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
              IEEE SREC isn't just a student branch; it's a launchpad. We meticulously equip you with the technical prowess, leadership acumen, and global network required to dominate the tech landscape of tomorrow.
            </p>
            <a href="https://www.ieee.org/membership/join/index.html" target="_blank" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
               Become a Member
               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {benefits.map((b) => (
                <div 
                  key={b.title} 
                  className={`group relative overflow-hidden rounded-3xl p-8 md:p-10 border border-slate-100 bg-white flex flex-col justify-end min-h-[280px] hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] ${b.colSpan}`}
                >
                  {/* Dynamic background gradient container */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 -z-10`} />
                  
                  {/* Top corner subtle styling */}
                  <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${b.gradient} rounded-full blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`} />

                  <div className="relative z-10 mt-auto">
                    <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-[5deg] transition-transform duration-500 border border-slate-100 shadow-sm ${b.gradient.split(' ')[0].replace('from-', 'text-')}`}>
                      <b.icon size={26} className="text-slate-700 group-hover:text-cyan-500 transition-colors duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-cyan-600 transition-colors duration-500">{b.title}</h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
