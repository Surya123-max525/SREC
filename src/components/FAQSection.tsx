import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who can join the IEEE Student Branch?",
    answer: "Any student currently enrolled at SREC, regardless of their major or year of study, is welcome to join our branch. We encourage diverse perspectives and interdisciplinary collaboration."
  },
  {
    question: "What are the core benefits of becoming a member?",
    answer: "Members get exclusive access to industry workshops, global networking events, hackathons, and research mentorship. You also receive the official IEEE membership which unlocks a vast library of technical publications."
  },
  {
    question: "How do I participate in upcoming events?",
    answer: "You can view all our upcoming initiatives on the 'Latest Activities' page. Members usually receive early-bird registration links via their university email."
  },
  {
    question: "Are there opportunities for leadership roles?",
    answer: "Absolutely! We hold annual elections for Executive Committee positions and constantly recruit volunteers to lead specific events, technical societies, and community outreach programs."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Questions</span>
          </h2>
          <p className="text-slate-600 md:text-lg">
            Everything you need to know about joining and thriving in our student branch.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'border-cyan-200 shadow-md' : 'border-slate-200 hover:border-slate-300 shadow-sm'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-bold text-lg pr-8 transition-colors ${isOpen ? 'text-cyan-600' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-cyan-100 text-cyan-600 rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
