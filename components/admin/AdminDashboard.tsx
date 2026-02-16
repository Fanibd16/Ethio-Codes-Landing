import React, { useState } from 'react';
import { Lead, BlogPost, Service, Testimonial, Feature, PricingPlan, Booking, Staff } from '../../lib/types';
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

interface Interaction {
  id: number;
  type: 'email' | 'sms' | 'call' | 'note';
  date: string;
  title: string;
  content: string;
  status?: 'sent' | 'delivered' | 'missed' | 'completed';
}

// Mock Data for CRM Features
const MOCK_BOOKINGS: Booking[] = [
  { id: '101', clientName: 'Abebe Bikila', clientEmail: 'abebe@marathon.et', serviceId: 'consulting', serviceName: 'Strategy Consulting', date: '2025-10-25', time: '10:00', status: 'Confirmed', amount: 150, staffId: 's1' },
  { id: '102', clientName: 'Sara Tadesse', clientEmail: 'sara@fintech.et', serviceId: 'security', serviceName: 'Security Audit', date: '2025-10-26', time: '14:30', status: 'Pending', amount: 300, staffId: 's2' },
  { id: '103', clientName: 'John Doe', clientEmail: 'john@example.com', serviceId: 'web-dev', serviceName: 'Web Development', date: '2025-10-24', time: '09:00', status: 'Completed', amount: 1200, staffId: 's1' },
  { id: '104', clientName: 'Jane Smith', clientEmail: 'jane@example.com', serviceId: 'ui-ux', serviceName: 'UI/UX Design', date: '2025-10-28', time: '11:00', status: 'Cancelled', amount: 450, staffId: 's3' },
];

