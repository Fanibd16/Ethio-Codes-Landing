
import React from 'react';
import SectionHeader from '../shared/SectionHeader';
import Button from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../ui/card';
import Badge from '../ui/badge';
import { PRICING_PLANS } from '../../lib/constants';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            badge="High-Trust Partnership"
            title="The EthioCodes Value Stack"
            description="We don't charge by the hour. We charge for the immense value and certainty of a system that works."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan, idx) => (
              <Card key={idx} className={`flex flex-col relative transition-all duration-300 hover:-translate-y-2 border-white/5 bg-background/50 glass ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/10 ring-1 ring-primary/20' : 'hover:border-white/20'}`}>
                {plan.popular && (
                  <div className="rounded-full bg-primary absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <Badge className=" text-white border-none py-1.5 px-6 font-bold shadow-[0_0_20px_rgba(34,197,94,0.6)] whitespace-nowrap">
                      Standard for Enterprise
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pt-10">
                  <CardTitle className="text-xl font-bold uppercase tracking-widest text-primary mb-4">{plan.name}</CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-4xl md:text-5xl font-black">Project-Based</span>
                  </div>
                  <CardDescription className="mt-4 text-base font-light px-4">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 px-8 py-8">
                  <ul className="space-y-5">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm md:text-base font-light">
                        <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pb-10 px-8">
                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    className="w-full h-14 text-lg font-bold rounded-full"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-3xl glass border-primary/20">
            <h4 className="text-xl font-bold mb-4">Risk-Free System Audit</h4>
            <p className="text-muted-foreground font-light mb-6">
              Not sure if your current infrastructure is ready for the next level? Book a Free 30-minute Digital Readiness Check with our lead engineers.
            </p>
            <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 font-bold">Book My Audit →</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
