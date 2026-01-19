import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { TranslationSchema, Language } from '../types';
import { Send, Loader2, Info, ExternalLink, Sparkles, X, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  t: TranslationSchema;
  lang: Language;
  externalTrigger?: { query: string; timestamp: number } | null;
}

const SearchAssistant: React.FC<Props> = ({ t, lang, externalTrigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant' | 'error', content: string, citations?: any[] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isRTL = lang === 'ar';

  useEffect(() => {
    if (externalTrigger) {
      setIsOpen(true);
      handleSend(externalTrigger.query);
    }
  }, [externalTrigger]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSend = async (overrideInput?: string) => {
    const messageToSend = overrideInput || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = messageToSend.trim();
    if (!overrideInput) setInput('');
    
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemPrompt = `You are MB Medical AI Assistant. Role: Senior Medical Research Specialist.
        Tone: Academic, Precise, Institutional. Language: Respond in ${lang.toUpperCase()}.
        Output: Use structured Markdown. Include Symptoms, Biological Mechanisms, and Clinical Protocols.
        Disclaimer: Information is from MB Medicine Scientific Archive for research purposes only.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.1,
          tools: [{ googleSearch: {} }]
        }
      });

      const aiResponse = response.text || "No structured clinical data retrieved.";
      const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse,
        citations: grounding 
      }]);
    } catch (error) {
      console.error("Clinical Connection Error:", error);
      setChatHistory(prev => [...prev, { role: 'error', content: 'CONNECTION_FAILED' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (chat: any) => {
    if (chat.role === 'error') {
      return (
        <div className="bg-red-950/20 border border-red-900/40 p-6 rounded-3xl space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-3 text-red-400 font-black uppercase text-xs tracking-widest">
            <AlertCircle className="w-5 h-5" />
            Clinical Retrieval Error
          </div>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            {isRTL 
              ? "تعذر الوصول إلى قاعدة البيانات السريرية الآمنة. نوصي بالتحقق من المصادر الدولية الموثوقة التالية:"
              : "We couldn't reach the secure clinical database. Please consult these institutional sources instead:"}
          </p>
          <div className="grid grid-cols-1 gap-3 mt-4">
            <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" className="flex items-center justify-between p-4 bg-black/40 rounded-xl hover:bg-white/5 transition-all group border border-white/5">
              <span className="text-xs font-bold text-white uppercase group-hover:text-[#00ffaa]">PubMed Archive</span>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </a>
            <a href="https://www.who.int/" target="_blank" className="flex items-center justify-between p-4 bg-black/40 rounded-xl hover:bg-white/5 transition-all group border border-white/5">
              <span className="text-xs font-bold text-white uppercase group-hover:text-[#00ffaa]">WHO Guidelines</span>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </a>
          </div>
          <button onClick={() => handleSend(chatHistory[chatHistory.length-2]?.content)} className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00ffaa] hover:scale-105 transition-all">
            <RefreshCw className="w-4 h-4" /> Re-Attempt Retrieval
          </button>
        </div>
      );
    }

    return (
      <div className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[92%] p-6 rounded-3xl ${
          chat.role === 'user' 
          ? 'bg-[#00ffaa] text-black font-extrabold shadow-[0_0_20px_rgba(0,255,170,0.4)]' 
          : 'bg-[#161b22] border border-white/5 text-slate-200 shadow-xl'
        }`}>
          <div className="prose prose-invert prose-sm whitespace-pre-wrap leading-relaxed font-medium">
            {chat.content}
          </div>
          
          {chat.citations && chat.citations.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-[10px] font-black text-[#00ffaa] uppercase tracking-[0.2em] mb-4">
                <Info className="w-3 h-3" /> External Clinical Validation
              </div>
              <div className="flex flex-wrap gap-2">
                {chat.citations.map((cite: any, i: number) => cite.web && (
                  <a key={i} href={cite.web.uri} target="_blank" className="text-[10px] bg-black/40 px-3 py-2 rounded-lg border border-white/10 hover:border-[#00ffaa] transition-all flex items-center gap-2">
                    <ExternalLink className="w-3 h-3" />
                    {cite.web.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-black rounded-2xl shadow-[0_0_30px_rgba(0,255,170,0.5)] flex items-center justify-center text-[#00ffaa] z-40 border-2 border-[#00ffaa] transition-all hover:scale-110 active:scale-90"
        aria-label="Medical AI Assistant"
      >
        <Sparkles className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className={`fixed inset-y-0 right-0 sm:right-8 sm:inset-y-8 w-full sm:w-[540px] bg-[#05070a] shadow-4xl z-50 flex flex-col border-l sm:border border-white/10 sm:rounded-[40px] overflow-hidden transition-all animate-in slide-in-from-right duration-500 ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Isolated AI Header */}
          <div className="bg-[#0D1117] px-8 py-7 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-[#00ffaa] font-black text-2xl border-2 border-[#00ffaa]/40 shadow-[0_0_15px_rgba(0,255,170,0.2)]">MB</div>
              <div>
                <h3 className="font-black text-white brand-heading uppercase tracking-tighter text-sm">MB Medical AI</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-2 h-2 bg-[#00ffaa] rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.25em]">Institutional Authority</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-12 h-12 flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 rounded-2xl text-slate-500 transition-all">
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Isolated Scrolling Feed */}
          <div className="flex-grow p-8 overflow-y-auto space-y-10 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            {chatHistory.length === 0 && (
              <div className="text-center py-24 opacity-30">
                <ShieldCheck className="w-20 h-20 text-[#00ffaa] mx-auto mb-8" />
                <h4 className="text-xl font-black text-white brand-heading uppercase tracking-widest">Archive Core Active</h4>
                <p className="text-[10px] text-slate-500 max-w-xs mx-auto mt-4 uppercase tracking-[0.3em] leading-relaxed">System ready for clinical inquiry and multi-vector analysis.</p>
              </div>
            )}

            {chatHistory.map((chat, idx) => (
              <div key={idx} className="animate-in slide-in-from-bottom-4 duration-500">
                {renderMessage(chat)}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-[#161b22] px-8 py-5 rounded-3xl flex items-center gap-4 border border-white/5">
                  <Loader2 className="w-5 h-5 animate-spin text-[#00ffaa]" />
                  <span className="text-[11px] text-[#00ffaa] font-black uppercase tracking-[0.3em]">Processing Framework...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* AI Input Area */}
          <div className="p-8 bg-[#0D1117] border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isRTL ? "ابحث في التشريح أو الأمراض..." : "Consult medical data or anatomy..."}
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:outline-none focus:border-[#00ffaa] transition-all font-bold placeholder:text-slate-700"
                />
              </div>
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="w-16 h-16 flex items-center justify-center bg-[#00ffaa] text-black rounded-2xl hover:bg-white disabled:opacity-30 transition-all flex-shrink-0 shadow-xl"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-5 flex items-center justify-center gap-3 text-[9px] text-slate-600 font-black uppercase tracking-[0.3em]">
              <ShieldCheck className="w-4 h-4" />
              Institutional-Grade Scientific Retrieval
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchAssistant;