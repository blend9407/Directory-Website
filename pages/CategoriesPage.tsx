import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { MessageSquare, Image, Video, Code, PenTool, Mic, Briefcase, BarChart, Layers } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'Chatbots': <MessageSquare className="w-8 h-8" />,
  'Image Generation': <Image className="w-8 h-8" />,
  'Video Creation': <Video className="w-8 h-8" />,
  'Coding': <Code className="w-8 h-8" />,
  'Writing': <PenTool className="w-8 h-8" />,
  'Audio & Voice': <Mic className="w-8 h-8" />,
  'Productivity': <Briefcase className="w-8 h-8" />,
  'Data Analysis': <BarChart className="w-8 h-8" />,
  'All': <Layers className="w-8 h-8" />
};

const CategoriesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
         <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">Explore</span>
         <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Browse Tools by Category</h1>
         <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Find the perfect AI tool for your specific needs. We've organized thousands of tools into easy-to-navigate categories.
         </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATEGORIES.filter(c => c !== 'All').map((category) => (
          <Link 
            key={category} 
            to={`/?category=${encodeURIComponent(category)}`}
            className="group bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-200 hover:-translate-y-1 transition-all flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
              {categoryIcons[category] || <Layers className="w-8 h-8" />}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">{category}</h3>
            <p className="text-sm text-slate-400 mb-4 font-medium">View Tools &rarr;</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;