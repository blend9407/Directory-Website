import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 flex flex-col h-full overflow-hidden">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="relative">
            <img 
              src={tool.logo} 
              alt={tool.name} 
              className="w-12 h-12 rounded-lg object-cover shadow-sm bg-slate-100 group-hover:scale-105 transition-transform"
              loading="lazy"
            />
            {tool.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" title="Verified Tool">
                <ShieldCheck className="w-4 h-4 text-blue-500 fill-blue-50" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
              tool.pricing === 'Free' ? 'bg-green-50 text-green-700 border-green-200' :
              tool.pricing === 'Paid' ? 'bg-slate-50 text-slate-700 border-slate-200' :
              'bg-purple-50 text-purple-700 border-purple-200'
            }`}>
              {tool.pricing}
            </span>
          </div>
        </div>

        <div>
           <div className="flex items-center gap-2 mb-1">
             <Link to={`/tool/${tool.id}`} className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                {tool.name}
             </Link>
             {tool.isHiddenGem && (
                <span title="Hidden Gem" className="flex items-center">
                  <Sparkles size={14} className="text-amber-500" />
                </span>
             )}
           </div>
           <div className="flex items-center gap-1 mb-3">
             <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
             <span className="text-sm font-medium text-slate-700">{tool.rating}</span>
             <span className="text-xs text-slate-400">({(tool.reviewsCount / 1000).toFixed(1)}k)</span>
           </div>
           <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
             {tool.description}
           </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tool.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs text-slate-400 font-medium">{tool.category}</span>
        <div className="flex gap-2">
            <Link 
                to={`/tool/${tool.id}`}
                className="text-xs font-medium text-slate-600 hover:text-primary-600 px-3 py-1.5 rounded-md hover:bg-white transition-colors border border-transparent hover:border-slate-200"
            >
                Details
            </Link>
            <a 
                href={tool.website} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-medium bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-50 hover:text-primary-600 transition-colors shadow-sm"
            >
                Visit <ExternalLink size={10} />
            </a>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;