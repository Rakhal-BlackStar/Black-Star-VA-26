
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { ChatMessage } from '../types';

/**
 * ARIA_AVATAR_URL: A professional, curly-haired 2D cartoon woman in a black blazer.
 * Style: Micah (DiceBear) - Sophisticated and modern.
 */
const ARIA_AVATAR_URL = "https://api.dicebear.com/9.x/micah/png?seed=Aria&backgroundColor=ab7e31&baseColor=f9c9b6&hair=curly&hairColor=2c1b18&shirt=blazer&shirtColor=000000&eyebrows=up&eyes=smiling&mouth=smile&nose=pointed";

// --- Mock Scheduling Functions ---
const mockGetAvailability = (date: string) => {
  // Returns realistic morning and afternoon slots for the given date
  return {
    date,
    available_slots: ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"],
    timezone: "CST (Texas)"
  };
};

const mockBookCall = (details: { date: string, time: string, email: string, name: string }) => {
  console.log("Booking call:", details);
  return {
    status: "Confirmed",
    confirmation_id: `BSV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    message: `Discovery Call scheduled for ${details.name} on ${details.date} at ${details.time} ${details.email ? `(Confirmation sent to ${details.email})` : ''}`
  };
};

// --- Gemini Tool Definitions ---
const getAvailabilityTool: FunctionDeclaration = {
  name: "get_available_slots",
  description: "Get the list of available 30-minute discovery call slots for a specific date.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      date: { type: Type.STRING, description: "The date to check in YYYY-MM-DD format." }
    },
    required: ["date"]
  }
};

const bookCallTool: FunctionDeclaration = {
  name: "schedule_discovery_call",
  description: "Schedule a discovery call for the user once they have selected a date, time, and provided their contact details.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      date: { type: Type.STRING, description: "The selected date (YYYY-MM-DD)." },
      time: { type: Type.STRING, description: "The selected time slot (e.g., '11:30 AM')." },
      name: { type: Type.STRING, description: "The user's full name." },
      email: { type: Type.STRING, description: "The user's professional email address." }
    },
    required: ["date", "time", "name", "email"]
  }
};

const AriaAvatar = ({ size = "w-12 h-12" }: { size?: string }) => (
  <div className="relative shrink-0">
    <div className={`${size} rounded-2xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#121212] to-[#1a1a1a] border-2 border-[#ab7e31]/50 shadow-[0_8px_32px_rgba(171,126,49,0.3)] relative group transition-all duration-500`}>
      <img src={ARIA_AVATAR_URL} alt="Aria" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ab7e31]/5 via-transparent to-white/10 pointer-events-none"></div>
    </div>
    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
  </div>
);

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Greetings. I'm Aria, your Strategic Assistant at Blackstar VA. Shall we synchronize a discovery session to reclaim your operational focus?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMessage].map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        config: {
          systemInstruction: `You are Aria, the elite AI Concierge for Black Star VA. 
          Your goal is to help users find optimal times for discovery calls and book them.
          
          IDENTITY:
          - Sophisticated, professional 2D cartoon woman persona.
          - High-status, concise, and proactive.
          
          BOOKING WORKFLOW:
          1. If the user wants to talk, ask for their preferred date.
          2. Use 'get_available_slots' to see what's open.
          3. Present the options clearly.
          4. Once they pick a time, ask for their Name and Professional Email.
          5. Use 'schedule_discovery_call' to finalize.
          6. Provide the confirmation ID and express enthusiasm for the partnership.
          
          CONSTRAINTS:
          - Responses MUST be under 3 sentences.
          - Always mention that we operate in Texas (CST).`,
          tools: [{ functionDeclarations: [getAvailabilityTool, bookCallTool] }],
          temperature: 0.7,
        }
      });

      // Handle Tool Calls
      if (response.functionCalls && response.functionCalls.length > 0) {
        const toolResults = [];
        for (const fc of response.functionCalls) {
          if (fc.name === "get_available_slots") {
            const data = mockGetAvailability(fc.args.date as string);
            toolResults.push({ id: fc.id, name: fc.name, response: data });
          } else if (fc.name === "schedule_discovery_call") {
            const data = mockBookCall(fc.args as any);
            toolResults.push({ id: fc.id, name: fc.name, response: data });
          }
        }

        // Send results back to model for final natural language response
        const secondResponse = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [
            ...messages, 
            userMessage, 
            { role: 'model', parts: response.functionCalls.map(f => ({ functionCall: f })) },
            { role: 'user', parts: toolResults.map(r => ({ functionResponse: r })) }
          ] as any,
          config: {
            systemInstruction: "You are Aria. Complete the booking conversation professionally based on the function results.",
          }
        });
        setMessages(prev => [...prev, { role: 'model', text: secondResponse.text || "Synchronized. What's next?" }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: response.text || "I am processing. Please rephrase." }]);
      }
    } catch (error) {
      console.error("Aria Sync Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Operational latency detected. Please reach us at support@blackstarva.com." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-[340px] sm:w-[400px] glass rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[550px] animate-cartoon-pop border-2 border-white/10 origin-bottom-right">
          <div className="bg-black/95 backdrop-blur-md p-6 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center space-x-4">
              <AriaAvatar />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-black text-white text-xl logo-font italic">Aria</span>
                  <span className="bg-[#ab7e31]/20 text-[#ab7e31] text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-[#ab7e31]/30">Strategic AI</span>
                </div>
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest block mt-0.5">Online • Texas Time</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 glass border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"><i className="fas fa-times"></i></button>
          </div>

          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-black/60 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex items-end space-x-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && <AriaAvatar size="w-8 h-8" />}
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' ? 'bg-[#ab7e31] text-black font-bold rounded-br-none' : 'bg-white/10 text-white backdrop-blur-sm border border-white/5 rounded-bl-none font-medium'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-end space-x-3">
                <AriaAvatar size="w-8 h-8" />
                <div className="bg-white/5 p-4 rounded-2xl rounded-bl-none border border-white/5">
                  <div className="flex space-x-1.5"><div className="w-1.5 h-1.5 bg-[#ab7e31] rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-[#ab7e31] rounded-full animate-bounce [animation-delay:0.2s]"></div><div className="w-1.5 h-1.5 bg-[#ab7e31] rounded-full animate-bounce [animation-delay:0.4s]"></div></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-6 border-t border-white/10 bg-black/95">
            <div className="flex space-x-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Inquire about scheduling..." className="flex-grow bg-black border border-white/20 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-[#ab7e31]/60 text-white placeholder-gray-700 font-medium transition-colors" />
              <button type="submit" disabled={!input.trim()} className="w-14 h-14 bg-[#ab7e31] rounded-xl flex items-center justify-center text-black hover:bg-white transition-all shadow-lg shadow-[#ab7e31]/20 disabled:opacity-50"><i className="fas fa-paper-plane text-lg"></i></button>
            </div>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="relative group transition-all hover:scale-110 active:scale-95">
          <div className="absolute -top-14 right-0 bg-[#ab7e31] text-black text-[10px] font-black py-2 px-5 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all shadow-2xl uppercase tracking-widest border border-black/10">Schedule with Aria</div>
          <div className="w-20 h-20 bg-black rounded-[2.2rem] flex items-center justify-center hover:-rotate-6 transition-all relative shadow-[0_25px_60px_rgba(171,126,49,0.5)] overflow-hidden border-2 border-[#ab7e31] group-hover:border-white">
             <div className="absolute inset-0 bg-gradient-to-br from-[#ab7e31]/40 via-transparent to-transparent"></div>
             <div className="w-full h-full flex items-center justify-center overflow-hidden bg-black/80"><AriaAvatar size="w-full h-full" /></div>
          </div>
        </button>
      )}
      <style>{`
        @keyframes cartoon-pop { 0% { transform: scale(0.8) translateY(30px); opacity: 0; } 60% { transform: scale(1.05) translateY(-5px); } 100% { transform: scale(1) translateY(0); opacity: 1; } }
        .animate-cartoon-pop { animation: cartoon-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(171, 126, 49, 0.25); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Chatbot;
