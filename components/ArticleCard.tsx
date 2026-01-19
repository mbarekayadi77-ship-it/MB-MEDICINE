
import React from 'react';
import { MedicalArticle, Language } from '../types';

interface ArticleCardProps {
  article: MedicalArticle;
  lang: Language;
  onClick: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, lang, onClick }) => {
  const isRtl = lang === Language.AR;
  const title = article.title[lang === Language.EN ? 'English' : lang === Language.FR ? 'French' : 'Arabic'];

  return (
    <div 
      onClick={() => onClick(article.id)}
      className="group relative bg-slate-900 rounded-3xl border border-white/5 overflow-hidden hover:border-emerald-500/40 transition-all duration-500 cursor-pointer flex flex-col shadow-xl hover:shadow-emerald-500/10"
    >
      {/* Article Image with Professional Overlay */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
        
        {/* Domain Badge */}
        <div className={`absolute bottom-4 ${isRtl ? 'right-6' : 'left-6'}`}>
          <span className="px-3 py-1 rounded bg-emerald-600/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[8px] font-black uppercase tracking-[0.3em]">
            {article.category}
          </span>
        </div>

        {article.premium && (
          <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'}`}>
            <div className="w-8 h-8 rounded-full bg-gold-500/20 backdrop-blur-md border border-medical-gold/30 flex items-center justify-center text-medical-gold">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="space-y-4 mb-8">
          <h3 className={`text-xl font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors line-clamp-2 ${isRtl ? 'text-right' : 'text-left'}`}>
            {title}
          </h3>
          <p className={`text-xs text-slate-400 leading-relaxed line-clamp-3 font-medium ${isRtl ? 'text-right' : 'text-left'}`}>
            {article.content[lang === Language.EN ? 'English' : lang === Language.FR ? 'French' : 'Arabic'].replace(/###.*?\n/g, '').substring(0, 120)}...
          </p>
        </div>

        <div className={`mt-auto pt-6 border-t border-white/5 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 rounded-lg bg-medical-950 flex items-center justify-center text-[10px] font-black text-emerald-500 border border-white/5">MB</div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <p className="text-[9px] font-bold text-slate-200 uppercase tracking-tighter">Academic Board</p>
              <p className="text-[7px] text-slate-500 uppercase tracking-widest">2026 Volume</p>
            </div>
          </div>
          <div className="text-emerald-500 group-hover:translate-x-1 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
