
import React from 'react';
import { SERVICES } from '../../lib/constants';
import Button from '../ui/button';
import SectionHeader from '../shared/SectionHeader';

interface ServicesDetailProps {
  onBack: () => void;
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
    case 'shield-check': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    case 'network': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case 'wrench': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    case 'lightbulb': return <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.674a1 1 0 01.992.883l.193 1.45a1 1 0 01-.992 1.167H9.47a1 1 0 01-.992-1.167l.193-1.45a1 1 0 01.992-.883zM12 3a7 7 0 00-7 7c0 1.637.625 3.128 1.65 4.257a10.05 10.05 0 012.35 6.743h6a10.05 10.05 0 012.35-6.743A6.98 6.98 0 0019 10a7 7 0 00-7-7z" /></svg>;
    default: return null;
  }
};

const ServicesDetail: React.FC<ServicesDetailProps> = ({ onBack }) => {
  return (
    <section className="min-h-screen pt-40 pb-32 bg-background animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-12 p-0 hover:bg-transparent group text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Home
          </Button>

          <SectionHeader 
            badge="Full Service Catalog"
            title="The Engine of Digital Evolution"
            description="Our end-to-end capabilities ensure that no part of your digital ecosystem is left to chance. From core infrastructure to human-centered design."
            align="left"
            className="max-w-4xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
            {SERVICES.map((service, idx) => (
              <div key={service.id} className="relative p-12 rounded-[3rem] bg-white/[0.02] dark:bg-white/[0.01] border border-black/[0.05] dark:border-white/[0.05] group">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="shrink-0 w-20 h-20 text-primary bg-primary/5 rounded-3xl flex items-center justify-center p-4">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">{service.category}</span>
                      <div className="h-px flex-1 bg-primary/10" />
                    </div>
                    <h3 className="text-3xl font-bold mb-6 text-foreground">{service.title}</h3>
                    <p className="text-xl font-light text-foreground/80 leading-relaxed mb-8">
                      {service.fullDesc}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 p-20 rounded-[4rem] bg-primary text-black relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-8 tracking-tight">Need a custom technical roadmap?</h2>
              <p className="text-2xl font-medium mb-12 opacity-80 max-w-3xl mx-auto">
                Our lead architects are available for a limited number of high-impact strategic audits each quarter.
              </p>
              <Button size="lg" className="rounded-full px-16 h-20 text-xl font-black bg-black text-white hover:scale-105 active:scale-95 transition-all shadow-2xl" onClick={onBack}>
                Book System Audit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesDetail;
