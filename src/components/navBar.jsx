import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaGlobe, FaBars, FaTimes, FaRocket, FaChartLine, FaWallet, FaHome, FaBook, FaGraduationCap, FaInfo, FaEnvelope } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ isToolsOpen, setIsToolsOpen, isLanguageOpen, setIsLanguageOpen, isLightBackground }) {
  const { t, i18n } = useTranslation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const toolsRef = useRef(null);
  const langRef = useRef(null);
  const mobileMenuRef = useRef(null);
  let location = useLocation();

  // Text color and hover logic
  const textColor = isScrolled || isLightBackground ? 'text-gray-900' : 'text-white';
  const hoverColor = (isScrolled || isLightBackground) ? 'hover:text-blue-600' : 'hover:text-white';
  const activeColor = (isScrolled || isLightBackground) ? 'text-blue-600' : 'text-white';

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isToolsOpen && !toolsRef.current?.contains(e.target)) setIsToolsOpen(false);
      if (isLanguageOpen && !langRef.current?.contains(e.target)) setIsLanguageOpen(false);
      if (isMobileOpen && !mobileMenuRef.current?.contains(e.target)) setIsMobileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isToolsOpen, isLanguageOpen, isMobileOpen]);

  // Navbar background
  const navBackground = isScrolled 
       ? ' bg-white ' 
    : isLightBackground 
      ? 'bg-white/80  backdrop-blur-md' 
      : 'backdrop-blur-md';

  // Menu items data
  const menuItems = [
    { key: 'home', icon: <FaHome className="text-blue-500" /> },
    { key: 'articles', icon: <FaBook className="text-purple-500" /> },
    { key: 'courses', icon: <FaGraduationCap className="text-green-500" />, badge: true },
    { key: 'about', icon: <FaInfo className="text-amber-500" /> },
    { key: 'contact', icon: <FaEnvelope className="text-pink-500" /> }
  ];

  // Tools dropdown data
  const toolItems = [
    { key: 'investment', icon: <FaChartLine className="text-purple-600" /> },
    { key: 'budget', icon: <FaWallet className="text-green-600" /> },
    { key: 'goal', icon: <FaRocket className="text-blue-600" /> }
  ];

  // Supported languages
  const supportedLangs = ['en', 'ar'];

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300  md:${navBackground}`}
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 ${isLightBackground ? 'bg-blue-900' : 'bg-white'} rounded-lg flex items-center justify-center`}>
            <span className={`${isLightBackground ? 'text-white' : 'text-blue-900'} font-bold text-xl`}>IS</span>
          </div>
          <h1 className={`text-2xl font-bold ${textColor}`}>
            {t('navbar.brand')}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <li key={item.key} className="relative">
              <Link 
                onClick={() => setActiveTab(item.key)}
                to={item.key=='home'?'/':`/${item.key}`}
                className={`flex items-center py-2 px-3 transition-all duration-300 relative group
                  ${location.pathname === `/${item.key}` ? activeColor : textColor} 
                  ${hoverColor}
                  after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px]
                  after:bg-current after:transition-all after:duration-300
                  ${location.pathname === `/${item.key}`? 'after:w-full' : 'hover:after:w-full'}`}
              >
                
                <span className="relative z-10">{t(`navbar.${item.key}`)}</span>
                {item.badge && (
                  <span className="mx-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {t('navbar.new_badge')}
                  </span>
                )}
              </Link>
            </li>
          ))}

          {/* Tools Dropdown */}
          <div className="relative" ref={toolsRef}>
            <button 
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className={`flex items-center px-3 py-2 relative group transition-all duration-300
                ${textColor} ${hoverColor}
                after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px]
                after:bg-current after:transition-all after:duration-300
                ${isToolsOpen ? 'after:w-full' : 'hover:after:w-full'}`}
            >
              <span className="relative z-10">{t('navbar.tools')}</span>
              <FaChevronDown className={`mx-2 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`}/>
            </button>
            
            {isToolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl p-2 space-y-2"
              style={{ transform:  'translateX(-15%)'}}>

              
                {toolItems.map((tool) => (
                  <a 
                    key={tool.key} 
                    href="#" 
                    className="flex items-start p-3 rounded-lg group transition-colors duration-300 hover:bg-gray-50"
                  >
                    <div className="text-purple-600 my-auto">{tool.icon}</div>
                    <div className="mx-3">
                      <p className="font-medium text-gray-900">
                        {t(`navbar.toolsList.${tool.key}.title`)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t(`navbar.toolsList.${tool.key}.description`)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className={`flex items-center px-3 py-2 relative group transition-all duration-300
                ${textColor} ${hoverColor}
                after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px]
                after:bg-current after:transition-all after:duration-300
                ${isLanguageOpen ? 'after:w-full' : 'hover:after:w-full'}`}
            >
              <FaGlobe className="mx-1"/>
              <span>{t(`languages.${i18n.language}`)}</span>
              <FaChevronDown className={`mx-2 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}/>
            </button>

            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl p-2"
                style={{ transform: i18n.language === 'ar' ? 'translateX(15%)' : '' }}>

              
                {supportedLangs.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      i18n.changeLanguage(lang);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300
                      ${i18n.language === lang ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {t(`languages.${lang}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100"
        >
          {isMobileOpen ? (
            <FaTimes className="text-2xl text-gray-900"/>
          ) : (
            <FaBars className="text-2xl text-gray-900"/>
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsMobileOpen(false)}
          >
            <div 
              className={`absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-0 h-full w-80 bg-white shadow-xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">IS</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{t('navbar.brand')}</h2>
                </div>
                <button 
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FaTimes className="text-gray-600 text-xl"/>
                </button>
              </div>

              {/* Scrollable Menu Content */}
              <div className="h-[calc(100vh-76px)] overflow-y-auto p-4">
                {/* Navigation Items */}
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.key}
                      onClick={() => {
                        setActiveTab(item.key);
                        setIsMobileOpen(false);
                      }}
                        to={`/${item.key}`}
                      className={`w-full flex items-center p-3 rounded-lg text-left ${
                        activeTab === item.key 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      } transition-colors duration-200`}
                    >
                      <span className="mx-2">{item.icon}</span>
                      <span className="flex-1">{t(`navbar.${item.key}`)}</span>
                      {item.badge && (
                        <span className="mx-1 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {t('navbar.new_badge')}
                        </span>
                        
                      )}
                    </Link>
                  ))}
                </div>

                {/* Tools Section */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">{t('navbar.tools_title')}</h3>
                  <div className="space-y-2">
                    {toolItems.map((tool) => (
                      <a
                        key={tool.key}
                        href="#"
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        {tool.icon}
                        <div className="mx-3">
                          <p className="text-gray-900 font-medium">
                            {t(`navbar.toolsList.${tool.key}.title`)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {t(`navbar.toolsList.${tool.key}.description`)}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Language Selector */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">{t('navbar.language_title')}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {supportedLangs.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          i18n.changeLanguage(lang);
                          setIsMobileOpen(false);
                        }}
                        className={`p-2 rounded-lg text-sm ${
                          i18n.language === lang 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        } transition-colors duration-200`}
                      >
                        {t(`languages.${lang}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export { Navbar,NavBarbg };

function NavBarbg({isLightBackground}){
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  return(
<Navbar
          isToolsOpen={isToolsOpen}
          setIsToolsOpen={setIsToolsOpen}
          isLanguageOpen={isLanguageOpen}
          setIsLanguageOpen={setIsLanguageOpen}
          language={language}
          setLanguage={setLanguage}
          isLightBackground={isLightBackground}
        />
  )


}