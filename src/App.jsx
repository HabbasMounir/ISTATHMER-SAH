import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaChartLine, FaBook, FaTools, FaChevronDown,FaBars, FaGlobe, FaUsers, FaQuestionCircle,FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';
import { Navbar } from "./components/navBar";
import HeroSection from "./components/hero";
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



function FeaturesSection() {
  const features = [
    {
      icon: <FaBook className="text-blue-600 text-5xl mx-auto mb-4" />,
      title: "Financial Education",
      description: "Access articles and courses on investment and money management."
    },
    {
      icon: <FaTools className="text-blue-600 text-5xl mx-auto mb-4" />,
      title: "Interactive Tools",
      description: "Use investment calculators, portfolio trackers, and risk assessment tools."
    },
    {
      icon: <FaChartLine className="text-blue-600 text-5xl mx-auto mb-4" />,
      title: "Market Insights",
      description: "Stay updated on financial trends and investment opportunities."
    }
  ];

  return (
    <section className="py-16 px-8 grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card key={index} className="shadow-lg hover:shadow-xl transition duration-300">
          <CardContent className="text-center p-6">
            {feature.icon}
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    "This platform changed my financial life!",
    "I learned how to invest wisely thanks to this website."
  ];

  return (
    <section className="py-16 bg-gray-200 text-center">
      <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
      <div className="grid md:grid-cols-2 gap-8 px-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="shadow-lg p-6">
            <CardContent className="text-gray-600">"{testimonial}"</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { 
      question: "How can I start investing?", 
      answer: "Start by learning about different investment types and setting financial goals." 
    },
    { 
      question: "Is this platform free?", 
      answer: "Yes, most of our educational content and tools are free to use." 
    }
  ];

  return (
    <section className="py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <h3 className="text-lg font-semibold cursor-pointer">{faq.question}</h3>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-6">
      <p>&copy; 2025 ISTATHMER SAH. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        {["Home", "Articles", "Courses", "Contact"].map((link) => (
          <a key={link} href="#" className="hover:underline">{link}</a>
        ))}
      </div>
    </footer>
  );
}

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
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}