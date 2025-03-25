import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCommentDots, FaSmile, FaFrown, FaLightbulb, FaBug, FaCheckCircle, FaRobot, FaMagic, FaRocket, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { NavBarbg } from '../components/navBar';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-dom-confetti';

function FeedbackPage() {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    sentiment: 3,
    message: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAssistant, setShowAssistant] = useState(true);
  const [isExploding, setIsExploding] = useState(false);

  const feedbackTypes = [
    { id: 'bug', icon: <FaBug />, label: t('feedback.bug'), color: 'red', emoji: '🐛',htextColor:'hover:text-red-500',hbgColor100:'hover:bg-red-100',ring:'ring-red-300' },
    { id: 'feature', icon: <FaLightbulb />, label: t('feedback.feature'), color: 'blue', emoji: '💡',htextColor:'hover:text-blue-500' ,hbgColor100:'hover:bg-blue-100',ring:'ring-blue-300'  },
    { id: 'praise', icon: <FaSmile />, label: t('feedback.praise'), color: 'yellow', emoji: '🌟',htextColor:'hover:text-yellow-500' ,hbgColor100:'hover:bg-yellow-100',ring:'ring-yellow-300'  },
    { id: 'general', icon: <FaCommentDots />, label: t('feedback.general'), color: 'purple', emoji: '💬',htextColor:'hover:text-purple-500',hbgColor100:'hover:bg-purple-100' ,ring:'ring-purple-300'  },
  ];

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    colors: ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899']
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsExploding(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep(4);
    setIsSubmitting(false);
  };

  const ProgressDots = () => (
    <div className="flex justify-center gap-2 mb-8">
      {[1, 2, 3].map((dot) => (
        <div 
          key={dot}
          className={`w-3 h-3 rounded-full transition-all ${step >= dot ? 'bg-blue-600' : 'bg-gray-200'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <NavBarbg isLightBackground={false} />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <motion.div 
          className="absolute top-20 left-1/4 w-48 h-48 bg-blue-100 rounded-full blur-xl opacity-30"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-40 right-1/4 w-64 h-64 bg-purple-100 rounded-full blur-xl opacity-30"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <header className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 pt-32 pb-48">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl text-center font-bold text-white p-2 mb-6"
          >
            <span className="bg-gradient-to-r text-center  from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              {t('feedback.title')}
            </span>
          </motion.h1>
          <p className="text-xl text-blue-100 text-center max-w-2xl mx-auto">
            {t('feedback.subtitle')}
          </p>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-12 -mt-32">
        <div className="max-w-2xl mx-auto bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
          {/* AI Assistant */}
          {/* {showAssistant && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 p-6 flex items-start gap-4 border-b border-blue-100"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <FaRobot className="text-2xl text-white animate-wiggle" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-2">
                  {t('feedback.assistantText')} 
                  <span className="ml-2">👋</span>
                </p>
                <button 
                  onClick={() => setShowAssistant(false)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {t('feedback.dismissAssistant')}
                </button>
              </div>
            </motion.div>
          )} */}

          <form onSubmit={handleSubmit} className="p-8">

            <AnimatePresence mode='wait'>
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-bold text-gray-800">
                    {t('feedback.categoryTitle')} <span className="text-blue-600">→</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feedbackTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => {
                          setFormData({...formData, type: type.id});
                          setStep(2);
                        }}
                        className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 ${type.hbgColor100}  transition-all ${
                          formData.type === type.id 
                            ? `border-${type.color}-300 bg-${type.color}-100`
                            : `border-gray-200 border-${type.color}-300 `
                        }`}
                      >
                        <span className={`text-3xl text-${type.color}-500 mb-2`}>
                          {type.icon}
                        </span>
                        <span className="text-lg font-medium text-gray-700">
                          {type.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-8"
                >
                 

                  <h3 className="text-2xl font-bold flex items-center justify-between text-gray-800">
                    {t('feedback.detailsTitle')}
                    
                     <span className={`text-${feedbackTypes[feedbackTypes.findIndex(item => item.id === formData.type)].color}-500 flex gap-2 items-center`}>

                        {formData.type}
                    </span>
                  </h3>
               
                  <div className="space-y-6">
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('feedback.sentimentLabel')}
                      </label>
                      <div className="flex justify-between gap-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setFormData({...formData, sentiment: num})}
                            className={`flex-1 p-3 rounded-xl transition-all ${
                              formData.sentiment === num 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            }`}
                          >
                            {num <= formData.sentiment ? '⭐' : '☆'}
                          </button>
                        ))}
                      </div>
                    </div> */}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('feedback.messageLabel')}
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className={`w-full ${feedbackTypes[feedbackTypes.findIndex(item => item.id === formData.type)].ring} p-4 border border-gray-200 rounded-xl focus:ring-2 
 focus:border-transparent  focus:outline-transparent`}
                        rows="4"
                        placeholder={t('feedback.messagePlaceholder',{type:feedbackTypes[feedbackTypes.findIndex(item => item.id === formData.type)].label})}
                        required
                      />
                    </div>
                  </div>
