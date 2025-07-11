import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "@/layout/layout";
import Home from "@/pages/home";
// import  Loading_home, { Loading }  from "./loading_pages/Lhome";
import ArticlesPage from "./pages/articles";
import { Suspense, useEffect } from "react";
import ArticleAdminPanel from "./pages/articleadmin";
import NotFoundPage from "./pages/err404";
import ArticlePage from "./pages/article";
import AuthorPage from "./pages/author";
import BMCTool from "./tools/bmc3";
import BMCTool2 from "./tools/bmc";
// import FinancialCalculator from "./tools/vanc";
import FinancialCalculator from "./tools/van";
import FinancialLiteracyPage from "./pages/awareness";
import Feedback from "./pages/contact";
import { useTranslation } from "react-i18next";
import AISupportPage from "./pages/ai";
import TransactionsPage from "./pages/IslamicConsulting";
import ShuraMaliDetails from "./pages/IslamicConsultingDetails";
import ExpertPage from "./pages/expert";
import ExpertsPage from "./pages/expertsPage";
import QRCodePage from "./pages/qrcode";

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






export function convertSpacesAndUnderscores(str) {
  let result = '';
  
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      result += '_';
    } else if (str[i] === '_') {
      result += ' ';
    } else {
      result += str[i];
    }
  }
  
  return result;
}
String.prototype.convertSpacesAndUnderscores = function() {
  return convertSpacesAndUnderscores(this);
};



export default function App() {
  let location = useLocation();
  const { t, i18n } = useTranslation();
useEffect(()=>{

    document.querySelector('html').scrollIntoView({ behavior: "smooth", block: "start" });
    
  
},[location])
useEffect(()=>{
  console.log(location)
  document.title=`${location.pathname.split('/')[2]?location.pathname.split('/')[2].convertSpacesAndUnderscores():location.pathname.split('/')[1]?t(`navbar.${location.pathname.split('/')[1]}`):i18n.language=='ar'?'استثمر صح':'istathmer sah'  } `
},[i18n.language ,location])
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={  <Suspense fallback={<Home.loading />}><Home /></Suspense>} />
          <Route path="/home" element={  <Suspense fallback={<Home.loading />}><Home /></Suspense>} />
          {/* <Route path="/loading" element={} /> */}
          <Route path="/article" element={<Suspense fallback={<ArticlesPage.loading />}><ArticlePage /></Suspense>} />
          <Route path="/articles" element={<Suspense fallback={<ArticlesPage.loading />}><ArticlesPage /></Suspense>} />
          <Route path="/articles/:id" element={<ArticlePage />} />

          <Route path="/author" element={<AuthorPage />} />
          <Route path="/contact" element={<Feedback />} />
          
          <Route path="/articlesadmin" element={<ArticleAdminPanel />} />
          <Route path="/tools" element={<BMCTool />} />
          <Route path="/toolsold" element={<BMCTool2 />} />
          {/* <Route path="/cas" element={<FinancialCalculator />} /> */}
          <Route path="/investmentcalculator" element={<FinancialCalculator />} />
          <Route path="/awareness" element={<FinancialLiteracyPage />} />
          <Route path="/chat_bot" element={<AISupportPage />} />
          <Route path="/islamicconsulting" element={<TransactionsPage />} />
          <Route path="/islamicconsulting/:id" element={<ShuraMaliDetails />} />
          <Route path="/experts" element={<ExpertsPage />} />
          <Route path="/expert/:expertId" element={<ExpertPage />} />
          <Route path="qr" element={<QRCodePage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
}