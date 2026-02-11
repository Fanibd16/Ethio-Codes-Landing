
import React, { useState } from 'react';
import { Lead, BlogPost, Service, Testimonial, Feature, PricingPlan } from '../../lib/types';
import Button from '../ui/button';
import { cn } from '../../lib/utils';

interface AdminDashboardProps {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  pricingPlans: PricingPlan[];
  setPricingPlans: React.Dispatch<React.SetStateAction<PricingPlan[]>>;
  onExit: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  leads, 
  setLeads, 
  blogPosts, 
  setBlogPosts,
  services,
  setServices,
  testimonials,
  setTestimonials,
  onExit,
  isDarkMode,
  toggleTheme
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'blog' | 'services' | 'testimonials'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Edit States
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [isEditingService, setIsEditingService] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});
  const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  // --- CRUD Handlers ---

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  };

  const deleteLead = (id: string) => {
    if (confirm('Delete lead?')) setLeads(leads.filter(l => l.id !== id));
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost.title) return;
    const slug = currentPost.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const newPost: BlogPost = {
      slug: currentPost.slug || slug,
      title: currentPost.title || '',
      excerpt: currentPost.excerpt || '',
      content: currentPost.content || '',
      date: currentPost.date || new Date().toLocaleDateString(),
      category: currentPost.category || 'General',
      image: currentPost.image || 'https://via.placeholder.com/800',
      author: currentPost.author || 'Admin',
      readTime: currentPost.readTime || '5 min read'
    };
    if (currentPost.slug) {
      setBlogPosts(blogPosts.map(p => p.slug === currentPost.slug ? newPost : p));
    } else {
      setBlogPosts([newPost, ...blogPosts]);
    }
    setIsEditingPost(false);
    setCurrentPost({});
  };

  const deletePost = (slug: string) => {
    if (confirm('Delete post?')) setBlogPosts(blogPosts.filter(p => p.slug !== slug));
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService.title || !currentService.id) return;
    const newService = currentService as Service;
    setServices(services.map(s => s.id === newService.id ? newService : s));
    setIsEditingService(false);
    setCurrentService({});
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTestimonial.author) return;
    setTestimonials(testimonials.map(t => t.author === currentTestimonial.author ? currentTestimonial as Testimonial : t));
    setIsEditingTestimonial(false);
    setCurrentTestimonial({});
  };

  // --- Render Helpers ---

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0B0E14] text-gray-900 dark:text-white transition-colors duration-300">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-[#1A1D26] border border-gray-200 dark:border-white/5 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">System Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-gray-900 dark:text-white transition-colors"
              placeholder="Enter Access Key"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex gap-4 pt-2">
              <Button type="button" variant="outline" className="w-full border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white" onClick={onExit}>Exit</Button>
              <Button type="submit" className="w-full font-bold">Connect</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const NavItem = ({ id, label, icon }: { id: typeof activeTab, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group overflow-hidden whitespace-nowrap",
        activeTab === id 
          ? "bg-primary/10 border-l-2 border-primary text-primary" 
          : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
      )}
      title={isCollapsed ? label : undefined}
    >
      <span className={cn("transition-colors shrink-0", activeTab === id ? "text-primary" : "text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white")}>
        {icon}
      </span>
      <span className={cn("font-medium text-sm tracking-wide transition-opacity duration-300", isCollapsed ? "opacity-0 w-0 hidden md:block" : "opacity-100")}>{label}</span>
      {/* Show label on mobile even if desktop is collapsed */}
      <span className="md:hidden font-medium text-sm tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0E14] text-gray-900 dark:text-white font-sans selection:bg-primary/30 transition-colors duration-300">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white dark:bg-[#111319] border-r border-gray-200 dark:border-white/5 flex flex-col transition-all duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        isCollapsed ? "md:w-20" : "md:w-64",
        "w-64" // Mobile width always 64
      )}>
        <div className={cn("h-20 flex items-center px-6 border-b border-gray-200 dark:border-white/5 overflow-hidden", isCollapsed && "px-0 justify-center")}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className={cn("ml-3 text-lg font-bold tracking-tight transition-opacity duration-300 whitespace-nowrap", isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
            Admin<span className="text-primary">Panel</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto overflow-x-hidden">
          <p className={cn("px-4 py-2 text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mt-2 mb-2 transition-all duration-300", isCollapsed && "opacity-0 h-0 overflow-hidden")}>Menu</p>
          <NavItem id="dashboard" label="Dashboard" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>} />
          <NavItem id="leads" label="Leads" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} />
          
          <p className={cn("px-4 py-2 text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mt-6 mb-2 transition-all duration-300", isCollapsed && "opacity-0 h-0 overflow-hidden")}>CMS</p>
          <NavItem id="blog" label="Blog Posts" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>} />
          <NavItem id="services" label="Services" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>} />
          <NavItem id="testimonials" label="Testimonials" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>} />
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-white/5 space-y-2">
           {/* Collapse Button (Desktop) */}
           <button 
             onClick={() => setIsCollapsed(!isCollapsed)} 
             className="hidden md:flex items-center justify-center w-full h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors"
             title="Toggle Sidebar"
           >
             <svg className={cn("w-5 h-5 transition-transform duration-300", isCollapsed ? "rotate-180" : "")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
             </svg>
           </button>

          <button onClick={onExit} className={cn("flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all", isCollapsed && "justify-center px-0")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span className={cn("font-medium text-sm transition-all duration-300", isCollapsed ? "hidden opacity-0" : "block opacity-100")}>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={cn("transition-all duration-300 flex-1 flex flex-col min-h-screen", isCollapsed ? "md:ml-20" : "md:ml-64")}>
        
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
             <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
             </button>
             <div className="hidden md:flex items-center gap-3 bg-gray-100 dark:bg-[#1A1D26] rounded-full px-4 py-2 border border-gray-200 dark:border-white/5">
               <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
               <input type="text" placeholder="Search here..." className="bg-transparent border-none focus:outline-none text-sm w-48 text-gray-900 dark:text-white placeholder-gray-500" />
               <div className="w-5 h-5 rounded bg-primary/20 text-[10px] text-primary flex items-center justify-center font-bold">⌘K</div>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <button 
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1A1D26] border border-gray-200 dark:border-white/5 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all"
             >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
             </button>
             <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1A1D26] border border-gray-200 dark:border-white/5 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
             </button>
             <Button variant="primary" className="hidden md:flex rounded-full px-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" onClick={onExit}>
                Live Site
             </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 md:p-10 space-y-8">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Top Chart Area Mockup */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 relative overflow-hidden group shadow-sm">
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Traffic Overview
                      </h3>
                      <p className="text-gray-500 text-sm">Real-time visitor analytics</p>
                    </div>
                    <div className="flex gap-2">
                       <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">24.5k</span>
                    </div>
                  </div>
                  {/* CSS Chart Mock */}
                  <div className="h-48 flex items-end justify-between gap-2 px-2 relative z-10">
                    {[40, 65, 45, 80, 55, 70, 45, 90, 60, 75, 50, 85].map((h, i) => (
                      <div key={i} className="w-full bg-gradient-to-t from-primary/10 to-primary/40 rounded-t-sm hover:from-primary/20 hover:to-primary transition-all duration-300" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-100 pointer-events-none"></div>
                </div>

                <div className="space-y-8">
                   <div className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 flex flex-col justify-center h-full shadow-sm">
                      <p className="text-gray-500 text-sm font-medium mb-4">Total Leads</p>
                      <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{leads.length}</h3>
                      <div className="flex items-center text-primary text-sm gap-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                        +12% from last week
                      </div>
                      {/* Mini Line Chart */}
                      <div className="mt-6 h-12 flex items-end gap-1">
                        {[20,40,30,50,40,60,80].map((h,i) => (
                           <div key={i} className="w-full bg-primary/20 rounded-full" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Active Services", val: services.length, color: "text-blue-500 dark:text-blue-400" },
                  { label: "Blog Posts", val: blogPosts.length, color: "text-purple-500 dark:text-purple-400" },
                  { label: "Testimonials", val: testimonials.length, color: "text-orange-500 dark:text-orange-400" },
                  { label: "New Leads", val: leads.filter(l => l.status === 'New').length, color: "text-emerald-500 dark:text-emerald-400" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                    <h4 className={cn("text-3xl font-bold", stat.color)}>{stat.val}</h4>
                  </div>
                ))}
              </div>

              {/* Recent Leads Table (Simplified) */}
              <div className="rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-white/5 flex justify-between items-center">
                   <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Inquiries</h3>
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="text-xs text-primary font-bold uppercase">Live</span>
                   </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase font-bold text-gray-400 dark:text-gray-300">
                      <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {leads.slice(0, 5).map(lead => (
                        <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                          <td className="p-4 text-gray-900 dark:text-white font-medium">{lead.name}</td>
                          <td className="p-4">
                            <span className={cn(
                              "px-2 py-1 rounded-md text-[10px] font-bold uppercase",
                              lead.status === 'New' ? "bg-primary/20 text-primary" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                            )}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">{new Date(lead.date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Services</h2>
              </div>
              
              {isEditingService ? (
                 <div className="p-8 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm">
                    <h3 className="font-bold mb-6 text-gray-900 dark:text-white">Edit Service</h3>
                    <form onSubmit={handleSaveService} className="space-y-6">
                       <div className="space-y-2">
                         <label className="text-xs uppercase font-bold text-gray-500">Service Title</label>
                         <input type="text" value={currentService.title || ''} onChange={e => setCurrentService({...currentService, title: e.target.value})} className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-gray-900 dark:text-white" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs uppercase font-bold text-gray-500">Description</label>
                         <textarea value={currentService.shortDesc || ''} onChange={e => setCurrentService({...currentService, shortDesc: e.target.value})} className="w-full h-32 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-gray-900 dark:text-white resize-none" />
                       </div>
                       <div className="flex justify-end gap-4">
                          <Button type="button" variant="outline" className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 border-gray-200 dark:border-white/10" onClick={() => setIsEditingService(false)}>Cancel</Button>
                          <Button type="submit">Save Changes</Button>
                       </div>
                    </form>
                 </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map(service => (
                    <div key={service.id} className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-all group shadow-sm">
                       <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                             <span className="font-bold text-xs">{service.category.substring(0,3)}</span>
                          </div>
                          <button onClick={() => { setCurrentService(service); setIsEditingService(true); }} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white">Edit</button>
                       </div>
                       <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                       <p className="text-gray-500 text-sm line-clamp-2">{service.shortDesc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'testimonials' && (
             <div className="space-y-6 animate-in fade-in duration-300">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Client Testimonials</h2>
               
               {isEditingTestimonial ? (
                  <div className="p-8 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm">
                     <h3 className="font-bold mb-6 text-gray-900 dark:text-white">Edit Testimonial</h3>
                     <form onSubmit={handleSaveTestimonial} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase font-bold text-gray-500">Quote</label>
                          <textarea value={currentTestimonial.quote || ''} onChange={e => setCurrentTestimonial({...currentTestimonial, quote: e.target.value})} className="w-full h-32 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-gray-900 dark:text-white resize-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                             <label className="text-xs uppercase font-bold text-gray-500">Author</label>
                             <input type="text" value={currentTestimonial.author || ''} onChange={e => setCurrentTestimonial({...currentTestimonial, author: e.target.value})} className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-gray-900 dark:text-white" />
                           </div>
                           <div className="space-y-2">
                             <label className="text-xs uppercase font-bold text-gray-500">Role</label>
                             <input type="text" value={currentTestimonial.role || ''} onChange={e => setCurrentTestimonial({...currentTestimonial, role: e.target.value})} className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-gray-900 dark:text-white" />
                           </div>
                        </div>
                        <div className="flex justify-end gap-4">
                           <Button type="button" variant="outline" className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 border-gray-200 dark:border-white/10" onClick={() => setIsEditingTestimonial(false)}>Cancel</Button>
                           <Button type="submit">Save Changes</Button>
                        </div>
                     </form>
                  </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {testimonials.map((t, i) => (
                     <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 relative shadow-sm">
                        <div className="absolute top-6 right-6">
                           <button onClick={() => { setCurrentTestimonial(t); setIsEditingTestimonial(true); }} className="text-gray-400 hover:text-primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 italic mb-6">"{t.quote}"</p>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10">
                              <img src={t.avatar} alt={t.author} className="w-full h-full rounded-full" />
                           </div>
                           <div>
                              <h4 className="font-bold text-sm text-gray-900 dark:text-white">{t.author}</h4>
                              <p className="text-xs text-gray-500">{t.role}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>
          )}

          {activeTab === 'leads' && (
             <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lead Management</h2>
                <div className="rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
                   <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                       <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase font-bold text-gray-400 dark:text-gray-300">
                         <tr>
                           <th className="p-6">Name & Details</th>
                           <th className="p-6">Contact Info</th>
                           <th className="p-6">Status</th>
                           <th className="p-6 text-right">Actions</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                         {leads.map(lead => (
                           <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                             <td className="p-6">
                               <div className="text-gray-900 dark:text-white font-bold text-base">{lead.name}</div>
                               <div className="text-xs text-gray-500 mt-1">{lead.industry}</div>
                               <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">{lead.issue}</div>
                             </td>
                             <td className="p-6">
                               <div className="text-gray-900 dark:text-white">{lead.email}</div>
                               <div className="text-xs text-gray-500">{lead.phone}</div>
                             </td>
                             <td className="p-6">
                               <span className={cn(
                                 "px-3 py-1 rounded-full text-xs font-bold uppercase border",
                                 lead.status === 'New' ? "bg-primary/20 text-primary border-primary/30" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700"
                               )}>
                                 {lead.status}
                               </span>
                             </td>
                             <td className="p-6 text-right space-x-2">
                               {lead.status === 'New' && (
                                 <button onClick={() => updateLeadStatus(lead.id, 'Contacted')} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-xs font-bold text-gray-700 dark:text-white transition-colors">Mark Contacted</button>
                               )}
                               <button onClick={() => deleteLead(lead.id)} className="px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-xs font-bold text-red-500 dark:text-red-400 transition-colors">Delete</button>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'blog' && (
             <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h2>
                  <Button onClick={() => { setCurrentPost({}); setIsEditingPost(true); }} className="gap-2 text-xs h-9">
                    + New Post
                  </Button>
                </div>
                
                {isEditingPost ? (
                  <div className="p-8 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm">
                     <h3 className="font-bold mb-6 text-gray-900 dark:text-white">{currentPost.slug ? 'Edit Post' : 'New Post'}</h3>
                     <form onSubmit={handleSavePost} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase font-bold text-gray-500">Title</label>
                          <input type="text" value={currentPost.title || ''} onChange={e => setCurrentPost({...currentPost, title: e.target.value})} className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-gray-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase font-bold text-gray-500">Excerpt</label>
                          <textarea value={currentPost.excerpt || ''} onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})} className="w-full h-24 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-gray-900 dark:text-white resize-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase font-bold text-gray-500">Content</label>
                          <textarea value={currentPost.content || ''} onChange={e => setCurrentPost({...currentPost, content: e.target.value})} className="w-full h-64 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-gray-900 dark:text-white font-mono text-sm" />
                        </div>
                        <div className="flex justify-end gap-4">
                           <Button type="button" variant="outline" className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 border-gray-200 dark:border-white/10" onClick={() => setIsEditingPost(false)}>Cancel</Button>
                           <Button type="submit">Save Post</Button>
                        </div>
                     </form>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {blogPosts.map((post, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-all group shadow-sm">
                         <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-800 shrink-0 overflow-hidden">
                           <img src={post.image} alt="" className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1 min-w-0">
                           <h4 className="font-bold text-gray-900 dark:text-white truncate">{post.title}</h4>
                           <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                             <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5">{post.category}</span>
                             <span>{post.date}</span>
                           </div>
                         </div>
                         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setCurrentPost(post); setIsEditingPost(true); }} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                            <button onClick={() => deletePost(post.slug)} className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 dark:hover:text-red-400"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>
                         </div>
                      </div>
                    ))}
                  </div>
                )}
             </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