const MOCK_STAFF: Staff[] = [
  { id: 's1', name: 'Dawit Amare', role: 'Lead Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dawit', email: 'dawit@ethiocodes.com', phone: '+251 911 111 111', status: 'Active', performance: 95 },
  { id: 's2', name: 'Sara Kebede', role: 'Security Analyst', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara', email: 'sara@ethiocodes.com', phone: '+251 922 222 222', status: 'Active', performance: 88 },
  { id: 's3', name: 'Elias Tesfaye', role: 'Product Designer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elias', email: 'elias@ethiocodes.com', phone: '+251 933 333 333', status: 'On Leave', performance: 92 },
];

const AVAILABLE_TAGS = ['VIP', 'New Client', 'Returning', 'Corporate', 'High Value', 'At Risk'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  leads, setLeads, 
  blogPosts, setBlogPosts,
  services, setServices,
  testimonials, setTestimonials,
  onExit, isDarkMode, toggleTheme
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calendar' | 'clients' | 'staff' | 'finance' | 'services' | 'blog' | 'settings'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Data State
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [staff, setStaff] = useState<Staff[]>(MOCK_STAFF);
  
  // CRM Interaction State
  const [selectedClient, setSelectedClient] = useState<Lead | null>(null);
  const [crmHistory, setCrmHistory] = useState<Interaction[]>([]);
  const [actionTab, setActionTab] = useState<'email' | 'sms' | 'call' | 'note'>('email');
  const [actionSubject, setActionSubject] = useState('');
  const [actionContent, setActionContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  // Filtering & Search
  const [clientSearch, setClientSearch] = useState('');
  const [clientFilter, setClientFilter] = useState('All');

  // Edit States
  const [isEditingService, setIsEditingService] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  // --- CRM Logic ---
  const openClientCRM = (client: Lead) => {
    setSelectedClient(client);
    setCrmHistory([
      { id: 1, type: 'email', date: new Date(Date.now() - 86400000 * 2).toISOString(), title: 'Welcome Email', content: 'Automated welcome packet sent successfully.', status: 'sent' },
      { id: 2, type: 'note', date: new Date(Date.now() - 86400000 * 5).toISOString(), title: 'System Inquiry', content: `User interested in ${client.issue}. Industry: ${client.industry}`, status: 'completed' }
    ]);
    setActionSubject('');
    setActionContent('');
  };

  const handleSendAction = async () => {
    if (!actionContent) return;
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API

    const newInteraction: Interaction = {
      id: Date.now(),
      type: actionTab,
      date: new Date().toISOString(),
      title: actionTab === 'email' ? (actionSubject || '(No Subject)') : 
             actionTab === 'sms' ? 'Outgoing SMS' : 
             actionTab === 'call' ? 'Call Logged' : 'Note Added',
      content: actionContent,
      status: 'sent'
    };

    setCrmHistory([newInteraction, ...crmHistory]);
    setActionContent('');
    setActionSubject('');
    setIsSending(false);
  };

  const deleteBooking = (id: string) => {
    if (confirm('Cancel this booking?')) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
    }
  };

  const toggleTag = (leadId: string, tag: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;
    
    const currentTags = lead.tags || [];
    const newTags = currentTags.includes(tag) 
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
      
    const updatedLead = { ...lead, tags: newTags };
    setLeads(leads.map(l => l.id === leadId ? updatedLead : l));
    
    if (selectedClient && selectedClient.id === leadId) {
      setSelectedClient(updatedLead);
    }
  };

  // --- Stats Calculation ---
  const totalRevenue = bookings.filter(b => b.status !== 'Cancelled').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const newClients = leads.filter(l => l.status === 'New').length;

  const filteredClients = leads.filter(client => {
     const matchesSearch = client.name.toLowerCase().includes(clientSearch.toLowerCase()) || 
                           client.email.toLowerCase().includes(clientSearch.toLowerCase());
     const matchesFilter = clientFilter === 'All' || (client.tags && client.tags.includes(clientFilter));
     return matchesSearch && matchesFilter;
  });

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
              placeholder="Enter Access Key (admin)"
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
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); setSelectedClient(null); }}
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
        "w-64"
      )}>
        <div className={cn("h-20 flex items-center px-6 border-b border-gray-200 dark:border-white/5 overflow-hidden", isCollapsed && "px-0 justify-center")}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className={cn("ml-3 text-lg font-bold tracking-tight transition-opacity duration-300 whitespace-nowrap", isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
            EthioCodes<span className="text-primary">CRM</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className={cn("px-4 py-2 text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2 transition-all duration-300", isCollapsed && "opacity-0 h-0 overflow-hidden")}>Business</p>
          <NavItem id="dashboard" label="Overview" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>} />
          <NavItem id="calendar" label="Bookings" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>} />
          <NavItem id="clients" label="Clients" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} />
          <NavItem id="staff" label="Staff" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} />
          <NavItem id="finance" label="Finance" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
          
          <p className={cn("px-4 py-2 text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mt-6 mb-2 transition-all duration-300", isCollapsed && "opacity-0 h-0 overflow-hidden")}>Website</p>
          <NavItem id="services" label="Services" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>} />
          <NavItem id="blog" label="Blog" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>} />
          
          <p className={cn("px-4 py-2 text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mt-6 mb-2 transition-all duration-300", isCollapsed && "opacity-0 h-0 overflow-hidden")}>System</p>
          <NavItem id="settings" label="Settings" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>} />
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-white/5 space-y-2">
           <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:flex items-center justify-center w-full h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors">
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
             <h1 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
               {selectedClient ? 'Client Profile' : activeTab === 'clients' ? 'Clients' : activeTab}
             </h1>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-4">
               <button className="relative p-2 text-gray-500 hover:text-primary transition-colors">
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
               </button>
               <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-primary transition-colors">
                  {isDarkMode ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  )}
               </button>
             </div>
             <div className="h-8 w-px bg-gray-200 dark:bg-white/10"></div>
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">AD</div>
                <div className="hidden md:block">
                   <p className="text-sm font-bold text-gray-900 dark:text-white">Admin User</p>
                   <p className="text-xs text-gray-500">Administrator</p>
                </div>
             </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 md:p-10 space-y-8 flex-1 overflow-y-auto">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { label: "Total Bookings", val: bookings.length, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "text-blue-500" },
                   { label: "Pending", val: pendingBookings, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-orange-500" },
                   { label: "New Clients", val: newClients, icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z", color: "text-green-500" },
                   { label: "Revenue", val: `$${totalRevenue.toLocaleString()}`, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-emerald-500" }
                 ].map((stat, i) => (
                   <div key={i} className="p-6 rounded-2xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                         <div className={cn("p-3 rounded-xl bg-gray-50 dark:bg-white/5", stat.color)}>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={stat.icon}/></svg>
                         </div>
                         <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+12%</span>
                      </div>
                      <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.val}</h4>
                      <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                   </div>
                 ))}
              </div>

              {/* Chart Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm">
                   <div className="flex justify-between items-center mb-8">
                     <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Trends</h3>
                     <select className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs px-3 py-1.5 outline-none">
                       <option>This Month</option>
                       <option>Last Month</option>
                     </select>
                   </div>
                   <div className="h-64 flex items-end justify-between gap-4 px-2">
                      {[40, 60, 45, 70, 50, 65, 80, 55, 75, 60, 90, 85].map((h, i) => (
                        <div key={i} className="w-full bg-primary/10 rounded-t-lg relative group">
                           <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500 group-hover:bg-primary/80" style={{ height: `${h}%` }}></div>
                        </div>
                      ))}
                   </div>
                   <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium uppercase tracking-wider">
                      <span>Jan</span><span>Dec</span>
                   </div>
                </div>

                <div className="p-8 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm flex flex-col">
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                   <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      {bookings.slice(0, 5).map((b, i) => (
                        <div key={i} className="flex gap-4 items-start">
                           <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 font-bold text-xs text-primary">
                             {b.clientName.charAt(0)}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{b.clientName}</p>
                              <p className="text-xs text-gray-500">booked <span className="text-primary">{b.serviceName}</span></p>
                              <p className="text-[10px] text-gray-400 mt-1">{b.date} at {b.time}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bookings & Appointments</h2>
                  <Button className="gap-2">+ New Booking</Button>
               </div>
               
               <div className="rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                      <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase font-bold text-gray-400 dark:text-gray-300">
                        <tr>
                          <th className="p-6">Client</th>
                          <th className="p-6">Service</th>
                          <th className="p-6">Date & Time</th>
                          <th className="p-6">Amount</th>
                          <th className="p-6">Status</th>
                          <th className="p-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {bookings.map(booking => (
                          <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                            <td className="p-6 font-medium text-gray-900 dark:text-white">{booking.clientName}</td>
                            <td className="p-6">{booking.serviceName}</td>
                            <td className="p-6">
                               <div className="font-bold">{booking.date}</div>
                               <div className="text-xs opacity-70">{booking.time}</div>
                            </td>
                            <td className="p-6 font-mono">${booking.amount}</td>
                            <td className="p-6">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold uppercase",
                                booking.status === 'Confirmed' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                booking.status === 'Pending' ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                                booking.status === 'Cancelled' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                              )}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="p-6 text-right">
                               <button onClick={() => deleteBooking(booking.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                               </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'clients' && (
             <div className="animate-in fade-in duration-300 h-full flex flex-col">
                {!selectedClient ? (
                  // Client List
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Client Management</h2>
                       <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Search clients..." 
                            value={clientSearch}
                            onChange={(e) => setClientSearch(e.target.value)}
                            className="bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary w-64 text-gray-900 dark:text-white" 
                          />
                          <select 
                            value={clientFilter}
                            onChange={(e) => setClientFilter(e.target.value)}
                            className="bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary h-10 text-gray-900 dark:text-white"
                          >
                            <option value="All">All Tags</option>
                            {AVAILABLE_TAGS.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                          </select>
                          <Button variant="outline" className="h-10 text-xs">Export CSV</Button>
                       </div>
                    </div>
                    <div className="rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
                       <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                           <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase font-bold text-gray-400 dark:text-gray-300">
                             <tr>
                               <th className="p-6">Client Name</th>
                               <th className="p-6">Contact</th>
                               <th className="p-6">Industry</th>
                               <th className="p-6">Status</th>
                               <th className="p-6 text-right">Actions</th>
                             </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                             {filteredClients.map(client => (
                               <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] group cursor-pointer" onClick={() => openClientCRM(client)}>
                                 <td className="p-6">
                                   <div className="text-gray-900 dark:text-white font-bold text-base group-hover:text-primary transition-colors">{client.name}</div>
                                   <div className="flex gap-1 mt-1">
                                      {client.tags?.map(tag => (
                                        <span key={tag} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20">{tag}</span>
                                      ))}
                                   </div>
                                 </td>
                                 <td className="p-6">
                                   <div className="text-gray-900 dark:text-white">{client.email}</div>
                                   <div className="text-xs text-gray-500">{client.phone}</div>
                                 </td>
                                 <td className="p-6">{client.industry}</td>
                                 <td className="p-6">
                                   <span className={cn(
                                     "px-3 py-1 rounded-full text-xs font-bold uppercase border",
                                     client.status === 'New' ? "bg-primary/20 text-primary border-primary/30" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700"
                                   )}>
                                     {client.status}
                                   </span>
                                 </td>
                                 <td className="p-6 text-right">
                                   <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">Profile</Button>
                                 </td>
                               </tr>
                             ))}
                             {filteredClients.length === 0 && (
                               <tr>
                                 <td colSpan={5} className="p-8 text-center text-gray-400 italic">No clients found matching your filters.</td>
                               </tr>
                             )}
                           </tbody>
                         </table>
                       </div>
                    </div>
                  </div>
                ) : (
                  // Detail CRM View (Preserved from previous step)
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                    <div className="space-y-6">
                       <Button variant="ghost" className="pl-0 gap-2 text-gray-500 hover:text-foreground" onClick={() => setSelectedClient(null)}>← Back to Clients</Button>
                       
                       <div className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm text-center">
                          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-3xl font-bold text-white mb-4">
                            {selectedClient.name.charAt(0)}
                          </div>
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedClient.name}</h2>
                          <p className="text-sm text-gray-500 mb-6">{selectedClient.industry}</p>
                          
                          <div className="grid grid-cols-2 gap-2 text-left bg-gray-50 dark:bg-white/5 p-4 rounded-xl text-xs mb-6">
                             <div>
                                <p className="text-gray-400 uppercase font-bold">Total Spend</p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">${selectedClient.totalSpend || 0}</p>
                             </div>
                             <div>
                                <p className="text-gray-400 uppercase font-bold">Bookings</p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">0</p>
                             </div>
                          </div>

                          <div className="space-y-3 text-left">
                             <div><span className="text-xs text-gray-400 uppercase font-bold block">Email</span> {selectedClient.email}</div>
                             <div><span className="text-xs text-gray-400 uppercase font-bold block">Phone</span> {selectedClient.phone}</div>
                             <div><span className="text-xs text-gray-400 uppercase font-bold block">Website</span> {selectedClient.website}</div>
                          </div>

                          {/* Tags Section */}
                          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 text-left">
                              <p className="text-xs font-bold uppercase text-gray-400 mb-3">Tags</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                  {(selectedClient.tags || []).map(tag => (
                                      <span key={tag} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold border border-primary/20 flex items-center gap-1">
                                          {tag}
                                          <button onClick={() => toggleTag(selectedClient.id, tag)} className="hover:text-red-500 w-3 h-3 flex items-center justify-center bg-black/10 rounded-full">×</button>
                                      </span>
                                  ))}
                                  {(selectedClient.tags || []).length === 0 && <span className="text-xs text-gray-400 italic">No tags assigned</span>}
                              </div>
                              <div className="relative group inline-block">
                                  <button className="text-xs text-primary font-bold hover:underline bg-primary/5 px-2 py-1 rounded border border-primary/10">+ Add Tag</button>
                                  <div className="hidden group-hover:block absolute top-full left-0 mt-1 w-40 bg-white dark:bg-[#1A1D26] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl z-20 p-2">
                                      {AVAILABLE_TAGS.filter(t => !(selectedClient.tags || []).includes(t)).map(tag => (
                                          <button 
                                              key={tag}
                                              onClick={() => toggleTag(selectedClient.id, tag)}
                                              className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-white/5 rounded-md text-gray-700 dark:text-gray-300"
                                          >
                                              {tag}
                                          </button>
                                      ))}
                                      {AVAILABLE_TAGS.filter(t => !(selectedClient.tags || []).includes(t)).length === 0 && (
                                          <div className="px-3 py-2 text-xs text-gray-400">All tags assigned</div>
                                      )}
                                  </div>
                              </div>
                          </div>
                       </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-6">
                       {/* Communication Module */}
                       <div className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm">
                          <div className="flex gap-2 mb-6 border-b border-gray-100 dark:border-white/5 pb-1">
                             {(['email', 'sms', 'call', 'note'] as const).map(tab => (
                               <button key={tab} onClick={() => setActionTab(tab)} className={cn("px-4 py-2 text-sm font-bold capitalize border-b-2 relative top-[2px]", actionTab === tab ? "text-primary border-primary" : "text-gray-400 border-transparent hover:text-gray-600")}>{tab}</button>
                             ))}
                          </div>

                          <div className="space-y-4">
                             {actionTab === 'email' && (
                               <div className="space-y-3 p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 mb-4">
                                  <div className="flex items-center justify-between text-xs text-gray-500 border-b border-gray-200 dark:border-white/10 pb-2">
                                    <span>From: <span className="font-medium">System</span></span>
                                    <span>To: <span className="font-medium">{selectedClient.email}</span></span>
                                  </div>
                                  <input type="text" placeholder="Subject" value={actionSubject} onChange={(e) => setActionSubject(e.target.value)} className="w-full bg-transparent font-bold text-sm focus:outline-none" />
                                </div>
                             )}
                             {actionTab === 'sms' && (
                                <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 dark:bg-black/20 rounded-lg mb-2">To: <span className="font-medium">{selectedClient.phone}</span></div>
                             )}
                             <textarea placeholder="Type your message..." value={actionContent} onChange={(e) => setActionContent(e.target.value)} className="w-full h-32 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-sm resize-none" />
                             <div className="flex justify-end gap-3">
                                <Button onClick={handleSendAction} disabled={!actionContent || isSending}>{isSending ? 'Sending...' : `Send ${actionTab.toUpperCase()}`}</Button>
                             </div>
                          </div>
                       </div>

                       {/* History */}
                       <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Activity History</h3>
                          <div className="border-l-2 border-gray-100 dark:border-white/5 ml-4 space-y-6 pl-8 pb-8">
                             {crmHistory.map((item) => (
                               <div key={item.id} className="relative">
                                  <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full border-2 border-gray-400 bg-white dark:bg-[#0B0E14] z-10"></div>
                                  <div className="bg-white dark:bg-[#13161C] p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                                     <div className="flex justify-between mb-2">
                                        <h5 className="font-bold text-sm capitalize">{item.type}: {item.title}</h5>
                                        <span className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</span>
                                     </div>
                                     <p className="text-sm text-gray-600 dark:text-gray-400">{item.content}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
                )}
             </div>
          )}

          {activeTab === 'staff' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Management</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staff.map(member => (
                    <div key={member.id} className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm text-center group hover:border-primary/30 transition-all">
                       <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden mb-4">
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                       </div>
                       <h3 className="font-bold text-lg text-gray-900 dark:text-white">{member.name}</h3>
                       <p className="text-sm text-gray-500 mb-4">{member.role}</p>
                       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 dark:bg-white/5 text-xs font-medium">
                          <span className={cn("w-2 h-2 rounded-full", member.status === 'Active' ? "bg-green-500" : "bg-yellow-500")}></span>
                          {member.status}
                       </div>
                       <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-400 uppercase font-bold">Performance</p>
                            <p className="text-lg font-bold">{member.performance}%</p>
                          </div>
                          <div>
                            <Button size="sm" variant="outline" className="w-full text-xs">View Profile</Button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
          
          {activeTab === 'services' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h2>
                 <Button className="gap-2" onClick={() => { setCurrentService({}); setIsEditingService(true); }}>+ Add Service</Button>
              </div>
              
              {isEditingService ? (
                 <div className="p-8 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm">
                    <h3 className="font-bold mb-6 text-gray-900 dark:text-white">Edit Service</h3>
                    <form className="space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-xs uppercase font-bold text-gray-500">Service Title</label>
                             <input type="text" value={currentService.title || ''} onChange={e => setCurrentService({...currentService, title: e.target.value})} className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs uppercase font-bold text-gray-500">Price ($)</label>
                             <input type="number" value={currentService.price || ''} onChange={e => setCurrentService({...currentService, price: Number(e.target.value)})} className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none" />
                          </div>
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs uppercase font-bold text-gray-500">Description</label>
                         <textarea value={currentService.shortDesc || ''} onChange={e => setCurrentService({...currentService, shortDesc: e.target.value})} className="w-full h-32 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none resize-none" />
                       </div>
                       <div className="flex justify-end gap-4">
                          <Button type="button" variant="outline" onClick={() => setIsEditingService(false)}>Cancel</Button>
                          <Button type="button">Save Changes</Button>
                       </div>
                    </form>
                 </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map(service => (
                    <div key={service.id} className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 group shadow-sm">
                       <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                             <span className="font-bold text-xs">{service.category.substring(0,3)}</span>
                          </div>
                          <button onClick={() => { setCurrentService(service); setIsEditingService(true); }} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/10">Edit</button>
                       </div>
                       <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                       <p className="text-gray-500 text-sm line-clamp-2 mb-4">{service.shortDesc}</p>
                       <p className="font-bold text-primary">${service.price || 'Custom'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'blog' && (
             <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h2>
                  <Button className="gap-2 text-xs h-9">+ New Post</Button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                   {blogPosts.map((post, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-all shadow-sm">
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
                      </div>
                   ))}
                </div>
             </div>
          )}

          {activeTab === 'settings' && (
             <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Business Settings</h2>
                <div className="p-8 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm space-y-6">
                   <h3 className="font-bold text-lg">General Information</h3>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">Business Name</label>
                         <input type="text" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5" defaultValue="EthioCodes Systems" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">Contact Email</label>
                         <input type="email" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5" defaultValue="admin@ethiocodes.com" />
                      </div>
                   </div>
                   
                   <h3 className="font-bold text-lg pt-4 border-t border-gray-100 dark:border-white/5">Working Hours</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                         <span className="text-sm font-medium">Weekdays</span>
                         <span className="text-xs text-gray-500">09:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                         <span className="text-sm font-medium">Weekends</span>
                         <span className="text-xs text-gray-500">Closed</span>
                      </div>
                   </div>

                   <div className="pt-4 flex justify-end">
                      <Button>Save Settings</Button>
                   </div>
                </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;