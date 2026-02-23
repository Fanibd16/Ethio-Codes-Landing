
import React, { useState } from 'react';
import Button from '../ui/button';
import { useScroll } from '../../hooks/useScroll';
import { APP_NAME, NAV_LINKS } from '../../lib/constants';
import { cn } from '../../lib/utils';

interface NavbarProps {
  onNavClick?: (href: string) => void;
  onBookAudit?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, onBookAudit }) => {
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
    <>
      <nav 
        className={cn(
          'fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl rounded-full transition-all duration-500 ease-in-out flex items-center justify-between px-6 py-3',
          isScrolled 
            ? 'bg-background/60 backdrop-blur-xl border border-border/40 shadow-lg text-foreground' 
            : 'bg-transparent border border-transparent text-foreground'
        )}
      >
        {/* Logo */}
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => onNavClick?.('#')}
        >
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:rotate-12",
            "bg-primary text-primary-foreground"
          )}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className={cn(
            "text-lg font-bold tracking-tight font-display uppercase",
            "text-foreground"
          )}>
            {APP_NAME}
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors",
                isScrolled ? "text-muted-foreground" : "text-foreground/80 hover:text-foreground"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Button 
            variant="primary" 
            size="sm" 
            className="hidden md:flex rounded-full px-6 font-bold shadow-none bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={onBookAudit}
          >
             Book Audit
          </Button>
          
          <button 
            className={cn(
              "md:hidden p-2 rounded-full transition-colors",
              isScrolled ? "hover:bg-muted" : "hover:bg-black/5 text-foreground"
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={cn(
        "fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-background/95 backdrop-blur-xl border border-border/40 rounded-3xl shadow-2xl z-40 transition-all duration-300 overflow-hidden origin-top",
        isMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col items-center gap-6 p-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-bold text-foreground hover:text-primary transition-colors w-full text-center"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <Button 
            className="w-full h-12 text-base font-bold rounded-full mt-4"
            onClick={() => { setIsMenuOpen(false); onBookAudit?.(); }}
          >
            Book Audit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
