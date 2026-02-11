
import React from 'react';
import SectionHeader from '../shared/SectionHeader';
import { Feature } from '../../lib/types';
import { cn } from '../../lib/utils';

interface FeaturesProps {
  features: Feature[];
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  return (
    <section id="system" className="py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              The EthioCodes Difference
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Software is fragile. Systems are robust.</h2>
            <p className="text-muted-foreground text-xl font-light leading-relaxed">
              Most agencies deliver code that breaks under pressure. We build self-healing, automated digital ecosystems that serve as the backbone of your business or institution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-collapse overflow-hidden rounded-3xl border border-white/[0.05]">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "p-12 transition-all duration-300 border border-white/[0.03]",
                  feature.highlighted 
                    ? "bg-primary text-black z-10 shadow-2xl shadow-primary/20" 
                    : "bg-transparent hover:bg-white/[0.02]"
                )}
              >
                <div className={cn(
                  "w-10 h-10 mb-8 flex items-center justify-start",
                  feature.highlighted ? "text-black" : "text-primary"
                )}>
                  <IconSelector name={feature.icon} />
                </div>
                <h3 className={cn(
                  "text-2xl font-bold mb-4",
                  feature.highlighted ? "text-black" : "text-white"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  "leading-relaxed font-light text-lg",
                  feature.highlighted ? "text-black/80" : "text-muted-foreground"
                )}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 flex justify-center">
             <div className="glass px-8 py-3 rounded-full flex items-center gap-8 text-[10px] md:text-xs font-medium uppercase tracking-widest text-muted-foreground">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                   Ethio-Global Standards
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                   Bank-Grade Security
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                   Unmatched Scalability
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const IconSelector = ({ name }: { name: string }) => {
  switch(name) {
    case 'shield': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    case 'zap': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    case 'mouse-pointer': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>;
    case 'check-circle': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'smartphone': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    case 'clock': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    default: return null;
  }
};

export default Features;
