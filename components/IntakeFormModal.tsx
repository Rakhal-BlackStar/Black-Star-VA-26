import React, { useState } from 'react';

interface IntakeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IntakeFormModal: React.FC<IntakeFormModalProps> = ({ isOpen, onClose }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="glass w-full max-w-4xl h-[92vh] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-300">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#ab7e31]/20 border border-[#ab7e31]/40 flex items-center justify-center">
              <i className="fas fa-calendar-check text-[#ab7e31] text-sm"></i>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black logo-font text-white uppercase tracking-wider flex items-center">
                Book <span className="text-[#ab7e31] ml-1.5">Discovery Call</span>
              </h2>
              <p className="text-[10px] text-gray-400 font-medium">30-minute strategy session with Black Star VA</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all border border-white/5"
              aria-label="Close modal"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
        </div>

        {/* Content - Direct Calendly Scheduler */}
        <div className="flex-grow bg-white/5 relative overflow-hidden">
          {!iframeLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="w-10 h-10 border-2 border-[#ab7e31] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 text-xs font-medium tracking-wider uppercase">Loading Scheduling Calendar...</p>
            </div>
          )}
          <iframe
            src="https://calendly.com/blackstarva/discovery-call-1?hide_landing_page_details=1&hide_gdpr_banner=1"
            width="100%"
            height="100%"
            frameBorder="0"
            className="h-full w-full"
            title="Schedule Discovery Call"
            onLoad={() => setIframeLoaded(true)}
          ></iframe>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-white/5 bg-black/40 flex items-center justify-between text-center sm:text-left">
          <span className="text-[11px] text-gray-500">
            Select a date and time directly above &bull; 100% Confidential
          </span>
          <button
            onClick={onClose}
            className="text-[11px] text-gray-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntakeFormModal;
