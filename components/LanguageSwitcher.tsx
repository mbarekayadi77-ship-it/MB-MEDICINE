
import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<Props> = ({ current, onChange }) => {
  return (
    <div className="flex bg-white/10 rounded-full p-1 border border-white/20">
      <button 
        onClick={() => onChange('en')}
        className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${current === 'en' ? 'bg-[#0B3D91] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
      >
        EN
      </button>
      <button 
        onClick={() => onChange('both')}
        className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${current === 'both' ? 'bg-[#0B3D91] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
      >
        Dual
      </button>
      <button 
        onClick={() => onChange('ar')}
        className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${current === 'ar' ? 'bg-[#0B3D91] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
      >
        عربي
      </button>
    </div>
  );
};
