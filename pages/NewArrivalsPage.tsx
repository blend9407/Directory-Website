import React, { useEffect, useState } from 'react';
import { getTools } from '../services/toolService';
import { Tool } from '../types';
import ToolCard from '../components/ToolCard';
import { Sparkles, Loader2 } from 'lucide-react';

const NewArrivalsPage: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      // Fetch tools sorted by newest (simulated by ID in mock service)
      const data = await getTools({ search: '', category: 'All', pricing: 'All', sortBy: 'newest' });
      setTools(data.slice(0, 20)); // Show top 20 new tools
      setLoading(false);
    };
    fetchTools();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-full mb-4">
          <Sparkles size={24} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">New Arrivals</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          The latest AI tools added to our directory. Stay ahead of the curve by discovering fresh technology every day.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivalsPage;