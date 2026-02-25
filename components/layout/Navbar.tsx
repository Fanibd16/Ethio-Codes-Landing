
import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/button';
import { APP_NAME, SERVICES } from '../../lib/constants';
import { cn } from '../../lib/utils';

interface NavbarProps {
  onNavClick?: (href: string) => void;
  onBookAudit?: () => void;
  themeMode?: 'light' | 'dark' | 'system';
  onThemeChange?: (mode: 'light' | 'dark' | 'system') => void;
  systemPrefersDark?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, onBookAudit, themeMode = 'light', onThemeChange, systemPrefersDark = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    if (onNavClick) {
      e.preventDefault();
      onNavClick(href);
    }
  };

  const navItems = [
    { label: 'Why Us', href: '#why-choose-us' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services', hasMega: true },
    { label: 'Process', href: '#how-it-works' },
    { label: 'Contact', href: '#contact' },
  ];

  const openServices = () => {
    if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
    setIsServicesOpen(true);
  };

  const closeServices = () => {
    servicesTimeout.current = setTimeout(() => setIsServicesOpen(false), 120);
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
        <div className="hidden md:flex items-center gap-6 relative">
          {navItems.map((link) =>
            link.hasMega ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
              >
                <button
                  className={cn(
                    "text-sm font-medium hover:text-primary transition-colors flex items-center gap-2",
                    isScrolled ? "text-muted-foreground" : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  {link.label}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 top-12 w-[760px] bg-background/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-6 transition-all duration-200 origin-top",
                    isServicesOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                  )}
                >
                  <div className="grid grid-cols-3 gap-4">
                    {SERVICES.map((service) => (
                      <a
                        key={service.id}
                        href={`#services`}
                        onClick={(e) => handleLinkClick(e, '#services')}
                        className="group flex flex-col gap-2 p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold uppercase text-primary/80">{service.category}</p>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">View</span>
                        </div>
                        <p className="text-sm font-bold text-foreground">{service.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-3">{service.shortDesc}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  isScrolled ? "text-muted-foreground" : "text-foreground/80 hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded-full bg-foreground/5 dark:bg-white/5 border border-border/50">
            {(['system', 'light', 'dark'] as const).map((mode) => {
              const isActive = themeMode === mode;
              const icon =
                mode === 'system' ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="14" rx="2" />
                    <path d="M8 20h8" />
                  </svg>
                ) : mode === 'light' ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.95-1.4-1.4M6.45 6.45l-1.4-1.4m0 14.9 1.4-1.4m12.1-12.1 1.4-1.4" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                );
              return (
                <button
                  key={mode}
                  onClick={() => onThemeChange?.(mode)}
                  className={cn(
                    'w-8 h-8 flex items-center justify-center rounded-full transition-all text-xs',
                    isActive ? 'bg-primary text-primary-foreground shadow-primary/30 shadow-lg' : 'text-muted-foreground hover:text-foreground'
                  )}
                  aria-label={`Set ${mode} theme`}
                >
                  {icon}
                </button>
              );
            })}
          </div>
          <Button 
            variant="primary" 
            size="md" 
            className="hidden md:flex rounded-full px-6 h-10 font-medium
             shadow-none bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={onBookAudit}
          >
             Book A Call
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
          {navItems.map((link) => (
            <div key={link.label} className="w-full">
              <a 
                href={link.href} 
                className="text-lg font-bold text-foreground hover:text-primary transition-colors w-full text-center block"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
              {link.hasMega && (
                <>
                  <div className="mt-3 space-y-3">
                    {SERVICES.map((service) => (
                      <button
                        key={service.id}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(e as any, '#services');
                        }}
                        className="w-full text-sm text-left px-4 py-3 rounded-2xl bg-muted/40 hover:bg-muted font-semibold"
                      >
                        {service.title}
                        <span className="block text-[11px] text-muted-foreground">{service.category}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-foreground/5 dark:bg-white/5 border border-border/50">
                      {(['system', 'light', 'dark'] as const).map((mode) => {
                        const isActive = themeMode === mode;
                        const icon =
                          mode === 'system' ? (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="14" rx="2" />
                              <path d="M8 20h8" />
                            </svg>
                          ) : mode === 'light' ? (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="5" />
                              <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.95-1.4-1.4M6.45 6.45l-1.4-1.4m0 14.9 1.4-1.4m12.1-12.1 1.4-1.4" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                          );
                        return (
                          <button
                            key={mode}
                            onClick={() => onThemeChange?.(mode)}
                            className={cn(
                              'w-10 h-10 flex items-center justify-center rounded-full transition-all text-xs',
                              isActive ? 'bg-primary text-primary-foreground shadow-primary/30 shadow-lg' : 'text-muted-foreground hover:text-foreground'
                            )}
                            aria-label={`Set ${mode} theme`}
                          >
                            {icon}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
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
