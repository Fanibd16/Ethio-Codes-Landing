
import React, { useState, useRef, useEffect, useCallback } from 'react';
import SectionHeader from '../shared/SectionHeader';
import { Testimonial } from '../../lib/types';
import { cn } from '../../lib/utils';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const StarRating = () => (
  <div className="flex gap-1 mb-6">
    {[1, 2, 3, 4, 5].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-primary fill-current" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial, isActive: boolean }) => (
  <div className={cn(
    "relative w-[300px] md:w-[400px] shrink-0 p-8 rounded-2xl bg-card border border-border/40 shadow-xl shadow-black/5 dark:shadow-white/5 flex flex-col items-start text-left h-full transition-all duration-500 ease-out select-none",
    isActive 
      ? "opacity-100 scale-100 blur-0 ring-1 ring-primary/20 bg-card z-10" 
      : "opacity-40 scale-95 blur-[1px] bg-card/50 z-0"
  )}>
    <StarRating />
    <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base line-clamp-4 flex-1">
      "{testimonial.quote}"
    </p>
    <div className="mt-auto">
      <h4 className={cn("font-bold text-lg transition-colors", isActive ? "text-foreground" : "text-muted-foreground")}>
        {testimonial.author}
      </h4>
      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide font-medium">
        {testimonial.role}
      </p>
    </div>
  </div>
);

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Auto-scroll logic
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const children = container.children;
    if (index < 0 || index >= children.length) return;
    
    const card = children[index] as HTMLElement;
    
    // Calculate center position
    // We use offsetLeft relative to the container (which must be relative positioned)
    const containerWidth = container.offsetWidth;
    const cardWidth = card.offsetWidth;
    const targetScrollLeft = card.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
    
    isScrollingRef.current = true;
    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
    
    setActiveIndex(index);

    // Release the manual scroll lock after animation usually finishes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  }, []);

  const next = useCallback(() => {
    const nextIndex = (activeIndex + 1) % testimonials.length;
    scrollToIndex(nextIndex);
  }, [activeIndex, scrollToIndex, testimonials.length]);

  const prev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    scrollToIndex(prevIndex);
  }, [activeIndex, scrollToIndex, testimonials.length]);

  // Auto-play effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      next();
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused, next]);

  // Sync state when user manually scrolls
  const handleScrollSync = () => {
    if (isScrollingRef.current || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const children = Array.from(container.children);
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = (child as HTMLElement).offsetLeft + (child as HTMLElement).offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <section id="case-studies" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <SectionHeader 
          badge="Testimonial"
          title="What Our Client Says"
          description="Our business is one of close relationships and we are very fortunate to be able to share so many positive experiences with our clients."
        />

        {/* Carousel Container */}
        <div 
          className="relative mb-12 max-w-[1400px] mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={scrollContainerRef}
            className="flex flex-row flex-nowrap overflow-x-auto gap-8 pb-12 no-scrollbar scroll-smooth snap-x snap-mandatory items-center relative px-[calc(50%-150px)] md:px-[calc(50%-200px)]"
            onScroll={handleScrollSync}
          >
             {testimonials.map((t, idx) => (
               <div key={idx} className="snap-center shrink-0 transition-all duration-500">
                 <TestimonialCard testimonial={t} isActive={idx === activeIndex} />
               </div>
             ))}
          </div>
          
          {/* Heavy Gradient Fades for "Shadow" Effect on Sides */}
          <div className="absolute top-0 left-0 w-1/6 md:w-1/3 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-1/6 md:w-1/3 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none"></div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4 md:px-12">
            {/* Left Arrow */}
            <button 
              onClick={prev} 
              className="w-12 h-12 rounded-full border border-primary/30 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all active:scale-95 group z-30"
              aria-label="Previous"
            >
               <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
            </button>

            {/* Pagination Indicators */}
            <div className="flex gap-2">
               {testimonials.map((_, i) => (
                 <button 
                   key={i} 
                   onClick={() => scrollToIndex(i)}
                   className={cn(
                     "h-1.5 rounded-full transition-all duration-300",
                     activeIndex === i ? "w-8 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
                   )}
                   aria-label={`Go to slide ${i + 1}`}
                 />
               ))}
            </div>

            {/* Right Arrow */}
            <button 
              onClick={next} 
              className="w-12 h-12 rounded-full border border-primary/30 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all active:scale-95 group z-30"
              aria-label="Next"
            >
               <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
            </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
