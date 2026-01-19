
import React, { useState, useMemo } from 'react';
import { TranslationSchema } from '../types';
import { Book, Search, FileText, Download, HelpCircle } from 'lucide-react';

interface Props {
  t: TranslationSchema;
  onSmartIcon: (query: string) => void;
}

interface MedicalBook {
  id: number;
  title: string;
  author: string;
  year: number;
  category: string;
  url: string;
}

const BooksSection: React.FC<Props> = ({ t, onSmartIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const medicalBooks: MedicalBook[] = useMemo(() => {
    const categories = [
      'Anatomy', 'Clinical Medicine', 'Pharmacology', 'Cardiology', 
      'Neurology', 'Pediatrics', 'Surgery', 'Immunology', 'Histology'
    ];
    const authors = [
      'Dr. Robert Smith', 'Prof. Maria Garcia', 'Dr. James Wilson', 
      'Dr. Linda Thompson', 'Prof. Ahmed Al-Farsi', 'Dr. Sarah Johnson'
    ];
    
    return Array.from({ length: 200 }, (_, i) => ({
      id: i + 1,
      title: `${categories[i % categories.length]} Foundations: Vol. ${Math.floor(i / categories.length) + 1}`,
      author: authors[i % authors.length],
      year: 2010 + (i % 15),
      category: categories[i % categories.length],
      url: '#'
    }));
  }, []);

  const categories = ['All', ...new Set(medicalBooks.map(b => b.category))];

  const filteredBooks = medicalBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-14 text-center sm:text-left">
        <h2 className="text-5xl font-black text-[#0B0F14] mb-6 flex items-center justify-center sm:justify-start gap-6 brand-heading">
          <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 shadow-sm">
            <Book className="w-10 h-10 text-[#0EA5A4]" />
          </div>
          {t.books.title}
        </h2>
        <p className="text-slate-500 text-xl font-medium max-w-3xl leading-relaxed italic">{t.books.subtitle}</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-[32px] shadow-2xl overflow-hidden mb-16 medical-border">
        <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="relative w-full lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#0EA5A4]" />
            </div>
            <input
              type="text"
              className="block w-full pl-14 pr-6 py-5 rounded-2xl border border-slate-200 focus:border-[#0EA5A4] focus:ring-4 focus:ring-teal-50/50 font-bold transition-all bg-white text-base shadow-sm"
              placeholder={t.books.searchBooks}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                  activeCategory === cat 
                  ? 'bg-[#0EA5A4] text-white shadow-md' 
                  : 'bg-white text-slate-500 hover:text-[#0EA5A4] border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.books.table.title}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.books.table.author}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.books.table.year}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center">{t.books.table.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.length > 0 ? filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-teal-50/30 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="p-3 bg-slate-50 text-[#0EA5A4] rounded-xl group-hover:bg-[#0B0F14] group-hover:text-white transition-all shadow-sm">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-[#0EA5A4] transition-colors text-base brand-heading">{book.title}</p>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 block">{book.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-slate-600 font-bold italic">{book.author}</td>
                  <td className="px-10 py-6 text-slate-500 font-bold">{book.year}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={() => onSmartIcon(`Give me a scientific summary of ${book.title}`)}
                        className="p-3 bg-slate-50 text-slate-300 rounded-xl hover:bg-[#0EA5A4] hover:text-white transition-all"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                      <a 
                        href={book.url}
                        className="flex items-center gap-3 px-6 py-3 bg-[#0EA5A4] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#0B0F14] transition-all shadow-md active:scale-95"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </a>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-10 py-24 text-center">
                    <p className="text-slate-400 font-bold italic text-lg">No medical records matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden grid grid-cols-1 gap-5 p-6 bg-slate-50/50">
          {filteredBooks.slice(0, 10).map(book => (
            <div key={book.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
               <div className="flex items-center gap-5 mb-5">
                  <div className="p-3.5 bg-slate-50 text-[#0EA5A4] rounded-xl">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight text-lg brand-heading">{book.title}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">{book.category}</p>
                  </div>
               </div>
               <div className="flex justify-between items-center mt-6">
                 <button 
                  onClick={() => onSmartIcon(`Explain the significance of ${book.title}`)}
                  className="px-5 py-3 bg-slate-50 text-[#0EA5A4] rounded-xl font-bold text-[10px] uppercase tracking-widest"
                 >
                   Details
                 </button>
                 <a 
                  href={book.url}
                  className="flex items-center gap-2 px-6 py-3 bg-[#0B0F14] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest"
                 >
                   <Download className="w-4 h-4" />
                   PDF
                 </a>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-14 bg-[#0B0F14] rounded-[32px] text-white flex flex-col md:flex-row items-center gap-14 border-b-8 border-[#0EA5A4] relative overflow-hidden shadow-2xl medical-border">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="flex-grow relative z-10 text-center md:text-left">
          <h3 className="text-4xl font-black mb-6 text-[#0EA5A4] tracking-tight brand-heading">Global Medical Cooperation</h3>
          <p className="text-slate-200 text-xl leading-relaxed font-medium italic">
            This digital archive contains scientific manuscripts and medical textbooks curated from globally recognized academic institutions. 
          </p>
        </div>
        <button 
          onClick={() => onSmartIcon("How can I contribute scientific data to MB MEDICINE?")}
          className="px-12 py-6 bg-white text-[#0B0F14] rounded-2xl font-bold uppercase tracking-widest hover:bg-[#0EA5A4] hover:text-white transition-all shadow-2xl shrink-0 active:scale-95 relative z-10"
        >
          Submit Publication
        </button>
      </div>
    </div>
  );
};

export default BooksSection;
