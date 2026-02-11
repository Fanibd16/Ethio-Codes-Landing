
import React from 'react';
import { BlogPost } from '../../lib/types';
import Button from '../ui/button';
import Badge from '../ui/badge';

interface BlogPostDetailProps {
  slug: string;
  posts: BlogPost[];
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ slug, posts, onBack }) => {
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Post Not Found</h2>
          <Button onClick={onBack}>Back to Insights</Button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-24 bg-background animate-in fade-in duration-700">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-8 p-0 hover:bg-transparent group text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Insights
          </Button>

          {/* Post Header */}
          <div className="mb-12">
            <Badge className="mb-6">{post.category}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 py-6 border-y border-foreground/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">{post.author}</p>
                  <p className="text-xs text-muted-foreground mt-1">Lead Engineer</p>
                </div>
              </div>
              <div className="h-8 w-px bg-foreground/5"></div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{post.date}</p>
                <p className="text-xs text-primary font-bold">{post.readTime}</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-2xl font-light text-foreground/80 leading-relaxed mb-12 italic border-l-4 border-primary pl-8">
              {post.excerpt}
            </p>
            <div className="space-y-8 text-lg text-muted-foreground font-light leading-relaxed">
              {/* Splitting content into paragraphs for demonstration if it doesn't contain HTML */}
              {post.content.includes('\n') ? 
                 post.content.split('\n').map((para, i) => <p key={i}>{para}</p>) : 
                 post.content.split('. ').map((para, i) => <p key={i}>{para}.</p>)
              }
            </div>
          </div>

          {/* Share / Footer */}
          <div className="mt-20 pt-12 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex items-center gap-4">
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Share:</span>
                <div className="flex gap-4">
                   <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-foreground/10 hover:border-primary/50">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                   </Button>
                   <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-foreground/10 hover:border-primary/50">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
                   </Button>
                </div>
             </div>
             <Button variant="primary" className="rounded-full px-8 h-12 font-bold" onClick={onBack}>
                Subscribe to Insights
             </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostDetail;
