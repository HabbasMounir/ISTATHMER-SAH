import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaUserCircle, FaBalanceScale, FaTimes, FaFilter, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { NavBarbg } from '../components/navBar';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const transactions = [
  {
    id: 1,
    title: "Cloud-based Bitcoin Mining Contracts",
    ruling: "Mokhtalaf",
    description: "Scholars debate the permissibility due to energy waste concerns and speculative nature. Some allow if using renewable energy.",
    author: "International Islamic Fiqh Academy",
    related: ["NFT Trading", "Crypto Staking", "Blockchain Zakat"],
    tags: ["crypto", "technology", "energy"],
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "Islamic Home Financing (Musharakah Mutanaqisah)",
    ruling: "Halal",
    description: "Co-ownership model where bank and customer gradually transfer ownership, approved by majority of scholars.",
    author: "Bank Negara Malaysia Sharia Council",
    related: ["Diminishing Partnership", "Mortgage Alternatives"],
    tags: ["housing", "banking", "fiqh"],
    date: "2024-02-28"
  },
  {
    id: 3,
    title: "Forex Trading with Leverage",
    ruling: "Haram",
    description: "Prohibited due to excessive uncertainty (gharar) and interest-based margin trading.",
    author: "Al-Azhar Fatwa Committee",
    related: ["Day Trading", "CFD Contracts"],
    tags: ["forex", "trading", "riba"],
    date: "2024-01-10"
  },
  {
    id: 4,
    title: "Crowdfunding for Small Businesses",
    ruling: "Halal",
    description: "Permissible when structured as profit-sharing (Mudarabah) without interest.",
    author: "Accounting and Auditing Organization for Islamic Financial Institutions",
    related: ["Peer-to-Peer Lending", "Startup Investments"],
    tags: ["fintech", "investment", "crowdfunding"],
    date: "2023-12-05"
  },
  {
    id: 5,
    title: "Gold-Backed Cryptocurrencies",
    ruling: "Mokhtalaf",
    description: "Disputed - Some scholars accept if fully backed, others reject due to volatility.",
    author: "Dubai Islamic Economy Development Centre",
    related: ["Stablecoins", "Digital Gold"],
    tags: ["crypto", "precious-metals", "currency"],
    date: "2024-03-01"
  },
  {
    id: 6,
    title: "Takaful (Islamic Insurance)",
    ruling: "Halal",
    description: "Permitted cooperative risk-sharing model without interest or uncertainty.",
    author: "Islamic Financial Services Board",
    related: ["Health Insurance", "Car Insurance Alternatives"],
    tags: ["insurance", "cooperative"],
    date: "2023-11-20"
  },
  {
    id: 7,
    title: "Short Selling Stocks",
    ruling: "Haram",
    description: "Prohibited due to selling what one doesn't own (bay' al-ma'dum).",
    author: "OIC Fiqh Academy",
    related: ["Margin Trading", "Derivatives"],
    tags: ["stocks", "trading", "fiqh"],
    date: "2024-02-15"
  },
  {
    id: 8,
    title: "Islamic Bonds (Sukuk)",
    ruling: "Halal",
    description: "Asset-backed securities compliant with profit-sharing principles.",
    author: "Islamic Development Bank",
    related: ["Fixed Income Alternatives", "Sovereign Sukuk"],
    tags: ["bonds", "investment", "fiqh"],
    date: "2023-10-01"
  },
  {
    id: 9,
    title: "Peer-to-Peer Car Rental Platforms",
    ruling: "Mokhtalaf",
    description: "Debated due to liability concerns - Permitted with proper insurance.",
    author: "Indonesian Ulema Council",
    related: ["Car Sharing", "Asset Rental"],
    tags: ["transportation", "sharing-economy"],
    date: "2024-03-10"
  },
  {
    id: 10,
    title: "Cryptocurrency Staking Rewards",
    ruling: "Haram",
    description: "Considered interest (riba) by majority of scholars due to fixed returns.",
    author: "Saudi Arabian Monetary Authority",
    related: ["Crypto Lending", "DeFi Protocols"],
    tags: ["crypto", "staking", "riba"],
    date: "2023-09-15"
  },
  {
    id: 11,
    title: "Islamic Will Writing Services",
    ruling: "Halal",
    description: "Encouraged for proper wealth distribution according to Faraid laws.",
    author: "Muslim Lawyers Association",
    related: ["Inheritance Laws", "Estate Planning"],
    tags: ["legal", "inheritance"],
    date: "2024-01-25"
  },
  {
    id: 12,
    title: "Halal Stock Screening Services",
    ruling: "Halal",
    description: "Approved method for identifying Sharia-compliant public companies.",
    author: "Dow Jones Islamic Market",
    related: ["ESG Investing", "Ethical Screening"],
    tags: ["stocks", "screening", "investment"],
    date: "2023-12-12"
  },
  {
    id: 13,
    title: "Buy Now Pay Later (BNPL) Services",
    ruling: "Mokhtalaf",
    description: "Controversial - Some consider permissible if no late fees, others prohibit.",
    author: "European Council for Fatwa and Research",
    related: ["Consumer Credit", "Installment Plans"],
    tags: ["fintech", "credit", "ecommerce"],
    date: "2024-02-20"
  },
  {
    id: 14,
    title: "Islamic REITs (Real Estate Investment Trusts)",
    ruling: "Halal",
    description: "Permitted when following guidelines on permissible assets and income sources.",
    author: "Securities Commission Malaysia",
    related: ["Property Funds", "Rental Income"],
    tags: ["real-estate", "investment", "reits"],
    date: "2023-11-01"
  },
  {
    id: 15,
    title: "Crypto Mining Using Excess Solar Energy",
    ruling: "Mokhtalaf",
    description: "Emerging debate - Some scholars allow if using renewable surplus energy.",
    author: "International Renewable Energy Agency",
    related: ["Green Mining", "Sustainable Crypto"],
    tags: ["crypto", "energy", "environment"],
    date: "2024-03-05"
  },
  {
    id: 16,
    title: "Islamic Microfinance Programs",
    ruling: "Halal",
    description: "Encouraged model using Qard Hasan (benevolent loans) and profit-sharing.",
    author: "Grameen-Jameel Initiative",
    related: ["Small Business Loans", "Community Finance"],
    tags: ["banking", "microfinance", "charity"],
    date: "2023-10-15"
  },
  {
    id: 17,
    title: "Fractional Real Estate Ownership",
    ruling: "Mokhtalaf",
    description: "Debated - Permissible with clear ownership rights and management structure.",
    author: "Emirates Islamic Bank",
    related: ["Property Crowdfunding", "Real Estate Shares"],
    tags: ["real-estate", "investment", "crowdfunding"],
    date: "2024-01-05"
  },
  {
    id: 18,
    title: "Halal Robo-Advisors",
    ruling: "Halal",
    description: "Approved automated investment platforms using Sharia-compliant algorithms.",
    author: "Wahed Invest",
    related: ["Automated Portfolios", "AI-based Investing"],
    tags: ["technology", "investment", "fintech"],
    date: "2023-12-25"
  },
  {
    id: 19,
    title: "Islamic Gold Leasing",
    ruling: "Haram",
    description: "Prohibited due to riba al-fadl in gold-for-gold transactions.",
    author: "World Gold Council",
    related: ["Commodity Murabaha", "Gold Savings"],
    tags: ["gold", "leasing", "riba"],
    date: "2024-02-10"
  },
  {
    id: 20,
    title: "Digital Islamic Wallets",
    ruling: "Halal",
    description: "Permitted financial technology for Zakat calculation and halal transactions.",
    author: "Qatar Financial Centre",
    related: ["Digital Banking", "Zakat Calculators"],
    tags: ["fintech", "banking", "apps"],
    date: "2024-03-01"
  }
];

