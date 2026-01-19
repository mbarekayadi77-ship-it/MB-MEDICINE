
import React from 'react';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onSearch: (query: string) => void;
  onNavigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ lang, onSearch, onNavigate }) => {
  const isRtl = lang === Language.AR;
  
  const t = {
    title: { [Language.EN]: 'MB MEDICINE', [Language.FR]: 'MB MEDICINE', [Language.AR]: 'إم بي ميديسن' },
    tagline: { 
      [Language.EN]: 'The 2026 Global Standard for Clinical Intelligence & Academic Authority.', 
      [Language.FR]: 'La norme mondiale 2026 pour l\'intelligence clinique et l\'autorité académique.', 
      [Language.AR]: 'المعيار العالمي لعام 2026 للذكاء السريري والسلطة الأكاديمية.' 
    },
    placeholder: {
      [Language.EN]: 'Search clinical volumes, surgical protocols, or drugs...',
      [Language.FR]: 'Rechercher volumes cliniques, protocoles...',
      [Language.AR]: 'ابحث في المجلدات السريرية، البروتوكولات...'
    },
    ctaPrimary: { [Language.EN]: 'Consult Professor AI', [Language.FR]: 'Consulter Professeur IA', [Language.AR]: 'استشارة المساعد الذكي' },
    ctaSecondary: { [Language.EN]: 'Explore Repository', [Language.FR]: 'Explorer le Répertoire', [Language.AR]: 'استكشاف المستودع' },
    verified: {
      [Language.EN]: 'Verified Institutional Access',
      [Language.FR]: 'Accès Institutionnel Vérifié',
      [Language.AR]: 'وصول مؤسسي موثق'
    },
    academic: {
      nejm: { [Language.EN]: 'NEJM Referenced', [Language.FR]: 'Référencé NEJM', [Language.AR]: 'مرجع NEJM' },
      who: { [Language.EN]: 'WHO Verified', [Language.FR]: 'Vérifié par l\'OMS', [Language.AR]: 'موثق من قبل منظمة الصحة العالمية' },
      core: { [Language.EN]: '2026 Core v4.2', [Language.FR]: 'Cœur 2026 v4.2', [Language.AR]: 'جوهر 2026 v4.2' },
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* High-Resolution Surgical Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[30000ms] hover:scale-110 grayscale-[0.3]"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2560')`,
        }}
      />
      
      {/* Sophisticated Gradients & Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-medical-950 via-medical-950/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-medical-950 via-transparent to-medical-950/40" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Main Container */}
      <div className={`relative z-10 w-full max-w-7xl px-8 md:px-12 flex flex-col lg:flex-row items-center gap-20 ${isRtl ? 'lg:flex-row-reverse text-right' : 'text-left'}`}>
        
        {/* Brand Messaging */}
        <div className="flex-[1.2] space-y-10 py-20">
          <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] text-emerald-400 font-extrabold uppercase tracking-[0.4em]">{t.verified[lang]}</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase">
            {t.title[lang]}
          </h1>
          
          <p className="text-xl md:text-3xl text-slate-300 font-medium max-w-2xl leading-relaxed opacity-90 tracking-tight">
            {t.tagline[lang]}
          </p>

          <div className="w-full max-w-2xl space-y-6 pt-6">
            <div className="relative group">
              <input 
                type="text"
                placeholder={t.placeholder[lang]}
                className={`w-full h-20 pl-8 pr-16 rounded-3xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-emerald-500/50 focus:outline-none transition-premium shadow-2xl font-semibold text-lg ${isRtl ? 'text-right' : 'text-left'}`}
                onKeyDown={(e) => e.key === 'Enter' && onSearch(e.currentTarget.value)}
              />
              <div className={`absolute ${isRtl ? 'left-8' : 'right-8'} top-1/2 -translate-y-1/2 text-emerald-500/40 group-focus-within:text-emerald-500 transition-colors`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row gap-5 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
               <button 
                onClick={() => onNavigate('ai')}
                className="flex-1 h-20 px-10 rounded-3xl bg-emerald-600 hover:bg-emerald-500 text-white font-black transition-premium shadow-2xl shadow-emerald-900/40 active:scale-[0.98] text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-4"
               >
                 {t.ctaPrimary[lang]}
                 <svg className={isRtl ? 'rotate-180' : ''} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
               </button>
               <button 
                onClick={() => onNavigate('library')}
                className="h-20 px-12 rounded-3xl bg-slate-900/50 border border-white/10 text-slate-300 font-bold hover:bg-slate-800 hover:text-white transition-premium backdrop-blur-xl uppercase text-[11px] tracking-[0.3em]"
               >
                 {t.ctaSecondary[lang]}
               </button>
            </div>
          </div>

          <div className={`flex flex-wrap items-center gap-10 pt-10 text-[10px] font-black uppercase tracking-[0.35em] text-slate-500 ${isRtl ? 'justify-end' : ''}`}>
            <div className="flex items-center gap-3">
              <span className="text-emerald-500 text-sm">✦</span>
              {t.academic.nejm[lang]}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-500 text-sm">✦</span>
              {t.academic.who[lang]}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-500 text-sm">✦</span>
              {t.academic.core[lang]}
            </div>
          </div>
        </div>

        {/* Hero Visual Brand Identity - Professional Lab/Micro Image */}
        <div className="flex-1 hidden lg:flex justify-end relative">
          <div className="relative group perspective-1000">
            {/* Elegant Glow Orbs */}
            <div className="absolute -inset-32 bg-emerald-500/10 rounded-full blur-[120px] opacity-40 group-hover:opacity-60 transition-opacity" />
            
            {/* Premium Image Frame */}
            <div className="relative w-[480px] h-[520px] rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.7)] transition-premium transform group-hover:rotate-1 group-hover:translate-y-[-10px]">
               <img 
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200" 
                alt="MB Medicine Research Core" 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-premium"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-medical-950/90 via-medical-950/20 to-transparent flex flex-col justify-end p-12">
                  <div className={`flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                     <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-2xl border border-white/10">MB</div>
                     <div className={isRtl ? 'text-right' : 'text-left'}>
                        <p className="text-white font-black text-2xl uppercase tracking-tighter leading-none">Clinical Intelligence</p>
                        <p className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.4em] mt-2">Active Synthesis Core</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Floating Trust Tokens */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-slate-900 border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center shadow-5xl animate-bounce-slow">
               <span className="text-emerald-500 font-black text-2xl tracking-tighter">99.9%</span>
               <span className="text-[8px] text-slate-500 font-black uppercase text-center mt-2 tracking-widest leading-tight">Data<br/>Precision</span>
            </div>
            
            <div className={`absolute bottom-16 -left-16 px-8 py-5 bg-slate-950 border border-white/5 rounded-3xl flex items-center gap-4 shadow-5xl group-hover:translate-x-4 transition-premium ${isRtl ? 'flex-row-reverse' : ''}`}>
               <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Live Clinical Board Sync</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .animate-bounce-slow { animation: bounce 10s infinite ease-in-out; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
};

export default Hero;
