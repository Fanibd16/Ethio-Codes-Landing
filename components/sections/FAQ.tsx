
import React from 'react';
import SectionHeader from '../shared/SectionHeader';
import { Accordion, AccordionItem } from '../ui/accordion';
import { FAQS } from '../../lib/constants';

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionHeader 
            badge="FAQ"
            title="Common Questions"
            description="Everything you need to know about getting started."
            align="left"
          />
          
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
