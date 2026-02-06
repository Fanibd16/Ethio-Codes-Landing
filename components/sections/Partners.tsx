
import React, { useEffect, useRef } from 'react';

const ROW_1 = [
  'VERCEL', 'STRIPE', 'LINEAR', 'RAYCAST', 'STARKTECH', 'UMBRELLA', 'CYBERDYNE', 'GLOBOPRO'
];

const ROW_2 = [
  'APERTURE', 'NEXUS', 'SKYNET', 'WAYNE', 'ETHIO-BANK', 'NILE-SYSTEMS', 'ADIS-CORE', 'TECH-AFRICA'
];

const Partners: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestRef: number;
    
    const updateParallax = () => {
      if (!sectionRef.current || !containerRef.current || !row1Ref.current || !row2Ref.current || !gridRef.current) {
        requestRef = requestAnimationFrame(updateParallax);
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const centerOffset = (rect.top + rect.height / 2) - viewportHeight / 2;
        
        // Vertical Parallax for the logos container
        const vOffset = centerOffset * 0.12;
        containerRef.current.style.transform = `translateY(${vOffset}px)`;

        // Opposing horizontal movements for the rows
        const hOffset1 = centerOffset * 0.1;
        const hOffset2 = centerOffset * -0.1;
        row1Ref.current.style.transform = `translateX(${hOffset1}px)`;
        row2Ref.current.style.transform = `translateX(${hOffset2}px)`;

        // Background grid moves at a different vertical speed to create depth
        const gridOffset = centerOffset * -0.05;
        gridRef.current.style.transform = `translateY(${gridOffset}px)`;
      }
      
      requestRef = requestAnimationFrame(updateParallax);
    };

    requestRef = requestAnimationFrame(updateParallax);
    
    return () => cancelAnimationFrame(requestRef);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 border-y border-foreground/5 bg-background/40 dark:bg-black/20 backdrop-blur-sm overflow-hidden relative group transition-colors duration-500 min-h-[600px] flex items-center"
    >
      {/* Background Decorative Layer (Parallaxing Grid) */}
      <div 
        ref={gridRef}
        className="absolute inset-0 hero-grid opacity-20 pointer-events-none will-change-transform"
      ></div>
      
      {/* Edge Fades for smooth logo entry/exit */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background dark:from-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background dark:from-black to-transparent z-20 pointer-events-none"></div>
      
      {/* Parallax Container */}
      <div 
        ref={containerRef}
        className="w-full flex flex-col gap-16 will-change-transform"
      >
        {/* Row 1: Moves Left + Parallax */}
        <div 
          ref={row1Ref}
          className="relative flex will-change-transform transition-transform duration-150 ease-out z-10"
        >
          <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 items-center">
            {[...ROW_1, ...ROW_1].map((brand, i) => (
              <span 
                key={`r1-${i}`} 
                className="text-4xl md:text-6xl font-black tracking-tighter text-muted-foreground/20 dark:text-muted-foreground/15 hover:text-primary transition-all duration-500 cursor-default select-none px-4 hover:scale-105 hover:opacity-100"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Moves Right (reverse) + Parallax */}
        <div 
          ref={row2Ref}
          className="relative flex translate-x-[-10%] will-change-transform transition-transform duration-150 ease-out z-10"
        >
          <div className="flex animate-marquee-reverse whitespace-nowrap gap-16 md:gap-32 items-center">
            {[...ROW_2, ...ROW_2].map((brand, i) => (
              <span 
                key={`r2-${i}`} 
                className="text-4xl md:text-6xl font-black tracking-tighter text-muted-foreground/20 dark:text-muted-foreground/15 hover:text-primary transition-all duration-500 cursor-default select-none px-4 hover:scale-105 hover:opacity-100"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/[0.05] to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Partners;
