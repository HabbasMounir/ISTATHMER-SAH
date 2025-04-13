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
  FaPaperclip
} from 'react-icons/fa';

function ChatPage() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Welcome to Financial Advisor AI! I'm here to help you with financial questions, investment advice, and retirement planning. How can I assist you today?",
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
  
  // Sample recent chat history
  const recentChats = [
    { id: 1, title: "Retirement planning advice", date: "2 hours ago" },
    { id: 2, title: "Stock market investments", date: "Yesterday" },
    { id: 3, title: "Emergency fund setup", date: "2 days ago" },
    { id: 4, title: "Real estate investments", date: "1 week ago" },
  ];

  // Sample suggested topics
  const suggestedTopics = [
    { id: 1, title: "Investment strategies" },
    { id: 2, title: "Retirement planning" },
    { id: 3, title: "Tax optimization" },
    { id: 4, title: "Emergency funds" },
    { id: 5, title: "Stock market basics" },
    { id: 6, title: "Real estate investing" },
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
    //   setShowScrollButton(!atBottom);
      
      if (atBottom) {
        setNewMessageCount(0);
      }
    }
  };

  const scrollToBottom = () => {
    // messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    setNewMessageCount(0);
  };

  useEffect(() => {
    // if (!isTyping) {
    //   messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      }
    );
    // }
  }, [messages, isTyping]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  function inputhandle(e){
    // setValue(e.target.value)
    e.target.style.height = "20px"
    e.target.style.height = (e.target.scrollHeight) + "px";
  
    // let index=e.target.attributes.num.value
     setInputValue(e.target.value)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <NavBarbg isLightBackground={true} />
      
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-80 border-r border-gray-200 bg-white">
          {/* New Chat Button */}
          <div className="p-4">
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center">
              <FaPlus className="mr-2" />
              {t('chat.newChat')}
            </button>
          </div>
          
          {/* Recent Chats */}
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {t('chat.recentChats')}
            </h3>
            <div className="space-y-2">
              {recentChats.map(chat => (
                <button key={chat.id} className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors flex items-start justify-between group">
                  <div className="flex  items-center">
                    <FaHistory className={`text-gray-400 ${i18n.language === 'ar'?"transform-[rotateY(180deg)]":''}  group-hover:text-blue-500`} />
                    <div className=' mx-3'>
                      <div className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-blue-600">
                        {chat.title}
                      </div>
                      <div className="text-xs text-gray-500">
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
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
             <div className='flex items-center '>
             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white">
                <FaUserAlt />
              </div>
              <div className="mx-3">
                <div className="font-medium">Guest User</div>
                <div className="text-xs text-gray-500">Free Plan</div>
              </div>
             </div>
             
              <FaEllipsisH className=" text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col max-h-[calc(100vh-64px)]">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white md:hidden ">
                <FaUserAlt />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Financial Advisor AI</h2>
                <div className="text-xs text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mx-1"></span>
                  {t('chat.online')}
                </div>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FaEllipsisH className="text-gray-500" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white"
            onScroll={handleScroll}
          >
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-6 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white  mt-1 flex-shrink-0">
                    <FaRobot />
                  </div>
                )}
                
                <div className={`min-w-8 max-w-4xl mx-3  ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'} rounded-2xl p-4 shadow-sm ${message.sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                  <div className="flex flex-col">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="font-medium text-sm">
                        {message.sender === 'user' ? t('chat.you') : t('chat.financialAdvisor')}
                      </span>
                      <span className={`text-xs ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800  mt-1 flex-shrink-0">
                    <FaUserAlt />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-6 flex justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white mr-3 mt-1 flex-shrink-0">
                  <FaRobot />
                </div>
                <div className="bg-white text-gray-800 rounded-2xl p-4 shadow-sm rounded-tl-none max-w-xs">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div  ref={messageEndRef} /> 
          </div>
          
          {/* Scroll to bottom button */}
          {showScrollButton && (
            <div className="absolute bottom-24 right-8">
              <button 
                onClick={scrollToBottom}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 relative"
              >
                <FaAngleDown className="text-gray-700" />
                {newMessageCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {newMessageCount}
                  </span>
                )}
              </button>
            </div>
          )}
          
          {/* Chat Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            {/* Suggested Topics */}
            {messages.length < 3 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  {t('chat.suggestedTopics')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedTopics.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicClick(topic)}
                      className={`px-3 py-2 rounded-full text-sm transition-all ${
                        activeTopic === topic.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      {topic.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center bg-gray-100 rounded-xl relative  items-start">
                <button type="button" className="p-3 text-gray-500 hover:text-blue-600">
                  <FaPaperclip />
                </button>
                <textarea
                  id="chat-input"
                  type="text"
                  value={inputValue}
                  onChange={inputhandle}
                  placeholder={t('chat.typeYourMessage')}
                  className="flex-1 max-h-[300px] py-3 resize-none px-3 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                />
                <button type="button" className="p-3 text-gray-500 hover:text-blue-600">
                  <FaRegSmile />
                </button>
                <button type="button" className="p-3 text-gray-500 hover:text-blue-600">
                  <FaMicrophoneAlt />
                </button>
                <button 
                  type="submit" 
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-full ${
                    inputValue.trim() 
                      ? 'text-blue-600 hover:text-blue-800' 
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <FaPaperPlane />
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                {t('chat.disclaimer')}
              </div>
            </form>
          </div>
        </div>
        
        {/* Info Panel (only shown in desktop view) */}
        <div className="hidden lg:flex flex-col w-80 border-l border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900 mb-1">
              {t('chat.aboutAdvisor')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('chat.advisorDescription')}
            </p>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3">
              {t('chat.capabilities')}
            </h3>
            <ul className="space-y-3">
              {[
                'chat.capabilityInvesting',
                'chat.capabilityRetirement',
                'chat.capabilitySavings',
                'chat.capabilityRealEstate',
                'chat.capabilityTaxes'
              ].map((capability, index) => (
                <li key={index} className="flex text-sm">
                  <span className="w-6 h-6 mr-2 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    ✓
                  </span>
                  <span className='mx-2'>{t(capability)}</span>
                  
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4">
            <h3 className="font-bold text-gray-900 mb-3">
              {t('chat.limitations')}
            </h3>
            <ul className="space-y-3">
              {[
                'chat.limitationDates',
                'chat.limitationPersonal',
                'chat.limitationLegal'
              ].map((limitation, index) => (
                <li key={index} className="flex text-sm">
                  <span className="w-6 h-6  rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                    !
                  </span>
                  <span className='mx-2'>
                    {t(limitation)}
                  </span>
                 
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-auto p-4 border-t border-gray-200">
            <button className="w-full py-2 text-blue-600 text-sm flex items-center justify-center hover:bg-blue-50 rounded-lg transition-colors">
              <FaRegCopy className="mx-2" />
              {t('chat.exportChat')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;