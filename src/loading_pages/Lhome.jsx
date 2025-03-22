import { FaSpinner } from 'react-icons/fa';

export function Loading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] mt-16 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated Blob */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main loader */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        {/* Spinner with gradient */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full absolute border-4 border-gray-200"></div>
          <div className="w-16 h-16 rounded-full animate-spin border-4 border-blue-500 border-t-transparent"></div>
        </div>

        {/* Text with fade animation */}
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Loading
          </h2>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce animation-delay-200"></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-full h-full bg-blue-600 origin-left animate-progress"></div>
        </div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-0 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,white)]">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 32V0h32v32H0z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes progress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

import { FaRocket, FaChartLine, FaWallet } from 'react-icons/fa';

export default function Loading_home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] mt-16 flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50/30">
      {/* Main loader container */}
      <div className="relative max-w-4xl w-full px-4 py-12">
        {/* Animated grid background */}
        <div className="absolute inset-0 -z-10 opacity-15">
          <div className="h-full w-full bg-grid-blue-500/[0.05] [mask-image:linear-gradient(to_bottom,transparent,white)]" />
        </div>

        {/* Content skeleton */}
        <div className="animate-pulse space-y-8">
          {/* Header skeleton */}
          <div className="flex flex-col items-center space-y-4">
            <div className="h-10 w-48 rounded-full bg-blue-200/80"></div>
            <div className="h-6 w-64 rounded-full bg-blue-200/60"></div>
          </div>

          {/* Cards grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/20">
                {/* Icon placeholder */}
                <div className="mb-4 h-12 w-12 animate-pulse rounded-lg bg-blue-200/50"></div>
                
                {/* Text placeholders */}
                <div className="space-y-2">
                  <div className="h-5 w-3/4 rounded-lg bg-blue-200/40"></div>
                  <div className="h-4 w-5/6 rounded-lg bg-blue-200/30"></div>
                  <div className="h-4 w-2/3 rounded-lg bg-blue-200/30"></div>
                </div>

                {/* Shimmer overlay */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            ))}
          </div>

          {/* Animated tools row */}
          <div className="flex items-center justify-center space-x-8 py-12">
            <FaRocket className="h-12 w-12 text-blue-400 animate-bounce" />
            <FaChartLine className="h-12 w-12 text-indigo-400 animate-bounce animation-delay-200" />
            <FaWallet className="h-12 w-12 text-sky-400 animate-bounce animation-delay-400" />
          </div>

          {/* Progress indicator */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-2 w-64 overflow-hidden rounded-full bg-blue-100">
              <div className="absolute h-full w-full origin-left animate-progress bg-gradient-to-r from-blue-400 to-indigo-500" />
            </div>
            <div className="h-4 w-32 rounded-full bg-blue-200/40"></div>
          </div>
        </div>
      </div>

      {/* Global animations */}
      <style jsx global>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          90% { transform: scaleX(1); }
          100% { transform: scaleX(1); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .animate-progress {
          animation: progress 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        .animate-bounce {
          animation: bounce 1.5s infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .bg-grid-blue-500\/\[0\.05\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%232963ff'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </div>
  );
}

export function Loading1() {
  return (
    <div className="min-h-screen">
      {/* Hero Loading Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-blue-500 to-indigo-600">
        {/* Floating Elements Skeleton */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/4 right-32 w-16 h-16 border-4 border-white/20 rounded-full animate-pulse"></div>
        </div>

        {/* Hero Content Skeleton */}
        <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-4">
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