<div className='flex gap-4'>
<button 
                    type="button"
                    onClick={() => setStep(1)}
                    className={`flex items-center text-gray-500  ${feedbackTypes[feedbackTypes.findIndex(item => item.id === formData.type)].htextColor}`}
                  >
    {i18n.language === 'ar'?
                <FaChevronRight className={` ml-2`} />
                    :
                <FaChevronLeft className={` mr-2`} />
                    }          
                              {t('feedback.back')}
                  </button>


<motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setStep(3)}
                    className={`w-full bg-${feedbackTypes[feedbackTypes.findIndex(item => item.id === formData.type)].color}-500 text-white py-4 px-8 rounded-xl font-medium flex items-center justify-center gap-2`}
                  >
                    {t('feedback.continue')}
                    {feedbackTypes[feedbackTypes.findIndex(item => item.id === formData.type)].icon}
                  </motion.button>

                 
</div>
                  
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-8"
                >
           

                  <h3 className="text-2xl font-bold text-gray-800">
                    {t('feedback.reviewTitle')} 🔍
                  </h3>

                  <div className="space-y-6 bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-gray-400">
                        {feedbackTypes.find(t => t.id === formData.type)?.icon}
                      </span>
                      <div>
                        <p className="text-sm text-gray-500">{t('feedback.categoryLabel')}</p>
                        <p className="font-medium">
                          {feedbackTypes.find(t => t.id === formData.type)?.label}
                        </p>
                      </div>
                    </div>

                    {/* <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {Array(formData.sentiment).fill('⭐').join('')}
                      </span>
                    </div> */}

                    <div>
                      <p className="text-sm text-gray-500 mb-2">{t('feedback.messageLabel')}</p>
                      <p className="whitespace-pre-line bg-white p-4 rounded-lg">
                        {formData.message}
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-4'>

                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className={`flex items-center text-gray-500  `}
                  >
                    {i18n.language === 'ar'?
                <FaChevronRight className={` ml-2`} />
                    :
                <FaChevronLeft className={` mr-2`} />
                    }
                    {t('feedback.back')}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-medium relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="h-6 w-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                      />
                    ) : (
                      <>
                        {t('feedback.submit')}
                        <Confetti active={isExploding} config={confettiConfig} />
                      </>
                    )}
                  </motion.button>
                  </div>


                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="inline-block text-center mb-6 relative">
                    <FaCheckCircle className="text-6xl text-green-500 animate-pop-in" />
                    <div className="absolute inset-0 bg-green-500 rounded-full opacity-0 animate-ripple" />
                  </div>
                  <h3 className="text-2xl text-center font-bold text-gray-800 mb-4">
                    {t('feedback.successTitle')} 🎉
                  </h3>
                  <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
                    {t('feedback.successText')}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 inline-block">
                    <p className="text-center text-sm text-gray-500">
                      {t('feedback.funFact')}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;