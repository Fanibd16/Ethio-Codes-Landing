
import React from 'react';
import { APP_NAME } from '../../lib/constants';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="py-24 border-t border-foreground/5 bg-background dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
               <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                <svg className="w-3.5 h-3.5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">{APP_NAME}</span>
            </div>
            <p className="text-muted-foreground text-lg max-w-sm leading-relaxed font-light">
              We build scalable digital systems, web platforms, and mobile applications for modern businesses.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-foreground">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-light">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-foreground">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-light">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-foreground">Social</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-light">
              <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground font-light">
          <p>© 2026 {APP_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            {onAdminClick && (
              <button onClick={onAdminClick} className="hover:text-primary transition-colors opacity-50 hover:opacity-100">
                Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
