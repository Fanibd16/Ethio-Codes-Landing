
import React from 'react';
import SectionHeader from '../shared/SectionHeader';
import { Accordion, AccordionItem } from '../ui/accordion';
import { FAQS } from '../../lib/constants';

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Common <span className="text-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground text-xl font-light leading-relaxed">
              Everything you need to know about getting started.
            </p>
          </div>
          
          <Accordion>
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} title={faq.question}>
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
