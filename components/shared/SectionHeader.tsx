
import React from 'react';
import Badge from '../ui/badge';
import { cn } from '../../lib/utils';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  badge, 
  title, 
  description, 
  align = 'center',
  className 
}) => {
  return (
    <div className={cn(
      'mb-12 md:mb-20',
      align === 'center' ? 'text-center max-w-2xl mx-auto' : 'text-left',
      className
    )}>
      {badge && <Badge className="mb-4">{badge}</Badge>}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
