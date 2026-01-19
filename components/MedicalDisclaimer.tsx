import React from 'react';
import { TranslationSchema } from '../types';
import { AlertCircle } from 'lucide-react';

interface Props {
  t: TranslationSchema;
}

const MedicalDisclaimer: React.FC<Props> = ({ t }) => {
  return (
    <div className="bg-[#10B981] py-2.5 px-4 shadow-xl relative z-[100]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-black text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-center">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        {t.common.educationalDisclaimer}
      </div>
    </div>
  );
};

export default MedicalDisclaimer;