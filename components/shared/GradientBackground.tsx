
import React from 'react';

const GradientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background transition-colors duration-300">
      {/* Grid Pattern */}
      <div className="absolute inset-0 hero-grid opacity-20 dark:opacity-10"></div>
      
      {/* Subtle Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/10 blur-[120px] rounded-full opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[100px]"></div>
    </div>
  );
};

export default GradientBackground;
