import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Monitor, Zap, Menu, X, Rocket, ChevronDown, BrainCircuit, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onOpenQuiz: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenQuiz }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navLinkClass = (path: string) => 
    `px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      location.pathname.startsWith(path) && path !== '/' || location.pathname === path
        ? 'bg-primary-50 text-primary-700' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Top Banner - Monetization/Promo */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center font-medium relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-primary-600/20"></div>
        <div className="relative z-10 flex justify-center items-center gap-2">
          <span className="opacity-90">🚀 New: Discover the 2026 AI hidden gems report!</span>
          <Link to="/blog/small-language-models-slm-revolution" className="underline cursor-pointer hover:text-indigo-200">Read now</Link>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo & Nav */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-500"></div>
                  <div className="relative bg-slate-900 text-white p-2 rounded-xl group-hover:scale-105 transition-transform shadow-sm ring-1 ring-white/10 flex items-center justify-center">
                    <BrainCircuit size={22} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                    <Sparkles size={10} className="absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
                  </div>
                </div>
                <div className="flex flex-col justify-center -space-y-0.5">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
                    Aixly directory
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                <Link to="/" className={navLinkClass('/')}>Directory</Link>
                <Link to="/categories" className={navLinkClass('/categories')}>Categories</Link>
                <Link to="/blog" className={navLinkClass('/blog')}>Blog</Link>
                <Link to="/submit-tool" className={navLinkClass('/submit-tool')}>Submit Tool</Link>
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-colors ${isSearchOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                aria-label="Toggle search"
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>
              
              <button 
                onClick={onOpenQuiz}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-600 bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                   <Rocket size={16} className="text-yellow-300 group-hover:animate-pulse" />
                   Find My Match
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={onOpenQuiz}
                className="text-xs font-bold bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full border border-primary-100"
              >
                Match
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-md">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-4 shadow-lg animate-in slide-in-from-top-2 z-30">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto relative">
               <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
               <input 
                 autoFocus
                 type="text" 
                 placeholder="Search tools (e.g. Chatbots, Video)..." 
                 className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 outline-none bg-slate-50 text-slate-900"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl animate-in slide-in-from-top-2">
             <div className="px-4 py-3 space-y-1">
               <Link to="/" className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-900 bg-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Directory</Link>
               <Link to="/categories" className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
               <Link to="/blog" className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
               <Link to="/submit-tool" className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Submit Tool</Link>
             </div>
             
             {/* Mobile Search in Menu */}
             <div className="px-4 py-3 border-t border-slate-100">
               <form onSubmit={handleSearchSubmit} className="relative">
                 <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                 <input 
                   type="text" 
                   placeholder="Search tools..." 
                   className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </form>
             </div>

             <div className="p-4 border-t border-slate-100">
                <button 
                  onClick={() => {
                    onOpenQuiz();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl font-medium shadow-lg"
                >
                  <Rocket size={18} className="text-yellow-300" />
                  Find My Match
                </button>
             </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2.5 mb-4 text-slate-900">
                <div className="bg-slate-900 text-white p-2 rounded-lg">
                   <BrainCircuit size={18} className="text-indigo-400" />
                </div>
                <span className="text-lg font-bold">Aixly directory</span>
              </div>
            <p className="max-w-sm text-sm text-slate-500 leading-relaxed">
              The world's most comprehensive directory of AI tools. Helping professionals navigate the artificial intelligence revolution with confidence.
            </p>
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Directory</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/categories" className="hover:text-primary-600 transition-colors">All Categories</Link></li>
              <li><Link to="/blog" className="hover:text-primary-600 transition-colors">Latest News</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-primary-600 transition-colors">New Arrivals</Link></li>
              <li><Link to="/submit-tool" className="hover:text-primary-600 transition-colors">Submit a Tool</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/about" className="hover:text-primary-600 transition-colors">About Us</Link></li>
              <li><Link to="/advertise" className="hover:text-primary-600 transition-colors">Advertise</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-primary-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>© 2026 Aixly directory. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-600">Twitter</a>
            <a href="#" className="hover:text-slate-600">LinkedIn</a>
            <a href="#" className="hover:text-slate-600">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;