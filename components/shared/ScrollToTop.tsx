
import React from 'react';
import { useScroll } from '../../hooks/useScroll';
import { cn } from '../../lib/utils';

const ScrollToTop: React.FC = () => {
  const isScrolled = useScroll(400);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl hover:scale-110 active:scale-90 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "bg-black text-white dark:bg-primary dark:text-primary-foreground border border-white/10 dark:border-primary/20",
        isScrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <svg 
        className="w-6 h-6 transition-transform group-hover:-translate-y-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2.5} 
          d="M5 15l7-7 7 7" 
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
