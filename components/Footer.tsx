import React from 'react';
import { TranslationSchema } from '../types';
import { Github, Twitter, Linkedin, Mail, HeartPulse } from 'lucide-react';

interface Props {
  t: TranslationSchema;
  onNavigate: (v: any) => void;
}

const Footer: React.FC<Props> = ({ t, onNavigate }) => {
  return (
    <footer className="bg-black border-t border-[#10B981]/25 pt-48 pb-20 mt-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-48">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-8 mb-20 cursor-pointer group" onClick={() => onNavigate('home')}>
              <div className="w-16 h-16 bg-[#0B0F14] rounded-sm flex items-center justify-center text-[#4FD1C5] font-black text-4xl shadow-3xl border border-[#4FD1C5]/30 cyan-glow">
                MB
              </div>
              <span className="text-5xl font-black text-white tracking-tighter brand-heading uppercase">MEDICINE</span>
            </div>
            <p className="text-slate-400 text-xl leading-relaxed italic pr-12 opacity-85 font-medium">
              Enterprise-grade verified global repository for medical education. High-fidelity datasets curated for absolute clinical accuracy and institutional excellence.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#10B981] mb-20 uppercase text-[11px] tracking-[0.55em] flex items-center gap-5 brand-heading">
              <span className="w-12 h-0.5 bg-[#10B981]"></span>
              Clinical Archive
            </h4>
            <ul className="space-y-10 text-xs text-slate-400 font-black uppercase tracking-[0.3em]">
              <li><button onClick={() => onNavigate('anatomy')} className="hover:text-[#10B981] transition-colors text-left">{t.nav.anatomy}</button></li>
              <li><button onClick={() => onNavigate('diseases')} className="hover:text-[#10B981] transition-colors text-left">{t.nav.diseases}</button></li>
              <li><button onClick={() => onNavigate('encyclopedia')} className="hover:text-[#10B981] transition-colors text-left">{t.nav.encyclopedia}</button></li>
              <li><button onClick={() => onNavigate('drugs')} className="hover:text-[#10B981] transition-colors text-left">{t.nav.drugs}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#10B981] mb-20 uppercase text-[11px] tracking-[0.55em] flex items-center gap-5 brand-heading">
              <span className="w-12 h-0.5 bg-[#10B981]"></span>
              Resources
            </h4>
            <ul className="space-y-10 text-xs text-slate-400 font-black uppercase tracking-[0.3em]">
              <li><button onClick={() => onNavigate('about')} className="hover:text-[#10B981] transition-colors text-left">{t.nav.about}</button></li>
              <li><button onClick={() => onNavigate('history')} className="hover:text-[#10B981] transition-colors text-left">{t.nav.history}</button></li>
              <li><button onClick={() => onNavigate('images')} className="hover:text-[#10B981] transition-colors text-left">{t.nav.images}</button></li>
              <li><button onClick={() => onNavigate('books')} className="hover:text-[#10B981] transition-colors text-left">{t.nav.books}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#10B981] mb-20 uppercase text-[11px] tracking-[0.55em] flex items-center gap-5 brand-heading">
              <span className="w-12 h-0.5 bg-[#10B981]"></span>
              Institutional
            </h4>
            <ul className="space-y-10 text-xs text-slate-400 font-black uppercase tracking-[0.3em]">
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-[#10B981] transition-colors text-left">{t.nav.privacy}</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-[#10B981] transition-colors text-left">{t.nav.terms}</button></li>
              <li className="flex items-center gap-6 text-[#4FD1C5] pt-12 border-t border-white/5">
                <HeartPulse className="w-12 h-12" />
                <span className="uppercase tracking-[0.45em] text-[11px] brand-heading font-black">Clinical Standard Protocol</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-28 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-20">
          <p className="text-[12px] text-slate-600 font-black uppercase tracking-[0.7em] brand-heading">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-16">
            <a href="#" className="text-white/10 hover:text-[#10B981] transition-all"><Twitter className="w-7 h-7" /></a>
            <a href="#" className="text-white/10 hover:text-[#10B981] transition-all"><Linkedin className="w-7 h-7" /></a>
            <a href="#" className="text-white/10 hover:text-[#10B981] transition-all"><Github className="w-7 h-7" /></a>
            <a href="#" className="text-white/10 hover:text-[#10B981] transition-all"><Mail className="w-7 h-7" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;