import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaCalendarAlt, FaClock, FaTag, FaChevronRight, FaBookmark, FaShare } from 'react-icons/fa';

function ArticlesPages() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isNavToolsOpen, setIsNavToolsOpen] = useState(false);
  const [isNavLanguageOpen, setIsNavLanguageOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(true);

  // Categories for the filter
  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'investing', name: 'Investing' },
    { id: 'saving', name: 'Saving' },
    { id: 'retirement', name: 'Retirement' },
    { id: 'realestate', name: 'Real Estate' },
    { id: 'stocks', name: 'Stocks' }
  ];



  // Filter articles based on search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured articles
  const featuredArticles = articles.filter(article => article.featured);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(i18n.language, options);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-28 md:py-32">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Financial Wisdom & Insights
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto text-center mb-10">
            Explore our collection of articles to help you make smarter financial decisions
          </p>
          
          {/* Search Bar */}
          <div className=" max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 bg-white py-4 pr-12 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
              />
              <FaSearch className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Filters */}
      <div className="container mx-auto px-4 py-6 -mt-6">
        <div className="bg-white rounded-xl shadow-md p-2 flex flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-3 rounded-lg m-1 transition-all ${
                activeCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Featured Articles */}
      {featuredArticles.length > 0 && activeCategory === 'all' && !searchTerm && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl group">
                <div className="h-60 overflow-hidden relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      {formatDate(article.date)}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaClock className="mr-1" />
                      {article.readTime} min read
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <button className="text-blue-600 font-medium flex items-center group">
                      Read Article
                      <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
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
      
      {/* All Articles */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          {searchTerm 
            ? `Search Results for "${searchTerm}"` 
            : activeCategory !== 'all' 
              ? `${categories.find(cat => cat.id === activeCategory)?.name} Articles`
              : 'Latest Articles'
          }
        </h2>
        
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-gray-500 mb-4">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-3 flex-wrap">
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaClock className="mr-1" />
                      {article.readTime} min read
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {formatDate(article.date)}
                      </span>
                      <button className="text-blue-600 font-medium flex items-center group">
                        Read More
                        <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-lg bg-white text-gray-700 shadow hover:bg-gray-100 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-4 py-2 rounded-lg bg-white text-gray-700 shadow hover:bg-gray-100 transition-colors">
                2
              </button>
              <button className="px-4 py-2 rounded-lg bg-white text-gray-700 shadow hover:bg-gray-100 transition-colors">
                3
              </button>
              <button className="px-4 py-2 rounded-lg bg-white text-gray-700 shadow hover:bg-gray-100 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Stay Updated with Financial Insights</h2>
            <p className="text-gray-600 mb-8">Join our newsletter to receive the latest articles, tips, and expert advice directly to your inbox</p>
            <div className="flex flex-col md:flex-row max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 bg-white py-3 rounded-l-lg md:rounded-r-none rounded-r-lg mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg md:rounded-l-none rounded-l-lg font-medium hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlesPages;