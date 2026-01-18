import React, { useState } from 'react';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { CATEGORIES, PRICING_MODELS } from '../constants';
import { supabase } from '../services/supabaseClient';

const SubmitToolPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    category: '',
    pricing: '',
    description: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    
    try {
      // We insert into a 'submissions' table to keep the main list clean until approval.
      const { error } = await supabase
        .from('submissions')
        .insert([
          {
            name: formData.name,
            website: formData.website,
            category: formData.category,
            pricing: formData.pricing,
            description: formData.description,
            email: formData.email,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      console.error('Error submitting tool:', err);
      setErrorMsg(err.message || 'Failed to submit tool. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Submission Received!</h1>
        <p className="text-lg text-slate-600 mb-8">
          Thank you for submitting <strong>{formData.name}</strong>. Our team will review your tool within 48 hours. You will receive a confirmation email at {formData.email} once it's live.
        </p>
        <button 
          onClick={() => {
            setIsSuccess(false);
            setFormData({ name: '', website: '', category: '', pricing: '', description: '', email: '' });
          }}
          className="text-primary-600 font-medium hover:underline"
        >
          Submit another tool
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Submit a Tool</h1>
        <p className="text-slate-600 text-lg">
          Have an AI tool that belongs in our directory? Fill out the form below to get listed in front of thousands of daily users.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Tool Name <span className="text-red-500">*</span></label>
            <input
              required
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. SuperAI"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white text-slate-900"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-slate-700 mb-1">Website URL <span className="text-red-500">*</span></label>
            <input
              required
              type="url"
              name="website"
              id="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category <span className="text-red-500">*</span></label>
            <select
              required
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white text-slate-900"
            >
              <option value="">Select a category</option>
              {CATEGORIES.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pricing" className="block text-sm font-medium text-slate-700 mb-1">Pricing Model <span className="text-red-500">*</span></label>
            <select
              required
              name="pricing"
              id="pricing"
              value={formData.pricing}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white text-slate-900"
            >
              <option value="">Select pricing</option>
              {PRICING_MODELS.filter(p => p !== 'All').map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Short Description <span className="text-red-500">*</span></label>
          <textarea
            required
            name="description"
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what your tool does in 2-3 sentences..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none bg-white text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Contact Email <span className="text-red-500">*</span></label>
          <input
            required
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white text-slate-900"
          />
          <p className="text-xs text-slate-500 mt-1">We'll use this to verify ownership and send updates.</p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 text-white font-bold py-3.5 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Submitting...
              </>
            ) : (
              <>
                Submit Tool <Send size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitToolPage;