import React, { useState } from 'react';
import { Language, TranslationSchema, View } from '../types';
import { Menu, X, HeartPulse, Activity, Library, Microscope, Pill, BookOpen, ImageIcon, Globe, Book } from 'lucide-react';

interface HeaderProps {
  t: TranslationSchema;
  lang: Language;
  setLang: (l: Language) => void;
  setView: (v: View) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ t, lang, setLang, setView, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.nav.home, icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'anatomy', label: t.nav.anatomy, icon: <Microscope className="w-4 h-4" /> },
    { id: 'diseases', label: t.nav.diseases, icon: <Library className="w-4 h-4" /> },
    { id: 'books', label: t.nav.books, icon: <Book className="w-4 h-4" /> },
    { id: 'healthTopics', label: t.nav.healthTopics, icon: <Activity className="w-4 h-4" /> },
    { id: 'encyclopedia', label: t.nav.encyclopedia, icon: <BookOpen className="w-4 h-4" /> },
    { id: 'drugs', label: t.nav.drugs, icon: <Pill className="w-4 h-4" /> },
    { id: 'images', label: t.nav.images, icon: <ImageIcon className="w-4 h-4" /> },
  ];

  return (
    <header className="relative z-[40]">
      <div className="logo-header">
        <div className="flex flex-col items-center">
          <div 
            className="bg-slate-800/40 backdrop-blur-md p-5 rounded-2xl border border-white/10 mb-4 cursor-pointer shadow-2xl"
            onClick={() => setView('home')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-[#4FD1C5] font-black text-2xl border border-[#4FD1C5]/30 cyan-glow">
                MB
              </div>
              <div className="text-left">
                <div className="text-white font-extrabold text-2xl leading-none tracking-tight brand-heading uppercase">MEDICINE</div>
                <div className="text-[#4FD1C5] font-bold text-[8px] uppercase tracking-[0.4em] mt-1 opacity-80">Global Scientific Archive</div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">{t.common.appName}</h1>
          <p className="text-slate-400 text-[10px] font-medium uppercase tracking-[0.3em] opacity-70">{t.common.tagline}</p>
        </div>
      </div>

      <nav className="bg-slate-900/90 backdrop-blur-md border-b border-white/5 sticky top-0 shadow-lg h-14">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-1 h-full overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center gap-2 text-[10px] font-bold px-4 h-full transition-all whitespace-nowrap uppercase tracking-widest relative ${
                  currentView === item.id ? 'text-[#4FD1C5]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
                {currentView === item.id && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#4FD1C5] shadow-[0_0_8px_#4FD1C5]"></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
              {(['en', 'ar', 'fr'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 text-[9px] font-bold rounded-lg uppercase transition-all ${
                    lang === l ? 'bg-[#4FD1C5] text-slate-900 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button className="lg:hidden p-2 text-white/70 hover:text-[#4FD1C5]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-white/5 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setView(item.id); setIsMenuOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                currentView === item.id ? 'bg-[#4FD1C5] text-slate-900' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;