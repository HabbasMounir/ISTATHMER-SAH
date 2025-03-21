import { FaBook, FaChartLine, FaTools ,FaArrowRight} from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function FeaturesSectionLight() {
  const features = [
    {
      icon: <FaBook className="text-blue-600 text-5xl mx-auto mb-4" />,
      title: "Financial Education",
      description: "Access articles and courses on investment and money management."
    },
    {
      icon: <FaTools className="text-blue-600 text-5xl mx-auto mb-4" />,
      title: "Interactive Tools",
      description: "Use investment calculators, portfolio trackers, and risk assessment tools."
    },
    {
      icon: <FaChartLine className="text-blue-600 text-5xl mx-auto mb-4" />,
      title: "Market Insights",
      description: "Stay updated on financial trends and investment opportunities."
    }
  ];

  return (
    <section className="py-16 px-8 grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card key={index} className="shadow-lg hover:shadow-xl transition duration-300">
          <CardContent className="text-center p-6">
            {feature.icon}
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}




// const FeaturesSectioncreative = () => {
//   const features = [
//     {
//       icon: <FaBook />,
//       title: "Financial Education",
//       description: "Access articles and courses on investment and money management."
//     },
//     {
//       icon: <FaTools />,
//       title: "Interactive Tools",
//       description: "Use investment calculators, portfolio trackers, and risk assessment tools."
//     },
//     {
//       icon: <FaChartLine />,
//       title: "Market Insights",
//       description: "Stay updated on financial trends and investment opportunities."
//     }
//   ];

//   return (
//     <section className="py-24 px-6 relative overflow-hidden bg-gray-50">
//       {/* Background decoration */}
//       <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-50"></div>
//       <div className="absolute top-40 -left-20 w-40 h-40 bg-green-100 rounded-full opacity-50"></div>
//       <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-100 rounded-full opacity-50"></div>
      
//       <div className="max-w-6xl mx-auto">
//         <motion.h2 
//           className="text-4xl font-bold text-center mb-16 relative z-10"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
//             Powerful Features for Smart Investing
//           </span>
//         </motion.h2>
        
//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <FeatureCardCreative key={index} feature={feature} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

  
  const FeaturesSectionCreative = () => {
    const { t } = useTranslation();
    
    
    const features = [
      {
        icon: <FaBook className="text-2xl" />,
        title: t('features.education.title'),
        description: t('features.education.description')
      },
      {
        icon: <FaTools className="text-2xl" />,
        title: t('features.tools.title'),
        description: t('features.tools.description')
      },
      {
        icon: <FaChartLine className="text-2xl" />,
        title: t('features.insights.title'),
        description: t('features.insights.description')
      }
    ];
  
    return (
      <section className="py-24 px-6 relative overflow-hidden bg-gray-50">
        {/* Animated background decorations */}
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-50"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 -left-20 w-40 h-40 bg-green-100 rounded-full opacity-50"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-32 h-32 bg-amber-100 rounded-full opacity-50"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: 0.2
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
              {t('features.title')}
            </span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCardCreative 
                key={index} 
                feature={feature} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>
    );
  };











function FeaturesSectionModern() {
  const features = [
    {
      icon: <FaBook className="text-white text-5xl" />,
      title: "Financial Education",
      description:
        "Access insightful articles and engaging courses on investment and money management.",
    },
    {
      icon: <FaTools className="text-white text-5xl" />,
      title: "Interactive Tools",
      description:
        "Explore innovative investment calculators, portfolio trackers, and risk assessment tools.",
    },
    {
      icon: <FaChartLine className="text-white text-5xl" />,
      title: "Market Insights",
      description:
        "Stay informed with real-time updates, curated trends, and expert market analysis.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-8 shadow hover:shadow-lg transition duration-300 flex flex-col"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 flex-grow">{feature.description}</p>
            <button className="mt-6 inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-300">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}




const FeaturesSection = () => {
  const features = [
    {
      icon: <FaBook />,
      title: "Financial Education",
      description: "Access our comprehensive library of articles, videos, and courses designed to enhance your investment knowledge and financial literacy."
    },
    {
      icon: <FaTools />,
      title: "Interactive Tools",
      description: "Utilize our suite of professional investment calculators, portfolio analyzers, and risk assessment tools to make data-driven decisions."
    },
    {
      icon: <FaChartLine />,
      title: "Market Insights",
      description: "Stay informed with our curated market analysis, trend reports, and personalized investment opportunities tailored to your goals."
    }
  ];
  
  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-100 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-8 border-blue-100"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full border-12 border-blue-100"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section header with clean typography */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-600 font-medium text-sm uppercase tracking-wider">Empowering Your Financial Journey</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">
              Powerful Features for Smart Investors
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-6 mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines sophisticated tools with expert insights to help you make informed investment decisions and achieve your financial goals.
            </p>
          </motion.div>
        </div>
        
        {/* Feature cards with staggered animation */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200">
            Explore All Features
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

export {FeaturesSection,FeaturesSectionLight,FeaturesSectionCreative,FeaturesSectionModern}













const FeatureCard = ({ feature, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Professional color schemes
    const themes = [
      { 
        main: 'bg-blue-50', 
        accent: 'bg-blue-600', 
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        border: 'border-blue-200'
      },
      { 
        main: 'bg-indigo-50', 
        accent: 'bg-indigo-600', 
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
        border: 'border-indigo-200'
      },
      { 
        main: 'bg-sky-50', 
        accent: 'bg-sky-600', 
        iconBg: 'bg-sky-100',
        iconColor: 'text-sky-600',
        border: 'border-sky-200'
      }
    ];
    
    const theme = themes[index % themes.length];
    
    return (
      <motion.div
        className={`relative rounded-xl overflow-hidden border ${theme.border} shadow-lg ${theme.main} h-full`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          y: -8,
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -5px rgba(59, 130, 246, 0.05)"
        }}
      >
        {/* Card header with accent color */}
        <div className={`h-2 ${theme.accent} w-full`}></div>
        
        <div className="p-8">
          {/* Feature number indicator */}
          <div className="absolute top-4 right-4 text-xs font-bold text-gray-400">
            {(index + 1).toString().padStart(2, '0')}
          </div>
          
          {/* Icon with animated background */}
          <motion.div 
            className={`${theme.iconBg} w-16 h-16 rounded-lg flex items-center justify-center mb-6 relative`}
            animate={{ 
              scale: isHovered ? 1.05 : 1
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-white rounded-lg"
              animate={{ 
                opacity: isHovered ? 0.6 : 0
              }}
            />
            {React.cloneElement(feature.icon, { className: `${theme.iconColor} text-2xl` })}
          </motion.div>
          
          {/* Title with animation */}
          <motion.h3 
            className="text-xl font-bold text-gray-800 mb-3"
            animate={{ 
              x: isHovered ? 4 : 0
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {feature.title}
          </motion.h3>
          
          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {feature.description}
          </p>
          
          {/* Interactive learn more button */}
          <motion.div
            className="inline-flex items-center text-sm font-medium cursor-pointer"
            animate={{ 
              color: isHovered ? theme.accent.replace('bg-', 'text-') : 'text-gray-500'
            }}
          >
            <span className="mr-2">Learn more</span>
            <motion.div
              animate={{ 
                x: isHovered ? 4 : 0
              }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <FaArrowRight className="text-xs" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

//   const FeatureCardCreative = ({ feature, index }) => {
//     const [isHovered, setIsHovered] = useState(false);
    
//     const colors = [
//       { bg: 'bg-gradient-to-br from-blue-400 to-indigo-600', text: 'text-white' },
//       { bg: 'bg-gradient-to-br from-emerald-400 to-teal-600', text: 'text-white' },
//       { bg: 'bg-gradient-to-br from-amber-400 to-orange-600', text: 'text-white' }
//     ];
    
//     return (
//       <motion.div
//         className={`rounded-xl overflow-hidden h-64 relative ${colors[index].bg}`}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: index * 0.2 }}
//         onHoverStart={() => setIsHovered(true)}
//         onHoverEnd={() => setIsHovered(false)}
//         whileHover={{ 
//           scale: 1.05,
//           boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
//         }}
//       >
//         <div className="absolute inset-0 flex flex-col justify-center items-center p-6 z-10">
//           <motion.div
//             animate={{ 
//               scale: isHovered ? 1.1 : 1,
//               y: isHovered ? -10 : 0
//             }}
//             className="text-white mb-4"
//           >
//             {React.cloneElement(feature.icon, { className: "text-6xl" })}
//           </motion.div>
          
//           <motion.h3 
//             className="text-2xl font-bold mb-2 text-white"
//             animate={{ y: isHovered ? -5 : 0 }}
//           >
//             {feature.title}
//           </motion.h3>
          
//           <motion.p 
//             className="text-white text-center opacity-80"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ 
//               opacity: isHovered ? 1 : 0.8,
//               height: 'auto'
//             }}
//           >
//             {feature.description}
//           </motion.p>
//         </div>
        
//         {/* Decorative elements */}
//         <div className="absolute top-0 right-0 w-24 h-24 opacity-20 rounded-full bg-white -mr-12 -mt-12"></div>
//         <div className="absolute bottom-0 left-0 w-16 h-16 opacity-20 rounded-full bg-white -ml-8 -mb-8"></div>
//       </motion.div>
//     );
//   };


const FeatureCardCreative = ({ feature, index }) => {
    const colors = [
      { bg: 'bg-gradient-to-br from-blue-400 to-indigo-600', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-emerald-400 to-teal-600', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-amber-400 to-orange-600', text: 'text-white' }
    ];
  
    return (
      <motion.div
        className={`rounded-xl overflow-hidden h-64 relative ${colors[index].bg}`}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: index * 0.15
        }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          transition: { 
            type: "tween",
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          } 
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 z-10">
          <motion.div
            className="text-white mb-4"
            whileHover={{
              scale: 1.15,
              rotate: -5,
              transition: { 
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            }}
          >
            {React.cloneElement(feature.icon, { 
              className: "text-6xl transform-gpu",
              style: { 
                transform: "translateZ(0)",
                willChange: "transform" 
              }
            })}
          </motion.div>
          
          <motion.h3 
            className="text-2xl font-bold mb-2 text-white text-center"
            initial={{ y: 0 }}
            whileHover={{
              y: -3,
              textShadow: "0 4px 8px rgba(0,0,0,0.15)",
              transition: { 
                duration: 0.3,
                ease: "easeOut" 
              }
            }}
          >
            {feature.title}
          </motion.h3>
          
          <motion.p 
            className="text-white text-center opacity-80 px-4"
            initial={{ opacity: 0.8, y: 10 }}
            whileHover={{
              opacity: 1,
              y: 0,
              transition: { 
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            style={{ 
              transform: "translateZ(0)",
              willChange: "transform, opacity" 
            }}
          >
            {feature.description}
          </motion.p>
        </div>
        
        {/* Animated decorative elements */}
        <motion.div 
          className="absolute top-0 right-0 w-24 h-24 opacity-20 rounded-full bg-white -mr-12 -mt-12"
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -10, 0],
            x: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 w-16 h-16 opacity-20 rounded-full bg-white -ml-8 -mb-8"
          animate={{
            scale: [1, 1.1, 1],
            y: [0, 10, 0],
            x: [0, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        />
      </motion.div>
    );
  };
