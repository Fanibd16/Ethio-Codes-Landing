import React from 'react';

const PRINCIPLES = [
  {
    title: 'Architecture First',
    description:
      'We map your business flows before we write code, so every feature strengthens the whole system.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: 'Execution Discipline',
    description:
      'From sprint planning to production hardening, we ship with measurable milestones and zero guesswork.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Long-Term Ownership',
    description:
      'We stay close after launch, improving performance, reliability, and security as your business scales.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-14 0h14"
        />
      </svg>
    ),
  },
];

const WhoWeAre: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Who We Are
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Not Just Another Agency. <br />
              <span className="text-primary">We Are System Architects.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-light">
              We design and operate digital systems that make institutions faster, safer, and easier to scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
                <p>
                  At <span className="font-bold text-foreground">EthioCodes</span>, software is never "just an app". It
                  is the operating layer behind revenue, service delivery, and decision-making.
                </p>
                <p>
                  We built this company to close the gap between rapid innovation and institutional reliability. Our
                  team of engineers, designers, and strategists shares one mission:
                  <span className="text-foreground font-medium"> build infrastructure that lasts.</span>
                </p>
                <p>
                  We do not patch symptoms. We diagnose root causes, redesign systems, and deliver solutions that
                  become stronger as your organization grows.
                </p>
              </div>

              <div className="space-y-3">
                {PRINCIPLES.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 md:p-5 transition-colors hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-foreground font-semibold text-base md:text-lg">{item.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2.5rem] transform rotate-3 scale-105 blur-2xl opacity-60"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black/5 aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team collaborating on system architecture"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-8 left-8 right-8">
                  <blockquote className="text-white text-xl font-light italic leading-relaxed">
                    "We build the systems that power the future of Ethiopian enterprise."
                  </blockquote>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      DA
                    </div>
                    <div>
                      <div className="text-white font-bold">Dawit Amare</div>
                      <div className="text-white/60 text-sm uppercase tracking-wider">Lead Architect</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 right-6 rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-4 py-2 text-xs font-semibold tracking-wide text-white">
                  Mission-Critical Delivery
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              <StatItem number={10} suffix="+" label="Years Exp." />
              <StatItem number={50} suffix="+" label="Systems" />
              <StatItem number={1} suffix="M+" label="Users" />
              <StatItem number={24} suffix="/7" label="Support" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ number, suffix, label }: { number: number; suffix: string; label: string }) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

      setCount(Math.floor(easeOutQuart(progress) * number));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isVisible, number]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <h4 className="text-4xl md:text-5xl font-bold text-primary mb-2 tabular-nums tracking-tight">
        {count}
        {suffix}
      </h4>
      <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
};

export default WhoWeAre;
