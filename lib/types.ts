
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  issue: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed' | 'Client' | 'VIP';
  tags?: string[];
  totalSpend?: number;
  lastVisit?: string;
  notes?: string;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  icon: string;
  category: string;
  price?: number;
  duration?: number; // in minutes
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  highlighted: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  cta: string;
  icon: string;
  color: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  amount: number;
  staffId?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  performance: number;
}
