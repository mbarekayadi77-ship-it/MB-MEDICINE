
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ArticleCard from './components/ArticleCard';
import AIAssistant from './components/AIAssistant';
import Calculator from './components/Calculator';
import { Language, MedicalArticle, User, SubscriptionPlan, MedicalDomain } from './types';
import { ARTICLES, DOMAINS, PRICING_PLANS } from './constants';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [currentPath, setCurrentPath] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<MedicalDomain | 'All'>('All');
  
  const [user] = useState<User | null>({
    id: 'u-2026-global',
    name: 'Clinical Consultant Michael',
    email: 'm.consultant@mbmedicine.com',
    plan: SubscriptionPlan.PRO,
    bookmarks: []
  });

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(art => {
      const langKey = lang === Language.EN ? 'English' : lang === Language.FR ? 'French' : 'Arabic';
      const matchSearch = art.title[langKey].toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.content[langKey].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCategory = activeCategory === 'All' || art.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeCategory, lang]);

  const selectedArticle = useMemo(() => 
    ARTICLES.find(a => a.id === selectedArticleId), 
    [selectedArticleId]
  );

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setCurrentPath('article-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = {
    home: {
      trustLabel: { [Language.EN]: 'Global Clinical Standards', [Language.FR]: 'Normes Cliniques Mondiales', [Language.AR]: 'المعايير السريرية العالمية' },
      trustTitle: { 
        [Language.EN]: 'A Foundation built on Unfiltered Evidence.', 
        [Language.FR]: 'Une fondation bâtie sur des preuves non filtrées.', 
        [Language.AR]: 'مؤسسة مبنية على أدلة غير مفلترة.' 
      },
      trustDesc: {
        [Language.EN]: 'MB Medicine provides peer-reviewed clinical protocols, pharmacological databases, and technical surgical frameworks synchronized directly with world institutional boards. We deliver exhaustive scientific depth, not summaries.',
        [Language.FR]: 'MB Medicine fournit des protocoles cliniques évalués par des pairs, des bases de données pharmacologiques et des cadres chirurgicaux techniques synchronisés directement avec les conseils institutionnels mondiaux. Nous offrons une profondeur scientifique exhaustive, pas des résumés.',
        [Language.AR]: 'توفر MB Medicine بروتوكولات سريرية محكمة، وقواعد بيانات دوائية، وأطر عمل جراحية تقنية متزامنة مباشرة مع المجالس المؤسسية العالمية. نحن نقدم عمقاً علمياً شاملاً، وليس ملخصات.'
      },
      statsDomain: { [Language.EN]: 'Institutional Domains', [Language.FR]: 'Domaines Institutionnels', [Language.AR]: 'المجالات المؤسسية' },
      statsProtocols: { [Language.EN]: 'Verified Protocols', [Language.FR]: 'Protocoles Vérifiés', [Language.AR]: 'بروتوكولات موثقة' },
      disciplinesTitle: { [Language.EN]: 'Clinical Disciplines', [Language.FR]: 'Disciplines Cliniques', [Language.AR]: 'التخصصات السريرية' },
      disciplinesDesc: { [Language.EN]: 'Peer-Reviewed Specialty Archives', [Language.FR]: 'Archives de spécialités évaluées par des pairs', [Language.AR]: 'أرشيفات التخصصات المحكمة' },
      allDisciplines: { [Language.EN]: 'All Disciplines', [Language.FR]: 'Toutes les Disciplines', [Language.AR]: 'جميع التخصصات' },
      latestVolumes: { [Language.EN]: 'Latest Clinical Volumes', [Language.FR]: 'Derniers Volumes Cliniques', [Language.AR]: 'أحدث المجلدات السريرية' },
      protocolUpdates: { [Language.EN]: 'Academic Protocol Updates 2026', [Language.FR]: 'Mises à jour des protocoles académiques 2026', [Language.AR]: 'تحديثات البروتوكول الأكاديمي 2026' },
      enterLibrary: { [Language.EN]: 'Enter Full Library', [Language.FR]: 'Entrer dans la Bibliothèque Complète', [Language.AR]: 'دخول المكتبة الكاملة' },
      aiLabel: { [Language.EN]: 'Proprietary AI Logic', [Language.FR]: 'Logique d\'IA Propriétaire', [Language.AR]: 'منطق ذكاء اصطناعي خاص' },
      aiTitle: { [Language.EN]: 'Deep Clinical Synthesis', [Language.FR]: 'Synthèse Clinique Profonde', [Language.AR]: 'التركيب السريري العميق' },
      aiDesc: {
        [Language.EN]: 'The only intelligence system designed for academic-to-clinical diagnostic logic. Beyond summaries: full molecular pathways and Technical protocols.',
        [Language.FR]: 'Le seul système d\'intelligence conçu pour une logique de diagnostic académique-clinique. Au-delà des résumés : voies moléculaires complètes et protocoles techniques.',
        [Language.AR]: 'نظام الذكاء الوحيد المصمم لمنطق التشخيص الأكاديمي السريري. ما وراء الملخصات: المسارات الجزيئية الكاملة والبروتوكولات التقنية.'
      },
      engageBtn: { [Language.EN]: 'Engage Consultant', [Language.FR]: 'Engager le Consultant', [Language.AR]: 'إشراك الاستشاري' },
      searchPlaceholder: { [Language.EN]: 'Search clinical volumes...', [Language.FR]: 'Rechercher des volumes cliniques...', [Language.AR]: 'البحث في المجلدات السريرية...' },
      backRepo: { [Language.EN]: 'Back to Repository', [Language.FR]: 'Retour au Répertoire', [Language.AR]: 'العودة إلى المستودع' },
      upgradeLicense: { [Language.EN]: 'Upgrade License', [Language.FR]: 'Améliorer la Licence', [Language.AR]: 'ترقية الترخيص' },
      licenseRequired: { [Language.EN]: 'Institutional Licensing Required', [Language.FR]: 'Licence Institutionnelle Requise', [Language.AR]: 'مطلوب ترخيص مؤسسي' },
      licenseDesc: {
        [Language.EN]: 'Access to 3D Technical intervention maps, high-resolution radiology samples, and molecular pharmacological pathways is restricted to License Holders.',
        [Language.FR]: 'L\'accès aux cartes d\'intervention technique 3D, aux échantillons de radiologie haute résolution et aux voies pharmacologiques moléculaires est réservé aux titulaires de licence.',
        [Language.AR]: 'يقتصر الوصول إلى خرائط التدخل التقني ثلاثية الأبعاد وعينات الأشعة عالية الدقة والمسارات الدوائية الجزيئية على حاملي التراخيص.'
      },
      verifiedDate: { [Language.EN]: 'Verified Q2 2026', [Language.FR]: 'Vérifié T2 2026', [Language.AR]: 'موثق الربع الثاني 2026' }
    }
  };

  const renderContent = () => {
    const isRtl = lang === Language.AR;
    
    switch (currentPath) {
      case 'home':
        return (
          <div className="space-y-40 pb-40">
            <Hero 
              lang={lang} 
              onSearch={(q) => { setSearchQuery(q); setCurrentPath('library'); }} 
              onNavigate={setCurrentPath}
            />
            
            <div className={`max-w-7xl mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
               <div className={`space-y-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div className="text-emerald-500 font-black text-xs uppercase tracking-[0.5em]">{t.home.trustLabel[lang]}</div>
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[1.05]">{t.home.trustTitle[lang]}</h2>
                  <p className="text-slate-400 text-xl leading-relaxed font-medium">
                    {t.home.trustDesc[lang]}
                  </p>
                  <div className={`flex gap-16 pt-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
                     <div className="space-y-3">
                        <div className="text-5xl font-black text-white tracking-tighter">320+</div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">{t.home.statsDomain[lang]}</div>
                     </div>
                     <div className="space-y-3">
                        <div className="text-5xl font-black text-white tracking-tighter">15k+</div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">{t.home.statsProtocols[lang]}</div>
                     </div>
                  </div>
               </div>
               <div className="relative group">
                  <div className="absolute -inset-10 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-premium" />
                  <img 
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200" 
                    alt="High-Level Medical Team" 
                    className="relative rounded-[3rem] luxury-border shadow-5xl grayscale-[0.2] group-hover:grayscale-0 transition-premium duration-1000"
                  />
                  <div className={`absolute -bottom-10 p-8 bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] luxury-border hidden md:block ${isRtl ? '-left-10 text-left' : '-right-10 text-right'}`}>
                     <div className="text-emerald-400 font-black text-2xl tracking-tighter uppercase">{lang === Language.AR ? 'موثوقية مؤسسية' : 'Institutional Reliability'}</div>
                     <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">WHO SYNCED 2026</p>
                  </div>
               </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 md:px-12 space-y-20">
              <div className={`text-center space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">{t.home.disciplinesTitle[lang]} <span className="text-emerald-500">{lang === Language.AR ? '' : 'Disciplines'}</span></h2>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.5em]">{t.home.disciplinesDesc[lang]}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {DOMAINS.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => { setActiveCategory(domain); setCurrentPath('library'); }}
                    className="group flex flex-col items-center justify-center p-10 rounded-[2.5rem] bg-slate-900 border border-white/5 hover:border-emerald-500/30 transition-premium hover:bg-emerald-600/5 hover:translate-y-[-5px]"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-medical-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-premium border border-white/5">
                      <span className="text-emerald-500 font-black text-xs">{domain.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase text-center text-slate-400 group-hover:text-white tracking-[0.2em] leading-tight">
                      {domain}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 md:px-12">
              <div className={`flex flex-col md:flex-row justify-between items-end mb-20 gap-10 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">{t.home.latestVolumes[lang]}</h2>
                  <p className="text-slate-500 mt-5 text-[10px] font-bold uppercase tracking-[0.5em]">{t.home.protocolUpdates[lang]}</p>
                </div>
                <button 
                  onClick={() => setCurrentPath('library')}
                  className="px-12 py-5 bg-slate-900 border border-white/10 text-emerald-400 font-black rounded-2xl hover:bg-emerald-600 hover:text-white transition-premium uppercase text-[10px] tracking-[0.4em] shadow-2xl"
                >
                  {t.home.enterLibrary[lang]}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {ARTICLES.slice(0, 3).map(art => (
                  <ArticleCard key={art.id} article={art} lang={lang} onClick={handleArticleClick} />
                ))}
              </div>
            </div>

            <div className="bg-medical-900/30 py-40 border-y border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')]" />
              <div className={`max-w-7xl mx-auto px-8 md:px-12 flex flex-col lg:flex-row items-center gap-32 relative z-10 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`flex-1 space-y-12 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <span className="text-[11px] text-emerald-400 font-black uppercase tracking-[0.4em]">{t.home.aiLabel[lang]}</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter uppercase">{t.home.aiTitle[lang]} <span className="text-emerald-500 text-6xl md:text-8xl">Professor MB MedAI</span></h2>
                  <p className="text-slate-400 text-2xl leading-relaxed font-medium">
                    {t.home.aiDesc[lang]}
                  </p>
                  <div className={`pt-6 ${isRtl ? 'justify-end flex' : ''}`}>
                    <button onClick={() => setCurrentPath('ai')} className="px-16 py-7 bg-emerald-600 text-white font-black rounded-[2rem] hover:bg-emerald-500 transition-premium shadow-3xl shadow-emerald-900/50 text-[12px] uppercase tracking-[0.4em]">
                      {t.home.engageBtn[lang]}
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 w-full max-w-2xl relative">
                  <div className="absolute -inset-10 bg-emerald-500/5 blur-[100px] rounded-full" />
                  <div className="bg-slate-900/80 backdrop-blur-3xl p-16 rounded-[4rem] border border-white/10 shadow-5xl space-y-12 relative overflow-hidden">
                    <div className={`flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div className="w-16 h-16 bg-emerald-600 rounded-3xl flex items-center justify-center text-white text-2xl font-black">MB</div>
                      <div className={isRtl ? 'text-right' : 'text-left'}>
                        <p className="font-black text-white text-2xl uppercase tracking-tighter leading-none">Clinical Core v4.2</p>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.3em] mt-2">Active Multi-Language Synthesis</p>
                      </div>
                    </div>
                    <div className="space-y-8">
                       <div className={`bg-medical-950/50 p-10 rounded-[2.5rem] border border-white/5 italic text-xl text-slate-200 leading-relaxed font-medium shadow-inner ${isRtl ? 'text-right' : 'text-left'}`}>
                         {lang === Language.AR ? '"توليف بروتوكول جراحي مكون من 12 مرحلة لإصلاح الصمام التاجي بمساعدة الروبوت، بما في ذلك متطلبات التصوير قبل الجراحة..."' : '"Synthesize a 12-stage surgical protocol for robotic-assisted mitral valve repair, including preoperative imaging requirements..."'}
                       </div>
                       <div className={`flex gap-4 px-4 items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                         <div className="flex gap-2.5">
                           <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" />
                           <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                           <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                         </div>
                         <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.4em] ml-4">{lang === Language.AR ? 'جاري إنشاء الإطار التقني' : 'Generating Technical Framework'}</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'library':
        return (
          <div className="max-w-7xl mx-auto px-8 md:px-12 py-24 space-y-24">
             <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">{lang === Language.AR ? 'المستودع' : 'Institutional'} <br/><span className="text-emerald-500">{lang === Language.AR ? 'المؤسسي' : 'Repository'}</span></h2>
                  <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.5em] mt-8">{lang === Language.AR ? 'سجلات أكاديمية محكمة شاملة' : 'Exhaustive peer-reviewed academic records'}</p>
                </div>
                <div className="w-full lg:w-[600px] relative group">
                   <input 
                    type="text" 
                    placeholder={t.home.searchPlaceholder[lang]}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className={`w-full h-20 pl-16 pr-8 rounded-3xl bg-slate-900 border border-white/10 focus:border-emerald-500/50 focus:outline-none transition-premium text-xl font-bold text-white shadow-3xl ${isRtl ? 'text-right' : 'text-left'}`}
                   />
                   <svg className={`absolute ${isRtl ? 'right-8' : 'left-8'} top-1/2 -translate-y-1/2 text-emerald-500/50 group-focus-within:text-emerald-500`} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
             </div>

             <div className={`flex flex-wrap gap-4 ${isRtl ? 'justify-end' : ''}`}>
                <button 
                  onClick={() => setActiveCategory('All')}
                  className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-premium ${activeCategory === 'All' ? 'bg-emerald-600 text-white shadow-2xl' : 'bg-slate-900 border border-white/10 text-slate-500 hover:text-white'}`}
                >
                  {t.home.allDisciplines[lang]}
                </button>
                {DOMAINS.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-premium ${activeCategory === cat ? 'bg-emerald-600 text-white shadow-2xl' : 'bg-slate-900 border border-white/10 text-slate-500 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>

             {filteredArticles.length === 0 ? (
               <div className="py-40 text-center opacity-40 space-y-10">
                  <div className="text-9xl grayscale">🔬</div>
                  <p className="text-2xl font-black text-slate-600 uppercase tracking-[0.5em]">{lang === Language.AR ? 'فشل بحث الفهرس المؤسسي. يُرجى مراجعة PubMed أو WHO.' : 'Institutional index search failed. Try PubMed or WHO directly.'}</p>
                  <div className="flex justify-center gap-6">
                    <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest">PubMed</a>
                    <a href="https://www.who.int/" target="_blank" className="px-8 py-4 bg-slate-800 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest">WHO</a>
                  </div>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                  {filteredArticles.map(art => (
                    <ArticleCard key={art.id} article={art} lang={lang} onClick={handleArticleClick} />
                  ))}
               </div>
             )}
          </div>
        );

      case 'article-view':
        if (!selectedArticle) return null;
        return (
          <div className="max-w-6xl mx-auto px-8 md:px-12 py-24">
            <button 
              onClick={() => setCurrentPath('library')}
              className={`flex items-center gap-5 text-slate-500 font-black mb-20 hover:text-emerald-400 transition-premium uppercase text-[10px] tracking-[0.4em] ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <svg className={isRtl ? 'rotate-180' : ''} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              {t.home.backRepo[lang]}
            </button>
            <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 shadow-5xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-600" />
              
              <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-10 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                <div className={`flex flex-col gap-5 ${isRtl ? 'items-end' : 'items-start'}`}>
                   <span className="px-6 py-2.5 rounded-xl bg-medical-950 text-emerald-400 text-[11px] font-black uppercase tracking-[0.3em] border border-emerald-500/20">{selectedArticle.category}</span>
                   <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em]">ACADEMIC ID: {selectedArticle.id.toUpperCase()}</p>
                </div>
                <div className={`${isRtl ? 'text-left' : 'text-right'}`}>
                   <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">{lang === Language.AR ? 'مجلد تقني كامل' : 'Full Technical Volume'}</span>
                   <p className="text-[11px] text-emerald-500 font-black mt-3 uppercase tracking-[0.4em]">{t.home.verifiedDate[lang]}</p>
                </div>
              </div>
              
              <h1 className={`text-5xl md:text-8xl font-black text-white leading-[0.9] mb-24 tracking-tighter ${isRtl ? 'text-right' : 'text-left'}`}>
                {selectedArticle.title[lang === Language.EN ? 'English' : lang === Language.FR ? 'French' : 'Arabic']}
              </h1>

              <div className={`prose prose-invert max-w-none text-slate-400 leading-relaxed text-xl ${isRtl ? 'rtl text-right' : 'text-left'}`}>
                <div className="space-y-24">
                   {selectedArticle.content[lang === Language.EN ? 'English' : lang === Language.FR ? 'French' : 'Arabic'].split('###').map((section, sIdx) => {
                      if (!section.trim()) return null;
                      const [header, ...body] = section.split('\n');
                      return (
                        <div key={sIdx} className={`border-emerald-600/20 ${isRtl ? 'border-r-8 pr-12' : 'border-l-8 pl-12'}`}>
                           <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-8 leading-none">{header.trim()}</h2>
                           <div className="whitespace-pre-wrap font-medium text-slate-400 text-xl leading-relaxed">{body.join('\n').trim()}</div>
                        </div>
                      );
                   })}
                </div>
              </div>
              
              <div className="mt-40 pt-32 border-t border-white/5">
                 <div className={`bg-medical-950 rounded-[4rem] p-16 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative shadow-inner ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`flex-1 space-y-8 relative z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-4xl font-black text-white leading-tight uppercase tracking-tighter">{t.home.licenseRequired[lang]}</h3>
                      <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-3xl">{t.home.licenseDesc[lang]}</p>
                    </div>
                    <button className="px-12 py-6 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-500 transition-premium shadow-2xl whitespace-nowrap relative z-10 uppercase tracking-[0.3em] text-[11px]">{t.home.upgradeLicense[lang]}</button>
                 </div>
              </div>
            </div>
          </div>
        );

      case 'legal':
        return (
          <div className="max-w-5xl mx-auto px-8 py-24 space-y-24">
             <div className="text-center space-y-6">
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">{lang === Language.AR ? 'الإطار القانوني' : 'Institutional'} <br/><span className="text-emerald-500">{lang === Language.AR ? 'المؤسسي' : 'Legal Framework'}</span></h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.5em]">{lang === Language.AR ? 'حوكمة مجلس أخلاقيات الطب لعام 2026' : '2026 Board of Ethics Governance'}</p>
             </div>
             <div className="space-y-16">
                {[
                  { title: { [Language.EN]: "Clinical Disclaimer", [Language.FR]: "Clause de Non-responsabilité", [Language.AR]: "إخلاء المسؤولية السريرية" }, content: { [Language.EN]: "MB Medicine operates as a clinical knowledge repository for institutional academic purposes. The 2026 diagnostic logic provided by MedAI must be verified by a board-certified professional. Our datasets are synchronized with WHO standards but do not replace the final clinical judgment of a practitioner.", [Language.FR]: "MB Medicine fonctionne comme un répertoire de connaissances cliniques à des fins académiques institutionnelles. La logique diagnostique 2026 fournie par MedAI doit être vérifiée par un professionnel certifié par le conseil d'administration. Nos ensembles de données sont synchronisés avec les normes de l'OMS mais ne remplacent pas le jugement clinique final d'un praticien.", [Language.AR]: "تعمل MB Medicine كمستودع للمعرفة السريرية للأغراض الأكاديمية المؤسسية. يجب التحقق من المنطق التشخيصي لعام 2026 الذي توفره MedAI من قبل متخصص معتمد. تتم مزامنة مجموعات البيانات الخاصة بنا مع معايير منظمة الصحة العالمية ولكنها لا تحل محل الحكم السريري النهائي للممارس." } },
                  { title: { [Language.EN]: "Privacy & Data Policy", [Language.FR]: "Confidentialité et Données", [Language.AR]: "سياسة الخصوصية والبيانات" }, content: { [Language.EN]: "We maintain 256-bit institutional encryption for all consultant queries. User clinical data is anonymized and processed within the MB Private Intelligence Cloud to ensure HIPAA and GDPR-2026 compliance. No raw patient data is stored outside licensed enterprise nodes.", [Language.FR]: "Nous maintenons un cryptage institutionnel de 256 bits pour toutes les requêtes des consultants. Les données cliniques des utilisateurs sont anonymisées et traitées dans le cloud d'intelligence privé MB pour assurer la conformité HIPAA et RGPD-2026. Aucune donnée brute sur les patients n'est stockée en dehors des nœuds d'entreprise sous licence.", [Language.AR]: "نحن نحافظ على تشفير مؤسسي 256 بت لجميع استفسارات الاستشاريين. يتم إخفاء هوية البيانات السريرية للمستخدم ومعالجتها داخل سحابة MB الاستخباراتية الخاصة لضمان الامتثال لـ HIPAA و GDPR-2026. لا يتم تخزين أي بيانات خام للمرضى خارج عقد المؤسسات المرخصة." } },
                  { title: { [Language.EN]: "Institutional Terms", [Language.FR]: "Conditions Institutionnelles", [Language.AR]: "الشروط المؤسسية" }, content: { [Language.EN]: "Access to the MB Medicine repository is granted under individual or hospital-wide licensing. Unauthorized redistribution of interventional protocols or pharmacological pathways is strictly prohibited under international medical patent laws.", [Language.FR]: "L'accès au répertoire MB Medicine est accordé sous licence individuelle ou à l'échelle de l'hôpital. La redistribution non autorisée de protocoles d'intervention ou de voies pharmacologiques est strictement interdite en vertu des lois internationales sur les brevets médicaux.", [Language.AR]: "يتم منح الوصول إلى مستودع MB Medicine بموجب ترخيص فردي أو على مستوى المستشفى. يحظر تمامًا إعادة التوزيع غير المصرح به لبروتوكولات التدخل أو المسارات الدوائية بموجب قوانين براءات الاختراع الطبية الدولية." } },
                  { title: { [Language.EN]: "Board of Ethics", [Language.FR]: "Conseil d'Éthique", [Language.AR]: "مجلس الأخلاقيات" }, content: { [Language.EN]: "Our ethical framework is governed by the 2026 Global Medical Ethics Commission. Every AI-generated interventional protocol undergoes a secondary multi-institutional verification layer to prevent bias and ensure evidence-based accuracy.", [Language.FR]: "Notre cadre éthique est régi par la Commission mondiale d'éthique médicale 2026. Chaque protocole d'intervention généré par l'IA subit une couche de vérification multi-institutionnelle secondaire pour prévenir les biais et garantir l'exactitude fondée sur des preuves.", [Language.AR]: "يخضع إطارنا الأخلاقي للجنة العالمية لأخلاقيات الطب لعام 2026. يخضع كل بروتوكول تدخلي يتم إنشاؤه بواسطة الذكاء الاصطناعي لطبقة تحقق مؤسسية متعددة ثانوية لمنع التحيز وضمان الدقة القائمة على الأدلة." } }
                ].map(legal => (
                  <div key={legal.title[lang]} className={`p-12 bg-slate-900/50 rounded-[3rem] border border-white/5 space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight">{legal.title[lang]}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">{legal.content[lang]}</p>
                  </div>
                ))}
             </div>
          </div>
        )

      default:
        return <div className="p-40 text-center font-black text-2xl animate-pulse tracking-[0.5em] text-slate-700 uppercase">Synchronizing Local Instance...</div>;
    }
  };

  return (
    <Layout 
      user={user} 
      lang={lang} 
      setLang={setLang} 
      onNavigate={setCurrentPath} 
      currentPath={currentPath}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
