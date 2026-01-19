
import React, { useState } from 'react';
import { Language } from '../types';

interface CalculatorProps {
  lang: Language;
}

const Calculator: React.FC<CalculatorProps> = ({ lang }) => {
  const [type, setType] = useState<'bmi' | 'dose' | 'bp'>('bmi');
  const isRtl = lang === Language.AR;

  const t = {
    tabs: {
      bmi: { [Language.EN]: 'BMI Calculator', [Language.FR]: 'Calculateur d\'IMC', [Language.AR]: 'حاسبة مؤشر كتلة الجسم' },
      dose: { [Language.EN]: 'Drug Dosage', [Language.FR]: 'Dosage des Médicaments', [Language.AR]: 'جرعة الدواء' },
      bp: { [Language.EN]: 'Blood Pressure', [Language.FR]: 'Tension Artérielle', [Language.AR]: 'ضغط الدم' },
    },
    bmi: {
      title: { [Language.EN]: 'Body Mass Index Calculator', [Language.FR]: 'Calculateur d\'Indice de Masse Corporelle', [Language.AR]: 'حاسبة مؤشر كتلة الجسم' },
      weight: { [Language.EN]: 'Weight (kg)', [Language.FR]: 'Poids (kg)', [Language.AR]: 'الوزن (كجم)' },
      height: { [Language.EN]: 'Height (cm)', [Language.FR]: 'Taille (cm)', [Language.AR]: 'الطول (سم)' },
      button: { [Language.EN]: 'Calculate BMI', [Language.FR]: 'Calculer l\'IMC', [Language.AR]: 'احسب مؤشر كتلة الجسم' },
      result: { [Language.EN]: 'Your BMI Result', [Language.FR]: 'Votre Résultat IMC', [Language.AR]: 'نتيجة مؤشر كتلة الجسم' },
      guidelines: { [Language.EN]: '2026 WHO Guidelines', [Language.FR]: 'Directives de l\'OMS 2026', [Language.AR]: 'إرشادات منظمة الصحة العالمية 2026' },
      status: {
        under: { [Language.EN]: 'Underweight', [Language.FR]: 'Insuffisance Pondérale', [Language.AR]: 'نقص الوزن' },
        normal: { [Language.EN]: 'Normal', [Language.FR]: 'Normal', [Language.AR]: 'طبيعي' },
        over: { [Language.EN]: 'Overweight', [Language.FR]: 'Surpoids', [Language.AR]: 'زيادة الوزن' },
        obese: { [Language.EN]: 'Obese', [Language.FR]: 'Obèse', [Language.AR]: 'سمنة' },
      }
    },
    pro: {
      desc: { 
        [Language.EN]: 'This advanced clinical tool is restricted to PRO and ENTERPRISE users. Institutional login required to access pharmacopoeia database.',
        [Language.FR]: 'Cet outil clinique avancé est réservé aux utilisateurs PRO et ENTERPRISE. Connexion institutionnelle requise pour accéder à la base de données de pharmacopée.',
        [Language.AR]: 'هذه الأداة السريرية المتقدمة مقتصرة على مستخدمي PRO و ENTERPRISE. تسجيل الدخول المؤسسي مطلوب للوصول إلى قاعدة بيانات دستور الأدوية.'
      },
      cta: { [Language.EN]: 'Upgrade to Pro', [Language.FR]: 'Passer à la Version Pro', [Language.AR]: 'الترقية إلى برو' },
      bpDesc: {
        [Language.EN]: 'Connect your IoT blood pressure cuff or manually enter 7-day readings for hypertension stage mapping.',
        [Language.FR]: 'Connectez votre brassard de tension artérielle IoT ou saisissez manuellement les relevés de 7 jours pour la cartographie des stades d\'hypertension.',
        [Language.AR]: 'قم بتوصيل جهاز قياس ضغط الدم IoT الخاص بك أو أدخل قراءات 7 أيام يدويًا لرسم خرائط مراحل ارتفاع ضغط الدم.'
      },
      sync: { [Language.EN]: 'Sync Device', [Language.FR]: 'Synchroniser l\'appareil', [Language.AR]: 'مزامنة الجهاز' }
    }
  };
  
  // BMI States
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w && h) setBmiResult(Number((w / (h * h)).toFixed(1)));
  };

  const getBmiStatus = (res: number) => {
    if (res < 18.5) return t.bmi.status.under[lang];
    if (res < 25) return t.bmi.status.normal[lang];
    if (res < 30) return t.bmi.status.over[lang];
    return t.bmi.status.obese[lang];
  };

  return (
    <div className="bg-slate-900 rounded-[3rem] border border-white/5 shadow-5xl overflow-hidden max-w-2xl mx-auto">
      <div className={`flex bg-medical-950 border-b border-white/5 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <button 
          onClick={() => setType('bmi')}
          className={`flex-1 py-6 text-[10px] font-black uppercase tracking-widest transition-all ${type === 'bmi' ? 'bg-slate-900 text-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
        >
          {t.tabs.bmi[lang]}
        </button>
        <button 
          onClick={() => setType('dose')}
          className={`flex-1 py-6 text-[10px] font-black uppercase tracking-widest transition-all ${type === 'dose' ? 'bg-slate-900 text-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
        >
          {t.tabs.dose[lang]}
        </button>
        <button 
          onClick={() => setType('bp')}
          className={`flex-1 py-6 text-[10px] font-black uppercase tracking-widest transition-all ${type === 'bp' ? 'bg-slate-900 text-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
        >
          {t.tabs.bp[lang]}
        </button>
      </div>

      <div className="p-10 md:p-16">
        {type === 'bmi' && (
          <div className="space-y-10">
            <h3 className={`text-2xl font-black text-white uppercase tracking-tight ${isRtl ? 'text-right' : 'text-left'}`}>{t.bmi.title[lang]}</h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.bmi.weight[lang]}</label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className={`w-full h-16 px-6 rounded-2xl bg-medical-950 border border-white/10 text-white focus:border-emerald-500 focus:outline-none font-bold text-lg ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.bmi.height[lang]}</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  className={`w-full h-16 px-6 rounded-2xl bg-medical-950 border border-white/10 text-white focus:border-emerald-500 focus:outline-none font-bold text-lg ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>
            </div>
            <button 
              onClick={calculateBMI}
              className="w-full py-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black transition-all shadow-xl active:scale-95 text-xs uppercase tracking-[0.2em]"
            >
              {t.bmi.button[lang]}
            </button>
            {bmiResult && (
              <div className={`p-8 bg-emerald-600/10 rounded-3xl border border-emerald-500/20 flex items-center justify-between shadow-inner ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <p className="text-[10px] font-black text-emerald-500 uppercase mb-2 tracking-widest">{t.bmi.result[lang]}</p>
                  <p className="text-4xl font-black text-white tracking-tighter">{bmiResult}</p>
                </div>
                <div className={isRtl ? 'text-left' : 'text-right'}>
                  <p className="text-lg font-black text-white uppercase tracking-tight">
                    {getBmiStatus(bmiResult)}
                  </p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">{t.bmi.guidelines[lang]}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {type === 'dose' && (
          <div className="space-y-10 text-center py-12">
            <div className="w-20 h-20 bg-emerald-600/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">{t.tabs.dose[lang]}</h3>
            <p className="text-slate-500 text-base font-medium max-w-sm mx-auto leading-relaxed">
              {t.pro.desc[lang]}
            </p>
            <button className="px-10 py-5 rounded-xl bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-emerald-500 transition-all">
              {t.pro.cta[lang]}
            </button>
          </div>
        )}

        {type === 'bp' && (
          <div className="space-y-10 text-center py-12">
             <div className="w-20 h-20 bg-rose-600/10 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-rose-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">{t.tabs.bp[lang]}</h3>
            <p className="text-slate-500 text-base font-medium max-w-sm mx-auto leading-relaxed">
              {t.pro.bpDesc[lang]}
            </p>
            <button className="px-10 py-5 rounded-xl bg-slate-950 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-emerald-600 transition-all">
              {t.pro.sync[lang]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
