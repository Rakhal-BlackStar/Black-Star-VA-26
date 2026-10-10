import React, { useState, useMemo, useEffect } from 'react';
import ceoAssistantImg from '../src/assets/images/executive_leadership_collab_1791573096951.jpg';
import eaTileImg from '../src/assets/images/executive_assistant_tile_1791493934161.jpg';
import bookkeeperTileImg from '../src/assets/images/bookkeeper_tile_1791493949187.jpg';

interface PricingProps {
  onBookNow: () => void;
}

const PRICING_FAQS = [
  {
    question: "How much does Black Star VA cost per month?",
    answer: "Black Star VA starts with a one-time $250 onboarding fee for your Delegation Strategy Plan, followed by a minimum monthly Talent Budget of $1,000. Your budget is used across Executive Assistants (starting at $40/hour) and Bookkeepers (starting at $55/hour). Those are starting rates and scale up with the seniority and scope of the work. For example, a $1,000 budget could cover around 25 hours of EA support, or 18 hours of Bookkeeping work."
  },
  {
    question: "Do unused hours roll over each month?",
    answer: "Partly. Unused budget rolls over up to $200 per month, and only the portion of your budget above the $1,000 minimum is eligible to roll. So on a $1,000 plan nothing rolls over. On a $1,200 plan, where you used $1,050, the unused $150 carries over to next month. Rollover also doesn't stack: $200 is the most that can ever carry into a month, however many months in a row you underspend. Black Star VA encourages clients to use their full monthly budget."
  },
  {
    question: "Is there a long-term contract or commitment?",
    answer: "Black Star VA requires a 3-month initial commitment to allow enough time to build a productive working relationship. After that, your engagement rolls into a simple month-to-month plan with no long-term contract. You can scale your Talent Budget up or down as needed with a quick notice period."
  },
  {
    question: "Can I increase my Talent Budget if I need more help in a given month?",
    answer: "Yes, you can increase your Talent Budget at any time as long as talent is available. Overages up to $100 are automatically added to your next month's bill, with no approval needed. If you need more than that, you can raise your budget anytime or buy additional budget in $100 increments. This flexibility means you can handle busy periods without worrying about rigid limits."
  },
  {
    question: "What does the $250 onboarding fee include?",
    answer: "The $250 onboarding fee covers your Delegation Strategy Plan, built with a dedicated Client Success Manager. They dig into your goals, workflows, and bottlenecks, then map out what to delegate and the ideal mix of Executive, Specialist, and EA support. This plan ensures you get matched with the right talent from day one."
  },
  {
    question: "Why is Black Star VA more expensive than an offshore Virtual Assistant?",
    answer: "Black Star VA rates reflect experienced professionals who live and work in the United States, on your schedule and under a US contract. That costs more per hour than offshore delegation and removes the time zone lag, translation overhead, and worker-classification risk that come with it."
  }
];

