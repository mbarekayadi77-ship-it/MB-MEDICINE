import React from 'react';
import { TranslationSchema } from '../types';
import { Library, ChevronRight, Book } from 'lucide-react';

interface Props {
  t: TranslationSchema;
  limit?: number;
  onNavigate: () => void;
  onSmartIcon: (query: string) => void;
}

const EncyclopediaSection: React.FC<Props> = ({ t, limit, onNavigate, onSmartIcon }) => {
  const articles = [
    { title: 'Acute Inflammation', cat: t.encyclopedia.sections.terms, image: 'https://images.unsplash.com/photo-1532187875605-2fe35952d46a?auto=format&fit=crop&q=80&w=400' },
    { title: 'Blood Urea Nitrogen', cat: t.encyclopedia.sections.tests, image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400' },
    { title: 'Laparoscopic Surgery', cat: t.encyclopedia.sections.surgeries, image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400' },
    { title: 'Magnetic Resonance', cat: t.encyclopedia.sections.tests, image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=400' },
    { title: 'Genetic Sequencing', cat: t.encyclopedia.sections.terms, image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400' },
  ];

  const displayed = limit ? articles.slice(0, limit) : articles;

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-4 brand-heading uppercase tracking-tighter">
            <Library className="w-8 h-8 text-[#00ffaa]" />
            {t.encyclopedia.title}
          </h2>
          <p className="text-slate-400 text-sm mt-1 font-medium italic opacity-85">{t.encyclopedia.subtitle}</p>
        </div>
        {limit && (
          <button 
            onClick={onNavigate} 
            className="btn-haptic btn-outline border-white/10 text-[10px]"
          >
            Glossary <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>

      <div className="scientific-grid">
        {displayed.map((art, i) => (
          <div 
            key={i} 
            className="medical-card group cursor-pointer"
            onClick={() => onSmartIcon(`Explain the clinical protocols for: ${art.title}`)}
          >
            <div className="card-image-container">
              <img src={art.image} alt={art.title} loading="lazy" />
            </div>
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-black/60 text-[#00ffaa] rounded border border-white/5">
                  <Book className="w-3 h-3" />
                </div>
                <p className="text-[8px] font-black text-[#00ffaa] uppercase tracking-[0.2em] opacity-85">{art.cat}</p>
              </div>
              <h4 className="font-bold text-white text-base group-hover:text-[#00ffaa] transition-colors leading-tight brand-heading uppercase mb-4">
                {art.title}
              </h4>
              <button className="mt-auto btn-haptic bg-white/5 border border-white/10 text-white group-hover:bg-[#00ffaa] group-hover:text-black transition-all">
                Read Article
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EncyclopediaSection;