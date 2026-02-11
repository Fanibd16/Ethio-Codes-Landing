
import React, { useState } from 'react';
import Button from '../ui/button';
import { useScroll } from '../../hooks/useScroll';
import { APP_NAME, NAV_LINKS } from '../../lib/constants';
import { cn } from '../../lib/utils';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  onNavClick?: (href: string) => void;
  onBookAudit?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode, onNavClick, onBookAudit }) => {
  const isScrolled = useScroll(20);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);
    if (onNavClick) {
      e.preventDefault();
      onNavClick(href);
    }
  };

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
      isScrolled 
        ? 'py-3 bg-background/90 backdrop-blur-md border-white/5 shadow-2xl' 
        : 'py-6 bg-transparent border-transparent'
    )}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => onNavClick?.('#')}
        >
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
            <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-primary uppercase">{APP_NAME}</span>
        </div>

        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-muted-foreground hover:text-white"
            aria-label="Toggle Theme"
          >
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
          
          <Button 
            variant="primary" 
            size="sm" 
            className="hidden lg:flex rounded-full px-6 font-bold shadow-none"
            onClick={onBookAudit}
          >
             Book Audit
          </Button>
          
          <button 
            className="md:hidden p-2 rounded-md hover:bg-white/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 glass transition-all duration-300 overflow-hidden border-b border-white/5",
        isMenuOpen ? "max-h-[500px] py-10 opacity-100" : "max-h-0 py-0 opacity-0"
      )}>
        <div className="flex flex-col items-center gap-8 px-6">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xl font-bold uppercase tracking-widest hover:text-primary transition-colors w-full text-center"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <Button 
            className="w-full h-14 text-lg font-bold rounded-full"
            onClick={() => { setIsMenuOpen(false); onBookAudit?.(); }}
          >
            Book Audit
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
