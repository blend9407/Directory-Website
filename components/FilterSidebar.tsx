import React from 'react';
import { FilterState, Category, PricingModel } from '../types';
import { CATEGORIES, PRICING_MODELS } from '../constants';
import { SlidersHorizontal, Search } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, className = '' }) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className={`space-y-8 ${className}`}>
      
      {/* Search - Mobile prominent */}
      <div className="relative md:hidden">
         <Search className="absolute left-3 top-3 text-slate-400" size={18} />
         <input
          type="text"
          placeholder="Search 5,000+ tools..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
        />
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          <SlidersHorizontal size={16} />
          Categories
        </h3>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => updateFilter('category', cat)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.category === cat
                  ? 'bg-primary-50 text-primary-700 font-medium border-l-4 border-primary-500'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Pricing</h3>
        <div className="space-y-2">
          {PRICING_MODELS.map((price) => (
            <label key={price} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                 filters.pricing === price ? 'bg-primary-600 border-primary-600' : 'border-slate-300 bg-white group-hover:border-primary-400'
              }`}>
                  {filters.pricing === price && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <input 
                type="radio" 
                name="pricing" 
                value={price}
                className="hidden"
                checked={filters.pricing === price}
                onChange={() => updateFilter('pricing', price)}
              />
              <span className={`text-sm ${filters.pricing === price ? 'text-slate-900 font-medium' : 'text-slate-600 group-hover:text-slate-800'}`}>
                {price}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Ad Space Placeholder */}
      <div className="bg-slate-100 rounded-lg p-4 text-center border border-slate-200 border-dashed">
         <span className="text-xs text-slate-400 font-medium uppercase">Ad Space</span>
         <div className="mt-2 h-32 bg-slate-200 rounded flex items-center justify-center text-slate-400 text-sm">
            Google AdSense
         </div>
      </div>

    </div>
  );
};

export default FilterSidebar;