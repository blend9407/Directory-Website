import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return BLOG_POSTS;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return BLOG_POSTS.find(post => post.slug === slug);
};