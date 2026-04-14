import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CalendarRange, Trophy, Globe2, Users, Rocket, Sparkles, BookOpen, Award, ArrowRight } from "lucide-react";

const milestones = [
  {
    year: "2001",
    title: "Inception of IEEE SREC",
    description: "The IEEE Student Branch of Sri Ramakrishna Engineering College was officially inaugurated on June 11th, 2001, setting the foundation for technical excellence.",
    icon: Rocket
  },
  {
    year: "2008",
    title: "Branch Expansion",
    description: "Launched specialized technical societies including the Computer Society and Power & Energy Society to cater to diverse engineering disciplines.",
    icon: Globe2
  },
  {
    year: "2015",
    title: "Global Recognition",
    description: "Awarded continuous outstanding student branch rebates from IEEE Headquarters, New York, recognizing the massive scale of events conducted.",
    icon: Award
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Successfully transitioned to virtual platforms, hosting massive online hackathons, ideathons, and webinars reaching a global audience during the pandemic.",
    icon: Sparkles
  },
  {
    year: "2024",
    title: "Legacy of Excellence",
    description: "Surpassed 500+ active members and marked 23+ years of continuous operation, remaining one of the most active student branches under the IEEE Madras Section.",
    icon: Trophy
  }
];

const pillars = [
  {
    title: "Technical Excellence",
    desc: "We prioritize cutting-edge knowledge sharing through specialized workshops, hands-on seminars, and technical symposia.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    icon: BookOpen
  },
  {
    title: "Leadership & Growth",
    desc: "We build tomorrow's leaders by giving students complete autonomy to organize, manage, and execute large-scale events.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    icon: Users
  },
  {
    title: "Global Collaboration",
    desc: "Through IEEE Xtreme and international conferences, we bridge the gap between our college and the global engineering community.",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    icon: Globe2
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      
      {/* Existing About Section Hero */}
      <div className="pt-20">
        <AboutSection />
      </div>

      {/* Core Pillars Section */}
      <section className="py-20 relative bg-white border-y border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Our Core Pillars</h2>
            <p className="text-slate-500 text-lg">The foundational principles that guide every decision, event, and initiative we take at IEEE SREC.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${pillar.color}`}>
                  <pillar.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{pillar.title}</h3>
                <p className="text-slate-600 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline Section */}
      <section className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"/>
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-xs tracking-widest uppercase mb-4 border border-indigo-100">
              <CalendarRange size={14} />
              <span>Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">The History of IEEE SREC</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Two decades of unwavering commitment to technical empowerment and student leadership.</p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-10 space-y-12">
            {milestones.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute top-0 left-0 w-8 h-8 -translate-x-[17px] bg-white border-4 border-[#00629b] rounded-full shadow-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#00629b] rounded-full" />
                </div>
                
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                      <item.icon className="text-[#00629b]" size={24} />
                      {item.title}
                    </h3>
                    <span className="text-4xl font-black text-slate-100 drop-shadow-sm pointer-events-none group-hover:text-blue-50 transition-colors">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Message Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-blue-200/50 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21L16.439 12.015L11.536 12L11.503 3H21.5V12.015L19.078 21H14.017ZM4.517 21L6.939 12.015L2.036 12L2.003 3H12V12.015L9.578 21H4.517Z" />
              </svg>
            </div>
            <div className="relative z-10 max-w-3xl">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs tracking-widest uppercase mb-4">
                  Leadership Message
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                  "Empowering students to transcend boundaries and embrace the technological future with confidence and ethical responsibility."
                </h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                At IEEE SREC, we believe that education extends far beyond the classroom. Our student branch is a living ecosystem where raw talent meets global opportunity. Through thousands of hours dedicated to technical workshops, leadership training, and collaborative projects, we have consistently nurtured engineers who don't just adapt to the future, but actively build it.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#00629b] flex items-center justify-center text-white font-bold text-xl">
                  BC
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Branch Counselor</h4>
                  <p className="text-slate-500 text-sm">IEEE SREC Student Branch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Member Benefits Section */}
      <section className="py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Why Join IEEE SREC?</h2>
            <p className="text-slate-500 text-lg">Unlock exclusive benefits that accelerate your academic and professional journey.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "IEEE Xplore Library",
                desc: "Gain free access to millions of highly cited engineering documents, papers, and journals essential for research.",
                color: "border-t-blue-500"
              },
              {
                title: "Global Networking",
                desc: "Connect directly with industry professionals, researchers, and fellow engineering students across 160 countries.",
                color: "border-t-indigo-500"
              },
              {
                title: "Financial Grants",
                desc: "Eligibility for exclusive IEEE scholarships, travel grants, and project funding to support your innovative ideas.",
                color: "border-t-emerald-500"
              },
              {
                title: "Skill Credentials",
                desc: "Earn internationally recognized certificates for participating in standardized technical and organizational roles.",
                color: "border-t-purple-500"
              }
            ].map((perk, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 ${perk.color} hover:shadow-md transition-shadow`}
              >
                <h4 className="font-bold text-slate-800 text-lg mb-2">{perk.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#003764] py-20 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Innovate With Us?</h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Become a part of the world's largest technical professional organization. Expand your network, build your resume, and gain exclusive access to research and opportunities.
          </p>
          <button className="bg-white text-[#003764] hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-3">
            Join IEEE SREC Today
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
