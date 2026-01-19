import React from 'react';
import { TranslationSchema, AnatomySystem } from '../types';
import { ChevronRight, Microscope, Target } from 'lucide-react';

interface Props {
  t: TranslationSchema;
  limit?: number;
  onNavigate: () => void;
  onSmartIcon: (query: string) => void;
}

const AnatomySection: React.FC<Props> = ({ t, limit, onNavigate, onSmartIcon }) => {
  const allSystems = Object.values(t.anatomy.systems) as AnatomySystem[];
  const displayedSystems = limit ? allSystems.slice(0, limit) : allSystems;

  const getSystemImage = (name: string) => {
    const images: Record<string, string> = {
      'Skeletal System': 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=600',
      'Muscular System': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600',
      'Nervous System': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600',
      'Cardiovascular System': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
      'Respiratory System': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600',
      'Digestive System': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
      'Endocrine System': 'https://images.unsplash.com/photo-1511174511562-5f7f18b854f2?auto=format&fit=crop&q=80&w=600',
      'Urinary System': 'https://images.unsplash.com/photo-1579684446410-382a75177182?auto=format&fit=crop&q=80&w=600',
      'Reproductive System': 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=600',
      'Integumentary System': 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600',
    };
    return images[name] || 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600';
  };

  return (
    <section className="py-12 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#00ffaa]">
            <Microscope className="w-8 h-8" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em]">Systems Protocol</span>
          </div>
          <h2 className="section-title text-white">{t.anatomy.title}</h2>
          <p className="text-slate-400 text-sm font-medium italic opacity-80">{t.anatomy.subtitle}</p>
        </div>
        {limit && (
          <button 
            onClick={onNavigate}
            className="btn-haptic btn-outline border-white/10 text-[10px]"
          >
            View All <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>

      <div className="scientific-grid">
        {displayedSystems.map((system) => (
          <div 
            key={system.name}
            className="medical-card group cursor-pointer"
            onClick={() => onSmartIcon(`Detailed clinical and anatomical protocol for the ${system.name}`)}
          >
            <div className="card-image-container relative">
              <img src={getSystemImage(system.name)} alt={system.name} loading="lazy" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10">
                <Microscope className="w-5 h-5 text-[#00ffaa]" />
              </div>
            </div>
            <div className="card-body">
              <h3 className="text-lg font-black text-white brand-heading uppercase tracking-tight mb-3 group-hover:text-[#00ffaa] transition-colors">
                {system.name}
              </h3>
              <p className="card-description">
                {system.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1">
                {system.majorOrgans.slice(0, 2).map(org => (
                  <span key={org} className="text-[8px] font-black uppercase tracking-widest bg-black/40 border border-white/5 px-2 py-1 rounded-md text-slate-500">
                    {org}
                  </span>
                ))}
              </div>
              <button className="mt-6 w-full btn-haptic bg-white/5 border border-white/10 text-white group-hover:bg-[#00ffaa] group-hover:text-black transition-all">
                 <Target className="w-4 h-4 mr-2" /> Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnatomySection;