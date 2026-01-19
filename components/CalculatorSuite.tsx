
import React, { useState } from 'react';
import { Language } from '../types';

interface Props {
  lang: Language;
}

export const CalculatorSuite: React.FC<Props> = ({ lang }) => {
  const [active, setActive] = useState('bmi');
  const isAr = lang === 'ar';

  return (
    <div className="glass-card rounded-3xl overflow-hidden">
      <div className="flex bg-white/5 border-b border-white/10 overflow-x-auto scrollbar-hide">
        {['bmi', 'heart', 'dosage', 'bp', 'glucose'].map((id) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`px-6 py-4 text-sm font-bold uppercase whitespace-nowrap transition-all border-b-2 ${
              active === id ? 'border-[#0B3D91] text-white bg-white/5' : 'border-transparent text-gray-500'
            }`}
          >
            {id.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div className="p-8">
        {active === 'bmi' && <BMICalc lang={lang} />}
        {active === 'heart' && <HeartRateCalc lang={lang} />}
        {active === 'dosage' && <DosageCalc lang={lang} />}
        {active === 'bp' && <BPCalc lang={lang} />}
        {active === 'glucose' && <GlucoseCalc lang={lang} />}
      </div>
    </div>
  );
};

const BMICalc = ({ lang }: { lang: Language }) => {
  const [w, setW] = useState('');
  const [h, setH] = useState('');
  const [res, setRes] = useState<number | null>(null);
  const isAr = lang === 'ar';

  return (
    <div className={isAr ? 'rtl' : 'ltr'}>
      <h3 className="text-xl font-bold text-white mb-6">{isAr ? 'حاسبة مؤشر كتلة الجسم' : 'Body Mass Index (BMI)'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input type="number" placeholder={isAr ? 'الوزن (كجم)' : 'Weight (kg)'} value={w} onChange={e => setW(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0B3D91] outline-none" />
        <input type="number" placeholder={isAr ? 'الطول (سم)' : 'Height (cm)'} value={h} onChange={e => setH(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0B3D91] outline-none" />
      </div>
      <button onClick={() => setRes(Number(w) / ((Number(h)/100)**2))} className="w-full bg-[#0B3D91] py-3 rounded-xl font-bold">Calculate</button>
      {res && <div className="mt-4 text-center text-3xl font-black text-[#3b82f6]">{res.toFixed(1)}</div>}
    </div>
  );
};

const HeartRateCalc = ({ lang }: { lang: Language }) => (
  <div className={lang === 'ar' ? 'rtl' : 'ltr'}>
    <h3 className="text-xl font-bold text-white mb-4">{lang === 'ar' ? 'نطاق ضربات القلب' : 'Target Heart Rate'}</h3>
    <input type="number" placeholder={lang === 'ar' ? 'العمر' : 'Age'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-4" />
    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm text-gray-400">
      Formula: (220 - Age) x Target Intensity
    </div>
  </div>
);

const DosageCalc = ({ lang }: { lang: Language }) => (
  <div className={lang === 'ar' ? 'rtl' : 'ltr'}>
    <h3 className="text-xl font-bold text-white mb-4">{lang === 'ar' ? 'حاسبة الجرعة' : 'Dosage (Clark\'s Rule)'}</h3>
    <input type="number" placeholder={lang === 'ar' ? 'وزن الطفل (كجم)' : 'Child Weight (kg)'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-4" />
    <button className="w-full bg-[#0B3D91] py-3 rounded-xl font-bold">Evaluate</button>
  </div>
);

const BPCalc = ({ lang }: { lang: Language }) => (
  <div className={lang === 'ar' ? 'rtl' : 'ltr'}>
    <h3 className="text-xl font-bold text-white mb-4">{lang === 'ar' ? 'أداة ضغط الدم' : 'BP Classification'}</h3>
    <div className="grid grid-cols-2 gap-4">
      <input type="number" placeholder="Sys" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" />
      <input type="number" placeholder="Dia" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" />
    </div>
  </div>
);

const GlucoseCalc = ({ lang }: { lang: Language }) => (
  <div className={lang === 'ar' ? 'rtl' : 'ltr'}>
    <h3 className="text-xl font-bold text-white mb-4">{lang === 'ar' ? 'محول الجلوكوز' : 'Glucose mg/dL to mmol/L'}</h3>
    <input type="number" placeholder="mg/dL" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" />
  </div>
);
