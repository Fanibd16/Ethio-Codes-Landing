
import React from 'react';

const LOGOS = [
  { name: 'NEXUS', icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /> },
  { name: 'ATLAS', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
  { name: 'ORBIT', icon: <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /> },
  { name: 'VERTEX', icon: <path d="M3 21l1.65-3.8a9 9 0 1 1 3.45 3.45L3 21z" /><path d="M9 9l6 6" /><path d="M15 9l-6 6" /> },
  { name: 'QUANTUM', icon: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-9 9h18M12 3v18" /> },
  { name: 'STRATA', icon: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /> },
  { name: 'PRISM', icon: <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /> },
  { name: 'ZENITH', icon: <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /> },
];

const EngineeringPartners: React.FC = () => {
  return (
    <section className="py-12 border-y border-foreground/5 bg-background/50 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/60">
          Our Strategic Engineering Partners
        </p>
      </div>
      
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-24 items-center py-4">
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
            >
              <svg 
                className="w-8 h-8 text-primary" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {logo.icon}
              </svg>
              <span className="text-lg font-black tracking-tighter text-foreground/80">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Mirror row for seamless scroll */}
        <div className="absolute top-0 flex animate-marquee whitespace-nowrap gap-16 md:gap-24 items-center py-4 ml-[100%]">
           {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <div 
              key={`mirror-${i}`} 
              className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
            >
              <svg 
                className="w-8 h-8 text-primary" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {logo.icon}
              </svg>
              <span className="text-lg font-black tracking-tighter text-foreground/80">
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        {/* Gradient overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default EngineeringPartners;
