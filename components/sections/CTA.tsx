
import React from 'react';
import Button from '../ui/button';

interface CTAProps {
  onBookAudit?: () => void;
}

const CTA: React.FC<CTAProps> = ({ onBookAudit }) => {
  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden bg-background transition-colors duration-300">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[3rem] bg-[#0a0a0a] dark:bg-primary border border-white/5 dark:border-primary/20 px-8 py-24 md:px-20 text-center transition-all duration-500 shadow-2xl max-w-6xl mx-auto">
          {/* Subtle light/dark spotlight effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 dark:bg-black/10 blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 text-white dark:text-white leading-tight">
              Ready to Build Your <span className="text-primary dark:text-black/60 italic font-light">Last Digital System?</span>
            </h2>
            <p className="text-xl text-muted-foreground dark:text-black/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              We only take on 3 new enterprise or government projects per quarter to ensure system integrity and dedicated engineering focus.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                size="lg" 
                className="rounded-full w-full sm:w-auto h-16 px-12 text-xl font-bold bg-primary dark:bg-black dark:text-white hover:opacity-90 transition-transform hover:scale-105 active:scale-95 border-none shadow-2xl shadow-primary/20 dark:shadow-black/20"
                onClick={onBookAudit}
              >
                Schedule Your Strategy Call
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground dark:text-black/60 italic">
              "The best time to digitize was 5 years ago. The second best time is now."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
