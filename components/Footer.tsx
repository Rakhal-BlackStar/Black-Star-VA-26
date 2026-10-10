
import React from 'react';
import { Link } from 'react-router-dom';

const FooterLogo = () => (
  <div className="flex items-center space-x-4 mb-6 group">
    <div className="relative">
      <svg width="40" height="40" viewBox="0 0 100 100">
        <polygon 
          points="50,5 63,40 97,40 70,60 81,95 50,75 19,95 30,60 3,40 37,40" 
          fill="#000000" 
          stroke="#ab7e31"
          strokeWidth="3"
          className="group-hover:rotate-[72deg] transition-transform duration-1000 origin-center"
        />
      </svg>
      <div className="absolute inset-0 bg-[#ab7e31] blur-lg opacity-10 group-hover:opacity-30 transition-opacity"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-black logo-font text-white leading-none tracking-tighter">
        BLACK STAR <span className="text-[#ab7e31]">VA</span>
      </span>
      <span className="text-[10px] font-black logo-font text-gray-400 tracking-tight mt-1">
        Virtual Assistant & Bookkeeping
      </span>
    </div>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#ab7e31]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-2">
            <FooterLogo />
            <p className="text-gray-400 max-w-sm mb-10 font-light leading-relaxed text-sm">
              Empowering visionary founders through world-class executive assistance and 
              precision bookkeeping. Operating as the silent engine behind global impact.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-[#ab7e31] transition-all transform hover:-translate-y-1"><i className="fab fa-linkedin-in text-xl"></i></a>
              <a href="#" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1"><i className="fab fa-facebook-f text-xl"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-8 uppercase text-[10px] tracking-[0.4em]">Quick Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/pricing" className="text-gray-400 hover:text-[#ab7e31] transition-colors text-xs font-bold uppercase tracking-widest">Services & Pricing</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#ab7e31] transition-colors text-xs font-bold uppercase tracking-widest">Our Story</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-[#ab7e31] transition-colors text-xs font-bold uppercase tracking-widest">Help Center</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-[#ab7e31] transition-colors text-xs font-bold uppercase tracking-widest">Join the 0.1%</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase text-[10px] tracking-[0.4em]">Connect with us</h4>
            <ul className="space-y-5 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <li className="flex items-center group cursor-pointer">
                <i className="fas fa-envelope text-[#ab7e31] mr-4 w-4 transition-transform group-hover:scale-110"></i> 
                <span className="group-hover:text-white transition-colors">support@blackstarva.com</span>
              </li>
              <li className="flex items-center group cursor-pointer">
                <i className="fas fa-map-marker-alt text-[#ab7e31] mr-4 w-4 transition-transform group-hover:scale-110"></i> 
                <span className="group-hover:text-white transition-colors">Texas, United States</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 text-center text-gray-600 text-[9px] uppercase tracking-[0.5em] font-black">
          <p>&copy; {new Date().getFullYear()} Black Star VA & Bookkeeping. Built with Precision. Strategic Partnership Guaranteed.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
