import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, TrendingUp, Grid, List, AlertCircle, Loader2 } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import FilterSidebar from '../components/FilterSidebar';
import { getTools } from '../services/toolService';
import { FilterState, Tool, Category } from '../types';

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState<FilterState>({
    search: initialSearch,
    category: initialCategory,
    pricing: 'All',
    sortBy: 'popular'
  });

  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync state with URL if it changes (e.g. back button or link click)
  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search');
    
    setFilters(prev => ({ 
        ...prev, 
        category: (cat as Category) || 'All',
        search: search !== null ? search : prev.search 
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      const data = await getTools(filters);
      setTools(data);
      setVisibleCount(12); // Reset visible count on filter change
      setLoading(false);
    };
    fetchTools();
  }, [filters]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const visibleTools = tools.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Hero / Search Section */}
      <div className="mb-12 text-center max-w-3xl mx-auto pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-100">
          <TrendingUp size={12} />
          The #1 AI Directory
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          Discover the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-primary-600">AI Tools</span> for Your Workflow
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Browse 5,000+ AI tools, compare features, and read community reviews. 
          Updated daily to keep you ahead of the curve.
        </p>

        <div className="relative max-w-2xl mx-auto hidden md:block group z-10">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-primary-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-white p-2 rounded-xl shadow-xl border border-slate-200 flex items-center transform transition-transform focus-within:scale-[1.01]">
            <Search className="ml-4 text-slate-400 flex-shrink-0" size={22} />
            <input
              type="text"
              placeholder="Search tools, categories, or tasks..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full px-4 py-3 outline-none text-slate-800 placeholder-slate-400 text-lg bg-transparent"
            />
            <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 active:scale-95 transition-all shadow-md">
              Search
            </button>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex justify-center gap-4">
             <span>Popular:</span>
             <button onClick={() => setFilters({...filters, search: 'Chatbot'})} className="hover:text-primary-600 hover:underline">Chatbots</button>
             <button onClick={() => setFilters({...filters, search: 'Image'})} className="hover:text-primary-600 hover:underline">Image Gen</button>
             <button onClick={() => setFilters({...filters, search: 'Video'})} className="hover:text-primary-600 hover:underline">Video</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
        </aside>

        {/* Main Grid */}
        <div className="flex-grow">
          
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white p-3 rounded-lg border border-slate-100 shadow-sm sticky top-20 z-30">
             <div className="text-slate-600 font-medium flex items-center gap-2 text-sm">
               {loading ? <span className="animate-pulse w-20 h-4 bg-slate-200 rounded"></span> : <>{tools.length} Tools Found</>}
             </div>
             
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">Sort by:</span>
                  <select 
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                    className="bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none focus:border-primary-500 text-slate-700 cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest Added</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-md">
                   <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                   >
                     <Grid size={18} />
                   </button>
                   <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                   >
                     <List size={18} />
                   </button>
                </div>
             </div>
          </div>

          {/* Ad Banner (Horizontal) */}
          <div className="w-full h-24 bg-gradient-to-r from-slate-100 to-white rounded-xl mb-8 flex flex-col items-center justify-center border border-slate-200 border-dashed relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-xs text-slate-400 font-medium uppercase mb-1 relative z-10">Sponsored</span>
              <div className="text-slate-600 font-medium flex items-center gap-2 relative z-10">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 Build your own AI Agent in minutes
              </div>
          </div>

          {/* Grid Content */}
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-80 bg-slate-100 rounded-xl animate-pulse"></div>
                ))}
             </div>
          ) : tools.length > 0 ? (
            <>
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {visibleTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < tools.length && (
                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={loadMore}
                    className="group flex items-center gap-2 px-8 py-3 border border-slate-200 bg-white text-slate-700 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all font-medium shadow-sm active:scale-95"
                  >
                    Load More Tools
                    <Loader2 className="w-4 h-4 group-hover:animate-spin" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <AlertCircle className="h-8 w-8 text-slate-300" />
               </div>
               <h3 className="text-lg font-bold text-slate-900">No tools found</h3>
               <p className="text-slate-500 mt-1 max-w-xs mx-auto">We couldn't find any tools matching your criteria. Try adjusting your search.</p>
               <button 
                  onClick={() => setFilters({ search: '', category: 'All', pricing: 'All', sortBy: 'popular'})}
                  className="mt-6 text-primary-600 font-medium hover:underline bg-primary-50 px-4 py-2 rounded-lg"
                >
                  Clear all filters
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;