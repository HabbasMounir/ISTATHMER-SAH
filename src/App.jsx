import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaChartLine, FaBook, FaTools, FaChevronDown,FaBars, FaGlobe, FaUsers, FaQuestionCircle,FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';
import { Navbar } from "./components/navBar";
import HeroSection from "./components/hero";
import {FeaturesSectionCreative } from "./components/features";
import ArticleSection from "./components/articles";
import TestimonialsSection from "./components/testimonials";
import FAQSection from "./components/faq";
import { Footer } from "./components/footer";
// import { FaChevronDown, FaGlobe, FaBars, FaTimes } from 'react-icons/fa';
// function Navbar({ isToolsOpen, setIsToolsOpen, isLanguageOpen, setIsLanguageOpen, language, setLanguage }) {
//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-50">
//       <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">ISTATHMER SAH</h1>
//       <ul className="flex gap-4 items-center">
//         {["Home", "Articles", "Courses", "About Us", "Contact"].map((item) => (
//           <li key={item} className="text-gray-700 hover:text-blue-600 cursor-pointer transition duration-300">
//             {item}
//           </li>
//         ))}
//         <li className="relative cursor-pointer text-gray-700 hover:text-blue-600 transition duration-300" onClick={() => setIsToolsOpen(!isToolsOpen)}>
//           Tools <FaChevronDown className="inline ml-1" />
//           {isToolsOpen && (
//             <ul className="absolute bg-white shadow-md mt-2 py-2 rounded-lg w-40">
//               {["Investment Calculator", "Risk Assessment", "Portfolio Tracker"].map((tool) => (
//                 <li key={tool} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{tool}</li>
//               ))}
//             </ul>
//           )}
//         </li>
//         <li className="relative cursor-pointer text-gray-700 hover:text-blue-600 transition duration-300" onClick={() => setIsLanguageOpen(!isLanguageOpen)}>
//           <FaGlobe className="inline mr-1" /> {language} <FaChevronDown className="inline ml-1" />
//           {isLanguageOpen && (
//             <ul className="absolute bg-white shadow-md mt-2 py-2 rounded-lg w-32">
//               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setLanguage("EN")}>🇺🇸 English</li>
//               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setLanguage("AR")}>🇸🇦 عربي</li>
//             </ul>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// }








export default function Home() {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        isToolsOpen={isToolsOpen}
        setIsToolsOpen={setIsToolsOpen}
        isLanguageOpen={isLanguageOpen}
        setIsLanguageOpen={setIsLanguageOpen}
        language={language}
        setLanguage={setLanguage}
      />
      <HeroSection />
      {/* <FeaturesSection /> */}
      {/* <FeaturesSectionModern /> */}
      {/* <FeaturesSectionLight /> */}
      <FeaturesSectionCreative />
      <ArticleSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}