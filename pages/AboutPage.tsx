import React from 'react';
import { Zap, Users, Shield, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">About Aixly directory</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          We are the world's most comprehensive and trusted directory for Artificial Intelligence tools, helping professionals navigate the AI revolution.
        </p>
      </div>

      <div className="prose prose-lg prose-slate max-w-none mb-16">
        <p>
          Founded in 2024, Aixly directory started with a simple spreadsheet of 50 tools. Today, we track over 5,000 AI applications across every industry, from coding and design to healthcare and logistics.
        </p>
        <p>
          Our mission is to democratize access to AI technology. We believe that by organizing the world's AI tools and making them searchable, comparable, and understandable, we empower individuals and businesses to work smarter, not harder.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4">
            <Shield size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Curated Quality</h3>
          <p className="text-slate-600">
            We don't just list everything. Our team reviews submissions to ensure they are legitimate, functional, and safe to use.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center text-purple-600 mb-4">
            <Users size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Community Driven</h3>
          <p className="text-slate-600">
            Our reviews, tips, and ratings come from real users. We believe the best insights come from the people actually using the tools.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center text-green-600 mb-4">
            <Globe size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Global Reach</h3>
          <p className="text-slate-600">
            We track tools from every corner of the globe, supporting multiple languages and regional regulations.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center text-amber-600 mb-4">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Always Current</h3>
          <p className="text-slate-600">
            AI moves fast. Our database is updated daily to reflect pricing changes, new features, and deprecated tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;