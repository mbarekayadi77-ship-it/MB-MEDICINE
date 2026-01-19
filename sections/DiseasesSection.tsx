import React from 'react';
import { TranslationSchema } from '../types';
import { Activity, ChevronRight, HelpCircle } from 'lucide-react';

interface Props {
  t: TranslationSchema;
  limit?: number;
  onNavigate: () => void;
  onSmartIcon: (query: string) => void;
}

const DiseasesSection: React.FC<Props> = ({ t, limit, onNavigate, onSmartIcon }) => {
  const topics = [
    {
      name: 'Cardiovascular Health',
      summary: 'Vital heart and vascular wellness data including hypertension and cardiac cycle studies. Understanding systemic blood flow dynamics.',
      category: 'Systemic',
      image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Infectious Diseases',
      summary: 'Analysis of viral and bacterial transmission and immunology protocols. Focusing on host-pathogen interactions.',
      category: 'Infection',
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Neurological Conditions',
      summary: 'Study of neurodegenerative disorders and synaptic transmission frameworks. Holistic brain health monitoring.',
      category: 'Brain',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Nutritional Disorders',
      summary: 'Metabolic analysis of dietary balance and enzyme function regulation. Exploring biological homeostasis.',
      category: 'Metabolic',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const displayedTopics = limit ? topics.slice(0, limit) : topics;

  return (
    <section className="py-12 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#00ffaa]">
            <Activity className="w-8 h-8" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em]">Clinical Pathology</span>
          </div>
          <h2 className="section-title text-white">{t.nav.diseases}</h2>
          <p className="text-slate-400 text-sm font-medium italic opacity-85">Verified summaries</p>
        </div>
        {limit && (
          <button 
            onClick={onNavigate}
            className="btn-haptic btn-outline border-white/10 text-[10px]"
          >
            Full Archive <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>

      <div className="scientific-grid">
        {displayedTopics.map((topic) => (
          <div 
            key={topic.name}
            className="medical-card group cursor-pointer"
            onClick={() => onSmartIcon(`Detailed clinical analysis of ${topic.name}`)}
          >
            <div className="card-image-container">
              <img src={topic.image} alt={topic.name} loading="lazy" />
            </div>
            <div className="card-body">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[8px] font-black text-[#00ffaa] uppercase tracking-widest bg-black/60 px-2 py-1 rounded-md border border-white/5">{topic.category}</span>
                <HelpCircle className="w-4 h-4 text-slate-600" />
              </div>
              <h4 className="text-lg font-bold text-white leading-tight brand-heading uppercase group-hover:text-[#00ffaa] transition-colors mb-2">
                {topic.name}
              </h4>
              <p className="card-description">
                {topic.summary}
              </p>
              <button className="mt-6 w-full btn-haptic bg-[#161b22] border border-white/10 text-white group-hover:bg-[#00ffaa] group-hover:text-black transition-all">
                 Consult <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiseasesSection;