import { useTranslation } from 'react-i18next';
import { NavBarbg } from '../components/navBar';
import qrCodeImage from '@/assets/qrcode.png';
import { motion } from 'framer-motion';

function QRCodePage() {
  const { i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 flex items-center justify-center relative overflow-hidden" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <NavBarbg isLightBackground={false} />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <motion.div 
          className="absolute top-1/4 right-32 w-16 h-16"
          animate={{ y: [-10, 10], scale: [0.95, 1.05] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="4"/>
          </svg>
        </motion.div>
        
        {/* Abstract Shapes */}
        <motion.div 
          className="absolute -top-20 -left-20 w-72 h-72"
          animate={{ rotate: 360, scale: [0.8, 1.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              fill="rgba(255,255,255,0.1)"
              d="M45.6,-56.1C59.5,-44.6,71.5,-32.3,73.5,-18.1C75.5,-3.8,67.5,12.5,60.3,29.6C53.1,46.7,46.7,64.7,34.1,72.5C21.5,80.3,2.7,77.9,-13.7,71.7C-30.2,65.5,-44.3,55.5,-54.1,42.6C-64,29.7,-69.5,13.8,-70.8,-2.6C-72.1,-19,-69.2,-38,-59.2,-50.8C-49.2,-63.6,-32.1,-70.3,-15.7,-72.6C0.7,-74.9,1.4,-72.9,15.2,-67.6C29,-62.3,55.9,-53.7,63.4,-41.2C70.9,-28.6,59,-12.3,56.3,2.5C53.6,17.3,60.1,34.5,57.5,49.1C54.9,63.7,43.1,75.6,29.9,78.5C16.7,81.4,2.1,75.2,-10.6,68.4C-23.4,61.6,-34.3,54.2,-44.6,45.2C-54.9,36.3,-64.6,25.7,-67.9,13.1C-71.3,0.4,-68.4,-14.4,-61.3,-26.1C-54.2,-37.8,-42.9,-46.5,-31.6,-59.2C-20.3,-71.9,-8.9,-88.6,3.4,-94.1C15.7,-99.6,31.7,-93.9,45.6,-56.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* QR Code Container */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-2 bg-gradient-to-r from-blue-400/30 via-indigo-400/30 to-purple-400/30 rounded-2xl backdrop-blur-lg">
          <motion.div 
            className="relative bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src={qrCodeImage}
              alt="QR Code"
              className="w-72 h-72 object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-xl pointer-events-none" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default QRCodePage;