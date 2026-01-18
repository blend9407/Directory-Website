import React from 'react';
import { TrendingUp, Target, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdvertisePage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Advertise with Us</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Put your AI tool in front of 500,000+ monthly active users who are looking for the next big thing in Artificial Intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-4xl font-bold text-primary-600 mb-2">500k+</div>
          <div className="text-slate-600 font-medium">Monthly Visitors</div>
        </div>
        <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-4xl font-bold text-primary-600 mb-2">85k+</div>
          <div className="text-slate-600 font-medium">Newsletter Subscribers</div>
        </div>
        <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-4xl font-bold text-primary-600 mb-2">12%</div>
          <div className="text-slate-600 font-medium">Average CTR</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-8">Sponsorship Options</h2>
      <div className="space-y-6 mb-16">
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-slate-200 hover:border-primary-200 transition-colors">
          <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-center shrink-0">
            <TrendingUp className="text-blue-600 w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Homepage Featured Spot</h3>
            <p className="text-slate-600 mt-2">
              Your tool pinned to the top of the homepage for 7 days. Includes a "Featured" badge and custom background highlight.
            </p>
            <div className="mt-4 text-sm font-semibold text-primary-600">$500 / week</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-slate-200 hover:border-primary-200 transition-colors">
          <div className="bg-purple-50 p-4 rounded-lg flex items-center justify-center shrink-0">
            <Mail className="text-purple-600 w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Newsletter Sponsorship</h3>
            <p className="text-slate-600 mt-2">
              A dedicated section in our weekly "AI Trends" newsletter sent to 85,000+ subscribers. High engagement and conversion.
            </p>
            <div className="mt-4 text-sm font-semibold text-primary-600">$1,200 / blast</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-slate-200 hover:border-primary-200 transition-colors">
          <div className="bg-green-50 p-4 rounded-lg flex items-center justify-center shrink-0">
            <Target className="text-green-600 w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Category Takeover</h3>
            <p className="text-slate-600 mt-2">
              Exclusive banner placement at the top of a specific category page (e.g., "Coding Tools"). Target your exact niche.
            </p>
            <div className="mt-4 text-sm font-semibold text-primary-600">$300 / month</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to grow?</h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          Contact our sales team to get started. We typically respond within 24 hours.
        </p>
        <Link to="/contact" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors">
          Contact Sales
        </Link>
      </div>
    </div>
  );
};

export default AdvertisePage;