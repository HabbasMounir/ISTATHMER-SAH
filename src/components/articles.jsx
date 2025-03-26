import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaClock } from "react-icons/fa";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// function ArticleSection() {
//     return (
//       <section className="relative py-20 bg-gradient-to-b from-indigo-50 to-white">
//         {/* Decorative Element */}
//         <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-indigo-600/10 to-transparent" />
  
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h3 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-4">
//               Knowledge is Your Best Portfolio
//             </h3>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Dive into our curated financial wisdom - where complex markets become playgrounds
//             </p>
//           </div>
  
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
//             {/* Article Card 1 */}
//             <article className="group relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
//               <div className="flex items-center mb-4">
//                 <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
//                   <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//                   </svg>
//                 </div>
//                 <span className="text-sm font-semibold text-indigo-600">Investment Strategies</span>
//               </div>
//               <h4 className="text-xl font-bold mb-3">The Art of Compound Growth</h4>
//               <p className="text-gray-600 mb-4">
//                 Discover how patience transforms small investments into generational wealth through 
//                 the eighth wonder of the world...
//               </p>
//               <a href="#" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800">
//                 Read More
//                 <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </a>
//             </article>
  
//             {/* Article Card 2 */}
//             <article className="group relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
//               <div className="flex items-center mb-4">
//                 <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
//                   <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                   </svg>
//                 </div>
//                 <span className="text-sm font-semibold text-indigo-600">Market Trends</span>
//               </div>
//               <h4 className="text-xl font-bold mb-3">Decoding Cryptic Markets</h4>
//               <p className="text-gray-600 mb-4">
//                 Learn to read between the lines of market fluctuations and identify true signals in 
//                 the noise of financial data...
//               </p>
//               <a href="#" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800">
//                 Read More
//                 <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </a>
//             </article>
  
//             {/* Article Card 3 */}
//             <article className="group relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
//               <div className="flex items-center mb-4">
//                 <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
//                   <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <span className="text-sm font-semibold text-indigo-600">Fintech Innovations</span>
//               </div>
//               <h4 className="text-xl font-bold mb-3">AI-Powered Wealth Management</h4>
//               <p className="text-gray-600 mb-4">
//                 Explore how machine learning algorithms are revolutionizing personal finance 
//                 strategies and risk assessment...
//               </p>
//               <a href="#" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800">
//                 Read More
//                 <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </a>
//             </article>
//           </div>
  
//           {/* CTA */}
//           <div className="mt-16 text-center">
//             <Button 
//               className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
//             >
//               Explore All Articles
//             </Button>
//           </div>
//         </div>
  
//         {/* Animated Dots Pattern */}
//         <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10">
//           <svg viewBox="0 0 100 100" className="w-full h-full">
//             {[...Array(50)].map((_, i) => (
//               <circle
//                 key={i}
//                 cx={Math.random() * 100}
//                 cy={Math.random() * 100}
//                 r="0.8"
//                 fill="currentColor"
//                 className="animate-pulse"
//                 style={{ animationDelay: `${i * 0.1}s` }}
//               />
//             ))}
//           </svg>
//         </div>
//       </section>
//     );
//   }


  export default BlogSection

//   function BlogSection() {
//     const articles = [
//       {
//         id: 1,
//         title: "The Future of Digital Investments",
//         excerpt: "Exploring how blockchain technology is transforming traditional investment strategies...",
//         category: "Tech Trends",
//         date: "March 15, 2024",
//         readTime: "5 min read",
//         image: "https://picsum.photos/600/400?1"
//       },
//       {
//         id: 1,
//         title: "The Future of Digital Investments",
//         excerpt: "Exploring how blockchain technology is transforming traditional investment strategies...",
//         category: "Tech Trends",
//         date: "March 15, 2024",
//         readTime: "5 min read",
//         image: "https://picsum.photos/600/400?1"
//       },
//       {
//         id: 1,
//         title: "The Future of Digital Investments",
//         excerpt: "Exploring how blockchain technology is transforming traditional investment strategies...",
//         category: "Tech Trends",
//         date: "March 15, 2024",
//         readTime: "5 min read",
//         image: "https://picsum.photos/600/400?1"
//       },
//       {
//         id: 2,
//         title: "Sustainable Wealth Management",
//         excerpt: "Balancing profitability with environmental responsibility in modern portfolios...",
//         category: "Finance",
//         date: "March 14, 2024",
//         readTime: "4 min read",
//         image: "https://picsum.photos/600/400?2"
//       },
//       // Add 4 more articles
//     ];
  
