import React, { useState } from 'react';
import { TranslationSchema } from '../types';
import { Search, ShieldCheck, Microscope, Database, Sparkles } from 'lucide-react';

interface HeroProps {
  t: TranslationSchema;
  onNavigate: (v: any) => void;
  onSmartIcon: (query: string) => void;
  onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ t, onNavigate, onSmartIcon, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="relative pt-32 pb-24 sm:pt-52 sm:pb-40 overflow-hidden">
      {/* Dynamic Cyber Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ffaa]/10 rounded-full blur-[160px] -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px] -ml-48 -mb-48 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="inline-flex items-center gap-4 px-8 py-3 bg-slate-900/60 backdrop-blur-xl border border-[#00ffaa]/30 rounded-full text-[#00ffaa] text-[11px] font-black uppercase tracking-[0.5em] animate-in fade-in slide-in-from-top duration-700">
            <Sparkles className="w-5 h-5 animate-pulse" />
            Clinical Authority Platform
          </div>
          
          <h1 className="hero-title animate-in fade-in slide-in-from-bottom-4 duration-1000">
            MB MEDICINE <br />
            <span className="neon-glow-text">Scientific Archive</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg sm:text-2xl text-slate-400 font-medium leading-relaxed italic opacity-85 animate-in fade-in duration-1000 delay-300">
            Global repository of institutional-grade medical datasets. Access verified anatomical frameworks and clinical repositories with high-fidelity scientific precision.
          </p>

          <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl mt-14 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <div className="relative flex flex-col sm:flex-row gap-5 p-3 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[32px] hover:border-[#00ffaa]/50 focus-within:border-[#00ffaa] transition-all shadow-3xl">
              <div className="flex-grow relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-500 group-focus-within:text-[#00ffaa] transition-colors" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-16 pl-16 pr-8 bg-transparent text-white font-bold placeholder:text-slate-700 outline-none text-lg"
                  placeholder={t.common.searchPlaceholder}
                />
              </div>
              <button 
                type="submit"
                className="btn-haptic btn-neon h-16"
              >
                Consult AI
              </button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row gap-6 mt-10 w-full sm:w-auto animate-in fade-in duration-1000 delay-700">
            <button 
              onClick={() => onNavigate('anatomy')}
              className="btn-haptic bg-white text-black hover:bg-[#00ffaa] hover:shadow-[0_0_30px_rgba(0,255,170,0.5)]"
            >
              <Microscope className="w-6 h-6 mr-4" /> Anatomy Framework
            </button>
            <button 
              onClick={() => onNavigate('diseases')}
              className="btn-haptic btn-outline"
            >
              <Database className="w-6 h-6 mr-4" /> Pathology Archive
            </button>
          </div>

          <div className="mt-16 flex items-center gap-12 text-[10px] text-slate-600 font-black uppercase tracking-[0.4em] opacity-50">
            <div className="flex items-center gap-3"><ShieldCheck className="w-4 h-4" /> Institutional</div>
            <div className="flex items-center gap-3"><Database className="w-4 h-4" /> Verified Data</div>
            <div className="flex items-center gap-3"><Sparkles className="w-4 h-4" /> AI Analytics</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;