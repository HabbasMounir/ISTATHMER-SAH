import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavBarbg } from '../components/navBar';
import { 
  FaPaperPlane, 
  FaRobot, 
  FaUserAlt, 
  FaRegSmile, 
  FaPlus, 
  FaEllipsisH, 
  FaRegCopy, 
  FaHistory,
  FaMicrophoneAlt,
  FaAngleDown,
  FaPaperclip,
  FaMoon,
  FaSun,
  FaCog,
  FaEdit,
  FaCheck,
  FaTimes,
  FaLeaf,
  FaStar,
  FaChartBar,
  FaMoneyBillWave,
  FaRegLightbulb,
  FaCoins
} from 'react-icons/fa';

function ChatPage() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: t('bot.text', "Welcome to Financial Advisor AI! I'm here to help you with financial questions, investment advice, and retirement planning. How can I assist you today?"),
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState('Guest User');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempUserName, setTempUserName] = useState('Guest User');
  const [showSettings, setShowSettings] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('blue'); // Default theme
  
  // Available themes
  const themes = {
    blue: { primary: 'from-blue-600 to-indigo-600', hover: 'from-blue-700 to-indigo-700', text: 'text-blue-600', bg: 'bg-blue-50', hoverBg: 'hover:bg-blue-100' },
    green: { primary: 'from-green-600 to-emerald-600', hover: 'from-green-700 to-emerald-700', text: 'text-green-600', bg: 'bg-green-50', hoverBg: 'hover:bg-green-100' },
    purple: { primary: 'from-purple-600 to-violet-600', hover: 'from-purple-700 to-violet-700', text: 'text-purple-600', bg: 'bg-purple-50', hoverBg: 'hover:bg-purple-100' },
    amber: { primary: 'from-amber-500 to-orange-600', hover: 'from-amber-600 to-orange-700', text: 'text-amber-600', bg: 'bg-amber-50', hoverBg: 'hover:bg-amber-100' },
  };

  // Set the current theme colors
  const theme = themes[currentTheme];
  
  // Sample recent chat history
  const recentChats = [
    { id: 1, title: "Retirement planning advice", date: "2 hours ago" },
    { id: 2, title: "Stock market investments", date: "Yesterday" },
    { id: 3, title: "Emergency fund setup", date: "2 days ago" },
    { id: 4, title: "Real estate investments", date: "1 week ago" },
  ];

  // Enhanced suggested topics with icons
  const suggestedTopics = [
    { id: 1, title: "Investment strategies", icon: <FaChartBar /> },
    { id: 2, title: "Retirement planning", icon: <FaLeaf /> },
    { id: 3, title: "Tax optimization", icon: <FaMoneyBillWave /> },
    { id: 4, title: "Emergency funds", icon: <FaCoins /> },
    { id: 5, title: "Stock market basics", icon: <FaRegLightbulb /> },
    { id: 6, title: "Real estate investing", icon: <FaStar /> },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: generateResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
      setNewMessageCount(prev => prev + 1);
    }, 1500);
  };

  const generateResponse = (query) => {
    // Simple response generation based on keywords
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('invest') || lowerQuery.includes('stock')) {
      return "When considering investments, it's important to diversify your portfolio. Stocks, bonds, ETFs, and mutual funds are all options to consider based on your risk tolerance and time horizon. Would you like more specific advice about a particular investment type?";
    } 
    else if (lowerQuery.includes('retire') || lowerQuery.includes('401k') || lowerQuery.includes('pension')) {
      return "Retirement planning is crucial for financial security. Consider maximizing contributions to tax-advantaged accounts like 401(k)s or IRAs. The general rule is to save 15% of your income for retirement, but this varies based on your age and goals. Would you like to know more about specific retirement vehicles?";
    }
    else if (lowerQuery.includes('save') || lowerQuery.includes('saving') || lowerQuery.includes('emergency')) {
      return "Building an emergency fund is the foundation of financial security. Aim to save 3-6 months of essential expenses in a high-yield savings account. This provides a safety net for unexpected events like medical emergencies or job loss. Would you like tips on how to build your emergency fund faster?";
    }
    else if (lowerQuery.includes('real estate') || lowerQuery.includes('property') || lowerQuery.includes('home')) {
      return "Real estate can be a valuable investment. Whether you're considering buying a primary residence or investment properties, location, market conditions, and financing options are key factors. Would you like to explore specific aspects of real estate investing?";
    }
    else if (lowerQuery.includes('dark mode') || lowerQuery.includes('light mode') || lowerQuery.includes('theme')) {
      toggleDarkMode();
      return `I've toggled the interface to ${darkMode ? 'light' : 'dark'} mode for you. How does it look? You can always switch back in the settings menu.`;
    }
    else if (lowerQuery.includes('name') || lowerQuery.includes('change name') || lowerQuery.includes('username')) {
      setIsEditingName(true);
      return `You can change your display name by clicking on your profile in the sidebar or by using the edit button that just appeared. What would you like to be called?`;
    }
    else {
      return "That's a great question about personal finance. Financial decisions should be tailored to your specific situation, goals, and risk tolerance. Could you provide more details so I can give you more personalized advice?";
    }
  };

  const handleTopicClick = (topic) => {
    setActiveTopic(topic.id);
    setInputValue(topic.title + "?");
    // Focus the input after setting value
    document.getElementById('chat-input').focus();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(i18n.language, { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const atBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShowScrollButton(!atBottom);
      
      if (atBottom) {
        setNewMessageCount(0);
      }
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
    setNewMessageCount(0);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const saveUserName = () => {
    if (tempUserName.trim()) {
      setUserName(tempUserName);
    }
    setIsEditingName(false);
  };

  const cancelEditName = () => {
    setTempUserName(userName);
    setIsEditingName(false);
  };

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    setShowSettings(false);
  };

  const inputhandle = (e) => {
    e.target.style.height = "12px";
    e.target.style.height = (e.target.scrollHeight) + "px";
    setInputValue(e.target.value);
  };
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Create dynamic class names based on theme and dark mode
  const getDynamicClasses = () => {
    return {
      mainBg: darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-white',
      panelBg: darkMode ? 'bg-gray-800' : 'bg-white',
      textColor: darkMode ? 'text-gray-200' : 'text-gray-800',
      borderColor: darkMode ? 'border-gray-700' : 'border-gray-200',
      inputBg: darkMode ? 'bg-gray-700' : 'bg-gray-100',
      iconColor: darkMode ? 'text-gray-400' : 'text-gray-500',
      headingColor: darkMode ? 'text-gray-100' : 'text-gray-900',
      subheadingColor: darkMode ? 'text-gray-400' : 'text-gray-500',
      buttonGradient: `bg-gradient-to-r ${theme.primary}`,
      buttonHover: `hover:${theme.hover}`,
      accentText: theme.text,
      accentBg: theme.bg,
      accentHoverBg: theme.hoverBg,
      userMessageBg: darkMode ? 'bg-indigo-900' : 'bg-blue-600',
      botMessageBg: darkMode ? 'bg-gray-700' : 'bg-white',
      botMessageText: darkMode ? 'text-gray-100' : 'text-gray-800',
    };
  };

  const classes = getDynamicClasses();
  
  return (
    <div className={`min-h-screen ${classes.mainBg} flex flex-col transition-colors duration-300`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <NavBarbg isLightBackground={!darkMode} />
      
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Sidebar */}
        <div className={`hidden md:flex flex-col w-80 border-r ${classes.borderColor} ${classes.panelBg} transition-colors duration-300`}>
          {/* New Chat Button */}
          <div className="p-4">
            <button 
              onClick={()=>window.location.reload()} 
              className={`w-full ${classes.buttonGradient} text-white py-3 px-4 rounded-lg font-medium ${classes.buttonHover} transition-all flex items-center justify-center`}
            >
              <FaPlus className="mr-2" />
              {t('chat.newChat', "New Chat")}
            </button>
          </div>
          
          {/* Settings Button */}
          {/* <div className="px-4 mb-2">
            <button 
              onClick={toggleSettings}
              className={`w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center ${classes.textColor}`}
            >
              <FaCog className="mr-2" />
              {t('chat.settings', "Settings")}
            </button>
          </div>
          
          {showSettings && (
            <div className={`mx-4 mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors duration-300`}>
              <h3 className={`text-sm font-medium ${classes.textColor} mb-2`}>Display</h3>
              
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm ${classes.textColor}`}>Dark Mode</span>
                <button 
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-md ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} transition-colors`}
                >
                  {darkMode ? <FaMoon className="text-yellow-200" /> : <FaSun className="text-yellow-500" />}
                </button>
              </div>
              
              <h3 className={`text-sm font-medium ${classes.textColor} mb-2`}>Theme</h3>
              <div className="grid grid-cols-4 gap-2 mb-2">
                <button onClick={() => changeTheme('blue')} className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-transparent focus:border-white" />
                <button onClick={() => changeTheme('green')} className="w-6 h-6 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 border-2 border-transparent focus:border-white" />
                <button onClick={() => changeTheme('purple')} className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 border-2 border-transparent focus:border-white" />
                <button onClick={() => changeTheme('amber')} className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 border-2 border-transparent focus:border-white" />
              </div>
            </div>
          )} */}
          
          {/* Recent Chats */}
          <div className="px-4 py-2">
            <h3 className={`text-xs font-semibold ${classes.subheadingColor} uppercase tracking-wider mb-3`}>
              {t('chat.recentChats', "Recent Chats")}
            </h3>
            <div className="space-y-2">
              {recentChats.map(chat => (
                <button key={chat.id} className={`w-full text-left p-3 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-colors flex items-start justify-between group`}>
                  <div className="flex items-center">
                    <FaHistory className={`${classes.iconColor} ${i18n.language === 'ar' ? "transform-[rotateY(180deg)]" : ''} group-hover:${classes.accentText}`} />
                    <div className='mx-3'>
                      <div className={`text-sm font-medium ${classes.textColor} line-clamp-1 group-hover:${classes.accentText}`}>
                        {chat.title}
                      </div>
                      <div className={`text-xs ${classes.subheadingColor}`}>
                        {chat.date}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1"></div>
          
          {/* User Info */}
          <div className={`p-4 border-t ${classes.borderColor}`}>
            <div className={`flex justify-between items-center p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer transition-colors`}>
              <div className='flex items-center'>
                <div className={`w-10 h-10 rounded-full ${classes.buttonGradient} flex items-center justify-center text-white`}>
                  <FaUserAlt />
                </div>
                <div className="mx-3 flex flex-col">
                  {isEditingName ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={tempUserName}
                        onChange={(e) => setTempUserName(e.target.value)}
                        className={`text-sm px-2 py-1 rounded ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'} border ${classes.borderColor}`}
                        autoFocus
                      />
                      <button onClick={saveUserName} className="ml-1 text-green-500">
                        <FaCheck />
                      </button>
                      <button onClick={cancelEditName} className="ml-1 text-red-500">
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className={`font-medium ${classes.textColor}`}>{userName}</div>
                      <button 
                        onClick={() => setIsEditingName(true)} 
                        className="ml-2 text-gray-400 hover:text-gray-300"
                      >
                        <FaEdit size={14} />
                      </button>
                    </div>
                  )}
                  <div className="text-xs text-gray-500">Free Plan</div>
                </div>
              </div>
              
              <FaEllipsisH className={classes.iconColor} />
            </div>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col max-h-[calc(100vh-64px)]">
          {/* Chat Header */}
          <div className={`${classes.panelBg} border-b ${classes.borderColor} py-3 px-4 flex items-center justify-between transition-colors duration-300`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full ${classes.buttonGradient} flex items-center justify-center text-white md:hidden`}>
                <FaUserAlt />
              </div>
              <div>
                <h2 className={`font-bold ${classes.headingColor}`}>Financial Advisor AI</h2>
                <div className="text-xs text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mx-1"></span>
                  {t('chat.online', "Online")}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                onClick={toggleDarkMode} 
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} mr-2`}
              >
                {darkMode ? <FaSun className="text-white" /> : <FaMoon className={classes.iconColor} />}
              </button>
              {/* <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <FaEllipsisH className={classes.iconColor} />
              </button> */}
            </div>
          </div>
          
          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className={`flex-1 overflow-y-auto p-4 ${classes.mainBg} transition-colors duration-300`}
            onScroll={handleScroll}
          >
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-6 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className={`w-8 h-8 rounded-full ${classes.buttonGradient} flex items-center justify-center text-white mt-1 flex-shrink-0`}>
                    <FaRobot />
                  </div>
                )}
                
                <div className={`min-w-8 max-w-4xl mx-3 ${
                  message.sender === 'user' 
                    ? classes.userMessageBg + ' text-white' 
                    : classes.botMessageBg + ' ' + classes.botMessageText
                } rounded-2xl p-4 shadow-sm  transition-colors duration-300`}>
                  <div className="flex flex-col">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="font-medium text-sm">
                        {message.sender === 'user' ? t('chat.you', "You") : t('chat.financialAdvisor', "Financial Advisor")}
                      </span>
                      <span className={`text-xs ${message.sender === 'user' ? 'text-blue-200' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mt-1 flex-shrink-0">
                    <FaUserAlt />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-6 flex justify-start">
                <div className={`w-8 h-8 rounded-full ${classes.buttonGradient} flex items-center justify-center text-white mr-3 mt-1 flex-shrink-0`}>
                  <FaRobot />
                </div>
                <div className={`${classes.botMessageBg} ${classes.botMessageText} rounded-2xl p-4 shadow-sm rounded-tl-none max-w-xs transition-colors duration-300`}>
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messageEndRef} /> 
          </div>
          
          {/* Scroll to bottom button */}
          {showScrollButton && (
            <div className="absolute bottom-24 right-8">
              <button 
                onClick={scrollToBottom}
                className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-2 rounded-full shadow-md ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} relative transition-colors`}
              >
                <FaAngleDown className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
                {newMessageCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {newMessageCount}
                  </span>
                )}
              </button>
            </div>
          )}
          
          {/* Chat Input Area */}
          <div className={`${classes.panelBg} border-t ${classes.borderColor} p-4 transition-colors duration-300`}>
            {/* Suggested Topics */}
            {messages.length < 3 && (
              <div className="mb-4">
                <h3 className={`text-sm font-medium ${classes.textColor} mb-2`}>
                  {t('chat.suggestedTopics', "Suggested Topics")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedTopics.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicClick(topic)}
                      className={`px-2 py-2 rounded-full text-sm transition-all  flex items-center ${
                        activeTopic === topic.id
                          ? classes.buttonGradient + ' text-white'
                          : darkMode 
                            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                            : classes.accentBg + ' ' + classes.accentText + ' ' + classes.accentHoverBg
                      }`}
                    >
                      <span>{topic.icon}</span> <span  className="mx-2" >{topic.title}</span> 
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="relative">
              <div className={`flex items-center ${classes.inputBg} rounded-xl relative items-start transition-colors duration-300`}>
                <button type="button" className={`p-3 ${classes.iconColor} hover:${classes.accentText}`}>
                  <FaPaperclip />
                </button>
                <textarea
                  id="chat-input"
                  value={inputValue}
                  onChange={inputhandle}
                  placeholder={t('chat.typeYourMessage', "Type your message...")}
                  className={`flex-1 max-h-[300px] py-3 h-[48px] resize-none px-3 bg-transparent outline-none ${classes.textColor} placeholder-gray-500 transition-colors duration-300`}
                />
                <button type="button" className={`p-3 h-[48px] ${classes.iconColor} hover:${classes.accentText}`}>
                  <FaRegSmile />
                </button>
                <button type="button" className={`p-3 h-[48px] ${classes.iconColor} hover:${classes.accentText}`}>
                  <FaMicrophoneAlt />
                </button>
                <button 
                  type="submit" 
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-full ${
                    inputValue.trim() 
                      ? classes.accentText + '  hover:text-blue-800' 
                      : 'text-gray-400 cursor-not-allowed'
                  } transition-colors duration-300 h-[48px]`}
                >
                  <FaPaperPlane />
                </button>
              </div>
              <div className={`text-xs ${classes.subheadingColor} mt-2 text-center`}>
                {t('chat.disclaimer', "AI-generated content may not be accurate. Consult with professionals for important financial decisions.")}
              </div>
            </form>
          </div>
        </div>
        
        {/* Info Panel (only shown in desktop view) */}
        <div className={`hidden lg:flex flex-col w-80 border-l ${classes.borderColor} ${classes.panelBg} transition-colors duration-300`}>
          <div className={`p-4 border-b ${classes.borderColor}`}>
            <h3 className={`font-bold ${classes.headingColor} mb-1`}>
              {t('chat.aboutAdvisor', "About Financial Advisor AI")}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('chat.advisorDescription', "Your AI-powered financial assistant, ready to help with personalized advice on investing, saving, and planning for your future financial goals.")}
            </p>
          </div>
          
          <div className={`p-4 border-b ${classes.borderColor}`}>
            <h3 className={`font-bold ${classes.headingColor} mb-3`}>
              {t('chat.capabilities', "Capabilities")}
            </h3>
            <ul className="space-y-3">
              {[
                { key: 'chat.capabilityInvesting', text: "Investment strategy advice", icon: <FaChartBar /> },
                { key: 'chat.capabilityRetirement', text: "Retirement planning guidance", icon: <FaLeaf /> },
                { key: 'chat.capabilitySavings', text: "Savings & budgeting tips", icon: <FaMoneyBillWave /> },
                { key: 'chat.capabilityRealEstate', text: "Real estate investment info", icon: <FaStar /> },
                { key: 'chat.capabilityTaxes', text: "Tax efficiency strategies", icon: <FaCoins /> }
              ].map((capability, index) => (
                <li key={index} className="flex text-sm">
                <span className={`w-8 h-8 mr-2 rounded-full ${classes.accentBg} ${classes.accentText} flex items-center justify-center flex-shrink-0`}>
                  {capability.icon}
                </span>
                <span className={`mx-2 ${classes.botMessageText}`}>{t(capability.key, capability.text)}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4">
          <h3 className={`font-bold ${classes.headingColor} mb-3`}>
            {t('chat.limitations', "Limitations")}
          </h3>
          <ul className="space-y-3">
            {[
              { key: 'chat.limitationDates', text: "May not have current market data" },
              { key: 'chat.limitationPersonal', text: "Cannot access your personal accounts" },
              { key: 'chat.limitationLegal', text: "Not a substitute for professional advice" }
            ].map((limitation, index) => (
              <li key={index} className="flex text-sm">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                  !
                </span>
                <span className={`mx-2 ${classes.botMessageText}`}>
                  {t(limitation.key, limitation.text)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto p-4 border-t border-gray-200">
          <button className={`w-full py-2 ${classes.accentText} text-sm flex items-center justify-center ${classes.accentBg} rounded-lg transition-colors`}>
            <FaRegCopy className="mx-2" />
            {t('chat.exportChat', "Export Chat")}
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default ChatPage;