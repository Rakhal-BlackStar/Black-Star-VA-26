
import React, { useState, useRef } from 'react';

const Careers: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 3;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (submitted) {
    return (
      <div className="py-40 animate-fade-in flex flex-col items-center justify-center text-center px-4 bg-black min-h-screen">
        <div className="w-24 h-24 bg-[#ab7e31]/20 rounded-full flex items-center justify-center mb-8 border border-[#ab7e31]/30 shadow-[0_0_30px_rgba(171,126,49,0.2)]">
          <i className="fas fa-check text-4xl text-[#ab7e31]"></i>
        </div>
        <h1 className="text-4xl md:text-5xl logo-font font-black text-white mb-6">Application Staged</h1>
        <p className="text-gray-400 text-lg max-w-lg mx-auto font-light mb-12 leading-relaxed">
          Thank you for applying to the Black Star elite network. Our recruitment team reviews candidates based on technical precision and strategic logic. Expect a response within 3-5 business days.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-[#ab7e31] transition-all shadow-xl shadow-[#ab7e31]/10"
        >
          Return to Careers
        </button>
      </div>
    );
  }

  return (
    <div className="py-24 animate-fade-in bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-[#ab7e31]/10 border border-[#ab7e31]/20 rounded-full text-[#ab7e31] font-bold tracking-[0.3em] uppercase text-[9px] mb-6">
            Recruiting the Top 0.1%
          </span>
          <h1 className="text-5xl md:text-7xl logo-font font-black text-white mt-4 mb-8 leading-tight">
            Careers at <br /><span className="text-[#ab7e31] italic font-light">Black Star</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            We are looking for individuals who view themselves as strategic partners, not task-takers. Join the Texas-based agency setting the global standard for elite support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
            <div className="glass p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <i className="fas fa-star text-7xl text-[#ab7e31]"></i>
              </div>
              <h2 className="text-2xl font-black logo-font text-white mb-8 uppercase tracking-widest">Candidate Perks</h2>
              <div className="space-y-8">
                {[
                  { title: "Remote Autonomy", desc: "Work from anywhere while supporting world-class founders.", icon: "fa-globe-americas" },
                  { title: "High-Tier Projects", desc: "Gain exposure to complex business operations and strategic finance.", icon: "fa-shield-halved" },
                  { title: "Texas Work Ethic", desc: "Be part of a team that values reliability, integrity, and proactive results.", icon: "fa-bolt" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start group">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mr-4 border border-white/10 group-hover:bg-[#ab7e31]/20 group-hover:border-[#ab7e31]/50 transition-all shrink-0">
                      <i className={`fas ${item.icon} text-[#ab7e31] text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-[#ab7e31]/5 border border-[#ab7e31]/10 rounded-[2.5rem]">
              <h3 className="text-[#ab7e31] font-black text-[10px] uppercase tracking-[0.3em] mb-4">Logistics Notice</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light mb-4">
                Black Star VA operates exclusively on <span className="text-white font-bold underline underline-offset-4 decoration-[#ab7e31]/50">1099 Independent Contractor</span> agreements.
              </p>
              <div className="flex items-center text-[9px] text-[#ab7e31]/60 font-black uppercase tracking-widest">
                <i className="fas fa-file-contract mr-2"></i>
                <span>Contract-to-Partnership Model</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="glass p-8 md:p-14 rounded-[3.5rem] border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-black">
                <div 
                  className="h-full bg-[#ab7e31] transition-all duration-700 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col">
                  <span className="text-[#ab7e31] font-black text-[10px] uppercase tracking-widest mb-1">Step {currentStep} of {totalSteps}</span>
                  <h3 className="text-2xl font-black logo-font text-white uppercase tracking-widest">
                    {currentStep === 1 ? "Identity & Specialist Selection" : currentStep === 2 ? "Strategic Logic Assessment" : "Verification & Submission"}
                  </h3>
                </div>
                <div className="hidden sm:flex space-x-2">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className={`w-3 h-3 rounded-full border ${currentStep >= s ? 'bg-[#ab7e31] border-[#ab7e31]' : 'bg-transparent border-white/20'}`}></div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {currentStep === 1 && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Legal Full Name</label>
                        <input required type="text" className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#ab7e31]/50 placeholder:text-gray-800 transition-all font-medium" placeholder="E.g. Jane Doe" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Primary Email</label>
                        <input required type="email" className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#ab7e31]/50 placeholder:text-gray-800 transition-all font-medium" placeholder="jane.doe@example.com" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Core Specialty</label>
                      <select required className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#ab7e31]/50 appearance-none font-bold">
                        <option value="">Select your primary expertise...</option>
                        <option value="ea">Executive Assistant</option>
                        <option value="bookkeeper">Precision Bookkeeper</option>
                      </select>
                    </div>

                    <div className="pt-6">
                      <button type="button" onClick={nextStep} className="w-full py-5 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-[#ab7e31] transition-all shadow-xl shadow-[#ab7e31]/10">
                        Continue to Core Assessment <i className="fas fa-chevron-right ml-2"></i>
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-8 animate-fade-in max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                    <div className="p-4 bg-[#ab7e31]/5 border border-[#ab7e31]/10 rounded-xl mb-6">
                      <p className="text-[9px] text-[#ab7e31] font-bold uppercase tracking-widest text-center">Focus on brief, high-impact responses.</p>
                    </div>

                    <div className="space-y-10">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="space-y-3">
                          <label className="block text-xs font-bold text-white tracking-wide">Question {num} Evaluation...</label>
                          <textarea rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#ab7e31]/30 outline-none font-light leading-relaxed"></textarea>
                        </div>
                      ))}
                    </div>

                    <div className="pt-10 flex space-x-4">
                      <button type="button" onClick={prevStep} className="w-1/3 py-5 glass text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white/5 border border-white/10 transition-all">
                        Back
                      </button>
                      <button type="button" onClick={nextStep} className="flex-grow py-5 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-[#ab7e31] transition-all shadow-xl shadow-[#ab7e31]/10">
                        Continue to Verification
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-8 animate-fade-in">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">LinkedIn Profile URL</label>
                      <input required type="url" placeholder="https://linkedin.com/in/..." className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#ab7e31]/50 transition-all font-medium" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Resume Upload</label>
                      <div className="relative group">
                        <input 
                          ref={fileInputRef}
                          required
                          type="file" 
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`w-full border-2 border-dashed rounded-2xl py-10 text-center transition-all ${fileName ? 'bg-[#ab7e31]/5 border-[#ab7e31]/50' : 'bg-black/50 border-white/10 group-hover:border-[#ab7e31]/30'}`}>
                          <i className={`fas ${fileName ? 'fa-file-alt text-[#ab7e31]' : 'fa-cloud-upload-alt text-gray-700'} text-3xl mb-3`}></i>
                          <p className={`text-xs font-bold uppercase tracking-widest ${fileName ? 'text-white' : 'text-gray-600'}`}>
                            {fileName ? fileName : 'Click to select resume'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 flex space-x-4">
                      <button type="button" onClick={prevStep} className="w-1/3 py-5 glass text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white/5 border border-white/10 transition-all">
                        Back
                      </button>
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-grow py-6 bg-[#ab7e31] text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl shadow-[#ab7e31]/20 flex items-center justify-center disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>Submit Elite Application <i className="fas fa-paper-plane ml-3"></i></>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
