import React from 'react';
import { TranslationSchema } from '../types';
import { BookOpen, FolderOpen, ArrowRight } from 'lucide-react';

interface Props {
  t: TranslationSchema;
  onNavigate: () => void;
  onSmartIcon: (query: string) => void;
}

const HealthTopicsSection: React.FC<Props> = ({ t, onNavigate, onSmartIcon }) => {
  const articles = [
    { title: 'Cellular Metabolism', cat: t.healthTopics.categories[0], date: 'Oct 2024', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400' },
    { title: 'Impact of Microplastics', cat: t.healthTopics.categories[2], date: 'Nov 2024', image: 'https://images.unsplash.com/photo-1611288875055-1283d56af083?auto=format&fit=crop&q=80&w=400' },
    { title: 'Pediatric Milestones', cat: t.healthTopics.categories[3], date: 'Sep 2024', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=400' },
    { title: 'Autoimmune Conditions', cat: t.healthTopics.categories[1], date: 'Dec 2024', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12 text-center lg:text-left">
        <h2 className="text-4xl font-black text-white mb-4 flex items-center justify-center lg:justify-start gap-4 brand-heading uppercase tracking-tighter">
          <div className="p-3 bg-slate-900/70 rounded-xl border border-white/10">
            <BookOpen className="w-8 h-8 text-[#00ffaa]" />
          </div>
          {t.healthTopics.title}
        </h2>
        <p className="text-slate-400 text-lg font-medium leading-relaxed italic opacity-80">{t.healthTopics.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Categories */}
        <div className="lg:col-span-1">
          <div className="bg-[#1F2933] border border-white/10 rounded-2xl p-6 sticky top-32">
            <h3 className="text-[10px] font-black text-[#00ffaa] uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <FolderOpen className="w-4 h-4 opacity-70" />
              Categories
            </h3>
            <ul className="space-y-2">
              {t.healthTopics.categories.map((cat, i) => (
                <li key={i}>
                  <button 
                    className="w-full text-left px-4 py-3 rounded-xl text-slate-400 font-bold hover:bg-[#00ffaa] hover:text-black transition-all text-sm border border-transparent"
                    onClick={() => onSmartIcon(`What are the key findings in ${cat}?`)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Article Feed */}
        <div className="lg:col-span-3">
          <div className="scientific-grid">
            {articles.map((art, i) => (
              <div 
                key={i} 
                className="medical-card group cursor-pointer"
                onClick={() => onSmartIcon(`Explain the core scientific concepts behind the topic: ${art.title}`)}
              >
                <div className="card-image-container h-40">
                  <img src={art.image} alt={art.title} />
                </div>
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[8px] font-black text-[#00ffaa] uppercase tracking-widest block bg-black/50 px-2 py-1 rounded">{art.cat}</span>
                  </div>
                  <h4 className="text-base font-black text-white group-hover:text-[#00ffaa] transition-colors leading-tight brand-heading uppercase line-clamp-2 mb-4">{art.title}</h4>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Protocol</span>
                     <div className="p-2 rounded-lg bg-black/50 text-[#00ffaa] group-hover:bg-[#00ffaa] group-hover:text-black transition-all">
                        <ArrowRight className="w-4 h-4" />
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTopicsSection;