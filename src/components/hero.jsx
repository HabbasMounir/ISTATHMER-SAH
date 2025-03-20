import { Button } from "@/components/ui/button";

// function HeroSection() {
//   return (
//     <header className="text-center py-32 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//       <h2 className="text-4xl font-bold mb-4">Empowering You to Invest Right</h2>
//       <p className="text-lg mb-6">Learn how to manage your finances and make smart investment decisions.</p>
//       <Button className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200">
//         Start Learning Today
//       </Button>
//     </header>
//   );
// }
 
// export default HeroSection

// function HeroSection() {
//     return (
//       <header className="relative overflow-hidden text-center py-32 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//         {/* Floating Elements */}
//         <div className="hidden md:block absolute inset-0 z-0">
//           {/* Abstract Blob */}
//           <svg 
//             viewBox="0 0 200 200" 
//             className="absolute top-20 left-20 w-48 h-48 animate-float"
//             style={{ animationDelay: '2s' }}
//           >
//             <path
//               fill="rgba(255,255,255,0.1)"
//               d="M45.6,-56.1C59.5,-44.6,71.5,-32.3,73.5,-18.1C75.5,-3.8,67.5,12.5,60.3,29.6C53.1,46.7,46.7,64.7,34.1,72.5C21.5,80.3,2.7,77.9,-13.7,71.7C-30.2,65.5,-44.3,55.5,-54.1,42.6C-64,29.7,-69.5,13.8,-70.8,-2.6C-72.1,-19,-69.2,-38,-59.2,-50.8C-49.2,-63.6,-32.1,-70.3,-15.7,-72.6C0.7,-74.9,1.4,-72.9,15.2,-67.6C29,-62.3,55.9,-53.7,63.4,-41.2C70.9,-28.6,59,-12.3,56.3,2.5C53.6,17.3,60.1,34.5,57.5,49.1C54.9,63.7,43.1,75.6,29.9,78.5C16.7,81.4,2.1,75.2,-10.6,68.4C-23.4,61.6,-34.3,54.2,-44.6,45.2C-54.9,36.3,-64.6,25.7,-67.9,13.1C-71.3,0.4,-68.4,-14.4,-61.3,-26.1C-54.2,-37.8,-42.9,-46.5,-31.6,-59.2C-20.3,-71.9,-8.9,-88.6,3.4,-94.1C15.7,-99.6,31.7,-93.9,45.6,-56.1Z"
//               transform="translate(100 100)"
//             />
//           </svg>
  
//           {/* Financial Chart Illustration */}
//           <svg 
//             viewBox="0 0 400 200" 
//             className="absolute bottom-20 right-32 w-64 h-32 opacity-75"
//           >
//             <path 
//               stroke="white" 
//               strokeWidth="2" 
//               fill="none" 
//               d="M20 180 L80 120 L140 160 L200 100 L260 140 L320 80 L380 120"
//             />
//             <circle cx="20" cy="180" r="3" fill="white" />
//             <circle cx="380" cy="120" r="3" fill="white" />
//           </svg>
  
//           {/* Animated Rocket */}
          
  
//           {/* Rotating Circles */}
//           <div className="absolute top-1/3 left-32 w-24 h-24 animate-spin-slow">
//             <svg viewBox="0 0 100 100" className="w-full h-full">
//               <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="4"/>
//               <circle cx="50" cy="50" r="35" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="4"/>
//             </svg>
//           </div>
//         </div>
  
//         {/* Content */}
//         <div className="relative z-10 container mx-auto px-4">
//           <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//             Empowering You to<br className="hidden md:block"/> Invest Right
//           </h2>
//           <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
//             Learn how to manage your finances and make smart investment decisions.
//           </p>
//           <Button 
//             className="bg-white text-blue-600 font-bold px-8 py-3 rounded-xl shadow-xl hover:bg-gray-100 transform transition-all duration-300 hover:scale-105"
//           >
//             Start Learning Today
//           </Button>
//         </div>
  
//         {/* Add these styles to your CSS file or CSS-in-JS */}
//         <style jsx>{`
//           @keyframes float {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-20px); }
//             100% { transform: translateY(0px); }
//           }
//           .animate-float {
//             animation: float 6s ease-in-out infinite;
//           }
//           .animate-spin-slow {
//             animation: spin 20s linear infinite;
//           }
//           @keyframes spin {
//             from { transform: rotate(0deg); }
//             to { transform: rotate(360deg); }
//           }
//         `}</style>
//       </header>
//     );
//   }
  
//   export default HeroSection;




// // import Illu from '@/assets/jsvgx/illu'; 

// // function HeroSection() {
// //   return (
// //     <header className="relative overflow-hidden py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
// //       {/* Floating Elements */}
// //       <div className="hidden md:block absolute inset-0 z-0">
// //         {/* Abstract Blob */}
// //         <svg 
// //           viewBox="0 0 200 200" 
// //           className="absolute top-20 left-20 w-32 h-32 animate-float"
// //           style={{ animationDelay: '2s' }}
// //         >
// //           <path
// //             fill="rgba(255,255,255,0.1)"
// //             d="M45.6,-56.1C59.5,-44.6,71.5,-32.3,73.5,-18.1C75.5,-3.8,67.5,12.5,60.3,29.6C53.1,46.7,46.7,64.7,34.1,72.5C21.5,80.3,2.7,77.9,-13.7,71.7C-30.2,65.5,-44.3,55.5,-54.1,42.6C-64,29.7,-69.5,13.8,-70.8,-2.6C-72.1,-19,-69.2,-38,-59.2,-50.8C-49.2,-63.6,-32.1,-70.3,-15.7,-72.6C0.7,-74.9,1.4,-72.9,15.2,-67.6C29,-62.3,55.9,-53.7,63.4,-41.2C70.9,-28.6,59,-12.3,56.3,2.5C53.6,17.3,60.1,34.5,57.5,49.1C54.9,63.7,43.1,75.6,29.9,78.5C16.7,81.4,2.1,75.2,-10.6,68.4C-23.4,61.6,-34.3,54.2,-44.6,45.2C-54.9,36.3,-64.6,25.7,-67.9,13.1C-71.3,0.4,-68.4,-14.4,-61.3,-26.1C-54.2,-37.8,-42.9,-46.5,-31.6,-59.2C-20.3,-71.9,-8.9,-88.6,3.4,-94.1C15.7,-99.6,31.7,-93.9,45.6,-56.1Z"
// //             transform="translate(100 100)"
// //           />
// //         </svg>

// //         {/* Floating Circles */}
// //         <div className="absolute top-1/4 right-32 w-16 h-16 animate-float">
// //           <svg viewBox="0 0 100 100" className="w-full h-full">
// //             <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="4"/>
// //           </svg>
// //         </div>

// //         {/* Rotating Circles */}
// //         <div className="absolute top-1/3 left-32 w-16 h-16 animate-spin-slow">
// //           <svg viewBox="0 0 100 100" className="w-full h-full">
// //             <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="4"/>
// //             <circle cx="50" cy="50" r="35" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="4"/>
// //           </svg>
// //         </div>
// //       </div>

// //       {/* Content */}
// //       <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
// //         {/* Text Content */}
// //         <div className="md:w-1/2 text-center md:text-left">
// //           <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
// //             Empowering You to<br className="hidden md:block"/> Invest Right
// //           </h2>
// //           <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto md:mx-0 opacity-90">
// //             Learn how to manage your finances and make smart investment decisions.
// //           </p>
// //           <Button 
// //             className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg shadow-md hover:bg-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
// //           >
// //             Start Learning Today
// //           </Button>
// //         </div>

// //         {/* Illu SVG with Blob Background */}
// //         <div className="hidden md:block md:w-1/2 mt-8 md:mt-0 relative">
// //           {/* Blob Background */}
// //           <svg 
// //             viewBox="0 0 500 500" 
// //             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 animate-blob"
// //           >
// //             <path 
// //               fill="rgba(255,255,255,0.1)"
// //               d="M45.6,-56.1C59.5,-44.6,71.5,-32.3,73.5,-18.1C75.5,-3.8,67.5,12.5,60.3,29.6C53.1,46.7,46.7,64.7,34.1,72.5C21.5,80.3,2.7,77.9,-13.7,71.7C-30.2,65.5,-44.3,55.5,-54.1,42.6C-64,29.7,-69.5,13.8,-70.8,-2.6C-72.1,-19,-69.2,-38,-59.2,-50.8C-49.2,-63.6,-32.1,-70.3,-15.7,-72.6C0.7,-74.9,1.4,-72.9,15.2,-67.6C29,-62.3,55.9,-53.7,63.4,-41.2C70.9,-28.6,59,-12.3,56.3,2.5C53.6,17.3,60.1,34.5,57.5,49.1C54.9,63.7,43.1,75.6,29.9,78.5C16.7,81.4,2.1,75.2,-10.6,68.4C-23.4,61.6,-34.3,54.2,-44.6,45.2C-54.9,36.3,-64.6,25.7,-67.9,13.1C-71.3,0.4,-68.4,-14.4,-61.3,-26.1C-54.2,-37.8,-42.9,-46.5,-31.6,-59.2C-20.3,-71.9,-8.9,-88.6,3.4,-94.1C15.7,-99.6,31.7,-93.9,45.6,-56.1Z"
// //               transform="translate(250 250)"
// //             />
// //           </svg>
// //           {/* Illu SVG */}
// //           <Illu className="relative z-10 w-full h-auto max-w-sm mx-auto" />
// //         </div>
// //       </div>

// //       {/* Add these styles to your CSS file or CSS-in-JS */}
// //       <style jsx>{`
// //         @keyframes float {
// //           0% { transform: translateY(0px); }
// //           50% { transform: translateY(-10px); }
// //           100% { transform: translateY(0px); }
// //         }
// //         @keyframes blob {
// //           0% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
// //           50% { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
// //           100% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
// //         }
// //         .animate-float {
// //           animation: float 6s ease-in-out infinite;
// //         }
// //         .animate-blob {
// //           animation: blob 8s ease-in-out infinite;
// //         }
// //         .animate-spin-slow {
// //           animation: spin 20s linear infinite;
// //         }
// //         @keyframes spin {
// //           from { transform: rotate(0deg); }
// //           to { transform: rotate(360deg); }
// //         }
// //       `}</style>
// //     </header>
// //   );
// // }

// // export default HeroSection;








// import Illu from '@/assets/jsvgx/illu'; // Import the Illu component

// function HeroSection() {
//   return (
//     <header className="relative overflow-hidden py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//       {/* Floating Elements */}
//       <div className="hidden md:block absolute inset-0 z-0">
//         {/* (Optional) Additional floating shapes can be kept or removed */}
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
//         {/* Text Content */}
//         <div className="md:w-1/2 text-center md:text-left">
//           <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
//             Empowering You to<br className="hidden md:block" /> Invest Right
//           </h2>
//           <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto md:mx-0 opacity-90">
//             Learn how to manage your finances and make smart investment decisions.
//           </p>
//           <Button className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg shadow-md hover:bg-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
//             Start Learning Today
//           </Button>
//         </div>