const RulingIndicator = ({ ruling }) => {
  const { t, i18n } = useTranslation();

  const colors = {
    Halal: 'bg-green-100 text-green-800 border-green-200 ring-green-400',
    Haram: 'bg-red-100 text-red-800 border-red-200 ring-red-400',
    Mokhtalaf: 'bg-amber-100 text-amber-800 border-amber-200 ring-amber-400'
  };

  return (
    <div 
      className={`${colors[ruling]} px-4 py-1.5 rounded-full border ring-1 ring-opacity-50 flex items-center text-sm font-medium shadow-sm`}
    >
      <FaBalanceScale className={`${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} text-current`} />
      {ruling}
    </div>
  );
};



export default function FatwaSearch() {
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
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">{t('Sharia Financial Rulings')}</h1>
          <p className="text-lg text-gray-600 text-center mb-8">{t('Explore Islamic perspectives on modern financial transactions')}</p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-4xl flex gap-2 mx-auto">
            <button
              onClick={() => setShowQuestionForm(true)}
              className="w-1/5 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <FaPlus className="text-sm" />
              <span className='w-full'>{t('Ask Question')}</span>
            </button>
            <div
            onClick={() => inputRef.current.focus()}
             className="bg-white w-4/5 rounded-2xl shadow-lg p-2 border border-gray-100 hover:border-blue-400 transition-all duration-300 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <FaSearch className={`mx-4 text-blue-500 text-xl`} />
                <input
                  type="text"
                  placeholder={t('Describe your financial transaction...')}
                  className="flex-1 p-4 focus:outline-none text-lg"
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('No results found')}
              </h3>
              <p className="text-gray-600 mb-8">
                {/* {t('It seems we couldn\'t find what you\'re looking for.')}
             <br/> */}

                {t(' Feel free to ask a question and we\'ll respond as soon as possible.')}

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
                  onClick={() => navigate(`/shuramalia/${item.id}`)}
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
                    {t('Ask a Sharia Question')}
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('Question Title')}</label>
                  <input
                    type="text"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder={t('Enter a brief title for your question')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('Question Description')}</label>
                  <textarea
                    value={questionDescription}
                    onChange={(e) => setQuestionDescription(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:outline-0 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 h-40 bg-white/50 backdrop-blur-sm resize-none"
                    placeholder={t('Provide detailed information about your question')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('Your Email')}</label>
                  <input
                    type="email"
                    value={questionEmail}
                    onChange={(e) => setQuestionEmail(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder={t('Enter your email address')}
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowQuestionForm(false)}
                    className="px-8 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                  >
                    {t('Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    {t('Submit Question')}
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