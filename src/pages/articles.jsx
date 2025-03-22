import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaCalendarAlt, FaClock, FaChevronRight, FaBookmark, FaShare, FaChevronLeft } from 'react-icons/fa';
import {articles} from '@/data.js' 
import { NavBarbg } from '../components/navBar';
function ArticlesPage() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  
  // Categories for the filter
  const categories = [
    { id: 'all', name: 'categories.all' },
    { id: 'investing', name: 'categories.investing' },
    { id: 'saving', name: 'categories.saving' },
    { id: 'retirement', name: 'categories.retirement' },
    { id: 'realestate', name: 'categories.realestate' },
    { id: 'stocks', name: 'categories.stocks' }
  ];

 
  useEffect(() => {
    if (searchTerm.length > 1) {
      const keywords = ['market', 'volatility', 'retirement', 'planning', 'investment', 'real estate', 'stocks', 'saving', 'emergency fund', 'dividends'];
      const filtered = keywords.filter(word => word.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchSuggestions(filtered.slice(0, 5));
      setShowSearchDropdown(filtered.length > 0);
    } else {
      setShowSearchDropdown(false);
    }

    console.log(filteredArticles)
  }, [searchTerm]);

  // Filter articles based on search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured articles
  const featuredArticles = articles.filter(article => article.featured);

  // Format date for display
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(i18n.language, options);
//   };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      calendar: i18n.language === 'ar' ? 'islamic' : 'gregory'
    };
    return new Date(dateString).toLocaleDateString(i18n.language, options);
  };

  // Language switcher
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Adjust based on your needs
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
    const scrollContainer = document.getElementById('last');
    if (scrollContainer) {
      scrollContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
 
  // Get paginated articles
  // const paginatedArticles = filteredArticles.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const itemsPerPage = 12; // Adjust based on your needs
  // const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // 3. Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);
  return (

    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <NavBarbg isLightBackground={false} />

      <header className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="hidden sm:block absolute top-0 left-0 w-72 h-72 bg-blue-800 rounded-full mix-blend-screen opacity-20 animate-blob"></div>
          <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full mix-blend-screen opacity-20 animate-blob animation-delay-2000"></div>
          
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-800 rounded-full mix-blend-screen opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative pt-20 pb-32 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-center text-4xl md:text-6xl pt-8 font-bold  mb-6 text-white leading-tight">
             
                              <span  className="text-center py-2 m-auto block mt-2 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                              {t('header.title')}
                                       </span>
              </h1>
              <p className="text-center text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              {t('header.subtitle')}            
                </p>
              
              {/* Floating Search Bar */}
              <div className=" max-w-2xl mx-auto relative transform transition-all duration-300 ">
                <div className="bg-white relative bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden ring-1 ring-blue-300/30">
                  <div className="bg-white flex items-center px-6 py-5">
                    <FaSearch className={`text-blue-400 ${i18n.language!=='ar'?'mr-3':'ml-3'} text-xl`} />
                    <input
                      type="text"
                      placeholder={t('search.placeholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full  bg-transparent focus:outline-none placeholder-blue-300 text-blue-900 text-lg`}
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-blue-300  ml-4"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  
                  {/* Search Suggestions Dropdown */}
                  {showSearchDropdown && (
                    <div className="border-t border-blue-200/20 bg-white/5 backdrop-blur-lg py-3">
                      {searchSuggestions.map((suggestion, index) => (
                        <button 
                          key={index}
                          className="w-full text-left px-6 py-3 hover:bg-white/5 text-blue-100 flex items-center group"
                          onClick={() => {
                            setSearchTerm(suggestion);
                            setShowSearchDropdown(false);

                          }}
                        >
                          <FaSearch className={`text-blue-200  ${i18n.language!=='ar'?'mr-3':'ml-3'} group-hover:text-cyan-300 transition-colors`} />
                          <span className="group-hover:text-cyan-300 transition-colors">
                            {suggestion}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Geometric Wave Transition */}
        <div className="absolute -bottom-1 left-0 w-full">
          <svg viewBox="0 0 1440 120" className="w-full text-gray-50">
            <path fill="currentColor" fillOpacity="1" d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </header>

      {/* Category Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-3 rounded-full transition-all ${
                activeCategory === category.id 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-400 hover:shadow-sm'
              }`}
            >
              {t(category.name)}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && activeCategory === 'all' && !searchTerm && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">{t('featured.title')}</h2>
          <p className="text-gray-600 mb-8">
          {t('featured.subtitle')   }         </p>
          
          <div className="grid md:grid-cols-2 gap-8">
          {featuredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl group border border-gray-100">
                <div className="h-60 overflow-hidden relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                      {t('article_text.featured')}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3 flex-wrap">
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                      {t(categories.find(cat => cat.id === article.category)?.name)}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaCalendarAlt className="mx-2" />
                      {formatDate(article.date)}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaClock className="mx-1" />
                      {article.readTime} {t("article_text.minRead")}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg font-medium group-hover:shadow-md transition-all flex items-center">
                       {t('article_text.readArticle')}
                      
          {i18n.language!=='ar'?
                               <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
          :
          <FaChevronLeft className="mr-2 transition-transform group-hover:translate-x-[-3px]" />
          }
                    </button>
                    
                    <div className="flex space-x-3">
                      <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <FaBookmark />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <FaShare />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Articles Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 id='last'
        className="text-center text-3xl font-bold mb-2 text-gray-900">
          {searchTerm 
            ? ` ${t("search.results",{ term: searchTerm })} ` 
            : activeCategory !== 'all' 
              ? `${t("article_text.articles")} ${t(categories.find(cat => cat.id === activeCategory)?.name)}`
              : t("latest.title")
          }
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {searchTerm 
            ? `${t("search.count",{ count: filteredArticles.length })} ` 
            : t("latest.subtitle")
          }
        </p>
        
{filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            
            <div className="inline-block p-5 bg-gray-100 rounded-full mb-4">
              <FaSearch className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-2xl text-center font-medium text-gray-700 mb-4">{t('search.noResults')}</h3>
            <p className="text-center text-gray-500 mb-6">{t('search.tryAgain')}</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              
              {t('article_text.allArticlesView')}
            </button>
          </div>
        ) : (
          <div   className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {paginatedArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col h-full group border border-gray-100">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-3 flex-wrap">
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                      {t(categories.find(cat => cat.id === article.category)?.name)}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaClock className="mx-1" />
                      {article.readTime}{t("article_text.minRead")}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500 flex items-center">
                      <FaCalendarAlt className="mx-2" />
                      {formatDate(article.date)}
                    </span>
                    <button className="text-blue-600 font-medium flex items-center group">
                      {/* Read More */}
                      {/* <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" /> */}
                      {t('article_text.readArticle')}
                      
                      {i18n.language!=='ar'?
                                           <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      :
                      <FaChevronLeft className="mr-2 transition-transform group-hover:translate-x-[-3px]" />
                      }
                    
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
       

 {filteredArticles.length > 0 && (
  <div className="flex flex-wrap justify-center mt-12">
    <nav className="flex flex-wrap gap-2">
      <button
        className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-blue-50 transition-colors 
                   border border-gray-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <span className="sr-only">Previous</span>
        <FaChevronRight className={`transform ${i18n.language === 'ar' ? 'rotate-180' : 'rotate-180'}`} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isCurrent = page === currentPage;
        const showPage = page === 1 || page === totalPages || Math.abs(currentPage - page) <= 2;

        return showPage ? (
          <button
            key={page}
            className={`px-4 py-2 rounded-lg transition-all ${
              isCurrent 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => handlePageChange(page)}
            aria-current={isCurrent ? "page" : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${page}`} className="px-4 py-2 text-gray-400">
            ...
          </span>
        );
      })}

      <button
        className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-blue-50 transition-colors 
                   border border-gray-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span className="sr-only">Next</span>
        <FaChevronRight className={i18n.language === 'ar' ? 'transform rotate-180' : ''} />
      </button>
    </nav>
  </div>
)} 


      </div>

      {/* Newsletter Section */}
      <div className="relative mt-16 pt-16 pb-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-300 opacity-10 blur-3xl"></div>
          <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-indigo-400 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-10 left-1/4 w-96 h-96 rounded-full bg-purple-300 opacity-10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-blue-100">
              <div className="text-center">
                <span className="inline-block p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <h2 className="text-center text-3xl font-bold mb-4 text-gray-900">{t("newsletter.title")}</h2>
                <p className="text-center text-gray-600 mb-8">
                {t("newsletter.subtitle")}</p>
                
                <div className="flex flex-col md:flex-row max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder={t("newsletter_text.email_placeholder")}
                    className={`flex-grow px-4 py-3
                         
                         ${i18n.language!=='ar'?
                            'rounded-l-lg md:rounded-r-none rounded-r-lg'
                            :
                            'rounded-r-lg md:rounded-l-none rounded-l-lg'
                          }
                         mb-2 
                          md:mb-0 border
                           border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400
                            focus:border-transparent`}
                  />
                  <button className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 
                  
                  ${i18n.language!=='ar'?
                    'rounded-r-lg md:rounded-l-none rounded-l-lg'
                    :
                    'rounded-l-lg md:rounded-r-none rounded-r-lg'
                  }
                   font-medium hover:from-blue-700 hover:to-indigo-700 transition-all`}>
                    {t("newsletter_text.subscriberNow")}
                  </button>
                </div>
                
                <div className="text-center flex items-center justify-center mt-6 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t("newsletter_text.respectRrivacy")}
                  

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ArticlesPage;

ArticlesPage.loading=LoadingPage


function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Loading */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="hidden sm:block absolute top-0 left-0 w-72 h-72 bg-blue-800/30 rounded-full animate-pulse"></div>
          <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-blue-800/30 rounded-full animate-pulse"></div>
        </div>

        <div className="relative pt-20 pb-32 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              {/* Title Skeleton */}
              <div className="h-16 bg-blue-300/30 rounded-full w-3/4 mx-auto mb-6 animate-pulse"></div>
              
              {/* Subtitle Skeleton */}
              <div className="h-4 bg-blue-300/30 rounded-full w-2/3 mx-auto mb-8 animate-pulse"></div>

              {/* Search Bar Skeleton */}
              <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl h-16 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters Loading */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-full w-24 animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Featured Articles Loading */}
      <div className="container mx-auto px-4 py-12">
        <div className="h-6 bg-gray-200 rounded-full w-48 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-full w-64 mb-8 animate-pulse"></div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg animate-pulse">
              <div className="h-60 bg-gray-200 rounded-t-xl"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-full w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Articles Loading */}
      <div className="container mx-auto px-4 py-12">
        <div className="h-6 bg-gray-200 rounded-full w-56 mx-auto mb-8 animate-pulse"></div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-xl"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-full w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section Loading */}
      <div className="relative mt-16 pt-16 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 animate-pulse">
              <div className="h-8 bg-gray-200 rounded-full w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full w-64 mx-auto mb-8"></div>
              <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Animation */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}