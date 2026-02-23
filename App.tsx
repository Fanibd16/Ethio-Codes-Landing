
import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Challenges from './components/sections/Challenges';
import Features from './components/sections/Features';
import WhoWeAre from './components/sections/WhoWeAre';
import HowItWorks from './components/sections/HowItWorks';
import Pricing from './components/sections/Pricing';
import Testimonials from './components/sections/Testimonials';
import Blog from './components/sections/Blog';
import Services from './components/sections/Services';
import ServicesDetail from './components/sections/ServicesDetail';
import BlogPostDetail from './components/sections/BlogPostDetail';
import CTA from './components/sections/CTA';
import FAQ from './components/sections/FAQ';
import GradientBackground from './components/shared/GradientBackground';
import ScrollToTop from './components/shared/ScrollToTop';
import BookingModal from './components/shared/BookingModal';
import AdminDashboard from './components/admin/AdminDashboard';
import { 
  BLOG_POSTS as INITIAL_BLOG_POSTS, 
  SERVICES as INITIAL_SERVICES, 
  FEATURES as INITIAL_FEATURES,
  PRICING_PLANS as INITIAL_PRICING,
  TESTIMONIALS as INITIAL_TESTIMONIALS
} from './lib/constants';
import { BlogPost, Lead, Service, Feature, Testimonial, PricingPlan } from './lib/types';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'post' | 'services' | 'admin'>('home');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Global State for Content
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [features, setFeatures] = useState<Feature[]>(INITIAL_FEATURES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(INITIAL_PRICING);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Abebe Bikila',
      email: 'abebe@marathon.et',
      phone: '+251 911 234 567',
      website: 'www.ethiorun.com',
      industry: 'startup',
      issue: 'Need a scalable registration system for events.',
      date: '2025-10-10T14:30',
      status: 'New'
    },
    {
      id: '2',
      name: 'Sara Tadesse',
      email: 'sara@fintech.et',
      phone: '+251 922 987 654',
      website: 'www.yenepay.com',
      industry: 'fintech',
      issue: 'Security audit required for new payment gateway.',
      date: '2025-10-09T09:15',
      status: 'Contacted'
    }
  ]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handlePostSelect = (slug: string) => {
    setSelectedPostSlug(slug);
    setCurrentView('post');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleServicesDetail = () => {
    setCurrentView('services');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    const prevView = currentView;
    setCurrentView('home');
    setSelectedPostSlug(null);
    
    // Optional: scroll back to relevant section
    if (prevView === 'post') {
      setTimeout(() => {
        document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleNavigation = (href: string) => {
    if (href === '/admin') {
      setCurrentView('admin');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // If not on home, go home first
    if (currentView !== 'home') {
      setCurrentView('home');
      setSelectedPostSlug(null);
    }

    if (href === '#' || href === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Delay slightly to allow the home view to render if we just switched
    const delay = currentView !== 'home' ? 100 : 0;
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, delay);
  };

  const handleLeadSubmit = (leadData: Omit<Lead, 'id' | 'status' | 'date'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'New'
    };
    setLeads(prev => [newLead, ...prev]);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden transition-colors duration-300">
      <GradientBackground />
      
      {currentView === 'admin' ? (
        <AdminDashboard 
          leads={leads}
          setLeads={setLeads}
          blogPosts={blogPosts}
          setBlogPosts={setBlogPosts}
          services={services}
          setServices={setServices}
          features={features}
          setFeatures={setFeatures}
          testimonials={testimonials}
          setTestimonials={setTestimonials}
          pricingPlans={pricingPlans}
          setPricingPlans={setPricingPlans}
          onExit={() => setCurrentView('home')}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      ) : (
        <>
          <Navbar 
            onNavClick={handleNavigation}
            onBookAudit={() => setIsBookingModalOpen(true)}
          />
          
          <main>
            {currentView === 'home' && (
              <>
                <Hero onNavClick={handleNavigation} onBookAudit={() => setIsBookingModalOpen(true)} />
                <Challenges />
                <Features features={features} />
                <WhoWeAre />
                <Services services={services} onShowAll={handleServicesDetail} />
                <HowItWorks />
                <Testimonials testimonials={testimonials} />
                <Pricing plans={pricingPlans} />
                <CTA onBookAudit={() => setIsBookingModalOpen(true)} />
                <Blog posts={blogPosts} onPostSelect={handlePostSelect} />
                <FAQ />
              </>
            )}
            
            {currentView === 'post' && (
              <BlogPostDetail 
                slug={selectedPostSlug!} 
                posts={blogPosts}
                onBack={handleBackToHome} 
              />
            )}

            {currentView === 'services' && (
              <ServicesDetail 
                onBack={handleBackToHome} 
              />
            )}
          </main>

          <Footer 
            onAdminClick={() => handleNavigation('/admin')} 
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />
          <ScrollToTop />
          
          <BookingModal 
            isOpen={isBookingModalOpen} 
            onClose={() => setIsBookingModalOpen(false)} 
            onSubmit={handleLeadSubmit}
          />
        </>
      )}
    </div>
  );
};

export default App;
