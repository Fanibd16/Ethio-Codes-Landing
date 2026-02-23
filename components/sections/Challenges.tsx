
import React from 'react';
import SectionHeader from '../shared/SectionHeader';
import { cn } from '../../lib/utils';

const Challenges: React.FC = () => {
  const challenges = [
    {
      id: 1,
      title: "Technical Debt & Legacy Systems",
      description: "Outdated infrastructure slows down innovation, making every new feature a struggle to implement and maintain.",
      icon: "layers"
    },
    {
      id: 2,
      title: "Scalability Bottlenecks",
      description: "Systems that work for hundreds fail for millions. Performance degradation during peak loads kills user trust.",
      icon: "bar-chart"
    },
    {
      id: 3,
      title: "Security & Compliance Risks",
      description: "As digital footprints grow, so do vulnerabilities. Data breaches and regulatory non-compliance can destroy reputation overnight.",
      icon: "shield-alert"
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            The Problem
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The 3 Biggest <span className="text-primary">Challenges</span>
          </h2>
          <p className="text-muted-foreground text-xl font-light leading-relaxed">
            Most organizations face the same three barriers to digital dominance. We exist to solve them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {challenges.map((challenge, idx) => (
            <div 
              key={challenge.id}
              className="group p-8 rounded-3xl bg-white/[0.02] dark:bg-white/[0.01] border border-black/[0.05] dark:border-white/[0.05] hover:border-destructive/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-6 group-hover:scale-110 transition-transform duration-300">
                <ChallengeIcon name={challenge.icon} />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-foreground">
                {challenge.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ChallengeIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'layers':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case 'bar-chart':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case 'shield-alert':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    default:
      return null;
  }
};

export default Challenges;
