
import React, { useState, useMemo } from 'react';

interface Task {
  id: number;
  task: string;
  status: string;
  owner: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  createdAt: number;
}

type SortField = 'priority' | 'dueDate' | 'createdAt';

const ClientPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [completingId, setCompletingId] = useState<number | null>(null);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      task: "Quarterly Board Deck Preparation", 
      status: "In Progress", 
      owner: "Sarah M.", 
      priority: "High", 
      dueDate: "2024-09-15", 
      createdAt: Date.now() - 86400000 * 2 
    },
    { 
      id: 2, 
      task: "Booking Tokyo Logistics", 
      status: "Review", 
      owner: "James K.", 
      priority: "Medium", 
      dueDate: "2024-09-10", 
      createdAt: Date.now() - 86400000 
    },
    { 
      id: 3, 
      task: "CRM System Migration", 
      status: "Scheduled", 
      owner: "Tech Team", 
      priority: "High", 
      dueDate: "2024-09-20", 
      createdAt: Date.now() - 3600000 
    },
  ]);
  const [newTaskInput, setNewTaskInput] = useState("");

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (sortField === 'priority') {
        const priorityMap = { High: 3, Medium: 2, Low: 1 };
        return priorityMap[b.priority] - priorityMap[a.priority];
      }
      if (sortField === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortField === 'createdAt') {
        return b.createdAt - a.createdAt;
      }
      return 0;
    });
  }, [tasks, sortField]);

  const handleFeedbackClick = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const confirmFeedbackSubmit = () => {
    setShowConfirmDialog(false);
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 5000);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    
    const newTask: Task = { 
      id: Date.now(),
      task: newTaskInput, 
      status: "Scheduled", 
      owner: "Sarah M.",
      priority: "Medium",
      dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], // Default 1 week out
      createdAt: Date.now()
    };
    
    setTasks([newTask, ...tasks]);
    setNewTaskInput("");
  };

  const handleCompleteTask = (id: number) => {
    setCompletingId(id);
    setTimeout(() => {
      setTasks(prev => prev.filter(t => t.id !== id));
      setCompletingId(null);
    }, 500);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-black">
        <div className="glass p-10 rounded-[2.5rem] w-full max-w-md border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#ab7e31]"></div>
          <div className="text-center mb-8">
             <span className="text-2xl font-black logo-font text-white tracking-tighter uppercase">
                BLACK<span className="text-[#ab7e31]">STAR</span> VA
              </span>
              <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">Client Portal Access</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                defaultValue="founder@technova.com"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ab7e31]/50"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                defaultValue="••••••••••••"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ab7e31]/50"
              />
            </div>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#ab7e31] transition-all shadow-lg"
            >
              Sign In
            </button>
            <div className="text-center">
              <a href="#" className="text-xs text-gray-600 hover:text-[#ab7e31] underline transition-colors">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 animate-fade-in pb-32 bg-black min-h-screen">
      {showConfirmDialog && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass p-8 md:p-12 rounded-[2.5rem] max-w-md w-full border border-[#ab7e31]/30 shadow-2xl text-center">
            <div className="w-16 h-16 bg-[#ab7e31]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#ab7e31]/30">
              <i className="fas fa-question text-[#ab7e31] text-2xl"></i>
            </div>
            <h3 className="text-2xl font-black logo-font text-white mb-4 uppercase tracking-widest">Confirm Submission</h3>
            <p className="text-gray-400 mb-10 font-light leading-relaxed">
              Are you sure you want to submit this feedback? Your evaluation helps us maintain the Black Star standard of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={confirmFeedbackSubmit}
                className="flex-grow py-4 bg-[#ab7e31] text-black font-black rounded-xl text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg"
              >
                Yes, Submit
              </button>
              <button 
                onClick={() => setShowConfirmDialog(false)}
                className="flex-grow py-4 glass text-white font-black rounded-xl text-xs uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black logo-font text-white">Welcome back, Alexandra</h1>
            <p className="text-gray-500 font-light">Your Black Star Executive Team is currently online.</p>
          </div>
          <div className="flex space-x-2">
            <button className="glass px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/5 border border-white/10 text-white">Project Brief +</button>
            <button onClick={() => setIsLoggedIn(false)} className="bg-red-500/10 text-red-500 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-500/20">Sign Out</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass p-8 rounded-3xl border border-white/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <h3 className="text-xl font-black logo-font text-white flex items-center uppercase tracking-widest">
                  <i className="fas fa-tasks text-[#ab7e31] mr-3"></i> Active Tasks
                </h3>
                
                <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-xl border border-white/5">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-3">Sort By:</span>
                  {(['createdAt', 'priority', 'dueDate'] as SortField[]).map((field) => (
                    <button
                      key={field}
                      onClick={() => setSortField(field)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                        sortField === field 
                          ? 'bg-[#ab7e31] text-black shadow-lg shadow-[#ab7e31]/20' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {field === 'createdAt' ? 'Newest' : field === 'dueDate' ? 'Due Date' : 'Priority'}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleAddTask} className="mb-8 relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <i className="fas fa-plus text-[#ab7e31] text-xs"></i>
                </div>
                <input 
                  type="text" 
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  placeholder="Quick add a new task..."
                  className="w-full bg-black/50 border border-white/10 rounded-2xl pl-10 pr-24 py-4 text-sm text-white focus:outline-none focus:border-[#ab7e31]/50 focus:bg-black transition-all placeholder:text-gray-700"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-white hover:bg-[#ab7e31] text-black text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                >
                  Add Task
                </button>
              </form>

              <div className="space-y-4">
                {sortedTasks.map((t) => (
                  <div 
                    key={t.id} 
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500 gap-4 ${
                      completingId === t.id ? 'opacity-0 scale-95 -translate-y-4 pointer-events-none shadow-[0_0_30px_rgba(171,126,49,0.3)]' : 'opacity-100 scale-100'
                    }`}
                  >
                    <div className="flex items-center space-x-4 flex-grow">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border ${
                        t.priority === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        t.priority === 'Medium' ? 'bg-[#ab7e31]/10 text-[#ab7e31] border-[#ab7e31]/20' :
                        'bg-gray-500/10 text-gray-400 border-white/10'
                      }`}>
                        {t.priority[0]}
                      </div>
                      <div>
                        <p className={`text-white font-bold text-sm transition-all duration-300 ${completingId === t.id ? 'line-through text-gray-500' : ''}`}>
                          {t.task}
                        </p>
                        <div className="flex items-center space-x-3 mt-1">
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Assigned to {t.owner}</p>
                          <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Due {new Date(t.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        t.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 
                        t.status === 'Review' ? 'bg-[#ab7e31]/20 text-[#ab7e31]' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {t.status}
                      </span>
                      <button 
                        onClick={() => handleCompleteTask(t.id)}
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#ab7e31] text-gray-500 hover:text-black flex items-center justify-center transition-all border border-white/5 hover:border-transparent group/btn"
                        title="Mark as Complete"
                      >
                        <i className={`fas fa-check text-xs transition-transform group-hover/btn:scale-125 ${completingId === t.id ? 'animate-bounce' : ''}`}></i>
                      </button>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="py-12 text-center text-gray-600">
                    <i className="fas fa-check-double text-4xl mb-4 block opacity-20"></i>
                    <p className="text-sm font-light uppercase tracking-widest">All tasks completed. You're operating at peak potential.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6">Hour Utilization</h3>
                <div className="flex items-end space-x-2 h-32 mb-6">
                  {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#ab7e31]/20 rounded-t-lg transition-all hover:bg-[#ab7e31]" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  <span>Current Period</span>
                  <span className="text-white">72/80 Hours used</span>
                </div>
              </div>
              
              <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Next Engagement</h3>
                  <p className="text-2xl text-white font-black logo-font leading-tight">Product Sprint <br />Review</p>
                  <p className="text-[#ab7e31] text-xs mt-2 font-bold">Today at 4:30 PM (CST)</p>
                </div>
                <button className="w-full mt-6 py-3 bg-white text-black font-black rounded-xl text-xs uppercase tracking-widest hover:bg-[#ab7e31] transition-colors">Join Zoom</button>
              </div>
            </div>

            <div className="glass p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-[#ab7e31]/5 rounded-full blur-3xl -mr-24 -mt-24"></div>
               <div className="relative z-10">
                  <div className="mb-8">
                    <h3 className="text-xl font-black logo-font text-white uppercase tracking-widest flex items-center">
                      <i className="fas fa-star-half-stroke text-[#ab7e31] mr-3"></i> Stellar Feedback
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 font-light">How are we performing? Help us refine your elite experience.</p>
                  </div>

                  {feedbackSubmitted ? (
                    <div className="py-12 text-center animate-fade-in">
                      <div className="w-16 h-16 bg-[#ab7e31]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#ab7e31]/30">
                        <i className="fas fa-check text-[#ab7e31] text-xl"></i>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Feedback Received</h4>
                      <p className="text-gray-500 text-sm">Thank you for helping us maintain the Black Star standard.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFeedbackClick} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Evaluation Subject</label>
                          <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ab7e31]/50 appearance-none font-bold">
                            <option>General Service Quality</option>
                            <option>Sarah Miller (Admin)</option>
                            <option>Marcus Chen (Creative)</option>
                            <option>Technical Support Team</option>
                            <option>Bookkeeping Accuracy</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Stellar Rating</label>
                          <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className={`text-2xl transition-all ${
                                  (hover || rating) >= star ? 'text-[#ab7e31]' : 'text-gray-800'
                                }`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                              >
                                <i className="fas fa-star"></i>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Your Perspective</label>
                        <textarea 
                          rows={3}
                          placeholder="What can we do to further elevate your partnership?"
                          className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#ab7e31]/50 placeholder:text-gray-700 font-light leading-relaxed"
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="px-10 py-4 bg-[#ab7e31] text-black font-black rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl shadow-[#ab7e31]/10"
                      >
                        Submit Evaluation
                      </button>
                    </form>
                  )}
               </div>
            </div>
          </div>

          <div className="space-y-8">
             <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6">Strategic Team</h3>
                <div className="space-y-6">
                  {[
                    { name: "Sarah Miller", role: "Lead Executive Admin", img: "https://picsum.photos/id/64/100/100" },
                    { name: "Marcus Chen", role: "Creative Strategist", img: "https://picsum.photos/id/91/100/100" },
                    { name: "Aria AI", role: "Stellar Support Agent", img: "https://picsum.photos/id/1/100/100" }
                  ].map((m, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="relative">
                        <img src={m.img} alt={m.name} className="w-12 h-12 rounded-xl border border-white/10 object-cover" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-black"></div>
                      </div>
                      <div>
                        <p className="text-white text-sm font-bold">{m.name}</p>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3.5 glass text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/10 hover:bg-white/5 transition-colors">Direct Messaging</button>
             </div>

             <div className="glass p-8 rounded-3xl border border-[#ab7e31]/30 bg-[#ab7e31]/5 relative overflow-hidden">
                <div className="absolute -bottom-4 -right-4 opacity-5 transform rotate-12">
                   <i className="fas fa-file-invoice-dollar text-9xl text-white"></i>
                </div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Finance</h3>
                <p className="text-white font-bold text-sm mb-6">Cosmic Enterprise Plan</p>
                <div className="text-4xl font-black logo-font text-white mb-4 tracking-tighter">
                  <span className="text-xl text-[#ab7e31] mr-1">$</span>2,500.00
                </div>
                <p className="text-[10px] text-gray-500 mb-8 font-black uppercase tracking-widest">Renewal: Sept 1, 2024</p>
                <button className="w-full py-4 bg-[#ab7e31] text-black font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-white transition-colors shadow-xl shadow-[#ab7e31]/10 relative z-10">Manage Billing</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
