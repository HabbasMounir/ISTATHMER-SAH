import HeroSection from "@/components/hero";
import {FeaturesSectionCreative } from "@/components/features";
import ArticleSection from "@/components/articles";
import TestimonialsSection from "@/components/testimonials";
import FAQSection from "@/components/faq";
import { NavBarbg } from "../components/navBar";
const Home = () => {
    return (
        <>
        <NavBarbg isLightBackground={false} />
         <HeroSection />
        <FeaturesSectionCreative />
        <ArticleSection />
        <TestimonialsSection />
        <FAQSection />
        </>
    )
  };
  
  Home.loading=Loading;

  export default Home;











   function Loading() {
    return (
      <div className="min-h-screen">
        {/* Hero Loading Section */}
        <div className="relative  h-[60vh] bg-gradient-to-r from-blue-500 to-indigo-600">
          {/* Floating Elements Skeleton */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/4 right-32 w-16 h-16 border-4 border-white/20 rounded-full animate-pulse"></div>
          </div>
  
          {/* Hero Content Skeleton */}
          <div className="container pt-[100px] mx-auto h-full flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 w-11/12 space-y-4">
              <div className="h-12 bg-white/30 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-4 bg-white/30 rounded-full w-full animate-pulse"></div>
              <div className="h-4 bg-white/30 rounded-full w-5/6 animate-pulse"></div>
              <div className="h-12 w-48 bg-white/30 rounded-lg animate-pulse"></div>
            </div>
            <div className="md:w-1/2 hidden md:block">
              {/* <div className="w-48 h-48 bg-white/30 rounded-full animate-pulse"></div> */}
            </div>
          </div>
        </div>
  
        {/* Content Loading Sections */}
        <div className="container mx-auto px-4 py-12 space-y-20">        
          {/* Articles Loading */}
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded-full w-full"></div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded-full w-full"></div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded-full w-full"></div>
              </div>
            ))}
          </div>
  
          {/* Testimonials Loading */}
          <div className="max-w-4xl mx-auto space-y-8">
            {[1,2,3].map((i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded-full w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                </div>
              </div>
            ))}
          </div>
  
        </div>
  
        {/* Global Animations */}
        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>
      </div>
    );
  }