import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaUserCircle, FaBalanceScale, FaBookmark, FaShare, FaPrint, FaFacebook, FaTwitter, FaLinkedin, FaCalendarAlt } from 'react-icons/fa';
import { NavBarbg } from '../components/navBar';
import Markdown from 'react-markdown';
import { transactions } from '../data/en';

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
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IslamicConsulting() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [ruling, setRuling] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedRulings, setRelatedRulings] = useState([]);

  useEffect(() => {
    // Find the ruling that matches the ID
    const foundRuling = transactions.find(r => r.id === id);
    if (foundRuling) {
      setRuling(foundRuling);
      // Find related rulings with the same tags
      const related = transactions
        .filter(r => r.id !== parseInt(id) && r.tags.some(tag => foundRuling.tags.includes(tag)))
        .slice(0, 3);
      setRelatedRulings(related);
    }
    setLoading(false);
  }, [id]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      calendar: i18n.language === 'ar' ? 'islamic' : 'gregory'
    };
    return new Date(dateString).toLocaleDateString(i18n.language, options);
  };

  const RulingIndicator = ({ ruling }) => {
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

  if (loading) {
    return <ArticleLoadingPage />;
  }

  if (!ruling) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('ruling_not_found.title')}</h1>
          <p className="text-gray-600 mb-6">{t('ruling_not_found.message')}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('ruling.back_to_rulings')}
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
          {/* Breadcrumb */}
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="text-blue-600 flex items-center hover:underline"
            >
              <FaArrowLeft className={`${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {t('ruling.back_to_rulings')}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <main className="lg:w-2/3">
              <article className="bg-white rounded-xl 
              shadow-md overflow-hidden
              sticky top-24
              ">
                {/* Hero Section */}
                <div className={`relative backdrop-blur-md ${
                  ruling.ruling === 'Halal' ? 'bg-gradient-to-br from-emerald-900/80 via-green-800/80 to-emerald-900/80' :
                  ruling.ruling === 'Haram' ? 'bg-gradient-to-br from-red-900/80 via-rose-800/80 to-red-900/80' :
                  'bg-gradient-to-br from-amber-900/80 via-orange-800/80 to-amber-900/80'
                }`}>
                  {/* Islamic pattern overlay */}
                  <div className="absolute inset-0 opacity-10 backdrop-blur-lg" 
                       style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='white'/%3E%3C/svg%3E")`,
                         backgroundSize: '60px 60px'
                       }}>
                  </div>

                  <div className="relative
                   
                   backdrop-filter backdrop-blur-sm">
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent backdrop-blur-md"></div> */}
                    
                    <div className="relative px-4 py-8 md:px-8 md:py-16  backdrop-blur-sm items-center">
                      <div className="space-y-8">
                          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight backdrop-blur-none">
                            {ruling.title}
                          </h1>
                        
                        <div className="flex flex-wrap gap-3">
                          {ruling.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className={`px-4 py-1.5 rounded-full text-sm border transition-all shadow-lg backdrop-blur-md ${
                                ruling.ruling === 'Halal' ? 'bg-emerald-700/40 text-emerald-100 border-emerald-500/40 hover:bg-emerald-600/50 shadow-emerald-900/30' :
                                ruling.ruling === 'Haram' ? 'bg-red-700/40 text-red-100 border-red-500/40 hover:bg-red-600/50 shadow-red-900/30' :
                                'bg-amber-700/40 text-amber-100 border-amber-500/40 hover:bg-amber-600/50 shadow-amber-900/30'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right side - Enhanced ruling display */}
                      <div className="relative">
                        <div className={`absolute -inset-4 rounded-2xl opacity-30 blur-2xl backdrop-blur-xl ${
                          ruling.ruling === 'Halal' ? 'bg-gradient-to-r from-emerald-500/60 to-green-500/60' :
                          ruling.ruling === 'Haram' ? 'bg-gradient-to-r from-red-500/60 to-rose-500/60' :
                          'bg-gradient-to-r from-amber-500/60 to-orange-500/60'
                        }`}></div>
                      
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="prose prose-lg max-w-none">
                   <div className='flex justify-between'>
                   <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {t('ruling.description')}
                    </h2>
                    <div className="relative
                     backdrop-blur-sm bg-white/5
                      rounded-2xl border
                       border-white/10">
                          <div className="flex flex-col items-center gap-6">
                            <RulingIndicator ruling={ruling.ruling} />
                          </div>
                        </div>
                   </div>
                    
                    
                    <p className="text-gray-700 leading-relaxed ">
                      <Markdown >
                      {ruling.description}
                   </Markdown>
                      </p>
                   
                    {/* <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('ruling.tags')}</h2> */}
                    

                    {/* <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('ruling.related_topics')}</h2>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <div className="grid gap-3">
                        {ruling.related.map((topic, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer group"
                          >
                            <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-colors"></div>
                            <span className="font-medium">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Share and Actions */}
                <div className="px-8 py-6 bg-gray-50 flex flex-wrap justify-between items-center gap-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">{t('ruling.share')}:</span>
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
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <Link to={`/expert/${ruling.author}`}>
              <div className="p-6" >  
                                <h3 className="text-xl font-bold mb-4">{t('ruling.book_a_ticket')}</h3>
                  <div className="flex items-center">
                      <FaUserCircle className="w-12 h-12 text-gray-400" />
                    <div className="mx-4">
                      <h4 className="font-medium text-gray-900">{ruling.author}</h4>
                      <p className="text-gray-600 text-sm">{t('ruling.islamic_scholar')}</p>
                    </div>
                  </div>
                </div>
              </Link>
  
              </div>

              {/* Related Rulings */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">{t('ruling.related_rulings')}</h3>
                  <div className="space-y-4">
                    {relatedRulings.map((related) => (
                      <div 
                        key={related.id} 
                        className="group cursor-pointer hover:bg-gray-50 rounded-lg p-4 transition-all border border-gray-100 hover:border-blue-200"
                        onClick={() => navigate(`/islamicconsulting/${related.id}`)}
                      >
                        <div className="flex flex-col gap-2">
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{related.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FaCalendarAlt className="text-gray-400" />
                            <span>{formatDate(related.date)}</span>
                          </div>
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
    </div>
  );
}

