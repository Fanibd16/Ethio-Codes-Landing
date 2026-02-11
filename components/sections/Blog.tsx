
import React from 'react';
import SectionHeader from '../shared/SectionHeader';
import { BlogPost } from '../../lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import Badge from '../ui/badge';
import Button from '../ui/button';

interface BlogProps {
  posts: BlogPost[];
  onPostSelect?: (slug: string) => void;
}

const Blog: React.FC<BlogProps> = ({ posts, onPostSelect }) => {
  return (
    <section id="blog" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            badge="Insights & Engineering"
            title="Latest from the Lab"
            description="Deep dives into system architecture, product strategy, and the future of digital infrastructure in East Africa."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <Card 
                key={idx} 
                className="group overflow-hidden flex flex-col h-full transition-all duration-500 hover:border-primary/30 hover:shadow-[0_30px_60px_-15px_rgba(34,197,94,0.15)] bg-background/40 glass border-white/[0.05] cursor-pointer"
                onClick={() => onPostSelect?.(post.slug)}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-white backdrop-blur-md border-none px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pt-8 pb-4">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 uppercase tracking-[0.2em] font-bold">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 pb-8">
                  <p className="text-muted-foreground font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="pt-0 pb-10 mt-auto">
                  <Button 
                    variant="ghost" 
                    className="group/btn px-0 hover:bg-transparent text-primary font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPostSelect?.(post.slug);
                    }}
                  >
                    Read Full Post 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <Button variant="outline" size="lg" className="rounded-full px-12 h-16 border-foreground/10 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all font-bold">
              View All Insights
            </Button>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] blur-[150px] rounded-full pointer-events-none -z-10"></div>
    </section>
  );
};

export default Blog;
