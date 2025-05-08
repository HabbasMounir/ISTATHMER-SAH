import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaUserCircle, FaBalanceScale, FaTimes, FaFilter, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';

import { NavBarbg } from '../components/navBar';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { transactions } from '../data/en';

// const RulingIndicator = ({ ruling }) => {
//   const { t, i18n } = useTranslation();

//   const colors = {
//     Halal: 'bg-green-100 text-green-800 border-green-200 ring-green-400',
//     Haram: 'bg-red-100 text-red-800 border-red-200 ring-red-400',
//     Mokhtalaf: 'bg-amber-100 text-amber-800 border-amber-200 ring-amber-400'
//   };

//   return (
//     <div 
//       className={`${colors[ruling]} px-4 py-1.5 rounded-full border ring-1 ring-opacity-50 flex items-center text-sm font-medium shadow-sm`}
//     >
//       <FaBalanceScale className={`${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} text-current`} />
//       {ruling}
//     </div>
//   );
// };

const RulingIndicator = ({ ruling }) => {
  const { t, i18n } = useTranslation();
  const rulingTranslations = {
    Halal: i18n.language === 'ar' ? 'حلال' : 'Halal',
    Haram: i18n.language === 'ar' ? 'حرام' : 'Haram',
    Mokhtalaf: i18n.language === 'ar' ? 'مختلف' : 'Mokhtalaf'
  };

  const colors = {
    Halal: 'bg-green-100 text-green-800 border-green-200 ring-green-400',
    Haram: 'bg-red-100 text-red-800 border-red-200 ring-red-400',
    Mokhtalaf: 'bg-amber-100 text-amber-800 border-amber-200 ring-amber-400'
  };

  return (
    <div className={`${colors[ruling]} px-4 py-1.5 rounded-full border ring-1 ring-opacity-50 flex items-center text-sm font-medium shadow-sm`}>
      <FaBalanceScale className={`${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} text-current`} />
      {rulingTranslations[ruling]}
    </div>
  );
};



export default function IslamicConsulting() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [questionEmail, setQuestionEmail] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const { t, i18n } = useTranslation();









  const getResults = (term) => {
    if (!term) return [];
    const searchWords = term.toLowerCase().split(/\s+/);
    
    return transactions.filter(item => 
      searchWords.some(word =>
        item.title.toLowerCase().includes(word) ||
        item.description.toLowerCase().includes(word) ||
        item.tags.some(tag => tag.toLowerCase().includes(word))
      )
    );
  };

//   const results = getResults(searchTerm);
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('New question submitted:', {
      title: questionTitle,
      description: questionDescription,
      email: questionEmail
    });
    
    // Reset form and close modal
    setQuestionTitle('');
    setQuestionDescription('');
    setQuestionEmail('');
    setShowQuestionForm(false);
  };
