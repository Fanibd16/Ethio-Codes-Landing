import React, { useState } from 'react';
import { BlogPost } from '../../../lib/types';
import Button from '../../ui/button';

interface BlogPageProps {
  blogPosts: BlogPost[];
  onAddPost: (post: Omit<BlogPost, 'slug'>) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ blogPosts, onAddPost, categoryFilter, onCategoryFilterChange, searchQuery, onSearchChange }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState<Omit<BlogPost, 'slug'>>({
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toLocaleDateString(),
    category: '',
    image: '',
    author: 'Admin',
    readTime: '5 min read',
  });

  const categories = Array.from(new Set(['All', ...blogPosts.map((b) => b.category)]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title || !draft.category) return;
    onAddPost(draft);
    setDraft({
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toLocaleDateString(),
      category: '',
      image: '',
      author: 'Admin',
      readTime: '5 min read',
    });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h2>
        <div className="flex flex-wrap gap-2">
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search posts..."
            className="bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary text-gray-900 dark:text-white"
          />
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary h-10 text-gray-900 dark:text-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Button className="gap-2 text-xs h-9" onClick={() => setIsAdding((v) => !v)}>
            {isAdding ? 'Close' : '+ New Post'}
          </Button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm"
              placeholder="Title"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
            <input
              className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm"
              placeholder="Category"
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
            />
            <input
              className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm"
              placeholder="Image URL"
              value={draft.image}
              onChange={(e) => setDraft({ ...draft, image: e.target.value })}
            />
            <input
              className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm"
              placeholder="Read time (e.g. 6 min read)"
              value={draft.readTime}
              onChange={(e) => setDraft({ ...draft, readTime: e.target.value })}
            />
          </div>
          <input
            className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm"
            placeholder="Excerpt"
            value={draft.excerpt}
            onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
          />
          <textarea
            className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm h-28"
            placeholder="Content"
            value={draft.content}
            onChange={(e) => setDraft({ ...draft, content: e.target.value })}
          />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!draft.title || !draft.category}>
              Publish
            </Button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {blogPosts.map((post, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-all shadow-sm">
            <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-800 shrink-0 overflow-hidden">
              <img src={post.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 dark:text-white truncate">{post.title}</h4>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5">{post.category}</span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
