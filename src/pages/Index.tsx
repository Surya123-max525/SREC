import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ImpactSection from "@/components/ImpactSection";
import BenefitsSection from "@/components/BenefitsSection";
import LatestHighlightsSection from "@/components/LatestHighlightsSection";
import CollegeAboutSection from "@/components/CollegeAboutSection";
import AboutSection from "@/components/AboutSection";
import SocietiesSection from "@/components/SocietiesSection";
import TestimonialsMarqueeSection from "@/components/TestimonialsMarqueeSection";
import FAQSection from "@/components/FAQSection";

import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-white overflow-x-hidden relative selection:bg-cyan-100 selection:text-cyan-900">
    <Navbar />

    <main className="w-full relative pb-0">
      
      {/* Sticky Background Layer */}
      <div className="sticky top-0 z-0 transition-transform duration-1000">
        <div className="rounded-b-[3rem] md:rounded-b-[4rem] overflow-hidden shadow-xl border-b border-slate-200 pb-12 sm:pb-16 md:pb-24 bg-white">
          <HeroSection />
        </div>
      </div>

      {/* Overlapping Content Container */}
      <div className="relative z-10 w-full -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28">
        
        {/* Floating Stats Block */}
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 mb-16 md:mb-24">
          <div className="rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-cyan-900/10 border border-slate-200 bg-white/90 backdrop-blur-3xl transform hover:-translate-y-2 transition-all duration-500">
            <StatsSection />
          </div>
        </div>

        {/* Grouped Features Matrix */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 space-y-12 md:space-y-16 mb-24 md:mb-32">
          
          <div className="rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-200 bg-slate-50 transform transition-transform hover:scale-[1.005] duration-700">
            <ImpactSection />
          </div>

          <div className="rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-200 bg-slate-50 transform transition-transform hover:scale-[1.005] duration-700">
            <BenefitsSection />
          </div>

        </div>

        {/* Full Bleed Dynamic Layer - Inverts Background */}
        <div className="relative z-30 bg-white rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.08)] border-t border-slate-100 pt-6 md:pt-10 pb-20 md:pb-32">
          
          <div className="max-w-[1500px] mx-auto px-3 sm:px-4 md:px-6 space-y-8 md:space-y-12">
            <div className="bg-slate-50 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-slate-200 shadow-xl">
              <LatestHighlightsSection />
            </div>

            <div className="bg-slate-50 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-slate-200 shadow-xl">
              <CollegeAboutSection />
            </div>
            
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-slate-200 shadow-xl">
              <AboutSection />
            </div>
            
            <div className="bg-slate-50 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-slate-200 shadow-xl">
              <SocietiesSection />
            </div>

            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-slate-200 shadow-xl">
              <TestimonialsMarqueeSection />
            </div>

            <div className="bg-slate-50 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-slate-200 shadow-xl">
              <FAQSection />
            </div>
          </div>
          
        </div>
      </div>
    </main>

    <div className="relative z-40 bg-slate-900">
      <Footer />
    </div>
  </div>
);

export default Index;
