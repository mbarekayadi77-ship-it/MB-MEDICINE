import React from 'react';
import { TranslationSchema } from '../types';
import { History, HelpCircle, ArrowRight } from 'lucide-react';

interface Props {
  t: TranslationSchema;
  onNavigate: () => void;
  onSmartIcon: (query: string) => void;
}

const HistorySection: React.FC<Props> = ({ t, onNavigate, onSmartIcon }) => {
  const eras = [
    { ...t.history.eras.ancient, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600' },
    { ...t.history.eras.islamic, image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600' },
    { ...t.history.eras.renaissance, image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=600' },
    { ...t.history.eras.modern, image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <section className="bg-[#0E1117] py-36 text-white overflow-hidden relative border-y border-white/5">
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-[#10B981]/5 rounded-full blur-[180px] -mr-96 -mt-96"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-32">
          <span className="text-[#10B981] font-bold uppercase tracking-[0.8em] text-[11px] mb-8 block">Scientific Chronology</span>
          <h2 className="text-7xl font-black mb-10 flex items-center justify-center gap-8 text-white brand-heading uppercase tracking-tighter">
            <History className="text-[#10B981] w-16 h-16 cyan-glow" />
            {t.history.title}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto italic text-2xl leading-relaxed opacity-85">
            {t.history.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {eras.map((era, i) => (
            <div 
              key={era.title}
              className="medical-card group cursor-pointer"
              onClick={() => onSmartIcon(`Explain the medical advancements and key scientific figures from the ${era.title} era (${era.period}).`)}
            >
              <div className="card-image-container h-44">
                <img src={era.image} alt={era.title} />
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <div className="text-slate-500 text-[11px] font-bold mb-6 flex items-center gap-4">
                    <span className="w-10 h-[1px] bg-[#10B981]/30"></span>
                    {era.period}
                    <HelpCircle className="w-4 h-4 ml-auto opacity-30 group-hover:opacity-100 transition-opacity text-[#10B981]" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-white group-hover:text-[#10B981] transition-colors brand-heading uppercase tracking-tight leading-tight">{era.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium italic line-clamp-4">{era.description}</p>
                </div>
                <div 
                  className="flex items-center gap-4 text-white text-[11px] font-bold uppercase tracking-[0.4em] transition-all opacity-40 group-hover:opacity-100 pt-6 border-t border-white/5"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate();
                  }}
                >
                  Archives <ArrowRight className="w-4 h-4 text-[#10B981]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;