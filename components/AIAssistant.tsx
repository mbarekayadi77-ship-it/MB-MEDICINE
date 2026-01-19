
import React, { useState, useRef, useEffect } from 'react';
import { getMedAIResponse } from '../services/gemini';
import { ChatMessage, Language, SubscriptionPlan } from '../types';

interface AIAssistantProps {
  lang: Language;
  plan: SubscriptionPlan;
  isEmbedded?: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ lang, plan, isEmbedded = false }) => {
  const isRtl = lang === Language.AR;

  const t = {
    greeting: {
      [Language.EN]: "Institutional Greetings. I am Professor MB MedAI, Clinical Core v4.2. I am synchronized with the 2026 global medical database. Please address me with your exhaustive clinical or academic inquiry for a full evidence-based synthesis.",
      [Language.FR]: "Salutations institutionnelles. Je suis le professeur MB MedAI, Clinical Core v4.2. Je suis synchronisé avec la base de données médicale mondiale 2026. Veuillez me contacter pour votre demande clinique ou académique exhaustive pour une synthèse complète fondée sur des preuves.",
      [Language.AR]: "تحيات مؤسسية. أنا البروفيسور MB MedAI، جوهر السريرية الإصدار 4.2. أنا متزامن مع قاعدة البيانات الطبية العالمية لعام 2026. يرجى مخاطبتي باستفسارك السريري أو الأكاديمي الشامل للحصول على تركيب كامل قائم على الأدلة."
    },
    placeholder: {
      [Language.EN]: "Address the Professor with your clinical inquiry...",
      [Language.FR]: "Adressez-vous au Professeur avec votre demande clinique...",
      [Language.AR]: "خاطب البروفيسور باستفسارك الطبي..."
    },
    status: {
      active: { [Language.EN]: 'Academic Multi-Language Active', [Language.FR]: 'Multilingue Académique Actif', [Language.AR]: 'النشاط الأكاديمي متعدد اللغات مفعل' },
      license: { [Language.EN]: 'LICENSE', [Language.FR]: 'LICENCE', [Language.AR]: 'الترخيص' },
      sync: { [Language.EN]: 'Global Institutional Sync', [Language.FR]: 'Sync Institutionnelle Mondiale', [Language.AR]: 'مزامنة مؤسسية عالمية' },
    },
    msgLabel: {
      inquiry: { [Language.EN]: 'Inquiry', [Language.FR]: 'Demande', [Language.AR]: 'استفسار' },
      response: { [Language.EN]: 'Academic Response', [Language.FR]: 'Réponse Académique', [Language.AR]: 'رد أكاديمي' },
    },
    synthesizing: { [Language.EN]: 'Synthesizing Exhaustive Evidence...', [Language.FR]: 'Synthèse des preuves exhaustives...', [Language.AR]: 'جاري تركيب الأدلة الشاملة...' },
    disclaimer: {
      [Language.EN]: "Institutional Reference Only • Verified Academic Core v4.2 • MB Medical Group Global Ethics Compliant",
      [Language.FR]: "Référence Institutionnelle Uniquement • Cœur Académique Vérifié v4.2 • Conforme à l'Éthique Mondiale de MB Medical Group",
      [Language.AR]: "مرجع مؤسسي فقط • جوهر أكاديمي موثق v4.2 • متوافق مع الأخلاقيات العالمية لمجموعة MB الطبية"
    },
    limit: {
      [Language.EN]: "Institutional limit reached for Trial License. Please upgrade for continuous Professor-level consulting.",
      [Language.FR]: "Limite institutionnelle atteinte pour la licence d'essai. Veuillez mettre à niveau pour une consultation continue au niveau du professeur.",
      [Language.AR]: "تم الوصول إلى الحد المؤسسي لترخيص التجربة. يرجى الترقية للحصول على استشارات مستمرة على مستوى البروفيسور."
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      parts: [{ text: t.greeting[lang] }] 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
      setMessages([{ role: 'model', parts: [{ text: t.greeting[lang] }] }]);
    }
  }, [lang]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    if (plan === SubscriptionPlan.FREE && messages.length > 8) {
      alert(t.limit[lang]);
      return;
    }

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await getMedAIResponse(messages, input, lang);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: responseText || "Synthesis error." }] }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Synchronization failure with clinical core terminal. Try PubMed or WHO directly." }] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col bg-slate-950 border border-white/10 overflow-hidden relative ${isEmbedded ? 'h-full w-full rounded-none' : 'max-w-6xl mx-auto h-[850px] rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)]'}`}>
      {/* Dashboard Header */}
      <div className={`px-12 py-10 bg-slate-900/80 backdrop-blur-3xl border-b border-white/10 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-8 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
          <div className="w-16 h-16 rounded-3xl bg-emerald-600 flex items-center justify-center text-white text-4xl shadow-2xl font-black border border-white/10">MB</div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter leading-none uppercase">Professor MB MedAI</h2>
            <div className={`flex items-center gap-4 mt-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[9px] text-emerald-400 font-black uppercase tracking-[0.4em]">{t.status.active[lang]}</p>
            </div>
          </div>
        </div>
        {!isEmbedded && (
          <div className={`hidden sm:flex flex-col gap-2 ${isRtl ? 'items-start' : 'items-end'}`}>
            <div className="px-6 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-black tracking-[0.3em] text-emerald-400">
              {t.status.license[lang]}: {plan.toUpperCase()}
            </div>
            <span className="text-[7px] text-slate-600 font-bold uppercase tracking-widest">{t.status.sync[lang]}</span>
          </div>
        )}
      </div>

      {/* Clinical Stream */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 bg-gradient-to-b from-slate-950 via-medical-950/40 to-slate-950">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[95%] p-8 rounded-[2rem] relative ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none shadow-2xl' 
                : 'bg-slate-900 text-slate-200 border border-white/10 rounded-tl-none shadow-inner prose-invert prose-emerald lg:prose-xl'
            }`}>
              <div className={`absolute top-4 ${msg.role === 'user' ? (isRtl ? 'left-6' : 'right-6') : (isRtl ? 'right-6' : 'left-6')} text-[7px] font-black uppercase tracking-[0.3em] opacity-30`}>
                {msg.role === 'user' ? t.msgLabel.inquiry[lang] : t.msgLabel.response[lang]}
              </div>
              <div className={`text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium pt-3 ${isRtl ? 'text-right rtl' : 'text-left'}`}>
                {msg.parts[0].text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-emerald-500/20 shadow-2xl flex items-center gap-6">
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" />
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">{t.synthesizing[lang]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Console */}
      <div className={`p-8 bg-slate-900/80 backdrop-blur-3xl border-t border-white/10 flex flex-col sm:flex-row items-center gap-6 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
        <div className="flex-1 w-full">
          <textarea 
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t.placeholder[lang]}
            className={`w-full min-h-[60px] max-h-40 px-6 py-4 rounded-2xl bg-medical-950 border border-white/10 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-premium text-base font-semibold resize-none focus:outline-none ${isRtl ? 'text-right' : 'text-left'}`}
          />
        </div>
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="w-16 h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-premium disabled:opacity-30 shadow-[0_20px_40px_rgba(16,185,129,0.3)] active:scale-90 flex-shrink-0"
        >
          <svg className={isRtl ? 'rotate-180' : ''} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
      
      {/* Institutional Disclaimer */}
      <div className="px-12 py-4 bg-slate-950 border-t border-white/10 text-center">
         <span className="text-[8px] text-slate-600 font-black uppercase tracking-[0.5em]">
           {t.disclaimer[lang]}
         </span>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default AIAssistant;
