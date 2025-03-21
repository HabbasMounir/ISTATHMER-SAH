import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaHeart, 
  FaRocket,
  FaChartLine,
  FaWallet,
  FaEnvelope,
  FaArrowUp,
  FaGlobeAmericas,
  FaGithub
} from 'react-icons/fa';
import {  FaRegEnvelope, FaRocketchat } from 'react-icons/fa';

// function Footer() {
//   const { t, i18n } = useTranslation();
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const currentYear = new Date().getFullYear();

//   // Detect scroll position for scroll-to-top button
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 300);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Scroll to top function
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   // Footer links data structure
//   const footerSections = [
//     {
//       title: 'navigation',
//       links: [
//         { name: 'home', href: '#' },
//         { name: 'articles', href: '#' },
//         { name: 'courses', href: '#', isNew: true },
//         { name: 'about', href: '#' },
//         { name: 'contact', href: '#' }
//       ]
//     },
//     {
//       title: 'tools',
//       links: [
//         { name: 'investment', href: '#', icon: <FaChartLine className="text-purple-500" /> },
//         { name: 'budget', href: '#', icon: <FaWallet className="text-green-500" /> },
//         { name: 'goal', href: '#', icon: <FaRocket className="text-blue-500" /> }
//       ]
//     },
//     {
//       title: 'legal',
//       links: [
//         { name: 'privacy', href: '#' },
//         { name: 'terms', href: '#' },
//         { name: 'cookies', href: '#' }
//       ]
//     }
//   ];

//   // Social media links
//   const socialLinks = [
//     { name: 'Facebook', icon: <FaFacebook />, href: '#', color: 'hover:text-blue-600' },
//     { name: 'Twitter', icon: <FaTwitter />, href: '#', color: 'hover:text-blue-400' },
//     { name: 'Instagram', icon: <FaInstagram />, href: '#', color: 'hover:text-pink-500' },
//     { name: 'LinkedIn', icon: <FaLinkedin />, href: '#', color: 'hover:text-blue-700' },
//     { name: 'YouTube', icon: <FaYoutube />, href: '#', color: 'hover:text-red-600' }
//   ];

//   return (
//     <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white pt-16 pb-8" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
//       <div className="container mx-auto px-4">
//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {/* Brand Column */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
//                 <span className="text-blue-900 font-bold text-xl">IS</span>
//               </div>
//               <h2 className="text-2xl font-bold text-white">
//                 {t('navbar.brand')}
//               </h2>
//             </div>
            
//             <p className="text-blue-100 max-w-xs">
//               {t('footer.description')}
//             </p>

//             <form className="relative mt-6">
//               <input 
//                 type="email"
//                 placeholder={t('footer.newsletter_placeholder')}
//                 className="w-full pl-4 pr-12 py-3 rounded-lg bg-blue-800 bg-opacity-50 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
//               />
//               <button 
//                 type="submit"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-md hover:text-blue-200 transition-colors duration-300"
//                 aria-label={t('footer.subscribe')}
//               >
//                 <FaEnvelope />
//               </button>
//             </form>
//           </div>

//           {/* Links Columns */}
//           {footerSections.map((section) => (
//             <div key={section.title} className="space-y-4">
//               <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
//                 {t(`footer.${section.title}`)}
//               </h3>
//               <ul className="space-y-2">
//                 {section.links.map((link) => (
//                   <li key={link.name}>
//                     <a 
//                       href={link.href}
//                       className="group flex items-center transition-colors duration-300 text-blue-100 hover:text-white"
//                     >
//                       {link.icon && <span className="mr-2">{link.icon}</span>}
//                       <span className="group-hover:translate-x-1 transition-transform duration-300">
//                         {t(`footer.${link.name}`)}
//                       </span>
//                       {link.isNew && (
//                         <span className="ml-2 px-2 py-0.5 bg-green-500 text-green-50 text-xs rounded-full">
//                           {t('navbar.new_badge')}
//                         </span>
//                       )}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Wave Divider */}
//         <div className="relative h-12 my-8">
//           <div className="absolute w-full overflow-hidden h-12">
//             <svg 
//               className="absolute bottom-0 w-full h-8" 
//               xmlns="http://www.w3.org/2000/svg" 
//               viewBox="0 0 1200 120" 
//               preserveAspectRatio="none"
//             >
//               <path 
//                 d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
//                 className="fill-blue-700"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Social Links */}
//         <div className="flex flex-wrap justify-center gap-6 my-8">
//           {socialLinks.map((social) => (
//             <a 
//               key={social.name}
//               href={social.href}
//               aria-label={social.name}
//               className={`text-xl p-3 bg-blue-800 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 ${social.color}`}
//             >
//               {social.icon}
//             </a>
//           ))}
//         </div>

//         {/* Bottom Footer */}
//         <div className="pt-6 mt-10 border-t border-blue-700 text-center">
//           <div className="flex flex-col md:flex-row justify-between items-center text-blue-100 text-sm">
//             <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
//               <span>
//                 © {currentYear} {t('navbar.brand')}. {t('footer.rights')}
//               </span>
//               <span className="hidden md:inline">|</span>
//               <span className="flex items-center">
//                 {t('footer.made_with')} <FaHeart className="text-red-400 mx-1" /> {t('footer.and')} <FaRocket className="text-yellow-400 mx-1" />
//               </span>
//             </div>
            
//             <div className="flex items-center">
//               <FaGlobeAmericas className="mr-2" />
//               <select 
//                 onChange={(e) => i18n.changeLanguage(e.target.value)}
//                 value={i18n.language}
//                 className="bg-transparent text-blue-100 hover:text-white focus:outline-none cursor-pointer"
//               >
//                 <option value="en" className="bg-blue-900">English</option>
//                 <option value="ar" className="bg-blue-900">العربية</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll to top button */}
//       <button 
//         onClick={scrollToTop}
//         className={`fixed right-6 bottom-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-all duration-300 ${
//           showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
//         }`}
//         aria-label={t('footer.back_to_top')}
//       >
//         <FaArrowUp />
//       </button>
//     </footer>
//   );
// }

// export { Footer };

// import { FaTwitter, FaLinkedin, FaGithub, FaRocket, FaRegEnvelope, FaRocketchat } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';

// function Footer() {
//   const { t } = useTranslation();
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
//           {/* Brand Section */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">IS</span>
//               </div>
//               <h2 className="text-xl font-bold text-white">{t('navbar.brand')}</h2>
//             </div>
//             <p className="text-sm text-gray-400">
//               {t('footer.tagline')}
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <FaTwitter size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <FaLinkedin size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <FaGithub size={20} />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-white font-semibold mb-4 relative before:absolute before:-bottom-1 before:left-0 before:w-8 before:h-0.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-500">
//               {t('footer.quick_links')}
//             </h3>
//             <ul className="space-y-2">
//               {['home', 'articles', 'courses', 'about'].map((item) => (
//                 <li key={item}>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
//                     {t(`navbar.${item}`)}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Tools & Resources */}
//           <div className="space-y-4">
//             <h3 className="text-white font-semibold mb-4 relative before:absolute before:-bottom-1 before:left-0 before:w-8 before:h-0.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-500">
//               {t('navbar.tools')}
//             </h3>
//             <div className="space-y-3">
//               {[
//                 { icon: <FaRocketchat className="text-blue-500" />, text: 'investment' },
//                 { icon: <FaChartLine className="text-purple-500" />, text: 'budget' },
//                 { icon: <FaWallet className="text-green-500" />, text: 'goal' }
//               ].map((item) => (
//                 <div key={item.text} className="flex items-center space-x-2 group">
//                   <span className="group-hover:rotate-12 transition-transform">{item.icon}</span>
//                   <a href="#" className="text-gray-400 hover:text-white text-sm">
//                     {t(`navbar.toolsList.${item.text}.title`)}
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Newsletter */}
//           <div className="space-y-4">
//             <h3 className="text-white font-semibold mb-4 relative before:absolute before:-bottom-1 before:left-0 before:w-8 before:h-0.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-500">
//               {t('footer.newsletter')}
//             </h3>
//             <p className="text-sm text-gray-400 mb-3">
//               {t('footer.newsletter_text')}
//             </p>
//             <div className="flex gap-2">
//               <input 
//                 type="email" 
//                 placeholder={t('footer.email_placeholder')}
//                 className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
//                 <FaRegEnvelope />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//           <div className="text-sm text-gray-400">
//             © {currentYear} {t('navbar.brand')}. {t('footer.rights_reserved')}
//           </div>
//           <div className="flex space-x-6">
//             <a href="#" className="text-gray-400 hover:text-white text-sm">
//               {t('footer.privacy')}
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white text-sm">
//               {t('footer.terms')}
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white text-sm">
//               {t('footer.contact')}
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Back to Top */}
//       <button 
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
//       >
//         <FaRocket className="transform -rotate-45" />
//       </button>
//     </footer>
//   );
// }

// export { Footer };



function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">IS</span>
              </div>
              <h2 className="text-xl font-bold text-white">{t('navbar.brand')}</h2>
            </div>
            <p className="text-sm text-gray-400">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-4 relative before:absolute before:-bottom-1 before:left-0 before:w-8 before:h-0.5 before:bg-blue-500">
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-2">
              {['home', 'articles', 'courses', 'about'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                    {t(`navbar.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-4 relative before:absolute before:-bottom-1 before:left-0 before:w-8 before:h-0.5 before:bg-blue-500">
              {t('footer.tools_resources')}
            </h3>
            <div className="space-y-3">
              {[
                { icon: <FaRocket className="text-blue-400" />, text: 'investment' },
                { icon: <FaChartLine className="text-blue-300" />, text: 'budget' },
                { icon: <FaWallet className="text-blue-200" />, text: 'goal' }
              ].map((item) => (
                <div key={item.text} className="flex items-center space-x-2 group">
                  <span className="group-hover:rotate-12 transition-transform">{item.icon}</span>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">
                    {t(`navbar.toolsList.${item.text}.title`)}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-4 relative before:absolute before:-bottom-1 before:left-0 before:w-8 before:h-0.5 before:bg-blue-500">
              {t('footer.newsletter')}
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              {t('footer.newsletter_text')}
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder={t('footer.email_placeholder')}
                className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                <FaRegEnvelope />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © {currentYear} {t('navbar.brand')}. {t('footer.rights_reserved')}
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">
              {t('footer.terms')}
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">
              {t('footer.contact')}
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <FaRocket className="transform -rotate-45" />
      </button>
    </footer>
  );
}

export { Footer };