import React, { useState } from 'react';
import { Lead, BlogPost, Service, Testimonial, Feature, PricingPlan, Booking } from '../../lib/types';
import Button from '../ui/button';
import { cn } from '../../lib/utils';
import HomePage from './pages/HomePage';
import BookingsAppointmentsPage from './pages/BookingsAppointmentsPage';
import ClientsPage from './pages/ClientsPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import SettingsPage from './pages/SettingsPage';
import { ActionTab, AdminTab, Interaction } from './pages/types';

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

const MOCK_BOOKINGS: Booking[] = [
  { id: '101', clientName: 'Abebe Bikila', clientEmail: 'abebe@marathon.et', serviceId: 'consulting', serviceName: 'Strategy Consulting', date: '2025-10-25', time: '10:00', status: 'Confirmed', amount: 150, staffId: 's1' },
  { id: '102', clientName: 'Sara Tadesse', clientEmail: 'sara@fintech.et', serviceId: 'security', serviceName: 'Security Audit', date: '2025-10-26', time: '14:30', status: 'Pending', amount: 300, staffId: 's2' },
  { id: '103', clientName: 'John Doe', clientEmail: 'john@example.com', serviceId: 'web-dev', serviceName: 'Web Development', date: '2025-10-24', time: '09:00', status: 'Completed', amount: 1200, staffId: 's1' },
  { id: '104', clientName: 'Jane Smith', clientEmail: 'jane@example.com', serviceId: 'ui-ux', serviceName: 'UI/UX Design', date: '2025-10-28', time: '11:00', status: 'Cancelled', amount: 450, staffId: 's3' },
];

const AVAILABLE_TAGS = ['VIP', 'New Client', 'Returning', 'Corporate', 'High Value', 'At Risk'];

