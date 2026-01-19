
import React, { useState } from 'react';
import { Language, User } from '../types';
import AIAssistant from './AIAssistant';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  lang: Language;
  setLang: (l: Language) => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Layout: React.FC<LayoutProps> = ({ children, user, lang, setLang, onNavigate, currentPath }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAIPopoverOpen, setIsAIPopoverOpen] = useState(false);
  const isRtl = lang === Language.AR;

  const strings = {
    brandName: 'MB MEDICINE',
    authority: {
      [Language.EN]: 'Global Medical Authority',
      [Language.FR]: 'Autorité Médicale Mondiale',
      [Language.AR]: 'السلطة الطبية العالمية'
    },
    nav: {
      home: { [Language.EN]: 'Intelligence', [Language.FR]: 'Intelligence', [Language.AR]: 'الذكاء' },
      library: { [Language.EN]: 'Repository', [Language.FR]: 'Répertoire', [Language.AR]: 'المستودع' },
      tools: { [Language.EN]: 'Clinical Tools', [Language.FR]: 'Outils Cliniques', [Language.AR]: 'الأدوات السريرية' },
      ai: { [Language.EN]: 'Ask Professor AI', [Language.FR]: 'Demander à Prof IA', [Language.AR]: 'اسأل المساعد الذكي' },
      pricing: { [Language.EN]: 'Licensing', [Language.FR]: 'Licences', [Language.AR]: 'التراخيص' },
    },
    footer: {
      desc: {
        [Language.EN]: 'The premier institution for clinical intelligence and multi-language academic synthesis. Dedicated to advancing medical practice through AI-driven protocols and evidence-based archives.',
        [Language.FR]: 'La première institution pour l\'intelligence clinique et la synthèse académique multilingue. Dédiée à l\'avancement de la pratique médicale grâce à des protocoles pilotés par l\'IA et des archives fondées sur des preuves.',
        [Language.AR]: 'المؤسسة الرائدة للذكاء السريري والتركيب الأكاديمي متعدد اللغات. مكرسة للنهوض بالممارسة الطبية من خلال البروتوكولات المدفوعة بالذكاء الاصطناعي والأرشيفات القائمة على الأدلة.'
      },
      repository: { [Language.EN]: 'Repository Core', [Language.FR]: 'Cœur du Répertoire', [Language.AR]: 'قلب المستودع' },
      institutional: { [Language.EN]: 'Institutional', [Language.FR]: 'Institutionnel', [Language.AR]: 'مؤسسي' },
      certification: { [Language.EN]: 'Certification', [Language.FR]: 'Certification', [Language.AR]: 'شهادة' },
      certDesc: {
        [Language.EN]: '"MB Medicine maintains the highest standard of evidence-based medical content, synchronized with global institutional boards including WHO and NEJM 2026 updates."',
        [Language.FR]: '"MB Medicine maintient le plus haut standard de contenu médical fondé sur des preuves, synchronisé avec les conseils institutionnels mondiaux, y compris les mises à jour de l\'OMS et du NEJM 2026."',
        [Language.AR]: '"تحافظ MB Medicine على أعلى معايير المحتوى الطبي القائم على الأدلة، بالتزامن مع المجالس المؤسسية العالمية بما في ذلك تحديثات منظمة الصحة العالمية و NEJM 2026."'
      },
      legal: {
        disclaimer: { [Language.EN]: 'Clinical Disclaimer', [Language.FR]: 'Clause de Non-responsabilité', [Language.AR]: 'إخلاء المسؤولية السريرية' },
        privacy: { [Language.EN]: 'Privacy & Data Policy', [Language.FR]: 'Confidentialité et Données', [Language.AR]: 'سياسة الخصوصية والبيانات' },
        terms: { [Language.EN]: 'Institutional Terms', [Language.FR]: 'Conditions Institutionnelles', [Language.AR]: 'الشروط المؤسسية' },
        ethics: { [Language.EN]: 'Board of Ethics', [Language.FR]: 'Conseil d\'Éthique', [Language.AR]: 'مجلس الأخلاقيات' },
      },
      copyright: {
        [Language.EN]: '© 2026 MB Medicine Global Institutional Group. All Rights Reserved.',
        [Language.FR]: '© 2026 MB Medicine Global Institutional Group. Tous droits réservés.',
        [Language.AR]: '© 2026 مجموعة MB Medicine المؤسسية العالمية. جميع الحقوق محفوظة.'
      },
      verified: {
        [Language.EN]: 'Verified Clinical Authority v4.2.0',
        [Language.FR]: 'Autorité Clinique Vérifiée v4.2.0',
        [Language.AR]: 'سلطة سريرية موثقة v4.2.0'
      }
    }
  };

  const navItems = [
    { id: 'home', label: strings.nav.home[lang] },
    { id: 'library', label: strings.nav.library[lang] },
    { id: 'tools', label: strings.nav.tools[lang] },
    { id: 'pricing', label: strings.nav.pricing[lang] },
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-medical-950 text-slate-200 ${isRtl ? 'rtl' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <nav className="fixed top-0 left-0 right-0 z-[100] glass-dark h-24 flex items-center px-6 md:px-12 justify-between">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-5 group ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-white text-2xl shadow-xl shadow-emerald-900/40 border border-white/10">MB</div>
            <div className={`hidden sm:block ${isRtl ? 'text-right' : 'text-left'}`}>
              <h1 className="text-xl font-black tracking-tighter text-white leading-none uppercase">{strings.brandName}</h1>
              <p className="text-[9px] text-emerald-400 font-black uppercase tracking-[0.4em] mt-2">{strings.authority[lang]}</p>
            </div>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-[11px] font-black uppercase tracking-[0.3em] transition-premium hover:text-emerald-400 ${currentPath === item.id ? 'text-emerald-400 border-b-2 border-emerald-500 pb-2' : 'text-slate-400'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* AI Assistant Toggle Beside Language Switcher */}
          <button 
            onClick={() => setIsAIPopoverOpen(!isAIPopoverOpen)}
            className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-premium shadow-xl ${isAIPopoverOpen ? 'bg-emerald-600 text-white' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span className="text-[10px] font-black uppercase tracking-widest hidden xl:block">{strings.nav.ai[lang]}</span>
          </button>

          <div className="hidden md:flex bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-3xl shadow-2xl">
            {(Object.values(Language) as Language[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-2 text-[10px] font-black rounded-xl transition-premium ${lang === l ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {l.substring(0, 2).toUpperCase()}
              </button>
            ))}
          </div>

          <button 
            className="lg:hidden p-3 text-slate-400 hover:text-emerald-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </nav>

      {/* AI Assistant Modal Popover */}
      {isAIPopoverOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
           <div className="absolute inset-0 bg-medical-950/80 backdrop-blur-md" onClick={() => setIsAIPopoverOpen(false)} />
           <div className="relative w-full max-w-5xl max-h-[90vh] shadow-2xl overflow-hidden rounded-[3rem] border border-white/10">
              <button 
                onClick={() => setIsAIPopoverOpen(false)}
                className="absolute top-8 right-8 z-[210] p-4 bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl transition-premium shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <div className="h-full overflow-hidden">
                <AIAssistant lang={lang} plan={user?.plan || Language.EN as any} isEmbedded={true} />
              </div>
           </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-medical-950/98 backdrop-blur-[50px] lg:hidden flex flex-col p-16 space-y-12">
           <div className={`flex justify-between items-center mb-12 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="font-black text-emerald-500 uppercase tracking-[0.5em] text-[10px]">Institutional Core</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 p-4 hover:rotate-90 transition-premium"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
           </div>
           {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }}
                className={`text-left py-6 text-4xl font-black text-white hover:text-emerald-400 transition-premium border-b border-white/5 uppercase tracking-tighter ${isRtl ? 'text-right' : 'text-left'}`}
              >
                {item.label}
              </button>
           ))}
        </div>
      )}

      <main className="flex-1 pt-24">
        {children}
      </main>

      <footer className="bg-medical-950 border-t border-white/5 py-32 px-8 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 relative z-10">
          <div className="space-y-10">
            <div className={`flex items-center gap-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-white text-2xl shadow-xl">MB</div>
              <span className="text-white font-black text-3xl uppercase tracking-tighter">{strings.brandName}</span>
            </div>
            <p className={`text-base text-slate-500 leading-relaxed font-medium ${isRtl ? 'text-right' : 'text-left'}`}>
              {strings.footer.desc[lang]}
            </p>
          </div>
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h4 className="text-white font-black mb-10 uppercase text-[11px] tracking-[0.5em]">{strings.footer.repository[lang]}</h4>
            <ul className="space-y-6 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">
              <li><button onClick={() => onNavigate('library')} className="hover:text-emerald-400 transition-colors">{strings.nav.library[lang]}</button></li>
              <li><button onClick={() => onNavigate('library')} className="hover:text-emerald-400 transition-colors">{strings.nav.tools[lang]}</button></li>
              <li><button onClick={() => { setIsAIPopoverOpen(true); }} className="hover:text-emerald-400 transition-colors">{strings.nav.ai[lang]}</button></li>
            </ul>
          </div>
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h4 className="text-white font-black mb-10 uppercase text-[11px] tracking-[0.5em]">{strings.footer.institutional[lang]}</h4>
            <ul className="space-y-6 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">
              <li><button onClick={() => onNavigate('legal')} className="hover:text-emerald-400 transition-colors">{strings.footer.legal.disclaimer[lang]}</button></li>
              <li><button onClick={() => onNavigate('legal')} className="hover:text-emerald-400 transition-colors">{strings.footer.legal.privacy[lang]}</button></li>
              <li><button onClick={() => onNavigate('legal')} className="hover:text-emerald-400 transition-colors">{strings.footer.legal.terms[lang]}</button></li>
              <li><button onClick={() => onNavigate('legal')} className="hover:text-emerald-400 transition-colors">{strings.footer.legal.ethics[lang]}</button></li>
            </ul>
          </div>
          <div className="space-y-10">
            <h4 className={`text-white font-black uppercase text-[11px] tracking-[0.5em] ${isRtl ? 'text-right' : 'text-left'}`}>{strings.footer.certification[lang]}</h4>
            <div className={`p-8 rounded-[2rem] bg-slate-900 border border-white/5 text-[11px] text-slate-500 font-bold italic leading-relaxed shadow-inner ${isRtl ? 'text-right' : 'text-left'}`}>
              {strings.footer.certDesc[lang]}
            </div>
            <div className={`flex gap-6 ${isRtl ? 'justify-end' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black hover:bg-emerald-600 transition-premium cursor-pointer border border-white/5 shadow-xl">IN</div>
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black hover:bg-emerald-600 transition-premium cursor-pointer border border-white/5 shadow-xl">𝕏</div>
            </div>
          </div>
        </div>
        <div className={`max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">{strings.footer.copyright[lang]}</p>
          <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em]">{strings.footer.verified[lang]}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
