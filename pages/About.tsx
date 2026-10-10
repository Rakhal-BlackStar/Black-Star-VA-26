
import React, { useState, useEffect } from 'react';

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="animate-fade-in overflow-hidden bg-black relative">
      {/* Deep Background Parallax Layer */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.07] transition-transform duration-300 ease-out will-change-transform"
        style={{ transform: `scale(1.2) translateY(${scrollY * 0.15}px)` }}
      >
         <img 
          src="https://images.unsplash.com/photo-1449156003053-c306a5bb8117?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover grayscale" 
          alt="Abstract Architecture" 
         />
      </div>

      {/* Floating Particles/Dust Layer (Subtle Depth) */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[#ab7e31]/10 blur-xl animate-pulse-slow will-change-transform"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${i * 20}%`,
              left: `${(i % 2 === 0 ? 10 : 80)}%`,
              transform: `translateY(${scrollY * (0.05 + i * 0.02)}px)`,
              transition: 'transform 0.4s ease-out'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
        {/* Hero Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-60 pt-10">
           <div 
             className="reveal transition-transform duration-500 ease-out will-change-transform"
             style={{ transform: `translateY(${scrollY * -0.1}px)` }}
           >
              <span className="text-[#ab7e31] font-black tracking-[0.6em] uppercase text-[10px] mb-6 block">The Narrative</span>
              <h1 className="text-6xl md:text-8xl logo-font font-black text-white mb-10 leading-tight">
                Built for <br /><span className="text-[#ab7e31] italic font-light">Impact.</span>
              </h1>
              <div className="space-y-8 text-gray-400 text-lg md:text-xl leading-relaxed font-light">
                <p>
                  <span className="text-white font-bold">Black Star VA</span> was born in Texas with a simple philosophy: The greatest minds shouldn't be bogged down by the mundane.
                </p>
                <p>
                  We are a boutique agency designed for the top 1%. We don't just provide "assistants"—we provide <span className="text-[#ab7e31] font-medium">Strategic Partners</span> who operate with the same intensity and precision as the leaders they support.
                </p>
                <p>
                  Our DNA is rooted in integrity, absolute discretion, and a proactive "Anticipatory Logic" that eliminates operational drag before it starts.
                </p>
              </div>
           </div>
           
           <div className="reveal relative flex justify-center items-center h-[600px]">
              {/* Central Glow Aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ab7e31]/10 rounded-full blur-[100px] animate-pulse-slow"></div>
              
              {/* Main Image Card with Reverse Parallax */}
              <div 
                className="relative z-10 w-full max-w-md aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8)] group transition-all duration-700 ease-out will-change-transform"
                style={{ transform: `translateY(${scrollY * 0.12}px)` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                  alt="Aria - Strategic Excellence" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 right-10 p-3 glass rounded-xl border-[#ab7e31]/20 animate-float">
                    <i className="fas fa-calendar-check text-[#ab7e31] text-sm"></i>
                  </div>
                  <div className="absolute bottom-1/4 left-10 p-3 glass rounded-xl border-blue-500/20 animate-float-delayed">
                    <i className="fas fa-file-invoice-dollar text-blue-400 text-sm"></i>
                  </div>
                </div>
              </div>

              {/* Floating Badge with Faster Parallax */}
              <div 
                className="absolute -bottom-10 -right-10 w-64 h-64 glass p-10 rounded-[3rem] border-[#ab7e31]/30 flex flex-col justify-center animate-float transition-transform duration-300 ease-out z-20 will-change-transform"
                style={{ transform: `translateY(${scrollY * -0.2}px)` }}
              >
                 <div className="text-4xl font-black text-[#ab7e31] logo-font mb-2 tracking-tighter italic">Precision</div>
                 <p className="text-white font-bold text-[10px] uppercase tracking-widest leading-tight">Elite Anticipatory Logic Engine</p>
              </div>

              {/* Individual Floating Tech Icons */}
              <div className="absolute inset-0 pointer-events-none z-30">
                 <div 
                    className="absolute top-20 left-0 w-12 h-12 bg-black border border-white/10 rounded-2xl flex items-center justify-center animate-float shadow-xl transition-transform duration-300 ease-out will-change-transform"
                    style={{ transform: `translateY(${scrollY * -0.05}px)` }}
                 >
                   <i className="fab fa-slack text-[#ab7e31]"></i>
                 </div>
                 <div 
                    className="absolute top-0 right-20 w-10 h-10 bg-black border border-white/10 rounded-2xl flex items-center justify-center animate-float-delayed shadow-xl transition-transform duration-300 ease-out will-change-transform"
                    style={{ transform: `translateY(${scrollY * 0.08}px)` }}
                 >
                   <i className="fas fa-bolt text-blue-400 text-xs"></i>
                 </div>
                 <div 
                    className="absolute bottom-40 right-0 w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center animate-float shadow-xl transition-transform duration-300 ease-out will-change-transform"
                    style={{ transform: `translateY(${scrollY * -0.15}px)` }}
                 >
                   <i className="fas fa-chart-line text-green-400"></i>
                 </div>
              </div>
           </div>
        </div>

        {/* Ethos Section */}
        <div className="mb-60">
           <div 
             className="reveal text-center mb-24 transition-transform duration-500 ease-out will-change-transform"
             style={{ transform: `translateY(${scrollY * 0.05}px)` }}
           >
              <h2 className="text-5xl md:text-7xl logo-font font-black text-white mb-8">Our Core <span className="text-[#ab7e31] italic font-light">Ethos</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-light">The standards we uphold in every single task, project, and financial report.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { 
                  title: "Absolute Discretion", 
                  desc: "We operate in the shadows. Your business privacy is our most sacred priority.",
                  icon: "fa-shield-halved",
                  img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
                  speed: 0.08
                },
                { 
                  title: "Radical Ownership", 
                  desc: "We don't 'try' to find answers. We own the outcome from request to completion.",
                  icon: "fa-rocket",
                  img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
                  speed: 0.12
                },
                { 
                  title: "Elite Precision", 
                  desc: "Every decimal place in your P&L and every minute in your calendar is managed with obsessive care.",
                  icon: "fa-microchip",
                  img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=600",
                  speed: 0.16
                }
              ].map((value, idx) => (
                <div 
                  key={idx} 
                  className="reveal group h-full transition-transform duration-500 ease-out will-change-transform"
                  style={{ transform: `translateY(${(scrollY - 1000) * -value.speed}px)` }}
                >
                  <div className="glass h-full p-12 rounded-[3rem] border-white/5 hover-glow transition-all duration-700 relative overflow-hidden flex flex-col justify-between group-hover:border-[#ab7e31]/30">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
                       <img src={value.img} className="w-full h-full object-cover grayscale" alt={value.title} />
                    </div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-[#ab7e31] rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform shadow-lg shadow-[#ab7e31]/20">
                        <i className={`fas ${value.icon} text-2xl text-black`}></i>
                      </div>
                      <h3 className="text-3xl font-black logo-font text-white mb-6 uppercase tracking-widest group-hover:text-[#ab7e31] transition-colors">{value.title}</h3>
                      <p className="text-gray-400 text-lg font-light leading-relaxed group-hover:text-white transition-colors duration-500">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Culture CTA Section */}
        <div 
          className="reveal relative glass p-16 md:p-32 rounded-[5rem] overflow-hidden border-white/10 group transition-all duration-700 ease-out will-change-transform shadow-2xl"
          style={{ transform: `translateY(${(scrollY - 2000) * 0.08}px)` }}
        >
           <div 
             className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000')] opacity-5 group-hover:opacity-10 transition-transform duration-[10s] bg-cover will-change-transform"
             style={{ transform: `scale(1.3) translateY(${(scrollY - 2000) * -0.1}px)` }}
           ></div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
              <div className="lg:col-span-2">
                 <h2 className="text-5xl md:text-7xl logo-font font-black text-white mb-10 leading-tight">The <span className="text-[#ab7e31]">Culture</span> of Excellence.</h2>
                 <p className="text-gray-400 text-xl font-light leading-relaxed mb-10">
                   Our specialists aren't just remote workers; they are highly trained strategic partners. 
                   We invest in continuous training, security protocols, and Texas-style work ethics 
                   to ensure we deliver unmatched value every day.
                 </p>
                 <div className="flex flex-wrap gap-8">
                    {[
                      { label: "Elite Retention", value: "98%" },
                      { label: "Texas Based", value: "100%" },
                      { label: "Uptime Support", value: "24/7" }
                    ].map((stat, i) => (
                      <div key={i} className="text-left group/stat">
                        <div className="text-4xl font-black text-[#ab7e31] logo-font group-hover/stat:scale-110 transition-transform">{stat.value}</div>
                        <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{stat.label}</div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex justify-center">
                 <div 
                   className="w-48 h-48 bg-[#ab7e31] rounded-full flex items-center justify-center relative animate-float transition-transform duration-700 ease-out will-change-transform shadow-[0_0_50px_rgba(171,126,49,0.4)]"
                   style={{ transform: `rotate(${scrollY * 0.08}deg)` }}
                 >
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/20 animate-[spin_20s_linear_infinite]"></div>
                    <i className="fas fa-star text-black text-6xl"></i>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
