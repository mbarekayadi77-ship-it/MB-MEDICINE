import React from 'react';
import { TranslationSchema } from '../types';
import { Pill, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  t: TranslationSchema;
  limit?: number;
  onNavigate: () => void;
  onSmartIcon: (query: string) => void;
}

const DrugsSection: React.FC<Props> = ({ t, limit, onNavigate, onSmartIcon }) => {
  const items = [
    { name: 'Amoxicillin Antibiotic', cat: t.drugs.categories.antibiotics, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
    { name: 'Ibuprofen Analgesic', cat: t.drugs.categories.analgesics, image: 'https://images.unsplash.com/photo-1550572017-ed2002b4227e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Ascorbic Acid (Vitamin C)', cat: t.drugs.categories.vitamins, image: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf4?auto=format&fit=crop&q=80&w=400' },
    { name: 'Azithromycin Tablet', cat: t.drugs.categories.antibiotics, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400' },
    { name: 'Paracetamol Suspension', cat: t.drugs.categories.analgesics, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400' },
  ];

  const displayed = limit ? items.slice(0, limit) : items;

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-4 brand-heading uppercase tracking-tighter">
            <Pill className="w-8 h-8 text-[#00ffaa]" />
            {t.drugs.title}
          </h2>
          <p className="text-slate-400 text-sm mt-1 font-medium italic opacity-85">{t.drugs.subtitle}</p>
        </div>
        {limit && (
          <button 
            onClick={onNavigate} 
            className="btn-haptic btn-outline border-white/10 text-[10px]"
          >
            Pharmacology <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>

      <div className="scientific-grid">
        {displayed.map((item, i) => (
          <div 
            key={i} 
            className="medical-card group cursor-pointer"
            onClick={() => onSmartIcon(`Detail the pharmacology and adverse reactions of ${item.name}`)}
          >
            <div className="card-image-container">
              <img src={item.image} alt={item.name} loading="lazy" />
            </div>
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-black/60 text-[#00ffaa] rounded border border-white/5">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <p className="text-[8px] font-black text-[#00ffaa] uppercase tracking-[0.2em] opacity-85">{item.cat}</p>
              </div>
              <h4 className="font-bold text-white text-base group-hover:text-[#00ffaa] transition-colors leading-tight brand-heading uppercase mb-4">
                {item.name}
              </h4>
              <button className="mt-auto btn-haptic bg-white/5 border border-white/10 text-white group-hover:bg-[#00ffaa] group-hover:text-black transition-all">
                View Protocol
              </button>
            </div>
          </div>
        ))}
      </div>
      {!limit && (
        <div className="mt-12 p-6 bg-[#00ffaa]/5 rounded-xl border border-[#00ffaa]/20 text-[#00ffaa] text-xs italic font-bold flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 flex-shrink-0" />
          {t.drugs.disclaimer}
        </div>
      )}
    </div>
  );
};

export default DrugsSection;