
import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
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

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'post' | 'services'>('home');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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
    setTimeout(() => {
      const targetId = prevView === 'post' ? 'blog' : 'services';
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigation = (href: string) => {
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

  return (
    <div className="relative min-h-screen overflow-x-hidden transition-colors duration-300">
      <GradientBackground />
      <Navbar 
        toggleTheme={toggleTheme} 
        isDarkMode={isDarkMode} 
        onNavClick={handleNavigation}
        onBookAudit={() => setIsBookingModalOpen(true)}
      />
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero onNavClick={handleNavigation} onBookAudit={() => setIsBookingModalOpen(true)} />
            <Features />
            <Services onShowAll={handleServicesDetail} />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <CTA onBookAudit={() => setIsBookingModalOpen(true)} />
            <Blog onPostSelect={handlePostSelect} />
            <FAQ />
          </>
        )}
        
        {currentView === 'post' && (
          <BlogPostDetail 
            slug={selectedPostSlug!} 
            onBack={handleBackToHome} 
          />
        )}

        {currentView === 'services' && (
          <ServicesDetail 
            onBack={handleBackToHome} 
          />
        )}
      </main>

      <Footer />
      <ScrollToTop />
      
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
};

export default App;
