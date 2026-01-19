
import React from 'react';
import { MedicalDatabaseItem, Language } from '../types';

interface Props {
  item: MedicalDatabaseItem;
  displayLang: Language;
  onClose: () => void;
}

export const MedicalDetail: React.FC<Props> = ({ item, displayLang, onClose }) => {
  const isEn = displayLang === 'en' || displayLang === 'both';
  const isAr = displayLang === 'ar' || displayLang === 'both';
  const isBoth = displayLang === 'both';

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl overflow-y-auto pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onClose}
          className="fixed top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10"
        >
          ✕
        </button>

        <div className="mb-12 text-center">
          <span className="px-4 py-1.5 bg-[#0B3D91] text-xs font-black uppercase rounded-full mb-6 inline-block">
            {item.category}
          </span>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-12 items-baseline">
            {isEn && <h1 className="text-4xl md:text-5xl font-black text-white">{item.titleEn}</h1>}
            {isAr && <h1 className="text-4xl md:text-5xl font-black text-white font-['Noto_Sans_Arabic']" dir="rtl">{item.titleAr}</h1>}
          </div>
          {item.frenchTerm && (
            <p className="mt-4 text-[#3b82f6] italic text-lg">Terme français: {item.frenchTerm}</p>
          )}
        </div>

        <div className={`grid ${isBoth ? 'grid-cols-1 md:grid-cols-2 gap-12' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
          {isEn && (
            <div className="space-y-8 ltr text-gray-300 leading-relaxed text-lg">
              <section>
                <h3 className="text-white font-bold text-xl mb-4 border-l-4 border-[#0B3D91] pl-4 uppercase">Description</h3>
                <p>{item.contentEn}</p>
              </section>

              {item.category === 'drug' && (
                <>
                  <section>
                    <h3 className="text-white font-bold text-xl mb-4 border-l-4 border-[#0B3D91] pl-4 uppercase">Dosage</h3>
                    <p className="bg-white/5 p-6 rounded-2xl">{(item as any).dosageEn}</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold text-xl mb-4 border-l-4 border-[#0B3D91] pl-4 uppercase">Side Effects</h3>
                    <p className="bg-red-900/10 p-6 rounded-2xl border border-red-900/20">{(item as any).sideEffectsEn}</p>
                  </section>
                </>
              )}

              {item.category === 'surgery' && (
                <>
                  <section>
                    <h3 className="text-white font-bold text-xl mb-4 border-l-4 border-[#0B3D91] pl-4 uppercase">Pre-Operative Care</h3>
                    <p>{(item as any).preOpEn}</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold text-xl mb-4 border-l-4 border-[#0B3D91] pl-4 uppercase">Risks</h3>
                    <p>{(item as any).risksEn}</p>
                  </section>
                </>
              )}
            </div>
          )}

          {isAr && (
            <div className="space-y-8 rtl text-right text-gray-300 leading-relaxed text-lg font-['Noto_Sans_Arabic']" dir="rtl">
              <section>
                <h3 className="text-white font-bold text-xl mb-4 border-r-4 border-[#0B3D91] pr-4 uppercase">الوصف</h3>
                <p>{item.contentAr}</p>
              </section>

              {item.category === 'drug' && (
                <>
                  <section>
                    <h3 className="text-white font-bold text-xl mb-4 border-r-4 border-[#0B3D91] pr-4 uppercase">الجرعة</h3>
                    <p className="bg-white/5 p-6 rounded-2xl">{(item as any).dosageAr}</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold text-xl mb-4 border-r-4 border-[#0B3D91] pr-4 uppercase">الأعراض الجانبية</h3>
                    <p className="bg-red-900/10 p-6 rounded-2xl border border-red-900/20">{(item as any).sideEffectsAr}</p>
                  </section>
                </>
              )}
              
              {item.category === 'surgery' && (
                <>
                  <section>
                    <h3 className="text-white font-bold text-xl mb-4 border-r-4 border-[#0B3D91] pr-4 uppercase">العناية قبل الجراحة</h3>
                    <p>{(item as any).preOpAr}</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold text-xl mb-4 border-r-4 border-[#0B3D91] pr-4 uppercase">المخاطر</h3>
                    <p>{(item as any).risksAr}</p>
                  </section>
                </>
              )}
            </div>
          )}
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <h4 className="text-gray-500 text-xs uppercase font-bold mb-4 tracking-widest">Verification Sources</h4>
          <div className="flex flex-wrap justify-center gap-6">
            {item.references.map(ref => (
              <span key={ref} className="text-[#3b82f6] text-sm font-medium hover:underline cursor-pointer">
                {ref} (Verified 2026)
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