//     return (
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {articles.map(article => (
//               <article key={article.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
//                 <a href="#" className="block overflow-hidden rounded-t-lg">
//                   <img 
//                     src={article.image}
//                     alt=""
//                     className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
//                   />
//                 </a>
                
//                 <div className="p-6">
//                   <div className="flex items-center text-sm text-gray-500 mb-3">
//                     <span className="text-blue-600 font-medium">{article.category}</span>
//                     <span className="mx-2">•</span>
//                     <span>{article.date}</span>
//                   </div>
                  
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     <a href="#" className="hover:text-blue-600">{article.title}</a>
//                   </h3>
                  
//                   <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  
//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <span>{article.readTime}</span>
//                     <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
//                       Read more →
//                     </a>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
  
//           <div className="mt-12 text-center">
//             <a 
//               href="/blog"
//               className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
//             >
//               View All Articles
//             </a>
//           </div>
//         </div>
//       </section>
//     );
//   }


// function BlogSection() {
//     const articles = [
//       {
//         id: 1,
//         title: "Modern Portfolio Strategies",
//         excerpt: "Exploring innovative approaches to asset allocation in volatile markets...",
//         category: "Investing",
//         date: "Mar 15, 2024",
//         readTime: "5 min read",
//         image: "https://picsum.photos/600/400?1"
//       },
//       {
//         id: 1,
//         title: "Modern Portfolio Strategies",
//         excerpt: "Exploring innovative approaches to asset allocation in volatile markets...",
//         category: "Investing",
//         date: "Mar 15, 2024",
//         readTime: "5 min read",
//         image: "https://picsum.photos/600/400?1"
//       },
//       {
//         id: 1,
//         title: "Modern Portfolio Strategies",
//         excerpt: "Exploring innovative approaches to asset allocation in volatile markets...",
//         category: "Investing",
//         date: "Mar 15, 2024",
//         readTime: "5 min read",
//         image: "https://picsum.photos/600/400?1"
//       },
//       {
//         id: 1,
//         title: "Modern Portfolio Strategies",
//         excerpt: "Exploring innovative approaches to asset allocation in volatile markets...",
//         category: "Investing",
//         date: "Mar 15, 2024",
//         readTime: "5 min read",
//         image: "https://picsum.photos/600/400?1"
//       },
//       // Add 5 more articles...
//     ];
  
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
//             Latest Insights
//           </h2>
  
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {articles.map(article => (
//               <article key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
//                 <div className="overflow-hidden rounded-t-lg">
//                   <img 
//                     src={article.image}
//                     alt=""
//                     className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
//                   />
//                 </div>
                
//                 <div className="p-6 flex-1 flex flex-col">
//                   <div className="flex-1">
//                     <div className="flex items-center text-sm text-gray-500 mb-3">
//                       <span className="text-blue-600 font-medium">{article.category}</span>
//                       <span className="mx-2">•</span>
//                       <span>{article.date}</span>
//                     </div>
                    
//                     <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                       {article.title}
//                     </h3>
                    
//                     <p className="text-gray-600 line-clamp-2 mb-4">
//                       {article.excerpt}
//                     </p>
//                   </div>
  
//                   {/* Symmetrical Footer */}
//                   <div className="border-t pt-4 mt-auto">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-500">{article.readTime}</span>
//                       <a 
//                         href="#" 
//                         className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
//                       >
//                         Read more
//                         <span className="ml-2">→</span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
  
//           <div className="mt-12 text-center">
//             <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
//               View All Articles
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }


// function BlogSection() {
//     const articles = [
//       {
//         id: 1,
//         title: "Modern Portfolio Strategies",
//         excerpt: "Exploring innovative approaches to asset allocation in volatile markets...",
//         category: "Investing",
//         date: "Mar 15, 2024",
//         readTime: "5 min read",
//         image: "https://picsum.photos/600/400?1"
//       },
//       // Add 5 more articles...
//     ];
  
//     return (
//       <section className="py-16 bg-blue-50">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
//             Financial Insights
//           </h2>
  
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {articles.map(article => (
//               <article 
//                 key={article.id} 
//                 className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col border border-blue-200/50"
//               >
//                 <div className="overflow-hidden rounded-t-xl">
//                   <img 
//                     src={article.image}
//                     alt=""
//                     className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
//                 </div>
                
//                 <div className="p-6 flex-1 flex flex-col">
//                   <div className="flex-1">
//                     <div className="flex items-center text-sm text-blue-500 mb-3">
//                       <span className="px-3 py-1 bg-blue-200/20 text-blue-600 rounded-full">
//                         {article.category}
//                       </span>
//                       <span className="mx-3">•</span>
//                       <span>{article.date}</span>
//                     </div>
                    
//                     <h3 className="text-xl font-semibold text-blue-900 mb-3">
//                       {article.title}
//                     </h3>
                    
//                     <p className="text-blue-700/90 line-clamp-2 mb-4">
//                       {article.excerpt}
//                     </p>
//                   </div>
  
//                   {/* Symmetrical Footer */}
//                   <div className="border-t border-blue-200/50 pt-4 mt-auto">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-blue-500">{article.readTime}</span>
//                       <a 
//                         href="#" 
//                         className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors"
//                       >
//                         Read Article
//                         <span className="ml-2 text-lg opacity-80">→</span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
  
//           <div className="mt-12 text-center">
//             <button className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl focus:ring-2 ring-blue-300">
//               Explore All Insights
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

import {articles as arArticles} from '@/data/ar.js'
import {articles as enArticles} from '@/data/en.js'
function BlogSection() {
    const { t, i18n } = useTranslation();
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(i18n.language, options);
  };
    const [articles,setArticles]=useState( i18n.language === 'ar'?arArticles:enArticles)
    useEffect(()=>{
      setArticles( i18n.language === 'ar'?arArticles:enArticles)
  
    },[i18n.language])
    const categories = [
      { id: 'all', name: 'categories.all' },
      { id: 'investing', name: 'categories.investing' },
      { id: 'saving', name: 'categories.saving' },
      { id: 'retirement', name: 'categories.retirement' },
      { id: 'realestate', name: 'categories.realestate' },
      { id: 'stocks', name: 'categories.stocks' }
    ];
    return (
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-slate-800 mb-12 text-center">
            {t("latest.title")}
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
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
                            <Link to={`/articles/${article.id}`} className="text-blue-600 font-medium flex items-center group">
                              {/* Read More */}
                              {/* <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" /> */}
                              {/* <span>
                              {t('article_text.readArticle')}
                              </span> */}
                              
                              
                              {i18n.language!=='ar'?
                              <>
                              {t('article_text.readArticle')}
                              <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                              </> 
                              

                               :
                               <>
                               <FaChevronLeft className="mr-2 transition-transform group-hover:translate-x-[-3px]" />
                               {t('article_text.readArticle')}

                               </>
                              
                              }
                            
                            </Link>
                          </div>
                        </div>
                      </div>
            ))}
          </div>
  
          {/* CTA */}
          <div className="mt-12 text-center">
            <Link to={'/articles'} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              {t("article_text.view_more_articles")}
            </Link>
          </div>
        </div>
      </section>
    );
  }


//   <article 
//   key={article.id} 
//   className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col"
// >
//   {/* Image */}
//   <div className="relative h-48 overflow-hidden rounded-t-lg">
//     <img
//       src={article.image}
//       alt=""
//       className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//     />
//   </div>

//   {/* Content */}
//   <div className="p-6 flex-1 flex flex-col">
//     {/* Category & Date */}
//     <div className="flex items-center text-sm text-blue-600 mb-3">
//       <span className="font-medium">{article.category}</span>
//       <span className="mx-2">•</span>
//       <span className="text-slate-500">{article.date}</span>
//     </div>

//     {/* Title */}
//     <h3 className="text-xl font-semibold text-slate-800 mb-2">
//       {article.title}
//     </h3>

//     {/* Excerpt */}
//     <p className="text-slate-600 line-clamp-2 mb-4">
//       {article.excerpt}
//     </p>

//     {/* Footer - Always at Bottom */}
//     <div className="mt-auto pt-4 border-t border-slate-100">
//       <div className="flex items-center justify-between text-sm">
//         <span className="text-slate-500">{article.readTime}</span>
//         <a 
//           href="#" 
//           className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
//         >
//           Read morekkkkkkkkk
//           <span className="ml-2">→</span>
//         </a>
//       </div>
//       <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
//                           <span className="text-sm text-gray-500 flex items-center">
//                             <FaCalendarAlt className="mx-2" />
//                             {formatDate(article.date)}
//                           </span>
//                           <Link to={`/articles/${article.id}`} className="text-blue-600 font-medium flex items-center group">
//                             {/* Read More */}
//                             {/* <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" /> */}
//                             {t('article_text.readArticle')}
                            
//                             {i18n.language!=='ar'?
//                                                  <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
//                             :
//                             <FaChevronLeft className="mr-2 transition-transform group-hover:translate-x-[-3px]" />
//                             }
                          
//                           </Link>
//                         </div>
//     </div>
//   </div>
// </article>