const Pricing: React.FC<PricingProps> = ({ onBookNow }) => {
  // Pricing FAQ State (first open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  // Budget Calculator State
  // EA rate: $40/hr, Bookkeeper rate: $55/hr
  // Budget starts at $1,000/month
  const [eaHoursPerWeek, setEaHoursPerWeek] = useState<number>(5);
  const [bkHoursPerWeek, setBkHoursPerWeek] = useState<number>(2);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Calculate monthly costs (4.33 weeks per month on average)
  const eaMonthlyCost = useMemo(() => Math.round(eaHoursPerWeek * 40 * 4.33), [eaHoursPerWeek]);
  const bkMonthlyCost = useMemo(() => Math.round(bkHoursPerWeek * 55 * 4.33), [bkHoursPerWeek]);
  const rawTotalCost = useMemo(() => eaMonthlyCost + bkMonthlyCost, [eaMonthlyCost, bkMonthlyCost]);
  
  // Budget starts at $1,000 a month minimum
  const effectiveMonthlyBudget = useMemo(() => Math.max(1000, rawTotalCost), [rawTotalCost]);

  const [displayCost, setDisplayCost] = useState<number>(effectiveMonthlyBudget);

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 300);

    let startTimestamp: number | null = null;
    const duration = 400;
    const startValue = displayCost;
    const endValue = effectiveMonthlyBudget;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOutExpo = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };
      
      const current = Math.floor(easeOutExpo(progress) * (endValue - startValue) + startValue);
      setDisplayCost(current);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(animFrame);
      clearTimeout(timer);
    };
  }, [effectiveMonthlyBudget]);

  const scrollToCalculator = () => {
    const el = document.getElementById('budget-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-20 md:py-28 animate-fade-in bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* SECTION 1: Top Hero Section - "How pricing works"        */}
        {/* Book discovery call button & button for budget calculator */}
        {/* Image next to it of CEO and assistant working together    */}
        {/* ========================================================= */}
        <section className="relative mb-28 md:mb-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading, intro & action buttons */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#ab7e31]/10 border border-[#ab7e31]/30">
                <span className="w-2 h-2 rounded-full bg-[#ab7e31] animate-pulse"></span>
                <span className="text-[#ab7e31] font-black tracking-[0.35em] uppercase text-[11px]">
                  Transparent & Flexible Model
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl logo-font font-black tracking-tight text-white leading-[1.08]">
                How Pricing <span className="text-[#ab7e31] italic font-light">Works</span>
              </h1>

              <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                Get high-caliber, 100% US-based executive support and/or bookkeeping tailored to your exact workflow. Scale your hours up or down with complete transparency and zero guesswork.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onBookNow}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#ab7e31] text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all shadow-xl shadow-[#ab7e31]/20 hover:scale-105 active:scale-95 group"
                >
                  <i className="fas fa-calendar-alt mr-3 text-sm group-hover:rotate-12 transition-transform"></i>
                  <span>Book Discovery Call</span>
                </button>

                <button
                  onClick={scrollToCalculator}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white hover:text-[#ab7e31] border border-white/15 hover:border-[#ab7e31]/50 font-bold text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg hover:scale-105 active:scale-95 group"
                >
                  <i className="fas fa-calculator mr-3 text-sm text-[#ab7e31] group-hover:scale-110 transition-transform"></i>
                  <span>Budget Calculator</span>
                </button>
              </div>

              {/* Quick highlights bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
                <div>
                  <div className="text-xl font-black text-[#ab7e31] logo-font">$250</div>
                  <div className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">One-Time Onboarding</div>
                </div>
                <div>
                  <div className="text-xl font-black text-white logo-font">$1,000/mo</div>
                  <div className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Starting Budget</div>
                </div>
                <div>
                  <div className="text-xl font-black text-white logo-font">100% US</div>
                  <div className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Based Talent</div>
                </div>
              </div>
            </div>

            {/* Right Column: High Quality Image of CEO and assistant working together */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#ab7e31]/25 via-transparent to-[#ab7e31]/10 rounded-[3rem] blur-2xl opacity-60"></div>
                
                {/* Image card container */}
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl bg-gradient-to-b from-white/5 to-black/80">
                  <img
                    src={ceoAssistantImg}
                    alt="CEO and executive assistant working together seamlessly"
                    className="w-full h-auto object-cover aspect-[4/3] transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-[#ab7e31]/30 flex items-center space-x-3 shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-[#ab7e31]/20 flex items-center justify-center shrink-0 border border-[#ab7e31]/40">
                      <i className="fas fa-handshake text-[#ab7e31] text-base"></i>
                    </div>
                    <div>
                      <div className="text-xs font-black text-white uppercase tracking-wider">Executive Synergy</div>
                      <div className="text-[11px] text-gray-400">High-leverage partnership built around your priorities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================= */}
        {/* SECTION 2: How Pricing Works Break Down                   */}
        {/* Title: How much does Black StarVA cost?                   */}
        {/* ========================================================= */}
        <section className="mb-28 md:mb-36">
          <div className="relative glass rounded-[3rem] p-8 md:p-16 border border-[#ab7e31]/25 bg-gradient-to-b from-[#ab7e31]/10 via-black to-black shadow-[0_20px_70px_-20px_rgba(171,126,49,0.15)] overflow-hidden">
            
            {/* Ambient decorative glow */}
            <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#ab7e31]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto space-y-10 relative z-10">
              
              {/* Breakdown Header */}
              <div className="text-center space-y-4">
                <span className="text-[#ab7e31] font-black uppercase text-[10px] tracking-[0.45em] block">
                  How Pricing Works Breakdown
                </span>
                <h2 className="text-3xl sm:text-5xl font-black logo-font text-white tracking-tight">
                  How much does Black Star VA cost?
                </h2>
                <div className="w-16 h-1 bg-[#ab7e31] mx-auto rounded-full"></div>
              </div>

              {/* Core description as specified */}
              <div className="bg-black/60 rounded-3xl p-6 sm:p-10 border border-white/10 shadow-inner">
                <p className="text-gray-200 text-base sm:text-lg font-light leading-relaxed">
                  Get started with Black Star VA for just a one-time <span className="text-[#ab7e31] font-bold">$250 onboarding fee</span>, then a flexible monthly budget beginning at <span className="text-white font-bold">$1,000</span>. Your budget works across our team however you need it—pairing <span className="text-[#ab7e31] font-bold">Executive Assistants at $40/hour</span> with <span className="text-[#ab7e31] font-bold">Bookkeepers at $55/hour</span> in any combination that fits your priorities.
                </p>
              </div>

              {/* What You Get Grid */}
              <div className="space-y-6 pt-2">
                <h3 className="text-xl sm:text-2xl font-black logo-font text-white flex items-center">
                  <span className="text-[#ab7e31] mr-3">✦</span> Here’s what you get:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Benefit 1 */}
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#ab7e31]/40 transition-all flex flex-col space-y-3 group">
                    <div className="w-12 h-12 rounded-xl bg-[#ab7e31]/15 text-[#ab7e31] flex items-center justify-center text-lg border border-[#ab7e31]/30 group-hover:scale-110 transition-transform">
                      <i className="fas fa-flag-usa"></i>
                    </div>
                    <h4 className="text-base font-bold text-white">100% US-Based</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      100% US-based professionals you can trust with your critical executive calendar, confidential inbox, and books.
                    </p>
                  </div>

                  {/* Benefit 2 */}
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#ab7e31]/40 transition-all flex flex-col space-y-3 group">
                    <div className="w-12 h-12 rounded-xl bg-[#ab7e31]/15 text-[#ab7e31] flex items-center justify-center text-lg border border-[#ab7e31]/30 group-hover:scale-110 transition-transform">
                      <i className="fas fa-sliders-h"></i>
                    </div>
                    <h4 className="text-base font-bold text-white">Flexible & Scalable</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      Flexible, scalable support month-to-month (after a 3-month initial term) that adjusts effortlessly as demands evolve.
                    </p>
                  </div>

                  {/* Benefit 3 */}
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#ab7e31]/40 transition-all flex flex-col space-y-3 group">
                    <div className="w-12 h-12 rounded-xl bg-[#ab7e31]/15 text-[#ab7e31] flex items-center justify-center text-lg border border-[#ab7e31]/30 group-hover:scale-110 transition-transform">
                      <i className="fas fa-bullseye"></i>
                    </div>
                    <h4 className="text-base font-bold text-white">Focus on Growth</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      A team that fills your bottlenecks so you can focus on what matters most to driving your revenue and mission.
                    </p>
                  </div>

                </div>
              </div>

              {/* Concluding callout statement */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#ab7e31]/20 via-[#ab7e31]/10 to-transparent border-l-4 border-[#ab7e31] flex items-center justify-between flex-wrap gap-4">
                <div className="text-base sm:text-lg text-white font-medium max-w-2xl leading-relaxed">
                  When your business needs more hands—and more expertise—<span className="text-[#ab7e31] font-black">Black Star VA has it handled.</span>
                </div>
                <button
                  onClick={onBookNow}
                  className="px-6 py-3 bg-[#ab7e31] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-md shrink-0"
                >
                  Get Started
                </button>
              </div>

            </div>
          </div>
        </section>


        {/* ========================================================= */}
        {/* SECTION 3: Pricing Tiles (EA & Bookkeeper Tiles Only)      */}
        {/* EA starting at $40/hour and Bookkeeper starting at $55/hour*/}
        {/* Other tiles removed, with image icons / imagery           */}
        {/* ========================================================= */}
        <section className="mb-28 md:mb-36">
          <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
            <span className="text-[#ab7e31] font-black uppercase text-[10px] tracking-[0.45em] block">
              Core Team Roles
            </span>
            <h2 className="text-3xl sm:text-5xl font-black logo-font text-white">
              Specialized Roles. <span className="text-[#ab7e31] italic font-light">One Seamless Team.</span>
            </h2>
            <p className="text-gray-400 text-base font-light">
              Pair Executive Assistants and Bookkeepers in any configuration. Mix and match hours within your monthly budget.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            
            {/* Tile 1: Executive Assistant */}
            <div className="flex flex-col relative rounded-[3rem] border border-[#ab7e31]/40 bg-gradient-to-b from-[#ab7e31]/10 via-black to-black/95 overflow-hidden shadow-[0_20px_50px_-15px_rgba(171,126,49,0.15)] group hover:border-[#ab7e31] transition-all duration-300">
              
              {/* Role Header Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={eaTileImg}
                  alt="Executive Assistant Support"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                {/* Floating role icon badge */}
                <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#ab7e31]/40 flex items-center space-x-2">
                  <i className="fas fa-user-tie text-[#ab7e31] text-xs"></i>
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">Executive Support</span>
                </div>

                {/* Rate overlay */}
                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ab7e31] block">Standard EA Rate</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl sm:text-5xl font-black logo-font text-white tracking-tight">Starting at $40</span>
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">/ hour</span>
                  </div>
                </div>
              </div>

              {/* Tile Content */}
              <div className="p-8 sm:p-10 flex flex-col flex-grow space-y-6">
                <div>
                  <h3 className="text-2xl font-black logo-font text-white mb-2 flex items-center">
                    Executive Assistant
                  </h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    Dedicated, proactive administrative management designed to free up executive focus, clear decision bottlenecks, and streamline day-to-day operations.
                  </p>
                </div>

                <div className="flex-grow">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                    Core Capabilities Include:
                  </div>
                  <ul className="space-y-3.5 mb-8">
                    {[
                      'Strategic calendar management & priority scheduling',
                      'Executive inbox zero filtering & draft responses',
                      'Complex multi-leg business travel & itinerary coordination',
                      'High-touch client, investor & vendor communications',
                      'Meeting agendas, board materials & action-item tracking',
                      'Project management, CRM upkeep & process documentation'
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-300 text-sm font-light">
                        <div className="shrink-0 mt-0.5 mr-3 w-5 h-5 bg-[#ab7e31]/20 rounded-full flex items-center justify-center border border-[#ab7e31]/30">
                          <i className="fas fa-check text-[10px] text-[#ab7e31]"></i>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onBookNow}
                    className="w-full py-4 rounded-2xl bg-[#ab7e31] text-black font-black text-xs tracking-[0.2em] uppercase hover:bg-white transition-all shadow-xl shadow-[#ab7e31]/20 flex items-center justify-center space-x-2"
                  >
                    <span>Book Discovery Call</span>
                    <i className="fas fa-arrow-right text-xs"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Tile 2: Bookkeeper */}
            <div className="flex flex-col relative rounded-[3rem] border border-[#ab7e31]/40 bg-gradient-to-b from-[#ab7e31]/10 via-black to-black/95 overflow-hidden shadow-[0_20px_50px_-15px_rgba(171,126,49,0.15)] group hover:border-[#ab7e31] transition-all duration-300">
              
              {/* Role Header Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={bookkeeperTileImg}
                  alt="Precision Bookkeeping Services"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                {/* Floating role icon badge */}
                <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#ab7e31]/40 flex items-center space-x-2">
                  <i className="fas fa-file-invoice-dollar text-[#ab7e31] text-xs"></i>
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">Financial Operations</span>
                </div>

                {/* Rate overlay */}
                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ab7e31] block">Bookkeeper Rate</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl sm:text-5xl font-black logo-font text-white tracking-tight">Starting at $55</span>
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">/ hour</span>
                  </div>
                </div>
              </div>

              {/* Tile Content */}
              <div className="p-8 sm:p-10 flex flex-col flex-grow space-y-6">
                <div>
                  <h3 className="text-2xl font-black logo-font text-white mb-2 flex items-center">
                    Bookkeeper
                  </h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    Accurate, dependable financial recordkeeping and ledger reconciliation to keep your business tax-ready, cashflow-aware, and organized year-round.
                  </p>
                </div>

                <div className="flex-grow">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                    Core Capabilities Include:
                  </div>
                  <ul className="space-y-3.5 mb-8">
                    {[
                      'Accounts Payable (AP) & Accounts Receivable (AR)',
                      'Monthly bank, credit card & merchant reconciliations',
                      'Vendor payment processing & invoicing coordination',
                      'Expense categorization, receipt logging & chart of accounts',
                      'Monthly Profit & Loss (P&L) and balance sheet reporting',
                      'CPA-ready financial handoffs for painless tax season filing'
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-300 text-sm font-light">
                        <div className="shrink-0 mt-0.5 mr-3 w-5 h-5 bg-[#ab7e31]/20 rounded-full flex items-center justify-center border border-[#ab7e31]/30">
                          <i className="fas fa-check text-[10px] text-[#ab7e31]"></i>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onBookNow}
                    className="w-full py-4 rounded-2xl bg-[#ab7e31] text-black font-black text-xs tracking-[0.2em] uppercase hover:bg-white transition-all shadow-xl shadow-[#ab7e31]/20 flex items-center justify-center space-x-2"
                  >
                    <span>Book Discovery Call</span>
                    <i className="fas fa-arrow-right text-xs"></i>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================= */}
        {/* SECTION 4: Interactive Budget Calculator                   */}
        {/* Budget starting at $1,000 a month                         */}
        {/* Pairing EA ($40/hr) with Bookkeeper ($55/hr)             */}
        {/* ========================================================= */}
        <section id="budget-calculator" className="relative scroll-mt-24 mb-28 md:mb-36">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#ab7e31]/5 rounded-full blur-[160px] pointer-events-none"></div>

          <div className="max-w-5xl mx-auto relative z-10">
            
            {/* Calculator Header */}
            <div className="text-center mb-14 space-y-4">
              <span className="text-[#ab7e31] font-black uppercase text-[10px] tracking-[0.45em] block">
                Interactive Estimator
              </span>
              <h2 className="text-3xl sm:text-5xl logo-font font-black text-white">
                Monthly Budget <span className="text-[#ab7e31] italic font-light">Calculator</span>
              </h2>
              <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
                Your monthly budget begins at <span className="text-white font-bold">$1,000/month</span>. Allocate your hours across Executive Assistants ($40/hr) and Bookkeepers ($55/hr) in any combination.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mr-2">Quick Presets:</span>
              <button
                type="button"
                onClick={() => { setEaHoursPerWeek(6); setBkHoursPerWeek(0); }}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#ab7e31]/20 border border-white/10 hover:border-[#ab7e31]/50 text-xs font-semibold text-gray-300 hover:text-white transition-all"
              >
                $1,000 Starter (EA Focus)
              </button>
              <button
                type="button"
                onClick={() => { setEaHoursPerWeek(5); setBkHoursPerWeek(2); }}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#ab7e31]/20 border border-white/10 hover:border-[#ab7e31]/50 text-xs font-semibold text-gray-300 hover:text-white transition-all"
              >
                $1,340 Balanced (EA + BK)
              </button>
              <button
                type="button"
                onClick={() => { setEaHoursPerWeek(10); setBkHoursPerWeek(4); }}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#ab7e31]/20 border border-white/10 hover:border-[#ab7e31]/50 text-xs font-semibold text-gray-300 hover:text-white transition-all"
              >
                $2,680 Growth Scale
              </button>
            </div>

            {/* Main Calculator Glass Container */}
            <div className="glass rounded-[3rem] p-8 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden bg-gradient-to-b from-white/[0.03] to-black">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Sliders Area (7 cols) */}
                <div className="lg:col-span-7 space-y-10">
                  
                  {/* EA Hours Slider */}
                  <div className="bg-black/50 p-6 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-[#ab7e31]/15 text-[#ab7e31] flex items-center justify-center text-sm border border-[#ab7e31]/30">
                          <i className="fas fa-user-tie"></i>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Executive Assistant</h4>
                          <span className="text-[11px] text-[#ab7e31] font-semibold">$40 / hour</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-black text-white logo-font">{eaHoursPerWeek} hrs/wk</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                          ~{Math.round(eaHoursPerWeek * 4.33)} hrs/month
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <input
                        type="range"
                        min="0"
                        max="35"
                        step="1"
                        value={eaHoursPerWeek}
                        onChange={(e) => setEaHoursPerWeek(parseInt(e.target.value) || 0)}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ab7e31]"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                      <span>0 hrs</span>
                      <span>Subtotal: ${eaMonthlyCost.toLocaleString()}/mo</span>
                      <span>35 hrs/wk</span>
                    </div>
                  </div>

                  {/* Bookkeeper Hours Slider */}
                  <div className="bg-black/50 p-6 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-[#ab7e31]/15 text-[#ab7e31] flex items-center justify-center text-sm border border-[#ab7e31]/30">
                          <i className="fas fa-file-invoice-dollar"></i>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Bookkeeper</h4>
                          <span className="text-[11px] text-[#ab7e31] font-semibold">$55 / hour</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-black text-white logo-font">{bkHoursPerWeek} hrs/wk</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                          ~{Math.round(bkHoursPerWeek * 4.33)} hrs/month
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <input
                        type="range"
                        min="0"
                        max="25"
                        step="1"
                        value={bkHoursPerWeek}
                        onChange={(e) => setBkHoursPerWeek(parseInt(e.target.value) || 0)}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ab7e31]"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                      <span>0 hrs</span>
                      <span>Subtotal: ${bkMonthlyCost.toLocaleString()}/mo</span>
                      <span>25 hrs/wk</span>
                    </div>
                  </div>

                  {/* Explanation note */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-400 font-light flex items-center space-x-3">
                    <i className="fas fa-info-circle text-[#ab7e31] text-sm shrink-0"></i>
                    <span>
                      Black Star VA budgets start at <strong className="text-white">$1,000/mo</strong>. If your calculated workload is below $1,000, our base retainer guarantees dedicated priority capacity.
                    </span>
                  </div>

                </div>

                {/* Estimate Output Box (5 cols) */}
                <div className="lg:col-span-5">
                  <div className={`bg-gradient-to-b from-[#ab7e31]/15 via-black to-black p-8 sm:p-10 rounded-[2.5rem] border border-[#ab7e31]/30 text-center flex flex-col justify-between relative transition-all duration-300 shadow-2xl ${isUpdating ? 'scale-[1.02] border-[#ab7e31]' : 'scale-100'}`}>
                    
                    <div>
                      <span className="text-[#ab7e31] text-[10px] font-black uppercase tracking-[0.35em] mb-2 block">
                        Estimated Monthly Investment
                      </span>

                      <div className="my-5">
                        <span className="text-2xl text-[#ab7e31] font-bold align-top mr-1">$</span>
                        <span className={`text-6xl sm:text-7xl logo-font font-black tracking-tight transition-colors duration-300 ${isUpdating ? 'text-[#ab7e31]' : 'text-white'}`}>
                          {displayCost.toLocaleString()}
                        </span>
                        <span className="text-gray-400 text-xs font-bold uppercase block mt-1">/ month flexible budget</span>
                      </div>

                      {rawTotalCost < 1000 && (
                        <div className="inline-block px-3 py-1 rounded-full bg-[#ab7e31]/20 border border-[#ab7e31]/40 text-[#ab7e31] text-[10px] font-black uppercase tracking-wider mb-4">
                          Minimum Monthly Retainer Applied ($1,000)
                        </div>
                      )}

                      {/* Line-item summary */}
                      <div className="space-y-3 py-4 border-y border-white/10 text-xs text-left mb-6">
                        <div className="flex justify-between text-gray-300">
                          <span>One-Time Onboarding:</span>
                          <span className="text-[#ab7e31] font-bold">$250</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>EA Support ({eaHoursPerWeek} hrs/wk):</span>
                          <span className="font-semibold text-white">${eaMonthlyCost.toLocaleString()}/mo</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Bookkeeping ({bkHoursPerWeek} hrs/wk):</span>
                          <span className="font-semibold text-white">${bkMonthlyCost.toLocaleString()}/mo</span>
                        </div>
                        <div className="flex justify-between text-gray-300 pt-2 border-t border-white/5 font-semibold">
                          <span>Total Monthly Hours:</span>
                          <span className="text-[#ab7e31]">~{Math.round((eaHoursPerWeek + bkHoursPerWeek) * 4.33)} hours</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={onBookNow}
                        className="w-full py-4 bg-[#ab7e31] text-black font-black rounded-xl text-xs tracking-[0.2em] uppercase hover:bg-white transition-all shadow-xl shadow-[#ab7e31]/20 active:scale-95"
                      >
                        Book Discovery Call
                      </button>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest text-center">
                        No Long-Term Lock-in • Month-to-Month After Initial 3 Months
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ========================================================= */}
        {/* SECTION 5: Pricing FAQ                                   */}
        {/* Title: Pricing questions, answered Easily                */}
        {/* ========================================================= */}
        <section className="mb-28 md:mb-36 max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#ab7e31]/10 border border-[#ab7e31]/30">
              <span className="w-2 h-2 rounded-full bg-[#ab7e31]"></span>
              <span className="text-[#ab7e31] font-black uppercase text-[10px] tracking-[0.45em]">
                Pricing FAQ
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black logo-font text-white">
              Pricing questions, <span className="text-[#ab7e31] italic font-light">answered Easily</span>
            </h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Clear answers to the most common questions about our rates, rollover policy, contracts, and onboarding.
            </p>
          </div>

          <div className="space-y-4">
            {PRICING_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#ab7e31]/5 border-[#ab7e31]/50 shadow-[0_10px_30px_-10px_rgba(171,126,49,0.15)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center space-x-4">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                        isOpen ? 'bg-[#ab7e31] text-black' : 'bg-white/5 text-gray-400 group-hover:text-white'
                      }`}>
                        0{index + 1}
                      </span>
                      <h3 className={`text-base sm:text-lg font-bold transition-colors ${
                        isOpen ? 'text-white' : 'text-gray-200 group-hover:text-[#ab7e31]'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? 'bg-[#ab7e31]/20 text-[#ab7e31] rotate-180' : 'bg-white/5 text-gray-400 group-hover:text-white'
                    }`}>
                      <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'} text-xs`}></i>
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out px-6 sm:px-8 ${
                      isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    <div className="pl-12 text-gray-300 text-sm sm:text-base font-light leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: Dedicated Direct Discovery Call Booking Section*/}
        {/* ========================================================= */}
        <section className="max-w-4xl mx-auto">
          <div className="glass p-10 md:p-16 rounded-[3rem] border border-[#ab7e31]/30 bg-gradient-to-b from-[#ab7e31]/10 via-black to-black text-center relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(171,126,49,0.15)]">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#ab7e31]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-[#ab7e31]/20 border border-[#ab7e31]/40 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-calendar-check text-2xl text-[#ab7e31]"></i>
            </div>
            
            <span className="text-[#ab7e31] font-black uppercase text-[10px] tracking-[0.4em] block mb-3">
              Direct Scheduling
            </span>
            <h3 className="text-3xl md:text-5xl font-black logo-font text-white mb-6">
              Book Your Discovery Call
            </h3>
            <p className="text-gray-400 text-base font-light max-w-xl mx-auto leading-relaxed mb-8">
              Prefer to talk through your needs directly? Schedule a 30-minute strategy session with Black Star VA to discuss your operational bottlenecks and custom roadmap.
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={onBookNow}
                className="w-full sm:w-auto px-10 py-5 bg-[#ab7e31] text-black font-black rounded-2xl hover:bg-white transition-all text-xs tracking-[0.25em] uppercase shadow-2xl shadow-[#ab7e31]/30 flex items-center justify-center hover:scale-105 active:scale-95"
              >
                <i className="fas fa-calendar-alt mr-3 text-sm"></i>
                <span>Book Discovery Call</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Pricing;
