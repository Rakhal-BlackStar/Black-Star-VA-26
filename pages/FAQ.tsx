
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="py-20 animate-fade-in bg-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#ab7e31] font-bold tracking-widest uppercase text-xs">Support Center</span>
          <h1 className="text-4xl md:text-6xl logo-font font-black text-white mt-4 mb-6">Frequently Asked</h1>
          <p className="text-gray-400">Everything you need to know about partnering with Black Star Va.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl transition-all overflow-hidden ${
                activeIndex === idx ? 'border-[#ab7e31] bg-black/40' : 'border-white/10 bg-black'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-bold text-white">{faq.question}</span>
                <i className={`fas ${activeIndex === idx ? 'fa-minus' : 'fa-plus'} text-[#ab7e31]`}></i>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  activeIndex === idx ? 'max-h-96 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <p className="text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 glass p-10 rounded-[2.5rem] text-center border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-8 font-light">Our dedicated team is standing by to provide the strategic clarity and support you need.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:support@blackstarva.com" className="w-full sm:w-auto px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-[#ab7e31] transition-all flex items-center justify-center">
              <i className="fas fa-envelope mr-2"></i> support@blackstarva.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
