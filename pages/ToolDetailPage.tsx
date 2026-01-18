import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToolById, getRelatedTools, getToolTips, addToolTip } from '../services/toolService';
import { Tool, UserTip } from '../types';
import { Star, Globe, CheckCircle, Share2, MessageSquare, ThumbsUp, Activity, AlertTriangle, X, Send, Loader2 } from 'lucide-react';
import ToolCard from '../components/ToolCard';

const ToolDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [related, setRelated] = useState<Tool[]>([]);
  const [tips, setTips] = useState<UserTip[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [newTipUser, setNewTipUser] = useState('');
  const [newTipContent, setNewTipContent] = useState('');
  const [isSubmittingTip, setIsSubmittingTip] = useState(false);
  const [tipError, setTipError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    const fetchData = async () => {
      if (id) {
        const found = getToolById(id);
        if (found) {
          setTool(found);
          setRelated(getRelatedTools(found));
          
          // Fetch real tips from Supabase
          const realTips = await getToolTips(id);
          // Merge with mock tips (optional, but good for demo if DB is empty)
          // To prioritize real interaction, let's put real tips first
          setTips([...realTips, ...(found.tips || [])]);
        }
      }
      setLoading(false);
    };

    // Small delay to simulate smooth loading transition
    setTimeout(fetchData, 400);
  }, [id]);

  const handleAddTip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tool) return;

    setIsSubmittingTip(true);
    setTipError(null);

    try {
        const addedTip = await addToolTip(tool.id, newTipUser, newTipContent);
        if (addedTip) {
            setTips([addedTip, ...tips]);
            setIsTipModalOpen(false);
            setNewTipContent('');
            setNewTipUser('');
        }
    } catch (err: any) {
        setTipError(err.message || "Failed to add tip. Please try again.");
    } finally {
        setIsSubmittingTip(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!tool) return <div className="text-center py-20 text-xl font-medium">Tool not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-500 mb-6 flex gap-2">
        <Link to="/" className="hover:text-primary-600">Home</Link> / 
        <span className="hover:text-primary-600 cursor-pointer">{tool.category}</span> / 
        <span className="text-slate-900 font-medium">{tool.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          
          {/* Tool Header */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <img src={tool.logo} alt={tool.name} className="w-24 h-24 rounded-2xl object-cover bg-slate-50 shadow-md" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                   <div>
                     <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                       {tool.name}
                       {tool.isVerified && <CheckCircle size={24} className="text-white fill-blue-500" />}
                     </h1>
                     <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                       <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded text-amber-700">
                         <Star size={16} className="fill-amber-500 text-amber-500" />
                         <span className="font-bold">{tool.rating}</span>
                         <span>({tool.reviewsCount.toLocaleString()} reviews)</span>
                       </div>
                       <span className={`px-2 py-1 rounded border ${
                         tool.pricing === 'Free' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-purple-50 text-purple-700 border-purple-100'
                       }`}>
                         {tool.pricing}
                       </span>
                     </div>
                   </div>
                   <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                     <Share2 size={20} />
                   </button>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  {tool.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <a href={tool.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">
                    Visit Website <Globe size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tool Details Tabs / Sections */}
          <div className="space-y-8">
             {/* Features */}
             <section className="bg-white rounded-xl p-6 border border-slate-200">
               <h2 className="text-xl font-bold text-slate-900 mb-4">Key Features</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {tool.features.map((feat, i) => (
                   <div key={i} className="flex items-start gap-3">
                     <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                       <CheckCircle size={12} className="text-green-600" />
                     </div>
                     <span className="text-slate-700">{feat}</span>
                   </div>
                 ))}
               </div>
             </section>
            
             {/* Community Tips */}
             <section className="bg-white rounded-xl p-6 border border-slate-200">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                   Community Tips
                   <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-normal">
                     {tips.length}
                   </span>
                 </h2>
                 <button 
                    onClick={() => setIsTipModalOpen(true)}
                    className="text-sm text-primary-600 font-medium hover:underline bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                 >
                   + Add Tip
                 </button>
               </div>
               
               <div className="space-y-4">
                 {tips.length > 0 ? tips.map(tip => (
                   <div key={tip.id} className="bg-slate-50 rounded-lg p-4 flex gap-4">
                     <div className="flex flex-col items-center gap-1 min-w-[3rem]">
                       <button className="text-slate-400 hover:text-amber-500 transition-colors">
                         <ThumbsUp size={18} />
                       </button>
                       <span className="text-xs font-bold text-slate-600">{tip.upvotes}</span>
                     </div>
                     <div>
                       <p className="text-slate-800 text-sm mb-2">{tip.content}</p>
                       <div className="text-xs text-slate-400">
                         Shared by <span className="font-medium text-slate-600">{tip.user}</span> • {tip.date}
                       </div>
                     </div>
                   </div>
                 )) : (
                   <div className="text-center py-6 text-slate-400 text-sm">No tips yet. Be the first to add one!</div>
                 )}
               </div>
             </section>

             {/* API Status Mock */}
             <section className="bg-white rounded-xl p-6 border border-slate-200">
               <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <Activity size={20} className="text-slate-400" />
                 Live Status
               </h2>
               <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-lg border border-green-100">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="font-medium">Operational</span>
                 <span className="text-green-600/70 text-sm ml-auto">Uptime: 99.9%</span>
               </div>
             </section>

          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           {/* Ad Block */}
           <div className="bg-slate-100 h-64 rounded-xl flex items-center justify-center border border-slate-200 border-dashed text-slate-400 text-sm font-medium">
             Ad Placement
           </div>

           {/* Related Tools */}
           <div className="bg-white rounded-xl border border-slate-200 p-6">
             <h3 className="font-bold text-slate-900 mb-4">Alternatives to {tool.name}</h3>
             <div className="space-y-4">
               {related.map(rel => (
                 <Link to={`/tool/${rel.id}`} key={rel.id} className="flex gap-3 group">
                   <img src={rel.logo} alt={rel.name} className="w-10 h-10 rounded-lg bg-slate-50 object-cover" />
                   <div>
                     <div className="font-semibold text-slate-900 text-sm group-hover:text-primary-600 transition-colors">{rel.name}</div>
                     <div className="text-xs text-slate-500">{rel.category}</div>
                   </div>
                 </Link>
               ))}
             </div>
           </div>
           
           {/* Tags */}
           <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map(tag => (
                  <span key={tag} className="text-xs bg-slate-50 text-slate-600 px-3 py-1.5 rounded-full border border-slate-100">
                    #{tag}
                  </span>
                ))}
              </div>
           </div>
        </div>
      </div>

      {/* Add Tip Modal */}
      {isTipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button 
                onClick={() => setIsTipModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
                <X size={20} />
            </button>
            
            <h3 className="text-xl font-bold text-slate-900 mb-4">Add a Pro Tip</h3>
            
            {tipError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                    <AlertTriangle size={16} />
                    {tipError}
                </div>
            )}

            <form onSubmit={handleAddTip} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                    <input 
                        type="text" 
                        required
                        value={newTipUser}
                        onChange={(e) => setNewTipUser(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tip Content</label>
                    <textarea 
                        required
                        value={newTipContent}
                        onChange={(e) => setNewTipContent(e.target.value)}
                        rows={4}
                        placeholder="Share a useful tip, shortcut, or use case for this tool..."
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none resize-none"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isSubmittingTip}
                    className="w-full bg-primary-600 text-white font-medium py-2.5 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {isSubmittingTip ? <Loader2 className="animate-spin" size={18} /> : <><Send size={18} /> Submit Tip</>}
                </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ToolDetailPage;