const TAB_LABELS: Record<AdminTab, string> = {
  dashboard: 'Home',
  calendar: 'Bookings',
  blog: 'Blog',
  services: 'Services',
  clients: 'Clients',
  settings: 'Settings',
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  leads,
  setLeads,
  blogPosts,
  setBlogPosts,
  services,
  setServices,
  features,
  setFeatures,
  testimonials,
  setTestimonials,
  pricingPlans,
  setPricingPlans,
  onExit,
  isDarkMode,
  toggleTheme,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [selectedClient, setSelectedClient] = useState<Lead | null>(null);
  const [crmHistory, setCrmHistory] = useState<Interaction[]>([]);
  const [actionTab, setActionTab] = useState<ActionTab>('email');
  const [actionSubject, setActionSubject] = useState('');
  const [actionContent, setActionContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [clientSearch, setClientSearch] = useState('');
  const [clientFilter, setClientFilter] = useState('All');
  const [clientStatusFilter, setClientStatusFilter] = useState<'All' | Lead['status']>('All');
  const [isEditingService, setIsEditingService] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});
  const [serviceSearch, setServiceSearch] = useState('');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>('All');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>('All');
  const [blogSearch, setBlogSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<'All' | Booking['status']>('All');
  const [bookingSearch, setBookingSearch] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const openClientCRM = (client: Lead) => {
    setSelectedClient(client);
    setCrmHistory([
      { id: 1, type: 'email', date: new Date(Date.now() - 86400000 * 2).toISOString(), title: 'Welcome Email', content: 'Automated welcome packet sent successfully.', status: 'sent' },
      { id: 2, type: 'note', date: new Date(Date.now() - 86400000 * 5).toISOString(), title: 'System Inquiry', content: `User interested in ${client.issue}. Industry: ${client.industry}`, status: 'completed' },
    ]);
    setActionSubject('');
    setActionContent('');
  };

  const handleSendAction = async () => {
    if (!actionContent) return;
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newInteraction: Interaction = {
      id: Date.now(),
      type: actionTab,
      date: new Date().toISOString(),
      title: actionTab === 'email' ? actionSubject || '(No Subject)' : actionTab === 'sms' ? 'Outgoing SMS' : actionTab === 'call' ? 'Call Logged' : 'Note Added',
      content: actionContent,
      status: 'sent',
    };

    setCrmHistory([newInteraction, ...crmHistory]);
    setActionContent('');
    setActionSubject('');
    setIsSending(false);
  };

  const deleteBooking = (id: string) => {
    if (confirm('Cancel this booking?')) {
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b)));
    }
  };

  const toggleTag = (leadId: string, tag: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    const currentTags = lead.tags || [];
    const newTags = currentTags.includes(tag) ? currentTags.filter((t) => t !== tag) : [...currentTags, tag];
    const updatedLead = { ...lead, tags: newTags };
    setLeads(leads.map((l) => (l.id === leadId ? updatedLead : l)));

    if (selectedClient && selectedClient.id === leadId) {
      setSelectedClient(updatedLead);
    }
  };

  const handleGlobalSearchChange = (value: string) => {
    if (activeTab === 'clients') setClientSearch(value);
    if (activeTab === 'calendar') setBookingSearch(value);
    if (activeTab === 'services') setServiceSearch(value);
    if (activeTab === 'blog') setBlogSearch(value);
  };

  const handleAddBooking = (data: Omit<Booking, 'id'>) => {
    const newBooking: Booking = { ...data, id: (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2, 9)) };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
  };

  const handleSaveService = (service: Partial<Service>) => {
    if (!service.title || !service.shortDesc || !service.category) return;

    if (service.id) {
      setServices((prev) => prev.map((s) => (s.id === service.id ? { ...s, ...service } as Service : s)));
    } else {
      const id = service.title.toLowerCase().replace(/\s+/g, '-');
      setServices((prev) => [{ ...(service as Service), id, fullDesc: service.fullDesc || service.shortDesc || '', features: service.features || [] }, ...prev]);
    }

    setIsEditingService(false);
    setCurrentService({});
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    if (currentService.id === id) {
      setCurrentService({});
      setIsEditingService(false);
    }
  };

  const handleAddBlogPost = (post: Omit<BlogPost, 'slug'>) => {
    if (!post.title) return;
    const slug = post.title.toLowerCase().replace(/\s+/g, '-');
    setBlogPosts((prev) => [{ ...post, slug }, ...prev]);
  };

  const totalRevenue = bookings.filter((b) => b.status !== 'Cancelled').reduce((acc, curr) => acc + curr.amount, 0);
  const newClients = leads.filter((l) => l.status === 'New').length;
  const monthlyRevenue = Math.round(totalRevenue / 12);
  const loyaltyScore = Math.min(95, 62 + Math.round((newClients / Math.max(1, leads.length || 1)) * 25));
  const chartSeries = [58, 42, 28, 72, 40, 52, 36, 55, 53];
  const chartMonths = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

  const filteredClients = leads.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(clientSearch.toLowerCase()) || client.email.toLowerCase().includes(clientSearch.toLowerCase());
    const matchesTag = clientFilter === 'All' || (client.tags && client.tags.includes(clientFilter));
    const matchesStatus = clientStatusFilter === 'All' || client.status === clientStatusFilter;
    return matchesSearch && matchesTag && matchesStatus;
  });

  const filteredBookings = bookings.filter((booking) => {
    const searchText = bookingSearch.toLowerCase();
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchText) ||
      booking.clientEmail.toLowerCase().includes(searchText) ||
      booking.serviceName.toLowerCase().includes(searchText);
    const matchesStatus = bookingStatusFilter === 'All' || booking.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(serviceSearch.toLowerCase());
    const matchesCategory = serviceCategoryFilter === 'All' || service.category === serviceCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredBlogPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(blogSearch.toLowerCase());
    const matchesCategory = blogCategoryFilter === 'All' || post.category === blogCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const serviceCategories = Array.from(new Set(['All', ...services.map((s) => s.category)]));

  const activeSearchValue =
    activeTab === 'clients'
      ? clientSearch
      : activeTab === 'calendar'
      ? bookingSearch
      : activeTab === 'services'
      ? serviceSearch
      : activeTab === 'blog'
      ? blogSearch
      : '';

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
              <Button type="button" variant="outline" className="w-full border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white" onClick={onExit}>
                Exit
              </Button>
              <Button type="submit" className="w-full font-bold">
                Connect
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const NavItem = ({ id, label, icon }: { id: AdminTab; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsSidebarOpen(false);
        if (id !== 'clients') setSelectedClient(null);
      }}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group overflow-hidden whitespace-nowrap',
        activeTab === id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
      )}
      title={isCollapsed ? label : undefined}
    >
      <span className={cn('transition-colors shrink-0', activeTab === id ? 'text-primary-foreground' : 'text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white')}>{icon}</span>
      <span className={cn('font-medium text-sm tracking-wide transition-opacity duration-300', isCollapsed ? 'opacity-0 w-0 hidden md:block' : 'opacity-100')}>{label}</span>
      <span className="md:hidden font-medium text-sm tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0E14] text-gray-900 dark:text-white font-sans selection:bg-primary/30 transition-colors duration-300">
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 bg-white dark:bg-[#111319] border-r border-gray-200 dark:border-white/5 flex flex-col transition-all duration-300',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isCollapsed ? 'md:w-20' : 'md:w-64',
          'w-64'
        )}
      >
        <div className={cn('h-20 flex items-center px-6 border-b border-gray-200 dark:border-white/5 overflow-hidden', isCollapsed && 'px-0 justify-center')}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className={cn('ml-3 text-lg font-bold tracking-tight transition-opacity duration-300 whitespace-nowrap', isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100')}>
            EthioCodes<span className="text-primary">CRM</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem id="dashboard" label="Home" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>} />
          <NavItem id="calendar" label="Bookings" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>} />
          <NavItem id="blog" label="Blog" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>} />
          <NavItem id="services" label="Services" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>} />
          <NavItem id="clients" label="Clients" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></svg>} />
          <NavItem id="settings" label="Settings" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82 1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>} />
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-white/5 space-y-2">
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:flex items-center justify-center w-full h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors">
            <svg className={cn('w-5 h-5 transition-transform duration-300', isCollapsed ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={onExit} className={cn('flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all', isCollapsed && 'justify-center px-0')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className={cn('font-medium text-sm transition-all duration-300', isCollapsed ? 'hidden opacity-0' : 'block opacity-100')}>Log Out</span>
          </button>
        </div>
      </aside>

      <div className={cn('transition-all duration-300 flex-1 flex flex-col min-h-screen', isCollapsed ? 'md:ml-20' : 'md:ml-64')}>
        <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          <div className="hidden md:flex items-center gap-2 px-4 h-11 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 min-w-[280px] lg:min-w-[360px]">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Tap to search"
              value={activeSearchValue}
              onChange={(e) => handleGlobalSearchChange(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-gray-600 dark:text-gray-300 placeholder:text-gray-400"
            />
          </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white capitalize md:hidden">{selectedClient ? 'Client Profile' : TAB_LABELS[activeTab]}</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-primary transition-colors">
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>
              <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-primary transition-colors">
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
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

        <main className="p-6 md:p-10 space-y-8 flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <HomePage
              totalRevenue={totalRevenue}
              bookings={bookings}
              leads={leads}
              loyaltyScore={loyaltyScore}
              monthlyRevenue={monthlyRevenue}
              chartSeries={chartSeries}
              chartMonths={chartMonths}
            />
          )}

          {activeTab === 'calendar' && (
            <BookingsAppointmentsPage
              bookings={filteredBookings}
              onDeleteBooking={deleteBooking}
              onAddBooking={handleAddBooking}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              statusFilter={bookingStatusFilter}
              onStatusFilterChange={setBookingStatusFilter}
              searchQuery={bookingSearch}
              onSearchChange={setBookingSearch}
            />
          )}

          {activeTab === 'clients' && (
            <ClientsPage
              filteredClients={filteredClients}
              selectedClient={selectedClient}
              clientSearch={clientSearch}
              clientFilter={clientFilter}
              clientStatusFilter={clientStatusFilter}
              availableTags={AVAILABLE_TAGS}
              crmHistory={crmHistory}
              actionTab={actionTab}
              actionSubject={actionSubject}
              actionContent={actionContent}
              isSending={isSending}
              onClientSearchChange={setClientSearch}
              onClientFilterChange={setClientFilter}
              onOpenClientCRM={openClientCRM}
              onCloseClientCRM={() => setSelectedClient(null)}
              onToggleTag={toggleTag}
              onActionTabChange={setActionTab}
              onActionSubjectChange={setActionSubject}
              onActionContentChange={setActionContent}
              onSendAction={handleSendAction}
              onStatusFilterChange={setClientStatusFilter}
            />
          )}

          {activeTab === 'services' && (
            <ServicesPage
              services={filteredServices}
              isEditingService={isEditingService}
              currentService={currentService}
              setCurrentService={setCurrentService}
              setIsEditingService={setIsEditingService}
              serviceSearch={serviceSearch}
              onServiceSearchChange={setServiceSearch}
              serviceCategoryFilter={serviceCategoryFilter}
              onServiceCategoryChange={setServiceCategoryFilter}
              categories={serviceCategories}
              onSaveService={handleSaveService}
              onDeleteService={handleDeleteService}
            />
          )}

          {activeTab === 'blog' && (
            <BlogPage
              blogPosts={filteredBlogPosts}
              onAddPost={handleAddBlogPost}
              categoryFilter={blogCategoryFilter}
              onCategoryFilterChange={setBlogCategoryFilter}
              searchQuery={blogSearch}
              onSearchChange={setBlogSearch}
            />
          )}
          {activeTab === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
