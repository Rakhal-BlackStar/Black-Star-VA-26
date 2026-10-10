
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DynamicLogo = () => (
  <div className="flex items-center space-x-4 group cursor-pointer relative">
    <div className="relative logo-star-pulse shrink-0">
      <svg width="46" height="46" viewBox="0 0 100 100">
        <defs>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <polygon 
          className="transition-all duration-700 group-hover:rotate-[72deg] origin-center"
          points="50,5 63,40 97,40 70,60 81,95 50,75 19,95 30,60 3,40 37,40" 
          fill="#000000" 
          stroke="#ab7e31" 
          strokeWidth="3"
          filter="url(#goldGlow)"
        />
        <polygon 
          points="50,20 56,40 75,40 60,52 66,73 50,60 34,73 40,52 25,40 44,40" 
          fill="rgba(171,126,49,0.15)"
        />
      </svg>
      <div className="absolute inset-0 border-2 border-[#ab7e31]/40 rounded-full animate-ping opacity-20 group-hover:opacity-40 scale-110"></div>
    </div>
    
    <div className="flex flex-col logo-shimmer-container">
      <div className="flex flex-col leading-none">
        <span className="text-[20px] font-black logo-font text-white tracking-tighter group-hover:text-[#ab7e31] transition-colors uppercase">
          BLACK STAR <span className="text-[#ab7e31]">VA</span>
        </span>
        <div className="flex items-center mt-1">
          <span className="text-[10px] font-black logo-font text-gray-400 group-hover:text-white transition-colors uppercase tracking-tight">
            Virtual Assistant <span className="text-[#ab7e31] mx-1">&</span> Bookkeeping
          </span>
        </div>
      </div>
      <div className="logo-shimmer-overlay"></div>
    </div>
  </div>
);

interface NavbarProps {
  onBookNow: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookNow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Reordered: Services & Pricing now comes before About
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services & Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  // Reordered: Client Portal now comes before FAQ
  const secondaryLinks = [
    { name: 'Client Portal', path: '/portal', icon: 'fa-user-shield' },
    { name: 'FAQ', path: '/faq', icon: 'fa-question-circle' },
    { name: 'Careers', path: '/careers', icon: 'fa-briefcase' },
  ];

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <DynamicLogo />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-bold tracking-wide transition-all ${
                    location.pathname === link.path 
                      ? 'text-[#ab7e31]' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex items-center space-x-6 ml-4">
                <button
                  onClick={onBookNow}
                  className="bg-[#ab7e31] hover:bg-white text-black px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(171,126,49,0.3)] hover:shadow-[0_0_30px_rgba(171,126,49,0.5)] hover:scale-105 active:scale-95 flex items-center"
                >
                  Book Discovery Call
                  <i className="fas fa-calendar-alt ml-2 text-[10px]"></i>
                </button>

                {/* Resources Dropdown - 3 lines icon */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onMouseEnter={() => setDropdownOpen(true)}
                    className={`flex items-center p-2 rounded-xl transition-all ${
                      dropdownOpen ? 'text-[#ab7e31] bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    aria-label="Open resources menu"
                  >
                    <div className="flex flex-col space-y-1 w-5">
                      <div className={`h-0.5 bg-current transition-all duration-300 ${dropdownOpen ? 'w-5' : 'w-5'}`}></div>
                      <div className={`h-0.5 bg-current transition-all duration-300 ${dropdownOpen ? 'w-3' : 'w-5'}`}></div>
                      <div className={`h-0.5 bg-current transition-all duration-300 ${dropdownOpen ? 'w-5' : 'w-5'}`}></div>
                    </div>
                  </button>

                  <div 
                    className={`absolute right-0 mt-4 w-56 glass border border-white/10 rounded-2xl p-2 shadow-2xl transition-all duration-300 origin-top-right ${
                      dropdownOpen 
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="absolute -top-2 right-4 w-4 h-4 glass border-l border-t border-white/10 rotate-45 -z-10"></div>
                    {secondaryLinks.map((link, idx) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-gray-400 hover:text-white group"
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      >
                        <i className={`fas ${link.icon} text-xs text-gray-600 group-hover:text-[#ab7e31] transition-transform group-hover:scale-110`}></i>
                        <span className="text-xs font-bold uppercase tracking-widest">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
             <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-4 rounded-md text-base font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-all border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="bg-white/5 my-2 py-2 rounded-xl">
               <span className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-2">Resources</span>
               {secondaryLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center space-x-4 px-4 py-3 text-sm font-bold text-gray-400 hover:text-white"
                >
                  <i className={`fas ${link.icon} w-5 text-[#ab7e31]`}></i>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="p-3">
              <button
                onClick={onBookNow}
                className="block w-full text-center px-3 py-4 rounded-xl text-base font-black text-black bg-[#ab7e31] uppercase tracking-widest"
              >
                Book Discovery Call
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
