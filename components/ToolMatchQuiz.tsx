import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Loader2, PartyPopper, Rocket } from 'lucide-react';
import { Tool } from '../types';
import { getRecommendations } from '../services/toolService';
import ToolCard from './ToolCard';

interface ToolMatchQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ${
      selected 
        ? 'border-primary-500 bg-primary-50 text-primary-900' 
        : 'border-slate-200 hover:border-primary-200 hover:bg-slate-50'
    }`}
  >
    <span className="font-medium">{label}</span>
    {selected && <Check className="text-primary-600" size={20} />}
  </button>
);

const ToolMatchQuiz: React.FC<ToolMatchQuizProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [task, setTask] = useState('');
  const [budget, setBudget] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Tool[]>([]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 3) {
      setIsLoading(true);
      setStep(4);
      // Simulate matching delay
      setTimeout(() => {
        const matches = getRecommendations(role, task, budget);
        setResults(matches);
        setIsLoading(false);
      }, 1500);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  const reset = () => {
    setStep(1);
    setRole('');
    setTask('');
    setBudget('');
    setResults([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="bg-primary-100 p-1.5 rounded-lg text-primary-600">✨</span>
              AI Tool Matchmaker
            </h2>
            <p className="text-sm text-slate-500 mt-1">Find the perfect tool in 3 simple steps</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-grow">
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-slate-800">What best describes your role?</h3>
              <div className="space-y-3">
                {['Developer / Engineer', 'Marketer / Content Creator', 'Designer / Artist', 'Student / Researcher', 'Business Owner'].map((opt) => (
                  <OptionButton key={opt} label={opt} selected={role === opt} onClick={() => setRole(opt)} />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-slate-800">What is your primary goal?</h3>
              <div className="space-y-3">
                {['Writing content or copy', 'Writing code or fixing bugs', 'Generating images or art', 'Analyzing data or documents', 'Video creation'].map((opt) => (
                  <OptionButton key={opt} label={opt} selected={task === opt} onClick={() => setTask(opt)} />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-slate-800">What is your budget preference?</h3>
              <div className="space-y-3">
                {['Free tools only', 'Freemium (Free tier available)', 'Paid / Enterprise', 'Any budget'].map((opt) => (
                  <OptionButton key={opt} label={opt} selected={budget === opt} onClick={() => setBudget(opt)} />
                ))}
              </div>
            </div>
          )}

          {step === 4 && isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
              <p className="text-slate-600 font-medium animate-pulse">Analyzing 5,000+ tools for you...</p>
            </div>
          )}

          {step === 4 && !isLoading && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-full mb-3">
                  <PartyPopper size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">We found your matches!</h3>
                <p className="text-slate-500">Based on your needs as a <span className="font-medium text-slate-700">{role}</span>.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>

               {results.length === 0 && (
                  <div className="text-center text-slate-500 py-8">
                      No exact matches found. Try broadening your criteria.
                  </div>
               )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
          {step > 1 && step < 4 && (
            <button onClick={handleBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium px-4 py-2">
              <ArrowLeft size={16} /> Back
            </button>
          )}
          {step === 1 && <div></div>} {/* Spacer */}

          {step < 3 && (
            <button 
              onClick={handleNext} 
              disabled={!role && step === 1 || !task && step === 2}
              className="ml-auto flex items-center gap-2 bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Next Step <ArrowRight size={16} />
            </button>
          )}

          {step === 3 && (
            <button 
              onClick={handleNext} 
              disabled={!budget}
              className="ml-auto flex items-center gap-2 bg-primary-600 disabled:opacity-50 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
            >
              Find Tools <Rocket size={16} />
            </button>
          )}

          {step === 4 && (
             <button 
             onClick={reset} 
             className="mx-auto text-primary-600 font-medium hover:underline"
           >
             Start Over
           </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolMatchQuiz;