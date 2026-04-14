import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Calendar, Users, Award } from "lucide-react";

const stats = [
  { icon: Calendar, label: "Years Active", value: "24+" },
  { icon: Users, label: "Student Members", value: "500+" },
  { icon: Award, label: "Events Conducted", value: "60+" },
];

const slideImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200"
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-white">

      {/* Light animated abstract backgrounds shining through */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-200/40 rounded-full blur-[120px] animate-pulse pointer-events-none -translate-y-1/4 mix-blend-multiply [animation-duration:10s]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-200/40 rounded-full blur-[120px] animate-pulse pointer-events-none translate-y-1/4 mix-blend-multiply [animation-duration:8s]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-8 md:mt-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full min-h-[85vh]">

        {/* Left text column */}
        <div className="text-center lg:text-left flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm tracking-widest uppercase mb-6 border border-slate-200 shadow-sm mx-auto lg:mx-0 transition-colors hover:bg-slate-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            SREC IEEE Student Branch
          </div>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
            Empowering <br className="hidden md:block" />
            <span className="relative inline-block mt-1">
              <span className="relative z-10 text-slate-900">Tomorrow's</span>
              <span className="absolute bottom-1 left-0 right-0 h-4 bg-cyan-100 -z-10"></span>
            </span> Innovators
          </h1>

          <p className="text-slate-600 md:text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
            Breakthrough technology, collaborative innovation, and extensive global networking for aspiring engineers since 2001. Join the premier student branch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="#about" className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-slate-900/20">
              Explore Our Vision
            </a>
            <a href="/activities" className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all shadow-sm focus:ring-4 focus:ring-slate-200">
              Latest Activities
            </a>
          </div>
        </div>

        {/* Right Sideshow Column - Highly Professional Frame */}
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] flex items-center justify-center">
          {/* Subtle elegant shadow backdrop */}
          <div className="absolute inset-0 bg-slate-200/50 rounded-[1.5rem] transform translate-y-4 translate-x-4"></div>

          <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-xl bg-white z-10 flex">
            <div className="overflow-hidden w-full h-full" ref={emblaRef}>
              <div className="flex w-full h-full">
                {slideImages.map((src, index) => (
                  <div className="relative flex-[0_0_100%] min-w-0 w-full h-full" key={index}>
                    <img
                      src={src}
                      alt={`Activity ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Elegant glass overlay element for polish */}
            <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-md border border-white/50 text-slate-900 text-xs font-bold tracking-widest shadow-sm">
              GLOBAL EXCELLENCE
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}

    </section>
  );
};

export default HeroSection;
