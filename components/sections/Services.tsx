
import React from 'react';
import SectionHeader from '../shared/SectionHeader';
import { Service } from '../../lib/types';
import Button from '../ui/button';

interface ServicesProps {
  services: Service[];
  onShowAll?: () => void;
}

const ServiceIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'code': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
    case 'smartphone': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    case 'palette': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
    case 'cloud': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>;
    case 'server': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-14 0h14" /></svg>;
    case 'briefcase': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'landmark': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>;
    default: return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
  }
};

const Services: React.FC<ServicesProps> = ({ services, onShowAll }) => {
  // Show top 6 on landing page
  const displayServices = services.slice(0, 6);

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeader 
          badge="Our Capabilities"
          title="World-Class Engineering Services"
          description="We provide the full spectrum of digital transformation services, from deep system architecture to high-fidelity product design."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayServices.map((service, idx) => (
            <div 
              key={service.id} 
              className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] dark:bg-white/[0.01] border border-black/[0.05] dark:border-white/[0.05] hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="w-14 h-14 text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                <ServiceIcon name={service.icon} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground leading-tight">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-1">
                {service.shortDesc}
              </p>
              
              <ul className="space-y-3 mb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {service.features.slice(0, 3).map((feat, fidx) => (
                  <li key={fidx} className="text-xs font-medium uppercase tracking-widest text-primary/60 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {feat}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="ghost" 
                className="group/btn px-0 hover:bg-transparent text-primary font-bold flex items-center gap-2"
                onClick={onShowAll}
              >
                Learn More
                <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
          <Button 
            size="lg" 
            className="rounded-full px-12 h-16 font-bold bg-foreground text-background hover:bg-primary hover:text-white transition-all shadow-2xl"
            onClick={onShowAll}
          >
            Explore All Capabilities
          </Button>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground/60">
            From Infrastructure to Growth
          </p>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[180px] rounded-full pointer-events-none -z-10"></div>
    </section>
  );
};

export default Services;
