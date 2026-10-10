
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, TESTIMONIALS } from '../constants';

interface HomeProps {
  onBookNow: () => void;
}

const Home: React.FC<HomeProps> = ({ onBookNow }) => {
  const coreServices = SERVICES.filter(s => s.id === 'admin' || s.id === 'bookkeeping' || s.id === 'creative');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setProgress(0);
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setProgress(0);
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const interval = 8000;
    const step = 100;
    const progressTimer = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / (interval / step)), 100));
    }, step);

    const autoTimer = setInterval(nextTestimonial, interval);
    
    return () => {
      clearInterval(progressTimer);
      clearInterval(autoTimer);
    };
  }, [nextTestimonial, activeTestimonial]);

  return (
    <div className="overflow-x-hidden bg-black">
      <section 
        ref={heroRef}
        className="relative min-h-[110vh] flex items-center justify-center px-4 overflow-hidden pt-20"
      >
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-[#ab7e31]/10 rounded-full blur-[160px] animate-float transition-transform duration-75"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          ></div>
          <div 
            className="absolute bottom-1/4 -right-20 w-[40rem] h-[40rem] bg-blue-500/5 rounded-full blur-[160px] animate-float-delayed transition-transform duration-75"
            style={{ transform: `translateY(${scrollY * -0.15}px)` }}
          ></div>
          
          <div 
            className="absolute inset-0 opacity-20 transition-transform duration-150 ease-out"
            style={{ transform: `scale(1.1) translateY(${scrollY * 0.1}px)` }}
          >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
              alt="Elite Workspace" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          </div>
        </div>
        
        <div 
          className="relative z-10 text-center max-w-6xl mx-auto transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <h1 className="reveal text-7xl md:text-8xl lg:text-[10rem] font-black logo-font text-white mb-8 leading-[0.85] tracking-tighter relative">
            <span className="relative inline-block pb-4">
              Black Star
            </span>
            <br />
            <span className="text-[#ab7e31] italic font-light drop-shadow-[0_0_20px_rgba(171,126,49,0.4)] animate-pulse-slow">Specialists</span>
          </h1>
          
          <p className="reveal text-lg md:text-2xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
            We operate as the silent engine behind the world's most innovative founders. 
            High-precision <span className="text-white font-semibold border-b border-[#ab7e31]/30 pb-0.5">Executive Support</span> meets <span className="text-white font-semibold border-b border-[#ab7e31]/30 pb-0.5">Financial Integrity</span>.
          </p>
          
          <div className="reveal flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <Link to="/pricing" className="group w-full sm:w-auto px-12 py-6 bg-white text-black font-black rounded-2xl hover:bg-[#ab7e31] transition-all text-sm uppercase tracking-[0.2em] shadow-xl flex items-center justify-center">
              Explore Plans
              <i className="fas fa-arrow-right ml-4 group-hover:translate-x-2 transition-transform"></i>
            </Link>
            <button 
              onClick={onBookNow}
              className="w-full sm:w-auto px-12 py-6 bg-[#ab7e31] text-black font-black rounded-2xl hover:bg-white transition-all text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(171,126,49,0.2)] group"
            >
              Discovery Call
              <i className="fas fa-phone-alt ml-4 group-hover:scale-110 transition-transform"></i>
            </button>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5 bg-black/40 relative z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 md:gap-24 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700 overflow-hidden whitespace-nowrap group">
           {['FOUNDER', 'CEO', 'PARTNER', 'INVESTOR', 'BUSINESS OWNER'].map((title, idx) => (
             <div key={idx} className="text-2xl md:text-3xl font-black logo-font text-white tracking-[0.3em] flex items-center group-hover:scale-105 transition-transform">
               <i className="fas fa-star text-xs text-[#ab7e31] mr-4"></i> {title}
             </div>
           ))}
        </div>
      </div>

      <section className="py-40 max-w-7xl mx-auto px-4">
        <div className="reveal mb-24">
          <span className="text-[#ab7e31] font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">Precision Services</span>
          <h2 className="text-5xl md:text-7xl logo-font font-black text-white leading-tight">Elite Support, <br /><span className="text-[#ab7e31] italic font-light">Zero Friction</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {coreServices.map((service, i) => (
            <div 
              key={service.id} 
              className="reveal relative p-10 rounded-[3rem] bg-black border border-white/5 hover-glow transition-all duration-500 group overflow-hidden h-[500px] flex flex-col justify-end"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                <img 
                  src={i === 0 ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" : i === 1 ? "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" : "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt={service.title} 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#ab7e31] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#ab7e31]/20 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <i className={`fas ${service.icon} text-2xl text-black`}></i>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[#ab7e31] transition-colors">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-10 font-light group-hover:text-white transition-colors">
                  {service.description}
                </p>
                <Link to="/pricing" className="text-[#ab7e31] font-black text-[10px] uppercase tracking-widest flex items-center group/link">
                  Learn More <i className="fas fa-chevron-right ml-3 group-hover/link:translate-x-1 transition-transform"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-40 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <img 
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Process" 
           />
           <div className="absolute inset-0 bg-black"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="reveal">
              <h2 className="text-5xl md:text-7xl logo-font font-black text-white mb-10 leading-tight">The Black Star <br /><span className="text-[#ab7e31] italic font-light">Ecosystem</span></h2>
              <div className="space-y-12">
                {[
                  { 
                    title: "Anticipatory Logic", 
                    desc: "We don't wait for instructions. We predict your needs based on historical patterns and business cycles.",
                    icon: "fa-bolt"
                  },
                  { 
                    title: "Bulletproof Security", 
                    desc: "Enterprise-level encryption and internal protocols ensure your data remains your data.",
                    icon: "fa-shield-halved"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex group">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mr-8 group-hover:bg-[#ab7e31] transition-all duration-500">
                      <i className={`fas ${item.icon} text-[#ab7e31] group-hover:text-black text-xl`}></i>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ab7e31] transition-colors">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="reveal relative">
               <div className="aspect-square bg-white/5 border border-white/10 rounded-[4rem] p-12 flex items-center justify-center relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ab7e31]/10 to-transparent"></div>
                  <div className="text-center relative z-10">
                    <div className="text-[10rem] font-black logo-font text-[#ab7e31] leading-none mb-4 group-hover:scale-110 transition-transform duration-700">0.1%</div>
                    <p className="text-white font-bold uppercase tracking-[0.5em] text-xs">Selection Rate</p>
                    <p className="text-gray-500 mt-6 max-w-xs mx-auto text-sm font-light">We only recruit the absolute top tier of professionals globally.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-60 px-4 bg-black relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="reveal mb-24">
             <span className="text-[#ab7e31] font-black tracking-[0.6em] uppercase text-[10px] mb-4 block">Client Perspectives</span>
             <h2 className="text-5xl md:text-7xl logo-font font-black text-white leading-tight">Trust of the <br /><span className="text-[#ab7e31] italic font-light">Visionaries</span></h2>
          </div>

          <div className="reveal relative h-[450px]">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform flex flex-col items-center justify-center ${
                  idx === activeTestimonial 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
                }`}
              >
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-16 animate-float">
                  <i className="fas fa-quote-left text-[#ab7e31] text-2xl"></i>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif text-white italic leading-tight mb-16 px-4">
                  "{testimonial.text}"
                </h2>
                <div className="flex items-center space-x-6">
                  <img 
                    src={testimonial.img} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-2xl border-2 border-[#ab7e31] object-cover shadow-lg shadow-[#ab7e31]/20" 
                  />
                  <div className="text-left">
                    <p className="text-white font-black tracking-[0.2em] uppercase text-[12px]">{testimonial.name}</p>
                    <p className="text-[#ab7e31] text-[10px] mt-1 font-bold tracking-[0.2em] uppercase">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal flex items-center justify-center space-x-12 mt-20 relative">
            <button onClick={prevTestimonial} className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#ab7e31] hover:border-[#ab7e31] transition-all group active:scale-95">
              <i className="fas fa-arrow-left group-hover:-translate-x-2 transition-transform"></i>
            </button>
            
            <div className="flex flex-col items-center space-y-6 flex-grow max-w-xs">
              <div className="flex space-x-2 justify-center">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTestimonial(idx);
                      setProgress(0);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === activeTestimonial ? 'bg-[#ab7e31] w-8' : 'bg-white/10 w-1.5 hover:bg-white/30'
                    }`}
                  />
                ))}
              </div>
              
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#ab7e31]/40 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                {activeTestimonial + 1} <span className="mx-2">/</span> {TESTIMONIALS.length}
              </div>
            </div>

            <button onClick={nextTestimonial} className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#ab7e31] hover:border-[#ab7e31] transition-all group active:scale-95">
              <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="py-40 px-4">
        <div className="reveal max-w-7xl mx-auto glass p-16 md:p-32 rounded-[5rem] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#ab7e31]/5 group-hover:bg-[#ab7e31]/10 transition-colors"></div>
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000')] bg-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-[10s]"></div>
          
          <div className="relative z-10">
             <h2 className="text-5xl md:text-[6rem] logo-font font-black text-white mb-10 leading-none">Your Next Move is <br /><span className="text-[#ab7e31] italic font-light drop-shadow-xl">Legendary</span></h2>
             <p className="text-gray-400 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
               Strategic leverage for world-class founders. Are you ready to operate at your highest potential?
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                <button 
                  onClick={onBookNow}
                  className="px-14 py-6 bg-[#ab7e31] text-black font-black rounded-2xl hover:bg-white transition-all text-sm tracking-[0.3em] uppercase hover:scale-105 shadow-2xl"
                >
                  Discovery Call
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
