import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostBySlug } from '../services/blogService';
import { BlogPost } from '../types';
import { ArrowLeft, Clock, Calendar, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      setLoading(true);
      if (slug) {
        const data = await getBlogPostBySlug(slug);
        setPost(data || null);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!post) return <div className="text-center py-20 text-xl font-medium">Article not found</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 mb-8 transition-colors font-medium">
        <ArrowLeft size={16} /> Back to Blog
      </Link>
      
      <div className="mb-8">
        <span className="text-primary-600 font-bold tracking-wide text-sm uppercase bg-primary-50 px-3 py-1 rounded-full">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm border-b border-slate-200 pb-8">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
               <User size={16} />
             </div>
             <span className="font-medium text-slate-900">{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={16} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            <span>{post.readTime} read</span>
          </div>
        </div>
      </div>

      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-12"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="hidden lg:block lg:col-span-1">
           <div className="sticky top-24 flex flex-col gap-4">
             <button className="p-2 text-slate-400 hover:text-[#1877F2] hover:bg-slate-100 rounded-full transition-colors">
               <Facebook size={20} />
             </button>
             <button className="p-2 text-slate-400 hover:text-[#1DA1F2] hover:bg-slate-100 rounded-full transition-colors">
               <Twitter size={20} />
             </button>
             <button className="p-2 text-slate-400 hover:text-[#0A66C2] hover:bg-slate-100 rounded-full transition-colors">
               <Linkedin size={20} />
             </button>
             <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
               <Share2 size={20} />
             </button>
           </div>
        </div>

        <div className="lg:col-span-11">
          <div 
            className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-primary-600 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
      
      {/* Author Bio Box */}
      <div className="mt-16 bg-slate-50 p-8 rounded-2xl border border-slate-200 flex items-center gap-6">
         <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 shadow-sm border border-slate-100">
             <User size={32} />
         </div>
         <div>
           <h3 className="font-bold text-slate-900 text-lg">About {post.author}</h3>
           <p className="text-slate-600 mt-1">Tech journalist and AI enthusiast specializing in the impact of generative models on creative industries.</p>
         </div>
      </div>

    </article>
  );
};

export default BlogPostPage;