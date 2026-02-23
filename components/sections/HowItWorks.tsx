
import React, { useEffect, useRef, useState } from 'react';
import SectionHeader from '../shared/SectionHeader';
import { cn } from '../../lib/utils';

interface StepProps {
  step: {
    num: string;
    title: string;
    description: string;
  };
  index: number;
}

const TimelineStep: React.FC<StepProps> = ({ step, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it hits the center
      }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax Effect
  useEffect(() => {
    let requestRef: number;
    
    const updateParallax = () => {
      if (!stepRef.current || !parallaxRef.current) return;
      
      const rect = stepRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate relative position from center of viewport
      // Negative when above center, positive when below
      const centerOffset = (rect.top + rect.height / 2) - (viewportHeight / 2);
      
      // Apply parallax factor (slower movement than scroll)
      const parallaxY = centerOffset * 0.15;
      
      // Apply transform: preserve horizontal center (-50%) and add vertical parallax
      parallaxRef.current.style.transform = `translate(-50%, ${parallaxY}px)`;
      
      requestRef = requestAnimationFrame(updateParallax);
    };

    // Start loop
    requestRef = requestAnimationFrame(updateParallax);
    
    return () => cancelAnimationFrame(requestRef);
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={stepRef}
      className={cn(
        "relative flex items-center justify-between mb-32 last:mb-0 w-full md:flex-row flex-col",
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      {/* Content Side with Staggered Animations */}
      <div className={cn(
        "w-full md:w-[45%] flex flex-col",
        isEven ? "md:items-start text-left" : "md:items-end md:text-right",
        "items-center text-center px-4"
      )}>
        <div className={cn(
          "mb-3 text-primary font-bold tracking-widest uppercase text-sm transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )} style={{ transitionDelay: '100ms' }}>
          {step.num}
        </div>
        
        <h3 className={cn(
          "text-3xl md:text-4xl font-bold mb-4 text-foreground transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )} style={{ transitionDelay: '250ms' }}>
          {step.title}
        </h3>
        
        <p className={cn(
          "text-muted-foreground text-lg leading-relaxed font-light max-w-md transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        )} style={{ transitionDelay: '400ms' }}>
          {step.description}
        </p>
      </div>

      {/* Center Dot with Scale-up Animation & Parallax */}
      <div 
        ref={parallaxRef}
        className="absolute left-1/2 hidden md:flex items-center justify-center z-10 will-change-transform"
        style={{ transform: 'translate(-50%, 0px)' }}
      >
        <div className={cn(
          "w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) backdrop-blur-md",
          isVisible 
            ? "bg-primary text-primary-foreground scale-100 rotate-0 shadow-[0_0_30px_rgba(34,197,94,0.4)]" 
            : "bg-background text-primary scale-0 rotate-180"
        )}>
          <span className="text-base font-bold">{step.num}</span>
        </div>
      </div>

      {/* Empty Side (Space filler for desktop) */}
      <div className="hidden md:block w-[45%]"></div>
      
      {/* Mobile-only dot line indicator */}
      <div className={cn(
        "md:hidden w-10 h-10 rounded-full bg-primary flex items-center justify-center mt-8 text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 transition-all duration-700",
        isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}>
        {step.num}
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Discovery & Planning",
      description: "We dive deep into your vision, analyzing market fit and technical constraints to build a bulletproof roadmap."
    },
    {
      num: "02",
      title: "Design & Architecture",
      description: "Crafting pixel-perfect interfaces while engineering a robust backend system that handles millions of requests."
    },
    {
      num: "03",
      title: "Agile Development",
      description: "Fast-paced, iterative coding with continuous feedback loops, ensuring every feature aligns with your goals."
    },
    {
      num: "04",
      title: "Rigorous Testing",
      description: "Automated and manual QA cycles to ensure your system is secure, performant, and bug-free at scale."
    },
    {
      num: "05",
      title: "Scale & Optimize",
      description: "Launch is just the beginning. We monitor performance and scale infrastructure as your user base grows."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            The Workflow
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            From Concept to <span className="text-primary">Deployment</span>
          </h2>
          <p className="text-muted-foreground text-xl font-light leading-relaxed">
            A meticulous engineering approach designed to deliver high-performance digital products with speed and precision.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto mt-24">
          {/* Vertical Center Line - Static base */}
          <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-[2px] bg-foreground/5 hidden md:block"></div>
          
          {/* Vertical Center Line - Primary glow gradient */}
          <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-[2px] bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 hidden md:block"></div>
          
          <div className="flex flex-col">
            {steps.map((step, idx) => (
              <TimelineStep key={idx} step={step} index={idx} />
            ))}
          </div>

          <div className="mt-32 flex justify-center">
            <button className="group relative overflow-hidden rounded-full bg-[#FF0000] px-8 py-4 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]">
              <span className="absolute inset-0 w-full h-full bg-primary translate-x-[-100%] transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
              <div className="relative z-10 flex items-center gap-4">
                <span className="text-lg font-bold tracking-wide">Get Started Today - Book Your Free Strategy Call</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1000px] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none -z-10"></div>
    </section>
  );
};

export default HowItWorks;
