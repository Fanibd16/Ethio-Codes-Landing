
import React, { useRef, useEffect } from 'react';
import Button from '../ui/button';
import Badge from '../ui/badge';

const TRUSTED_LOGOS = ["GOVT.ET", "NGO-WORLD", "FINTECH-X", "STARK-CORP", "WAYNE-ENT", "GLOBEX", "ACME.ET"];

interface HeroProps {
  onNavClick?: (href: string) => void;
  onBookAudit?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavClick, onBookAudit }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    containerRef.current.style.setProperty('--mouse-x', `${x}`);
    containerRef.current.style.setProperty('--mouse-y', `${y}`);
    containerRef.current.style.setProperty('--mouse-px', `${clientX - left}px`);
    containerRef.current.style.setProperty('--mouse-py', `${clientY - top}px`);
  };

  const line1 = "Stop Building Apps.".split(' ');
  const line2Part1 = "Launch".split(' ');
  const line2Part2 = "End-to-End Systems.".split(' ');

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative pt-40 pb-20 md:pt-56 md:pb-24 overflow-hidden flex flex-col items-center text-center group transition-colors duration-500"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-40 dark:opacity-20">
          <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-primary/30 blur-[120px] rounded-full animate-float-slow" style={{ transform: 'translate(calc(var(--mouse-x, 0) * 40px), calc(var(--mouse-y, 0) * 40px))', transition: 'transform 0.4s ease-out' }} />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full animate-float" style={{ transform: 'translate(calc(var(--mouse-x, 0) * -60px), calc(var(--mouse-y, 0) * -60px))', transition: 'transform 0.6s ease-out' }} />
        </div>
        <div className="absolute inset-0 transition-transform duration-100 ease-out" style={{ transform: 'translateY(calc(var(--scroll-y, 0px) * 0.15))', willChange: 'transform' }}>
          <div className="absolute w-[800px] h-[800px] bg-primary/[0.08] blur-[150px] rounded-full transition-opacity duration-700 opacity-0 group-hover:opacity-100" style={{ transform: 'translate(-50%, -50%)', left: 'var(--mouse-px, 50%)', top: 'var(--mouse-py, 50%)' }} />
        </div>
        <div className="absolute inset-0 hero-grid opacity-30 transition-transform duration-100 ease-out" style={{ transform: 'translateY(calc(var(--scroll-y, 0px) * -0.05))' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-90" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="mb-6">
            <Badge variant="outline" className="px-4 py-1.5 border-primary/20 text-primary bg-primary/5 rounded-full text-xs font-semibold tracking-wide uppercase animate-reveal opacity-0" style={{ animationDelay: '0s' }}>
              Ethiopia's Premier System Builder
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-foreground flex flex-wrap justify-center items-center">
            <span className="w-full flex justify-center flex-wrap">
              {line1.map((word, i) => (
                <span key={`l1-${i}`} className="inline-block mr-[0.2em] animate-reveal opacity-0" style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
                  {word}
                </span>
              ))}
            </span>
            <span className="w-full flex justify-center flex-wrap mt-2">
              {line2Part1.map((word, i) => (
                <span key={`l2p1-${i}`} className="inline-block mr-[0.2em] animate-reveal opacity-0" style={{ animationDelay: `${(line1.length + i + 1) * 0.1}s` }}>
                  {word}
                </span>
              ))}
              <span className="text-primary italic font-light drop-shadow-[0_0_15px_rgba(34,197,94,0.2)] flex">
                {line2Part2.map((word, i) => (
                  <span key={`l2p2-${i}`} className="inline-block mr-[0.2em] animate-reveal opacity-0" style={{ animationDelay: `${(line1.length + line2Part1.length + i + 1) * 0.1}s` }}>
                    {word}
                  </span>
                ))}
              </span>
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed opacity-0 animate-reveal font-light" style={{ animationDelay: '1.2s' }}>
            We engineer mission-critical digital infrastructure for Government, Enterprise, and Growth-focused Startups. 
            <span className="block mt-2 font-medium text-foreground/90">One vendor. One system. Zero headaches.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto opacity-0 animate-reveal" style={{ animationDelay: '1.4s' }}>
            <Button size="lg" className="rounded-full w-full sm:w-auto px-10 h-16 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20" onClick={onBookAudit}>
              Get Your System Audit
            </Button>
            <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto px-10 h-16 text-lg font-semibold border-foreground/10 hover:bg-foreground/5 backdrop-blur-sm transition-all hover:scale-105 active:scale-95" onClick={() => onNavClick?.('#contact')}>
              Contact Us
            </Button>
          </div>

          <div className="mt-20 w-full max-w-4xl opacity-0 animate-reveal" style={{ animationDelay: '1.6s' }}>
             <div className="flex flex-col items-center gap-6">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground">Trusted by Industry Leaders</p>
                <div className="relative w-full overflow-hidden flex items-center">
                  <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-24 py-4">
                    {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, i) => (
                      <span key={i} className="text-xl md:text-2xl font-black tracking-tighter opacity-20 hover:opacity-100 transition-opacity cursor-default select-none">
                        {logo}
                      </span>
                    ))}
                  </div>
                  {/* Edge fades for the marquee */}
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
