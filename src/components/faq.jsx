// import { useState } from "react";
// function FAQSection() {
//     const [activeIndex, setActiveIndex] = useState(null);
//     const faqs = [
//       { 
//         question: "Getting started with investments", 
//         answer: "Begin with our guided setup process and personalized recommendations based on your goals.",
//         emoji: "🚀"
//       },
//       { 
//         question: "Platform security measures", 
//         answer: "Bank-level encryption, 2FA, and regular third-party audits ensure maximum security.",
//         emoji: "🔒"
//       },
//       { 
//         question: "Course updates & certifications", 
//         answer: "Weekly content updates with completion certificates accredited by financial institutions.",
//         emoji: "🎓"
//       },
//       { 
//         question: "Support availability", 
//         answer: "24/7 live chat support with average response time under 2 minutes.",
//         emoji: "💬"
//       }
//     ];
  
//     return (
//       <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center gap-4 mb-12">
//             <h2 className="text-4xl font-bold text-blue-900">
//               Common Questions
//             </h2>
//             <div className="flex-1 h-px bg-gradient-to-r from-blue-300 to-transparent"></div>
//           </div>
  
//           <div className="space-y-2">
//             {faqs.map((faq, index) => (
//               <div 
//                 key={index}
//                 className="group relative border-b border-blue-100 transition-all duration-300 hover:border-blue-200"
//               >
//                 <button
//                   onClick={() => setActiveIndex(activeIndex === index ? null : index)}
//                   className="w-full flex items-center gap-6 py-6 px-4"
//                 >
//                   <span className="text-3xl opacity-70 group-hover:opacity-100 transition-opacity">
//                     {faq.emoji}
//                   </span>
                  
//                   <div className="flex-1 text-left">
//                     <h3 className="text-xl font-semibold text-blue-900">
//                       {faq.question}
//                     </h3>
//                     <div 
//                       className={`grid transition-all duration-300 overflow-hidden ${
//                         activeIndex === index ? 'mt-4 opacity-100' : 'mt-0 opacity-0'
//                       }`}
//                     >
//                       <p className="text-blue-600 text-lg leading-relaxed">
//                         {faq.answer}
//                       </p>
//                     </div>
//                   </div>
  
//                   <div className={`transform transition-transform duration-300 ${
//                     activeIndex === index ? 'rotate-45' : 'group-hover:rotate-12'
//                   }`}>
//                     <svg 
//                       className="w-8 h-8 text-blue-500"
//                       fill="none" 
//                       viewBox="0 0 24 24" 
//                       stroke="currentColor"
//                     >
//                       <path 
//                         strokeLinecap="round" 
//                         strokeLinejoin="round" 
//                         strokeWidth={2} 
//                         d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
//                       />
//                     </svg>
//                   </div>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaQuoteLeft } from "react-icons/fa6";
function FAQSection() {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isRTL, setisRTL] = useState(i18n.dir() === 'rtl');
//   const isRTL = i18n.dir() === 'rtl';
useEffect(()=>{setisRTL(i18n.dir() === 'rtl')},[i18n.dir()])
//   const faqs = t('faq.items', { returnObjects: true });
  const faqs = [
          { 
            question: "Getting started with investments", 
            answer: "Begin with our guided setup process and personalized recommendations based on your goals.",
            emoji: "🚀"
          },
          { 
            question: "Platform security measures", 
            answer: "Bank-level encryption, 2FA, and regular third-party audits ensure maximum security.",
            emoji: "🔒"
          },
          { 
            question: "Course updates & certifications", 
            answer: "Weekly content updates with completion certificates accredited by financial institutions.",
            emoji: "🎓"
          },
          { 
            question: "Support availability", 
            answer: "24/7 live chat support with average response time under 2 minutes.",
            emoji: "💬"
          }
        ];
  return (
    <section 
      className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-6"
      dir={i18n.dir()}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`flex items-center gap-4 mb-12 `}>
          <h2 className="text-4xl font-bold text-blue-900">
            {t('faq.title')} 
          </h2>
          <div 
            className={`flex-1 h-px bg-gradient-to-r  ${
                i18n.dir()=='lrt' ? 'from-transparent to-blue-300' : 'from-blue-300 to-transparent'
            } `}
          ></div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {faqs?.map((faq, index) => (
            <div 
              key={index}
              className={`group relative border-b border-blue-100 transition-all duration-300 hover:border-blue-200 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className={`w-full flex items-center gap-6 py-6 px-4 ${
                    isRTL ? ' text-right' : 'text-left'
                }`}
              >
                {/* Emoji */}
                <span 
                  className={`text-3xl opacity-70 group-hover:opacity-100 transition-opacity `}
                >
                <FaQuoteLeft />

                </span>
                
                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-900">
                    {faq.question}
                  </h3>
                  <div 
                    className={`grid transition-all duration-300 overflow-hidden ${
                        activeIndex === index ? 'mt-4 opacity-100' : 'mt-0 opacity-0'
                      }`}
                  >
                    <p className={`text-blue-600 text-lg transition-all delay-100  leading-relaxed  ${activeIndex === index?'h-auto':'h-0'}`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>

                {/* Animated SVG Icon */}
                <div 
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-45' : 'group-hover:rotate-12'
                  } ${isRTL ? 'scale-x-[-1]' : ''}`}
                >
                  <svg 
                    className="w-8 h-8 text-blue-500"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={activeIndex === index ? "M6 18L18 6M6 6l12 12" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} 
                    />
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default FAQSection