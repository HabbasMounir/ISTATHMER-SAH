import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaArrowLeft, FaBookmark, FaShare, FaArrowRight, FaPrint, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import {articles as arArticles} from '../data/ar.js'
import {articles as enArticles} from '../data/en.js'
import { NavBarbg } from '../components/navBar';
import Markdown from 'react-markdown';

function ArticlePage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articles,setArticles]=useState( i18n.language === 'ar'?arArticles:enArticles)
  useEffect(()=>{
    setArticles( i18n.language === 'ar'?arArticles:enArticles)

  },[i18n.language])
  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    // Find the article that matches the ID from the URL
    const foundArticle = articles.find(article => article.id == id);
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Find related articles from the same category, excluding current article
      const related = articles
        .filter(a => a.category === foundArticle.category && a.id !== id)
        .slice(0, 3);
      
      setRelatedArticles(related);
    }
    
    setTimeout(() => setLoading(false), 800); // Simulate network delay
    
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [id,articles]);
useEffect(()=>{console.log(article)},[])
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      calendar: i18n.language === 'ar' ? 'islamic' : 'gregory'
    };
    return new Date(dateString).toLocaleDateString(i18n.language, options);
  };

  // Find the category name
  const getCategoryName = (categoryId) => {
    const categories = [
      { id: 'all', name: 'categories.all' },
      { id: 'investing', name: 'categories.investing' },
      { id: 'islamic', name: 'categories.islamic' },
      { id: 'saving', name: 'categories.saving' },
      { id: 'retirement', name: 'categories.retirement' },
      { id: 'realestate', name: 'categories.realestate' },
      { id: 'stocks', name: 'categories.stocks' }
    ];
    
    const category = categories.find(cat => cat.id === categoryId);
    return category ? t(category.name) : '';
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <ArticleLoadingPage />;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('article_not_found.title')}</h1>
          <p className="text-gray-600 mb-6">{t('article_not_found.message')}</p>
          <button 
            onClick={goBack}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('article_text.back_to_articles')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <NavBarbg isLightBackground={true} />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb and Back button */}
          <div className="mb-8 flex items-center">
            <button 
              onClick={goBack}
              className={`text-blue-600 flex items-center hover:underline `}
            >
                            {i18n.language === 'ar' ? <FaArrowRight className="mx-2" /> : <FaArrowLeft className="mx-2" />}

              {t('article_text.back_to_articles')}
            </button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <main className="lg:w-2/3">
              <article className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Hero Image */}
                <div className="h-80 sm:h-96 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Article Header */}
                <div className="p-6 sm:p-8 border-b border-gray-100">
                  <div className="flex flex-wrap items-center mb-4 gap-3">
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                      {getCategoryName(article.category)}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaCalendarAlt className="mx-2" />
                      {formatDate(article.date)}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaClock className="mx-1" />
                      {article.readTime} {t("article_text.minRead")}
                    </span>
                    {article.featured && (
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        {t('article_text.featured')}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    {article.title}
                  </h1>
                  
                  <p className="text-xl text-gray-600">
                    {article.excerpt}
                  </p>
                </div>
                
                {/* Article Content */}
                <div className="px-6 sm:px-8 py-4">
                  
                  <div className="prose prose-lg max-w-none">
                  <Markdown >
                  {article.content}       
                   </Markdown>
                  

                    {/* This is placeholder content. In a real app, you would render the article's HTML content here */}
                    {/* <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                    </p>
                    <h2>Understanding the Markets</h2>
                    <p>
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <blockquote>
                      The best investment you can make is an investment in yourself... The more you learn, the more you'll earn.
                      <cite>— Warren Buffett</cite>
                    </blockquote>
                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <h2>Key Strategies for Success</h2>
                    <p>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <ul>
                      <li>Diversify your portfolio to manage risk</li>
                      <li>Invest consistently over time</li>
                      <li>Focus on long-term goals rather than short-term fluctuations</li>
                      <li>Regularly review and rebalance your investments</li>
                    </ul>
                    <h2>Looking Ahead</h2>
                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p> */}
                  </div>
                </div>
                
                {/* Article Tags */}
                <div className="px-6 sm:px-8 pb-6 border-t border-gray-100 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Share and Actions */}
                <div className="px-6 sm:px-8 py-6 bg-gray-50 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700 font-medium">{t('article_text.share')}:</span>
                    <div className="flex space-x-3">
                      <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                        <FaFacebook />
                      </button>
                      <button className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors">
                        <FaTwitter />
                      </button>
                      <button className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                        <FaLinkedin />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <FaBookmark />
                    </button>
                    <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <FaShare />
                    </button>
                    <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <FaPrint />
                    </button>
                  </div>
                </div>
              </article>
            </main>
            
            {/* Sidebar */}
            <aside className="lg:w-1/3">
              {/* Author Card */}
              <Link to={'/author'}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{t('article_text.about_author')}</h3>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src="https://randomuser.me/api/portraits/men/32.jpg" 
                        alt="Author" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className=' mx-4'>
                      <h4 className="font-medium text-gray-900">John Doe</h4>
                      <p className="text-gray-600 text-sm">{t('article_text.financial_analyst')}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4">
                    {t('article_text.author_bio')}
                  </p>
                </div>
              </div>
              </Link>
              
              {/* Related Articles */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{t('article_text.related_articles')}</h3>
                  <div className="space-y-6">
                    {relatedArticles.map((related) => (
                      <div key={related.id} className="group">
                        <div className="flex items-start">
                          <div className="w-20 h-20 rounded-lg overflow-hidden  flex-shrink-0">
                            <img 
                              src={related.image} 
                              alt={related.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className='mx-3'>
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {related.title}
                            </h4>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <FaCalendarAlt  />
                              <span className="mx-1"> {formatDate(related.date)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
               
                  <Link to={'/articles'} >
                   <div className="m-auto w-full mt-6 text-center py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                   {t('article_text.view_more_articles')}
                   </div>
                    
                  </Link>
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
                <div className="p-6">
                  <div className="text-center">
                    <span className="inline-block p-2 rounded-full bg-blue-100 text-blue-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <h3 className="text-xl font-bold mb-2">{t('newsletter.sidebar_title')}</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {t('newsletter.sidebar_subtitle')}
                    </p>
                    
                    <input
                      type="email"
                      placeholder={t('newsletter_text.email_placeholder')}
                      className="w-full px-4 py-2 rounded-lg mb-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all">
                      {t('newsletter_text.subscriberNow')}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleLoadingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Skeleton */}
          <div className="mb-8">
            <div className="h-6 bg-gray-200 rounded-full w-32 animate-pulse"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Skeleton */}
            <main className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Hero Image Skeleton */}
                <div className="h-80 sm:h-96 bg-gray-200 animate-pulse"></div>
                
                {/* Article Header Skeleton */}
                <div className="p-6 sm:p-8 border-b border-gray-100">
                  <div className="flex flex-wrap items-center mb-4 gap-3">
                    <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-32 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-32 animate-pulse"></div>
                  </div>
                  
                  <div className="h-10 bg-gray-200 rounded-full w-3/4 mb-4 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-full animate-pulse"></div>
                </div>
                
                {/* Article Content Skeleton */}
                <div className="p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-5/6 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </main>
            
            {/* Sidebar Skeleton */}
            <aside className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded-full w-1/2 mb-4 animate-pulse"></div>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 animate-pulse"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded-full w-32 mb-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-5/6 animate-pulse"></div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded-full w-1/2 mb-4 animate-pulse"></div>
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-20 h-20 rounded-lg bg-gray-200 mr-3 flex-shrink-0 animate-pulse"></div>
                        <div>
                          <div className="h-4 bg-gray-200 rounded-full w-full mb-2 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
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

export default ArticlePage;