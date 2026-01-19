
import React from 'react';
import { TranslationSchema } from '../types';
import { ImageIcon, Maximize2, Info, HelpCircle } from 'lucide-react';

interface Props {
  t: TranslationSchema;
  onNavigate: () => void;
  onSmartIcon: (query: string) => void;
}

const MedicalImagesSection: React.FC<Props> = ({ t, onNavigate, onSmartIcon }) => {
  const galleries = [
    { title: 'Neural Diagnostic Imaging', desc: 'Axial T1-weighted MRI showing cerebral anatomy.', id: 'neural' },
    { title: 'Pulmonary Histology', desc: 'Microscopic view of alveolar gas exchange barriers.', id: 'lung' },
    { title: 'Coronary Angiography', desc: 'Visualization of the cardiac arterial network.', id: 'heart' },
    { title: 'Lumbar Radiography', desc: 'Assessment of vertebral alignment and intervertebral discs.', id: 'spine' },
    { title: 'Gastrointestinal Endoscopy', desc: 'Intraluminal visualization of mucosal integrity.', id: 'gut' },
    { title: 'Ocular Retinal Mapping', desc: 'High-fidelity scan of the optic disc and fovea.', id: 'eye' },
  ];

  const getImage = (id: string) => {
    const map: Record<string, string> = {
      neural: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
      lung: 'https://images.unsplash.com/photo-1576086213369-97a306dca665?auto=format&fit=crop&q=80&w=800',
      heart: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
      spine: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800',
      gut: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
      eye: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    };
    return map[id];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-20 text-center lg:text-left">
        <h2 className="text-5xl font-black text-[#0B0F14] mb-7 flex items-center justify-center lg:justify-start gap-6 brand-heading">
          <div className="p-4 bg-teal-50 rounded-2xl shadow-sm border border-teal-100">
            <ImageIcon className="w-12 h-12 text-[#0EA5A4]" />
          </div>
          {t.images.title}
        </h2>
        <p className="text-slate-500 text-2xl font-medium max-w-3xl leading-relaxed italic">{t.images.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {galleries.map((img, i) => (
          <div key={i} className="medical-card overflow-hidden group border border-slate-200 hover:border-[#0EA5A4] relative medical-border">
            <div className="aspect-[4/3] bg-[#0B0F14] relative">
              <img 
                src={getImage(img.id)} 
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80 group-hover:opacity-100 filter saturate-50 hover:saturate-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-8">
                <button 
                  className="p-5 bg-white rounded-2xl text-[#0EA5A4] shadow-2xl hover:scale-110 active:scale-95 transition-all border border-[#0EA5A4]/20"
                  onClick={() => onSmartIcon(`Analyze the diagnostic importance of ${img.title}`)}
                  title="Ask MB AI"
                >
                  <HelpCircle className="w-8 h-8" />
                </button>
                <button className="p-5 bg-white rounded-2xl text-[#0B0F14] shadow-2xl hover:scale-110 active:scale-95 transition-all">
                  <Maximize2 className="w-8 h-8" />
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-black text-2xl text-slate-900 group-hover:text-[#0EA5A4] transition-colors leading-tight brand-heading">{img.title}</h4>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Info className="w-4 h-4 text-slate-300" />
                </div>
              </div>
              <p className="text-slate-500 font-medium text-[15px] italic leading-relaxed">{img.desc}</p>
              
              <button 
                onClick={() => onSmartIcon(`Explain the clinical relevance of ${img.title}`)}
                className="mt-8 w-full py-4 bg-slate-50 text-[#0B0F14] rounded-xl font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#0EA5A4] hover:text-white transition-all shadow-sm active:scale-95"
              >
                Inquire Insights
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-28 p-14 bg-[#0B0F14] rounded-[32px] text-center border-t-8 border-[#0EA5A4] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <h3 className="text-[#0EA5A4] text-4xl font-black mb-6 tracking-tight relative z-10 brand-heading">Academic Integrity</h3>
        <p className="text-slate-200 text-xl max-w-3xl mx-auto font-medium leading-relaxed relative z-10 italic">MB MEDICINE sources all visualization data from verified global scientific repositories for educational excellence.</p>
      </div>
    </div>
  );
};

export default MedicalImagesSection;