//         {/* Illu Section with Animated Morphing Blob Background */}
//         <div className="hidden md:flex md:w-1/2 mt-8 md:mt-0 relative justify-center items-center">
//           {/* Animated Blob Background */}
//           <svg viewBox="0 0 500 500" className="absolute w-80 h-80">
//             <defs>
//               <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
//                 <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
//               </linearGradient>
//             </defs>
//             <path fill="url(#blobGradient)">
//               <animate
//                 attributeName="d"
//                 dur="12s"
//                 repeatCount="indefinite"
//                 values="
//                   M421,300Q393,350,348,374Q303,398,260,412Q217,426,181,399Q145,372,104,338Q63,304,67,247Q71,190,98,141Q125,92,174,75Q223,58,266,41Q309,24,356,47Q403,70,425,119Q447,168,421,300Z;
//                   M438,306Q406,362,360,387Q314,412,270,419Q226,426,189,400Q152,374,112,343Q72,312,67,258Q62,204,86,156Q110,108,159,95Q208,82,257,65Q306,48,354,66Q402,84,432,127Q462,170,438,306Z;
//                   M421,300Q393,350,348,374Q303,398,260,412Q217,426,181,399Q145,372,104,338Q63,304,67,247Q71,190,98,141Q125,92,174,75Q223,58,266,41Q309,24,356,47Q403,70,425,119Q447,168,421,300Z
//                 "
//               />
//             </path>
//           </svg>
//           {/* Smaller Illu SVG */}
//           <Illu className="relative z-10 w-full h-auto max-w-xs mx-auto" />
//         </div>
//       </div>

//       {/* Additional Styles */}
//       <style jsx>{`
//         @keyframes float {
//           0% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//           100% {
//             transform: translateY(0px);
//           }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//     </header>
//   );
// }

// export default HeroSection;




import Illu from '@/assets/jsvgx/illu'; 

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

        {/* Rotating Circles */}
        <div className="absolute top-1/3 left-32 w-16 h-16 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="4"/>
            <circle cx="50" cy="50" r="35" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="4"/>
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

        {/* Illu SVG with Blob Background */}
        <div className="hidden md:block md:w-1/2 mt-8 md:mt-0 relative flex items-center justify-center">
          {/* Dynamic Blob Background */}
          <svg 
            viewBox="0 0 500 500" 
            className="absolute w-96 h-96 animate-blob"
            style={{ fill: '#ffffff' }} // 100% white
          >
            <path 
              d="M45.6,-56.1C59.5,-44.6,71.5,-32.3,73.5,-18.1C75.5,-3.8,67.5,12.5,60.3,29.6C53.1,46.7,46.7,64.7,34.1,72.5C21.5,80.3,2.7,77.9,-13.7,71.7C-30.2,65.5,-44.3,55.5,-54.1,42.6C-64,29.7,-69.5,13.8,-70.8,-2.6C-72.1,-19,-69.2,-38,-59.2,-50.8C-49.2,-63.6,-32.1,-70.3,-15.7,-72.6C0.7,-74.9,1.4,-72.9,15.2,-67.6C29,-62.3,55.9,-53.7,63.4,-41.2C70.9,-28.6,59,-12.3,56.3,2.5C53.6,17.3,60.1,34.5,57.5,49.1C54.9,63.7,43.1,75.6,29.9,78.5C16.7,81.4,2.1,75.2,-10.6,68.4C-23.4,61.6,-34.3,54.2,-44.6,45.2C-54.9,36.3,-64.6,25.7,-67.9,13.1C-71.3,0.4,-68.4,-14.4,-61.3,-26.1C-54.2,-37.8,-42.9,-46.5,-31.6,-59.2C-20.3,-71.9,-8.9,-88.6,3.4,-94.1C15.7,-99.6,31.7,-93.9,45.6,-56.1Z"
              transform="translate(250 250)"
            />
          </svg>
          {/* Illu SVG with Padding */}
          <div className="relative z-10 p-10"> {/* 40px padding */}
            <Illu className="w-48 h-auto" /> {/* Adjusted size */}
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
          0% { border-radius: 0% 0% 0% 0%/0% 0% 0% 0%; }
          50% { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 1s ease-in-out infinite;
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