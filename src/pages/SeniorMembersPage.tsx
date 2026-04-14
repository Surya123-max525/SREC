import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Mail, ExternalLink, GraduationCap, Award } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type SeniorMember = {
  id: number;
  name: string;
  s_no: number | null;
  current_role: string | null;
  college: string | null;
  linkedin_url: string | null;
  image_url: string | null;
};

const SeniorMembersPage = () => {
  const [seniorMembers, setSeniorMembers] = useState<SeniorMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeniors = async () => {
      const { data } = await supabase.from("senior_members").select("*").order("s_no", { ascending: true });
      if (data) setSeniorMembers(data);
      setLoading(false);
    };
    fetchSeniors();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } as any }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 } as any }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } as any }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <Navbar />

      {/* Advanced Professional Deep-Blue Hero Section */}
      <section className="relative pt-36 pb-32 md:pt-48 md:pb-40 overflow-hidden bg-gradient-to-br from-slate-900 via-[#003764] to-[#005a8d] border-b border-slate-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[400px] -right-[200px] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-blue-500/20 blur-[120px] pointer-events-none transform -translate-x-1/4" 
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } as any },
            }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={heroItemVariants} className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-blue-50 font-semibold text-xs tracking-[0.2em] uppercase shadow-lg">
                <GraduationCap size={16} className="text-cyan-300" />
                <span>Faculty Advisory Board</span>
              </div>
            </motion.div>

            <motion.h1 
              variants={heroItemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8"
            >
              Distinguished <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-white drop-shadow-sm">
                Senior Members
              </span>
            </motion.h1>

            <motion.p 
              variants={heroItemVariants}
              className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-light"
            >
              The guiding force behind IEEE SREC. Our esteemed faculty members provide the vision, academic rigor, and mentorship that drive our student branch forward.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Soft overhang overlay line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex-grow w-full relative z-20 -mt-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00629b]"></div>
          </div>
        ) : seniorMembers.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-lg bg-white rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
            No senior members found. Please manage them from the Admin Dashboard!
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 auto-rows-max tracking-tight"
          >
            {seniorMembers.map((member) => {
              const roleParts = member.current_role ? member.current_role.split(" - ") : ["Senior Member"];
              const primaryRole = roleParts[0];
              const isLead = primaryRole.toLowerCase().includes("counsellor") || primaryRole.toLowerCase().includes("advisor");

              return (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  className={`group bg-white rounded-[2rem] shadow-lg hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-slate-100 hover:border-blue-100 hover:-translate-y-2 flex overflow-hidden relative ${
                    isLead ? "flex-col md:flex-row md:col-span-2 xl:col-span-2" : "flex-col h-full"
                  }`}
                >
                  {/* Subtle top glow line */}
                  <div className={`absolute top-0 left-0 ${isLead ? 'w-1 h-full' : 'w-full h-1'} bg-gradient-to-br from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />

                  {/* Creative Image Wrapper */}
                  <div className={`relative overflow-hidden bg-slate-100 shrink-0 ${isLead ? 'w-full md:w-[45%] h-64 md:h-full' : 'w-full aspect-[4/5]'}`}>
                    <img 
                      src={member.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=512`} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Floating role badge overlaying the image */}
                    <div className="absolute bottom-5 left-5 right-5 z-20">
                       <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md text-xs font-bold tracking-wide uppercase shadow-sm ${isLead ? 'bg-amber-400/90 text-amber-950' : 'bg-white/90 text-slate-800'}`}>
                         {isLead ? <Award size={14} className="text-amber-700" /> : <GraduationCap size={14} className="text-slate-600" />}
                         {primaryRole}
                       </div>
                    </div>
                  </div>

                  {/* Creative Content Panel */}
                  <div className={`p-6 flex flex-col flex-grow relative bg-white ${isLead ? 'md:justify-center md:px-10' : ''}`}>
                    {/* Hover Decoration */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="mb-4 relative z-10">
                      {member.linkedin_url ? (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${isLead ? 'text-2xl md:text-3xl' : 'text-xl'} font-black text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-2 group/link`}
                        >
                          {member.name}
                          <ExternalLink size={isLead ? 20 : 16} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-blue-400" />
                        </a>
                      ) : (
                        <h3 className={`${isLead ? 'text-2xl md:text-3xl' : 'text-xl'} font-black text-slate-900`}>{member.name}</h3>
                      )}
                    </div>

                    <div className="mt-auto space-y-4 pt-6 mt-6 border-t border-slate-100 relative z-10">
                      <div className="flex items-center gap-3 text-sm font-medium text-slate-600 group/item">
                        <div className="w-8 h-8 rounded-full bg-slate-50 group-hover/item:bg-blue-50 border border-slate-100 flex items-center justify-center shrink-0 transition-colors">
                          <MapPin size={14} className="text-blue-600" />
                        </div>
                        {member.college || "Sri Ramakrishna Engineering College"}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-medium text-slate-600 group/item">
                        <div className="w-8 h-8 rounded-full bg-slate-50 group-hover/item:bg-blue-50 border border-slate-100 flex items-center justify-center shrink-0 transition-colors">
                          <Mail size={14} className="text-blue-600" />
                        </div>
                        <a href={`mailto:${member.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@srec.ac.in`} className="hover:text-blue-600 transition-colors truncate">
                            {member.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@srec.ac.in
                        </a>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SeniorMembersPage;