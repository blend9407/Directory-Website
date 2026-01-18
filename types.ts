export type PricingModel = 'Free' | 'Freemium' | 'Paid' | 'Contact';

export type Category = 
  | 'All'
  | 'Chatbots' 
  | 'Image Generation' 
  | 'Video Creation' 
  | 'Coding' 
  | 'Writing' 
  | 'Audio & Voice' 
  | 'Productivity'
  | 'Data Analysis';

export interface UserTip {
  id: string;
  user: string;
  content: string;
  upvotes: number;
  date: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  category: Category;
  pricing: PricingModel;
  rating: number;
  reviewsCount: number;
  tags: string[];
  features: string[];
  tips: UserTip[];
  isVerified?: boolean;
  isHiddenGem?: boolean;
}

export interface FilterState {
  search: string;
  category: Category;
  pricing: PricingModel | 'All';
  sortBy: 'popular' | 'newest' | 'rating';
}

export interface QuizAnswers {
  role: string;
  task: string;
  budget: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: Category;
  readTime: string;
}