import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import heroOpsImg from '../src/assets/images/services_hero_operations_1791573109911.jpg';
import leadershipCollabImg from '../src/assets/images/executive_leadership_collab_1791573096951.jpg';

interface ServicesProps {
  onBookNow: () => void;
}

const Services: React.FC<ServicesProps> = ({ onBookNow }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'all' | 'ea' | 'finance'>('all');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const filteredServices = SERVICES.filter((s) => {
    if (activeTab === 'ea') return s.id === 'admin' || s.id === 'executive' || s.id === 'creative';
    if (activeTab === 'finance') return s.id === 'bookkeeping' || s.id === 'operations';
    return true;
  });

  return (
    <div className="bg-black min-h-screen overflow-x-hidden relative selection:bg-[#ab7e31] selection:text-black">
      
      {/* Dynamic Animated Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute -top-32 -left-32 w-[38rem] h-[38rem] bg-[#ab7e31]/15 rounded-full blur-[140px] animate-ambient-glow"
          style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }}
        />
        <div 
          className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] bg-[#ab7e31]/10 rounded-full blur-[160px] animate-ambient-glow"
          style={{ 
            animationDelay: '-5s',
            transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px)` 
          }}
        />
        <div 
          className="absolute -bottom-32 left-1/4 w-[36rem] h-[36rem] bg-amber-600/10 rounded-full blur-[150px] animate-ambient-glow"
          style={{ 
            animationDelay: '-9s',
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` 
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* HERO SECTION with Top-Right Visual & Fluid Motion        */}
      {/* ========================================================= */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Hero Column */}
          <div 
            className="lg:col-span-7 space-y-8 transition-transform duration-300 ease-out"
            style={{ transform: `translateY(${scrollY * 0.04}px)` }}
          >
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#ab7e31]/10 border border-[#ab7e31]/30 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ab7e31] animate-ping"></span>
              <span className="text-[#ab7e31] font-black tracking-[0.35em] uppercase text-[10px]">
                100% US-Based Operations
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] logo-font font-black text-white leading-[1.05] tracking-tight">
              Precision <span className="text-[#ab7e31] italic font-light drop-shadow-[0_0_35px_rgba(171,126,49,0.35)]">Leverage</span> <br className="hidden sm:inline" />
              For Visionaries
            </h1>

            {/* Target Requirement Text */}
            <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
              Get high-caliber, 100% US-based executive support and/or bookkeeping tailored to your exact workflow. Scale your hours up or down with complete transparency and zero guesswork.
            </p>

            {/* Action Buttons with Interactive Hover Micro-Motion */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onBookNow}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#ab7e31] text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all duration-300 shadow-xl shadow-[#ab7e31]/20 hover:scale-105 active:scale-95 group"
              >
                <i className="fas fa-calendar-alt mr-3 text-sm group-hover:rotate-12 transition-transform duration-300"></i>
                <span>Book Discovery Call</span>
              </button>

              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white hover:text-[#ab7e31] border border-white/15 hover:border-[#ab7e31]/50 font-bold text-xs uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 group backdrop-blur-sm"
              >
                <i className="fas fa-coins mr-3 text-sm text-[#ab7e31] group-hover:scale-110 transition-transform"></i>
                <span>Explore Retainers & Pricing</span>
              </Link>
            </div>

            {/* Quick Metrics Ticker */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div className="group">
                <div className="text-2xl font-black text-[#ab7e31] logo-font group-hover:translate-x-1 transition-transform">$40<span className="text-xs font-normal text-gray-400">/hr</span></div>
                <div className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Executive Assistants</div>
              </div>
              <div className="group">
                <div className="text-2xl font-black text-white logo-font group-hover:translate-x-1 transition-transform">$55<span className="text-xs font-normal text-gray-400">/hr</span></div>
                <div className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Dedicated Bookkeeping</div>
              </div>
              <div className="group">
                <div className="text-2xl font-black text-[#ab7e31] logo-font group-hover:translate-x-1 transition-transform">100%</div>
                <div className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">US-Based Talent</div>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Premium Visual with Floating Live Cards and Parallax Drift */}
          <div 
            className="lg:col-span-5 relative"
            style={{ 
              transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5 + scrollY * -0.05}px)` 
            }}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Golden Aura Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#ab7e31]/30 via-amber-500/10 to-[#ab7e31]/20 rounded-[3rem] blur-2xl opacity-70 animate-pulse-slow"></div>

              {/* Main Image Frame with Smooth Hover Tilt */}
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl bg-gradient-to-b from-white/10 to-black/90 group">
                <img
                  src={leadershipCollabImg}
                  alt="High-caliber executive leadership and virtual assistant partnership in modern luxury office"
                  className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none"></div>

                {/* Floating Top Badge with Live Dot */}
                <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center space-x-2 shadow-lg animate-drift">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Active Delegation</span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/85 backdrop-blur-xl border border-[#ab7e31]/30 flex items-center space-x-3.5 shadow-2xl transition-all duration-300 group-hover:border-[#ab7e31]/60">
                  <div className="w-11 h-11 rounded-xl bg-[#ab7e31]/20 flex items-center justify-center shrink-0 border border-[#ab7e31]/40 text-[#ab7e31]">
                    <i className="fas fa-chess-queen text-lg animate-bounce" style={{ animationDuration: '3s' }}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-white uppercase tracking-wider truncate">Executive Synergy</div>
                    <div className="text-[11px] text-gray-400 truncate">Tailored delegation built around high-growth priorities</div>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-[#ab7e31]/20 text-[#ab7e31] text-[10px] font-black uppercase">Top 1%</span>
                </div>
              </div>

              {/* Floating Decorative Glass Mini-Card (adds dynamic depth) */}
              <div 
                className="hidden sm:flex absolute -bottom-6 -right-6 glass p-4 rounded-2xl border-white/15 shadow-2xl items-center space-x-3 animate-drift z-20"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm border border-emerald-500/30">
                  <i className="fas fa-bolt"></i>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider">Fast Matching</div>
                  <div className="text-[10px] text-gray-400">Deploy within 48-72 hours</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* INTERACTIVE SERVICE FILTER TABS & SERVICE TILES GRID     */}
      {/* ========================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        
        {/* Section Header with Motion Accents */}
        <div className="reveal text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#ab7e31] font-black tracking-[0.45em] uppercase text-[10px] block">
            End-To-End Delegation
          </span>
          <h2 className="text-4xl md:text-6xl logo-font font-black text-white tracking-tight">
            Specialized <span className="text-[#ab7e31] italic font-light">Services</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
            Eliminate operational friction. Whether you require calendar defense, deep financial clarity, or high-touch executive support, Black Star VA handles it with surgical precision.
          </p>

          {/* Filter Pills with Springy Transitions */}
          <div className="pt-6 inline-flex p-1.5 rounded-2xl glass border border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-[#ab7e31] text-black shadow-md shadow-[#ab7e31]/20 scale-105'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveTab('ea')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'ea'
                  ? 'bg-[#ab7e31] text-black shadow-md shadow-[#ab7e31]/20 scale-105'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Executive Assistants ($40/hr)
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'finance'
                  ? 'bg-[#ab7e31] text-black shadow-md shadow-[#ab7e31]/20 scale-105'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Bookkeeping ($55/hr)
            </button>
          </div>
        </div>

        {/* Services Grid with Hover Scale & Glowing Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((s, i) => (
            <div 
              key={s.id} 
              className="reveal glass group p-8 sm:p-10 rounded-[2.5rem] border-white/10 hover:border-[#ab7e31]/50 transition-all duration-500 flex flex-col h-full hover:-translate-y-3 relative overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(171,126,49,0.25)] bg-gradient-to-b from-white/[0.04] to-transparent"
              style={{ 
                transitionDelay: `${i * 60}ms`,
                transform: `translateY(${(scrollY - 400) * (i % 2 === 0 ? -0.015 : 0.015)}px)` 
              }}
            >
              {/* Header Icon + Starting Rate Badge */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 bg-gradient-to-tr from-[#ab7e31] to-amber-300 rounded-2xl flex items-center justify-center shadow-lg shadow-[#ab7e31]/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <i className={`fas ${s.icon} text-2xl text-black`}></i>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#ab7e31]/40 transition-colors">
                  <span className="text-[11px] font-black text-[#ab7e31] uppercase tracking-wider">
                    ${s.priceRate || (s.id === 'bookkeeping' ? 55 : 40)}/hr
                  </span>
                </div>
              </div>
              
              {/* Card Title */}
              <h3 className="text-2xl font-black logo-font text-white mb-4 uppercase tracking-widest group-hover:text-[#ab7e31] transition-colors duration-300">
                {s.title}
              </h3>
              
              {/* Card Description */}
              <p className="text-gray-400 font-light leading-relaxed mb-6 transition-colors duration-300 group-hover:text-gray-200 text-sm">
                {s.description}
              </p>
              
              {/* Expanding Feature Highlights */}
              <div className="flex-grow flex flex-col justify-end pt-4">
                <div className="h-px bg-white/10 w-full mb-6 group-hover:bg-[#ab7e31]/30 transition-colors duration-300"></div>
                
                <ul className="space-y-3 mb-8">
                  {s.id === 'bookkeeping' ? (
                    <>
                      <li className="flex items-center text-[11px] font-semibold text-gray-300">
                        <i className="fas fa-check text-[#ab7e31] mr-3 text-xs"></i> Accounts Payable & Receivable
                      </li>
                      <li className="flex items-center text-[11px] font-semibold text-gray-300">
                        <i className="fas fa-check text-[#ab7e31] mr-3 text-xs"></i> Monthly P&L and Balance Sheet Reconciliation
                      </li>
                      <li className="flex items-center text-[11px] font-semibold text-gray-300">
                        <i className="fas fa-check text-[#ab7e31] mr-3 text-xs"></i> QuickBooks Online & Xero Certified
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center text-[11px] font-semibold text-gray-300">
                        <i className="fas fa-check text-[#ab7e31] mr-3 text-xs"></i> Executive Calendar & Inbox Defense
                      </li>
                      <li className="flex items-center text-[11px] font-semibold text-gray-300">
                        <i className="fas fa-check text-[#ab7e31] mr-3 text-xs"></i> Workflow Automation & SOP Building
                      </li>
                      <li className="flex items-center text-[11px] font-semibold text-gray-300">
                        <i className="fas fa-check text-[#ab7e31] mr-3 text-xs"></i> 100% US-Based, Native Timezone Coverage
                      </li>
                    </>
                  )}
                </ul>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onBookNow}
                    className="flex-1 py-3.5 px-4 bg-[#ab7e31] hover:bg-white text-black font-black rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-[#ab7e31]/10 flex items-center justify-center space-x-2 group/btn"
                  >
                    <span>Book Discovery</span>
                    <i className="fas fa-arrow-right text-[10px] group-hover/btn:translate-x-1 transition-transform"></i>
                  </button>
                  <Link
                    to="/pricing"
                    className="py-3.5 px-4 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-bold rounded-xl text-[10px] uppercase tracking-wider transition-colors border border-white/10"
                  >
                    Pricing
                  </Link>
                </div>
              </div>

              {/* Decorative Glow Orb */}
              <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#ab7e31]/15 blur-[90px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* OPERATIONS SHOWCASE BANNER (High Visual Momentum)        */}
      {/* ========================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        <div className="relative rounded-[3rem] overflow-hidden border border-white/15 bg-gradient-to-r from-black via-zinc-950 to-black p-8 sm:p-14 lg:p-16 shadow-2xl">
          
          {/* Background image overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img 
              src={heroOpsImg} 
              alt="Operations hub background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-[#ab7e31] font-black uppercase text-[10px] tracking-[0.4em] block">
                Integrated Operational Command
              </span>
              <h2 className="text-3xl sm:text-5xl font-black logo-font text-white tracking-tight leading-tight">
                Pair Executive Assistants & Bookkeepers <br />
                <span className="text-[#ab7e31] italic font-light">Under One Flexible Retainer</span>
              </h2>
              <p className="text-gray-300 font-light text-base sm:text-lg max-w-2xl leading-relaxed">
                No rigid packages. Blend high-leverage EA strategy at $40/hour with precise bookkeeping at $55/hour to fit your company's evolving needs every single month.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={onBookNow}
                  className="px-8 py-4 bg-[#ab7e31] text-black font-black rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl shadow-[#ab7e31]/20 hover:scale-105 active:scale-95"
                >
                  Schedule Strategy Call
                </button>
                <Link
                  to="/pricing"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs uppercase tracking-[0.2em] transition-all border border-white/15 hover:scale-105 active:scale-95"
                >
                  Calculate Your Budget
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="glass p-5 rounded-2xl border-white/10 space-y-2 hover:border-[#ab7e31]/40 transition-all duration-300 hover:translate-x-1">
                <div className="flex items-center space-x-3 text-white">
                  <i className="fas fa-shield-alt text-[#ab7e31]"></i>
                  <span className="font-bold text-sm">Full US Compliance & Security</span>
                </div>
                <p className="text-xs text-gray-400">Strict NDAs, US labor law alignment, and bank-grade confidentiality.</p>
              </div>

              <div className="glass p-5 rounded-2xl border-white/10 space-y-2 hover:border-[#ab7e31]/40 transition-all duration-300 hover:translate-x-1">
                <div className="flex items-center space-x-3 text-white">
                  <i className="fas fa-sync-alt text-[#ab7e31]"></i>
                  <span className="font-bold text-sm">Month-to-Month Scalability</span>
                </div>
                <p className="text-xs text-gray-400">After an initial 3-month term, adjust your talent budget dynamically.</p>
              </div>

              <div className="glass p-5 rounded-2xl border-white/10 space-y-2 hover:border-[#ab7e31]/40 transition-all duration-300 hover:translate-x-1">
                <div className="flex items-center space-x-3 text-white">
                  <i className="fas fa-users-cog text-[#ab7e31]"></i>
                  <span className="font-bold text-sm">Dedicated Success Management</span>
                </div>
                <p className="text-xs text-gray-400">Continuous delegation auditing and weekly quality assurance checks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* THE METHOD: 4-Pillar Animated Process Pipeline            */}
      {/* ========================================================= */}
      <section className="py-32 bg-black/60 border-y border-white/5 relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-500 ease-out"
          style={{ transform: `translateY(${(scrollY - 1500) * 0.08}px)` }}
        >
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ab7e31]/10 blur-[130px] rounded-full"></div>
          <div className="absolute bottom-1/2 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal text-center mb-20 space-y-4">
            <span className="text-[#ab7e31] font-black uppercase text-[10px] tracking-[0.45em] block">
              Proven Playbook
            </span>
            <h2 className="text-4xl md:text-6xl logo-font font-black text-white">
              The <span className="text-[#ab7e31] italic font-light">Method</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto font-light text-base">
              Our four-pillar approach to seamless operational partnership and frictionless delegation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ab7e31]/30 to-transparent -translate-y-1/2 pointer-events-none"></div>
            
            {[
              { step: "01", title: "Diagnostic", desc: "We audit your current friction points, calendar drag, and financial workflows during onboarding.", speed: -0.03, icon: "fa-search" },
              { step: "02", title: "Allocation", desc: "You are matched with a dedicated US specialist rigorously vetted for your industry scope.", speed: 0.03, icon: "fa-user-check" },
              { step: "03", title: "Integration", desc: "Seamless plug-and-play onboarding into your existing Slack, Notion, GSuite, or QuickBooks.", speed: -0.03, icon: "fa-plug" },
              { step: "04", title: "Evolution", desc: "Proactive delegation audits that scale your budget and talent hours alongside company growth.", speed: 0.03, icon: "fa-chart-line" }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="reveal relative z-10 glass p-8 rounded-[2.5rem] border-white/5 text-center group hover:border-[#ab7e31]/50 transition-all duration-500 hover:-translate-y-2 bg-gradient-to-b from-white/[0.03] to-transparent shadow-xl"
                style={{ transform: `translateY(${(scrollY - 1800) * item.speed}px)` }}
              >
                <div className="w-12 h-12 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ab7e31] group-hover:scale-110 group-hover:bg-[#ab7e31] group-hover:text-black transition-all duration-300">
                  <i className={`fas ${item.icon} text-lg`}></i>
                </div>
                <div className="text-5xl font-black logo-font text-white/10 mb-3 group-hover:text-[#ab7e31]/20 transition-colors">{item.step}</div>
                <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider group-hover:text-[#ab7e31] transition-colors">{item.title}</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* UNIVERSAL INTEGRATIONS: Floating Animated Brand Icons     */}
      {/* ========================================================= */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div 
          className="reveal max-w-5xl mx-auto glass p-12 sm:p-20 md:p-28 rounded-[4rem] border-white/10 relative overflow-hidden text-center transition-transform duration-500 ease-out shadow-2xl"
          style={{ transform: `translateY(${(scrollY - 2500) * 0.04}px)` }}
        >
          <div className="reveal space-y-6">
            <span className="text-[#ab7e31] font-black uppercase text-[10px] tracking-[0.4em] block">
              Native Tech Stack
            </span>
            <h2 className="text-4xl md:text-6xl logo-font font-black text-white leading-tight">
              Universal <span className="text-[#ab7e31] italic font-light">Integration</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-14 font-light max-w-2xl mx-auto leading-relaxed">
              We never ask you to change your stack. We integrate directly into your universe. Our specialists are native in the modern industry platforms you rely on daily.
            </p>
            
            <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center">
              {[
                { icon: 'fa-slack', name: 'Slack' },
                { icon: 'fa-google', name: 'Google Workspace' },
                { icon: 'fa-microsoft', name: 'Microsoft 365' },
                { icon: 'fa-trello', name: 'Trello' },
                { icon: 'fa-notion', name: 'Notion' },
                { icon: 'fa-atlassian', name: 'Jira' },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center space-y-2 group cursor-pointer"
                >
                  <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass border-white/10 flex items-center justify-center text-white/50 group-hover:text-[#ab7e31] group-hover:border-[#ab7e31]/40 group-hover:scale-110 transition-all duration-300 shadow-lg animate-float"
                    style={{ 
                      animationDelay: `${i * 0.6}s`,
                      transform: `translateY(${Math.sin((scrollY + i * 120) * 0.008) * 8}px)`
                    }}
                  >
                    <i className={`fab ${item.icon} text-3xl sm:text-4xl`}></i>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}

              {/* QuickBooks Online Badge */}
              <div className="flex flex-col items-center space-y-2 group cursor-pointer">
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass border-white/10 flex items-center justify-center text-white/50 group-hover:text-emerald-400 group-hover:border-emerald-500/40 group-hover:scale-110 transition-all duration-300 shadow-lg animate-float"
                  style={{ 
                    animationDelay: '3.6s',
                    transform: `translateY(${Math.sin((scrollY + 700) * 0.008) * 8}px)`
                  }}
                >
                  <i className="fas fa-file-invoice-dollar text-2xl sm:text-3xl"></i>
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
                  QuickBooks
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BOTTOM CTA: High Precision Strategy Booking               */}
      {/* ========================================================= */}
      <section className="pb-36 px-4 sm:px-6 lg:px-8 relative">
        <div 
          className="reveal max-w-4xl mx-auto text-center glass p-12 sm:p-16 rounded-[3.5rem] border-white/10 relative overflow-hidden transition-transform duration-500 ease-out shadow-2xl"
          style={{ transform: `translateY(${(scrollY - 3000) * 0.05}px)` }}
        >
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#ab7e31]/10 rounded-full blur-[100px] pointer-events-none"></div>

          <span className="text-[#ab7e31] font-black uppercase text-[10px] tracking-[0.45em] block mb-4">
            Start Delegating
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 logo-font tracking-tight">
            Ready for High-Precision <span className="text-[#ab7e31] italic font-light">Support?</span>
          </h2>
          <p className="text-gray-300 font-light text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Book a 30-minute strategy session with Black Star VA. We will map your bottlenecks and design your custom delegation plan.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button 
              onClick={onBookNow}
              className="w-full sm:w-auto px-10 py-5 bg-[#ab7e31] text-black font-black rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-xl shadow-[#ab7e31]/25 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 group"
            >
              <i className="fas fa-phone-alt text-sm group-hover:rotate-12 transition-transform"></i>
              <span>Book Discovery Call</span>
            </button>
            <Link 
              to="/pricing" 
              className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs transition-all border border-white/15 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
            >
              <i className="fas fa-calculator text-[#ab7e31]"></i>
              <span>View Pricing & Calculator</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