const fuseOptions = {
    // Search fields and their weights
    keys: [
      { name: 'title', weight: 0.6 },       // Most important
      { name: 'description', weight: 0.3 }, 
      { name: 'tags', weight: 0.1 },        // Least important
      { name: 'author', weight: 0.2 }
    ],
    
    // Matching sensitivity (0 = exact, 1 = loose)
    threshold: 0.35,
    
    // Search parameters
    ignoreLocation: true,    // Search in all parts of text
    minMatchCharLength: 3,   // Start matching after 3 chars
    findAllMatches: true,    // Return all matches, not just first
    useExtendedSearch: true, // Allow advanced queries
    distance: 100,           // Maximum allowed distance between matches
    includeScore: true,      // Include relevance score in results
    ignoreFieldNorm: true    // Better performance for long texts
  };
  const [fuse, setFuse] = useState(null);
  const [results, setResults] = useState([]);

  // Initialize Fuse.js
  useEffect(() => {
    setFuse(new Fuse(transactions, fuseOptions));
  }, []);

  // Search handler with debounce
  useEffect(() => {
    if (!fuse) return;

    const handler = setTimeout(() => {
      if (searchTerm.trim()) {
        const searchResults = fuse.search(searchTerm);
        setResults(searchResults.map(result => result.item));
      } else {
        setResults(transactions);
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [searchTerm, fuse]);







  const inputRef = useRef(null);

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <NavBarbg isLightBackground={true} />
      
      <div className="pt-20 pb-16 max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-12 ">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">{t('islamic_consulting.title')}</h1>
          <p className="text-lg text-gray-600 text-center mb-8">{t('islamic_consulting.subtitle')}</p>
          
          {/* Enhanced Search Bar */}
          {/* <div className="max-w-4xl flex gap-2 mx-auto">
            <button
              onClick={() => setShowQuestionForm(true)}
              className="w-1/5 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <FaPlus className="text-sm" />
              <span className='w-full'>{t('islamic_consulting.ask_question')}</span>
            </button>
            <div
            onClick={() => inputRef.current.focus()}
             className="bg-white w-4/5 rounded-2xl shadow-lg p-2 border border-gray-100 hover:border-blue-400 transition-all duration-300 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <FaSearch className={`mx-4 text-blue-500 text-xl`} />
                <input
                  type="text"
                  placeholder={t('islamic_consulting.search_placeholder')}
                  className="flex-1 p-4 focus:outline-none text-lg"
                  value={searchTerm}
                  ref={inputRef}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div> */}

<div className="max-w-4xl flex flex-col md:flex-row gap-2 mx-auto px-4">
    <button
        onClick={() => setShowQuestionForm(true)}
        className="w-full md:w-1/5 px-4 py-2 md:px-6 md:py-3 
                   bg-gradient-to-r from-blue-600 to-indigo-600 
                   text-white rounded-lg md:rounded-xl 
                   hover:from-blue-700 hover:to-indigo-700 
                   transition-all duration-300 
                   flex items-center justify-center gap-2 
                   shadow-sm text-sm md:text-base"
    >
        <FaPlus className="text-xs md:text-sm" />
        <span className='whitespace-nowrap'>{t('islamic_consulting.ask_question')}</span>
    </button>
    <span className='text-center justify-center mx-2 flex items-center'>
      {i18n.language === 'ar'?'أو' :'or'}
      </span>
    <div
        onClick={() => inputRef.current.focus()}
        className="bg-white w-full md:w-4/5 rounded-xl md:rounded-2xl 
                   shadow-lg p-1.5 md:p-2 border border-gray-100 
                   hover:border-blue-400 transition-all duration-300 
                   backdrop-blur-xl"
    >
        <div className="flex items-center gap-1 md:gap-2">
            <FaSearch className="mx-2 md:mx-4 text-blue-500 text-lg md:text-xl" />
            <input
                type="text"
                placeholder={t('islamic_consulting.search_placeholder')}
                className="flex-1 p-2 md:p-4 focus:outline-none 
                           text-base md:text-lg"
                value={searchTerm}
                ref={inputRef}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
</div>




        </div>

        {/* Results List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {results.length === 0 ? (
            <div className="text-center py-8"
             >
              <div className="flex justify-center mb-6">
                <FaSearch className="text-6xl text-blue-500 opacity-50" />
              </div>
              <h3 className="text-2xl text-center font-semibold text-gray-900 mb-4">
                {t('islamic_consulting.no_results_title')}
              </h3>
              <p className="text-gray-600 text-center mb-8">
                {t('islamic_consulting.no_results_text')}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {['investment', 'crypto', 'banking', 'insurance', 'real-estate'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="px-4 py-2 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-full transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              {/* <button
                onClick={() => setShowQuestionForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <FaPlus className="text-sm" />
                {t('Ask Question')}
              </button> */}
            </div>
          ) : (
            results
              .filter(item => activeFilter === 'all' || item.ruling.toLowerCase() === activeFilter)
              .map(item => (
                <div
                  key={item.id}
                  className="bg-white
                   rounded-xl p-8 shadow-lg 
                   hover:shadow-xl cursor-pointer 
                   border border-gray-100 transition-all
                    duration-300 group
                    "
                  onClick={() => navigate(`/islamicconsulting/${item.id}`)}
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <RulingIndicator ruling={item.ruling} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                          <FaInfoCircle className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-gray-500">
                          <FaUserCircle className={`${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} text-gray-400 text-xl`} />
                          <span className="font-medium">{item.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Question Form Modal */}
        {showQuestionForm && (
          <div className="fixed inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20">
              <div className="p-8 border-b border-gray-100/50 bg-white/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {t('islamic_consulting.question_form.title')}
                  </h2>
                  <button
                    onClick={() => setShowQuestionForm(false)}
                    className="p-2 hover:bg-red-50 rounded-full transition-all duration-300 group"
                  >
                    <FaTimes className="text-red-400 group-hover:text-red-500 transform group-hover:rotate-90 transition-all duration-300" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleQuestionSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('islamic_consulting.question_form.question_title')}</label>
                  <input
                    type="text"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder={t('islamic_consulting.question_form.title_placeholder')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('islamic_consulting.question_form.description')}</label>
                  <textarea
                    value={questionDescription}
                    onChange={(e) => setQuestionDescription(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:outline-0 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 h-40 bg-white/50 backdrop-blur-sm resize-none"
                    placeholder={t('islamic_consulting.question_form.description_placeholder')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('islamic_consulting.question_form.email')}</label>
                  <input
                    type="email"
                    value={questionEmail}
                    onChange={(e) => setQuestionEmail(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder={t('islamic_consulting.question_form.email_placeholder')}
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowQuestionForm(false)}
                    className="px-8 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                  >
                    {t('islamic_consulting.question_form.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    {t('islamic_consulting.question_form.submit')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}