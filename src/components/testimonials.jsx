import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselContainerRef = useRef(null);
  const intervalRef = useRef(null);
  const { t } = useTranslation();


  const slides = [
    {
      img: "https://i.pravatar.cc/100?img=1",
      iconBg: "bg-blue-400",
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      ),
      text: "This platform completely transformed our workflow efficiency!",
      name: "Sarah Johnson",
      role: "CEO @TechNova",
      roleColor: "text-sky-500"
    },
    {
      img: "https://i.pravatar.cc/100?img=2",
      iconBg: "bg-sky-400",
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      text: "The best investment we've made in our tech stack!",
      name: "Michael Chen",
      role: "CTO @FutureTech",
      roleColor: "text-blue-500"
    },
    {
      img: "https://i.pravatar.cc/100?img=3",
      iconBg: "bg-indigo-400",
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      ),
      text: "Revolutionized our customer engagement metrics overnight!",
      name: "Emma Wilson",
      role: "CMO @DigitalHub",
      roleColor: "text-indigo-500"
    }
  ];

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoScroll();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const startAutoScroll = () => {
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  const resetAutoScroll = () => {
    clearInterval(intervalRef.current);
    startAutoScroll();
  };

  const pauseAutoScroll = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (carouselContainerRef.current) {
      const slideWidth = carouselContainerRef.current.offsetWidth;
      carouselContainerRef.current.scrollTo({
        left: slideWidth * currentIndex,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    startAutoScroll();
    return () => pauseAutoScroll();
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 bg-slate-50 ">
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-12">
          <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
            {t('testimonials.title')}
          </span>
        </h2>

        <div className="relative group">
          <div
            ref={carouselContainerRef}
            className="carousel-container flex overflow-x-auto snap-mandatory scrollbar-hide pb-8"
            onMouseEnter={pauseAutoScroll}
            onMouseLeave={startAutoScroll}
          >
            {slides.map((slide, index) => (
              <div key={index} className="carousel-slide p-4">
                <div className="bg-blue-50 rounded-2xl p-8 shadow-lg shadow-blue-100/50 border border-blue-100 transform transition hover:scale-[1.015]">
                  <div className="relative mb-6">
                    <img
                      src={slide.img}
                      className="w-20 h-20 rounded-full shadow-lg floating-avatar mx-auto border-2 border-white"
                      alt={slide.name}
                    />
                    
                  </div>
                  <p className="text-slate-700 text-lg text-center mb-4 font-medium leading-relaxed">
                    {slide.text}
                  </p>
                  <div className="text-center">
                    <div className="font-bold text-slate-800 text-lg">{slide.name}</div>
                    <div className={`${slide.roleColor} text-sm mt-1 font-medium`}>{slide.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-blue-500 w-6' 
                    : 'bg-blue-100 w-3 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .floating-avatar {
          animation: float 3s ease-in-out infinite;
        }
        .carousel-container {
          scroll-snap-type: x mandatory;
        }
        .carousel-slide {
          flex: 0 0 100%;
          scroll-snap-align: start;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;