
import React from 'react';
import SectionHeader from '../shared/SectionHeader';
import Button from '../ui/button';
import { Card } from '../ui/card';
import { PricingPlan } from '../../lib/types';
import { cn } from '../../lib/utils';

interface PricingProps {
  plans: PricingPlan[];
}

const PricingIcon = ({ name, className }: { name: string, className?: string }) => {
  if (name === 'cube') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }
  if (name === 'network') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 8.5l-2.5 7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 8.5l2.5 7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6" />
      </svg>
    )
  }
  return null;
}

const Pricing: React.FC<PricingProps> = ({ plans }) => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            badge="Engagement Models"
            title="Choose the engagement model that works for you"
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-20">
            {plans.map((plan, idx) => {
              const isOrange = plan.color === 'orange';
              
              const themeClasses = isOrange ? {
                icon: "text-orange-500",
                iconBg: "border-orange-500/20 bg-orange-500/10",
                cardHover: "hover:bg-orange-500/5",
                button: "text-orange-500 border-orange-500/50 hover:bg-orange-500 hover:text-white hover:border-orange-500"
              } : {
                icon: "text-primary",
                iconBg: "border-primary/20 bg-primary/10",
                cardHover: "hover:bg-primary/5",
                button: "text-primary border-primary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              };

              return (
                <Card 
                  key={idx} 
                  className={cn(
                    "flex flex-col relative p-10 md:p-12 transition-all duration-300 border border-white/10 bg-black/60 backdrop-blur-xl h-full group",
                    themeClasses.cardHover
                  )}
                >
                  <div className="mb-8">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500",
                      themeClasses.iconBg
                    )}>
                      <PricingIcon name={plan.icon} className={cn("w-8 h-8", themeClasses.icon)} />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">
                    {plan.name}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground font-light leading-relaxed mb-12 flex-1">
                    {plan.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      className={cn(
                        "rounded-xl h-14 px-8 text-base font-medium bg-transparent transition-all duration-300 flex items-center gap-2 group/btn",
                        themeClasses.button
                      )}
                    >
                      {plan.cta}
                      <svg className={cn("w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center max-w-2xl mx-auto p-8 rounded-3xl glass border-primary/20">
            <h4 className="text-xl font-bold mb-4">Risk-Free System Audit</h4>
            <p className="text-muted-foreground font-light mb-6">
              Not sure which model fits your needs? Book a Free 30-minute Digital Readiness Check with our lead engineers.
            </p>
            <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 font-bold">Book My Audit →</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
