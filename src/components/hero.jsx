

import Illu from '@/assets/jsvgx/illu'; 
import { Button } from './ui/button';

function HeroSection() {
  return (
    <header className="relative overflow-hidden px-10 py-40 md:py-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      {/* Floating Elements */}
      <div className="hidden md:block absolute inset-0 z-0">
        {/* Abstract Blob */}
        <svg 
          viewBox="0 0 200 200" 
          className="absolute top-20 left-20 w-32 h-32 animate-float"
          style={{ animationDelay: '2s' }}
        >
          <path
            fill="rgba(255,255,255,0.1)"
            d="M45.6,-56.1C59.5,-44.6,71.5,-32.3,73.5,-18.1C75.5,-3.8,67.5,12.5,60.3,29.6C53.1,46.7,46.7,64.7,34.1,72.5C21.5,80.3,2.7,77.9,-13.7,71.7C-30.2,65.5,-44.3,55.5,-54.1,42.6C-64,29.7,-69.5,13.8,-70.8,-2.6C-72.1,-19,-69.2,-38,-59.2,-50.8C-49.2,-63.6,-32.1,-70.3,-15.7,-72.6C0.7,-74.9,1.4,-72.9,15.2,-67.6C29,-62.3,55.9,-53.7,63.4,-41.2C70.9,-28.6,59,-12.3,56.3,2.5C53.6,17.3,60.1,34.5,57.5,49.1C54.9,63.7,43.1,75.6,29.9,78.5C16.7,81.4,2.1,75.2,-10.6,68.4C-23.4,61.6,-34.3,54.2,-44.6,45.2C-54.9,36.3,-64.6,25.7,-67.9,13.1C-71.3,0.4,-68.4,-14.4,-61.3,-26.1C-54.2,-37.8,-42.9,-46.5,-31.6,-59.2C-20.3,-71.9,-8.9,-88.6,3.4,-94.1C15.7,-99.6,31.7,-93.9,45.6,-56.1Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Floating Circles */}
        <div className="absolute top-1/4 right-32 w-16 h-16 animate-float">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="4"/>
          </svg>
        </div>

        
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Empowering You to<br className="hidden md:block"/> Invest Right
          </h2>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto md:mx-0 opacity-90">
            Learn how to manage your finances and make smart investment decisions.
          </p>
          <Button 
            className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg shadow-md hover:bg-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Start Learning Today
          </Button>
        </div>

        <div className="hidden md:block md:w-1/2 mt-8 md:mt-0 relative flex items-center justify-center">
          <div className="relative z-10 p-10"> 
            <Illu className="w-48 h-auto" /> 
          </div>
        </div>
      </div>

      {/* Add these styles to your CSS file or CSS-in-JS */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes blob {
          0% {
            transform: scale(1) translate(0px, 0px);
          }
          33% {
            transform: scale(1.05) translate(10px, -10px);
          }
          66% {
            transform: scale(0.95) translate(-10px, 10px);
          }
          100% {
            transform: scale(1) translate(0px, 0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
}

export default HeroSection;
