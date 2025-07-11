import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import { 
  FaCalendarAlt, 
  FaArrowLeft, 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaMedium, 
  FaEnvelope,
  FaBriefcase,
  FaGraduationCap,
  FaAward,
  FaBookOpen,
  FaMapMarkerAlt,
  FaUserTie,
  FaArrowRight
} from 'react-icons/fa';
import {articles as arArticles} from '../data/ar.js'
import {articles as enArticles} from '../data/en.js'
import { NavBarbg } from '../components/navBar';





const expertsData = {
  en: [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "accounting",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      rating: 4.9,
      reviews: 124,
      location: "New York, NY",
      experience: "12 years",
      bio: "Certified Financial Analyst with expertise in tax planning and corporate finance. Specializes in helping small businesses optimize their financial strategies.",
      availability: "Available for consultation",
      languages: ["English", "Spanish"],
      education: "MBA Finance, Columbia University",
      featured: true,
      tags: ["taxes", "small business", "financial planning", "corporate"]
    },
    {
      id: 2,
      name: "Michael Chen",
      specialty: "investing",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      reviews: 98,
      location: "San Francisco, CA",
      experience: "15 years",
      bio: "Former hedge fund manager with extensive knowledge in market analysis and portfolio diversification. Helps clients build resilient investment portfolios.",
      availability: "Limited availability",
      languages: ["English", "Mandarin"],
      education: "Ph.D. Economics, Stanford University",
      featured: true,
      tags: ["stocks", "portfolio management", "market analysis", "wealth building"]
    },
    {
      id: 3,
      name: "Jessica Williams",
      specialty: "realestate",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      reviews: 76,
      location: "Chicago, IL",
      experience: "10 years",
      bio: "Real estate investment specialist focused on commercial properties and REITs. Expert in analyzing market trends and identifying high-potential properties.",
      availability: "Available for consultation",
      languages: ["English"],
      education: "BS in Real Estate, University of Illinois",
      featured: false,
      tags: ["commercial real estate", "REITs", "property investment", "real estate market"]
    },
    {
      id: 4,
      name: "Robert Garcia",
      specialty: "law",
      image: "https://images.unsplash.com/photo-1542190891-2093d38760f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
      reviews: 143,
      location: "Los Angeles, CA",
      experience: "20 years",
      bio: "Corporate attorney specializing in financial regulations and compliance. Extensive experience working with financial institutions and fintech startups.",
      availability: "By appointment only",
      languages: ["English", "Spanish"],
      education: "JD, UCLA School of Law",
      featured: false,
      tags: ["financial regulations", "corporate law", "compliance", "fintech"]
    },
    {
      id: 5,
      name: "Olivia Martinez",
      specialty: "retirement",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.6,
      reviews: 89,
      location: "Miami, FL",
      experience: "8 years",
      bio: "Retirement planning specialist focused on creating sustainable withdrawal strategies and maximizing social security benefits for retirees.",
      availability: "Available for consultation",
      languages: ["English", "Portuguese"],
      education: "MS Financial Planning, University of Miami",
      featured: false,
      tags: ["retirement planning", "social security", "retirement income", "401k"]
    },
    {
      id: 6,
      name: "David Kim",
      specialty: "stocks",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      reviews: 112,
      location: "Seattle, WA",
      experience: "14 years",
      bio: "Stock market analyst with expertise in technical analysis and trend identification. Former analyst at a major investment bank.",
      availability: "Limited availability",
      languages: ["English", "Korean"],
      education: "MBA Finance, University of Washington",
      featured: true,
      tags: ["technical analysis", "stock market", "day trading", "investment strategies"]
    },
    {
      id: 7,
      name: "Laura Thompson",
      specialty: "saving",
      image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      reviews: 65,
      location: "Boston, MA",
      experience: "7 years",
      bio: "Personal finance coach specializing in budget optimization and debt reduction strategies. Helps families build emergency funds and improve financial security.",
      availability: "Available for consultation",
      languages: ["English"],
      education: "BS Finance, Boston University",
      featured: false,
      tags: ["budgeting", "emergency funds", "debt reduction", "personal finance"]
    },
    {
      id: 8,
      name: "James Wilson",
      specialty: "accounting",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      reviews: 104,
      location: "Dallas, TX",
      experience: "16 years",
      bio: "CPA with expertise in tax planning and business accounting. Specializes in helping entrepreneurs optimize their tax strategies and business structures.",
      availability: "By appointment only",
      languages: ["English"],
      education: "MS Accounting, University of Texas",
      featured: false,
      tags: ["tax planning", "business accounting", "CPA", "tax optimization"]
    },
    {
      id: 9,
      name: "Emily Davis",
      specialty: "law",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
      reviews: 87,
      location: "Washington, DC",
      experience: "12 years",
      bio: "Estate planning attorney specializing in wealth transfer and asset protection. Helps clients create comprehensive estate plans to protect their financial legacy.",
      availability: "Available for consultation",
      languages: ["English", "French"],
      education: "JD, Georgetown Law",
      featured: false,
      tags: ["estate planning", "wills", "trusts", "asset protection"]
    },
    {
      id: 10,
      name: "Daniel Taylor",
      specialty: "investing",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.6,
      reviews: 91,
      location: "Denver, CO",
      experience: "9 years",
      bio: "Investment advisor specializing in sustainable and ESG investing. Helps clients align their investments with their values while achieving financial goals.",
      availability: "Limited availability",
      languages: ["English"],
      education: "MBA Sustainable Business, University of Colorado",
      featured: false,
      tags: ["ESG investing", "sustainable finance", "impact investing", "socially responsible"]
    },
    {
      id: 11,
      name: "Sophia Lee",
      specialty: "retirement",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      reviews: 79,
      location: "Portland, OR",
      experience: "11 years",
      bio: "Retirement income specialist focusing on creating reliable income streams during retirement. Expert in annuities and pension optimization.",
      availability: "Available for consultation",
      languages: ["English", "Japanese"],
      education: "MS Financial Planning, Portland State University",
      featured: false,
      tags: ["retirement income", "annuities", "pension planning", "retirement strategies"]
    },
    {
      id: 12,
      name: "Thomas Anderson",
      specialty: "realestate",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      reviews: 118,
      location: "Austin, TX",
      experience: "13 years",
      bio: "Residential real estate investment expert specializing in rental properties and house flipping strategies. Former real estate developer with extensive market knowledge.",
      availability: "By appointment only",
      languages: ["English"],
      education: "BS in Real Estate, University of Texas",
      featured: false,
      tags: ["residential real estate", "rental properties", "house flipping", "real estate investment"]
    }
  ],
  ar: [
    {
      id: 1,
      name: "سارة جونسون",
      specialty: "accounting",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      rating: 4.9,
      reviews: 124,
      location: "نيويورك",
      experience: "12 سنة",
      bio: "محللة مالية معتمدة متخصصة في التخطيط الضريبي والتمويل المؤسسي. متخصصة في مساعدة الشركات الصغيرة على تحسين استراتيجياتها المالية.",
      availability: "متاحة للاستشارة",
      languages: ["الإنجليزية", "الإسبانية"],
      education: "ماجستير إدارة الأعمال في التمويل، جامعة كولومبيا",
      featured: true,
      tags: ["الضرائب", "الشركات الصغيرة", "التخطيط المالي", "الشركات"]
    },
    {
      id: 2,
      name: "مايكل تشن",
      specialty: "investing",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      reviews: 98,
      location: "سان فرانسيسكو",
      experience: "15 سنة",
      bio: "مدير صندوق تحوط سابق يتمتع بمعرفة واسعة في تحليل السوق وتنويع المحافظ. يساعد العملاء في بناء محافظ استثمارية مرنة.",
      availability: "توفر محدود",
      languages: ["الإنجليزية", "الماندرين"],
      education: "دكتوراه في الاقتصاد، جامعة ستانفورد",
      featured: true,
      tags: ["الأسهم", "إدارة المحافظ", "تحليل السوق", "بناء الثروة"]
    },
    {
      id: 3,
      name: "جيسيكا ويليامز",
      specialty: "realestate",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      reviews: 76,
      location: "شيكاغو",
      experience: "10 سنوات",
      bio: "متخصصة في الاستثمار العقاري تركز على العقارات التجارية وصناديق الاستثمار العقاري. خبيرة في تحليل اتجاهات السوق وتحديد العقارات ذات الإمكانات العالية.",
      availability: "متاحة للاستشارة",
      languages: ["الإنجليزية"],
      education: "بكالوريوس في العقارات، جامعة إلينوي",
      featured: false,
      tags: ["العقارات التجارية", "صناديق الاستثمار العقاري", "الاستثمار العقاري", "سوق العقارات"]
    },
    {
      id: 4,
      name: "روبرت غارسيا",
      specialty: "law",
      image: "https://images.unsplash.com/photo-1542190891-2093d38760f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
      reviews: 143,
      location: "لوس أنجلوس",
      experience: "20 سنة",
      bio: "محامي شركات متخصص في اللوائح المالية والامتثال. خبرة واسعة في العمل مع المؤسسات المالية والشركات الناشئة في مجال التكنولوجيا المالية.",
      availability: "بالموعد فقط",
      languages: ["الإنجليزية", "الإسبانية"],
      education: "دكتوراه في القانون، كلية الحقوق بجامعة كاليفورنيا",
      featured: false,
      tags: ["اللوائح المالية", "قانون الشركات", "الامتثال", "التكنولوجيا المالية"]
    },
    {
      id: 5,
      name: "أوليفيا مارتينيز",
      specialty: "retirement",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.6,
      reviews: 89,
      location: "ميامي",
      experience: "8 سنوات",
      bio: "متخصصة في تخطيط التقاعد تركز على إنشاء استراتيجيات سحب مستدامة وتعظيم مزايا الضمان الاجتماعي للمتقاعدين.",
      availability: "متاحة للاستشارة",
      languages: ["الإنجليزية", "البرتغالية"],
      education: "ماجستير في التخطيط المالي، جامعة ميامي",
      featured: false,
      tags: ["تخطيط التقاعد", "الضمان الاجتماعي", "دخل التقاعد", "401k"]
    },
    {
      id: 6,
      name: "ديفيد كيم",
      specialty: "stocks",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      reviews: 112,
      location: "سياتل",
      experience: "14 سنة",
      bio: "محلل سوق الأسهم متخصص في التحليل الفني وتحديد الاتجاهات. محلل سابق في بنك استثماري كبير.",
      availability: "توفر محدود",
      languages: ["الإنجليزية", "الكورية"],
      education: "ماجستير إدارة الأعمال في التمويل، جامعة واشنطن",
      featured: true,
      tags: ["التحليل الفني", "سوق الأسهم", "التداول اليومي", "استراتيجيات الاستثمار"]
    },
    {
      id: 7,
      name: "لورا طومسون",
      specialty: "saving",
      image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      reviews: 65,
      location: "بوسطن",
      experience: "7 سنوات",
      bio: "مدربة مالية شخصية متخصصة في تحسين الميزانية واستراتيجيات تقليل الديون. تساعد العائلات في بناء صناديق الطوارئ وتحسين الأمن المالي.",
      availability: "متاحة للاستشارة",
      languages: ["الإنجليزية"],
      education: "بكالوريوس في المالية، جامعة بوسطن",
      featured: false,
      tags: ["إعداد الميزانية", "صناديق الطوارئ", "تقليل الديون", "المالية الشخصية"]
    },
    {
      id: 8,
      name: "جيمس ويلسون",
      specialty: "accounting",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      reviews: 104,
      location: "دالاس",
      experience: "16 سنة",
      bio: "محاسب قانوني معتمد متخصص في التخطيط الضريبي ومحاسبة الأعمال. متخصص في مساعدة رواد الأعمال على تحسين استراتيجياتهم الضريبية وهياكل أعمالهم.",
      availability: "بالموعد فقط",
      languages: ["الإنجليزية"],
      education: "ماجستير في المحاسبة، جامعة تكساس",
      featured: false,
      tags: ["التخطيط الضريبي", "محاسبة الأعمال", "محاسب قانوني معتمد", "تحسين الضرائب"]
    },
    {
      id: 9,
      name: "إيميلي ديفيس",
      specialty: "law",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
      reviews: 87,
      location: "واشنطن العاصمة",
      experience: "12 سنة",
      bio: "محامية تخطيط العقارات متخصصة في نقل الثروات وحماية الأصول. تساعد العملاء على إنشاء خطط شاملة للعقارات لحماية إرثهم المالي.",
      availability: "متاحة للاستشارة",
      languages: ["الإنجليزية", "الفرنسية"],
      education: "دكتوراه في القانون، كلية الحقوق بجامعة جورجتاون",
      featured: false,
      tags: ["تخطيط العقارات", "الوصايا", "الصناديق الاستئمانية", "حماية الأصول"]
    },
    {
      id: 10,
      name: "دانيال تايلور",
      specialty: "investing",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.6,
      reviews: 91,
      location: "دنفر",
      experience: "9 سنوات",
      bio: "مستشار استثماري متخصص في الاستثمار المستدام والمسؤول اجتماعيًا. يساعد العملاء على مواءمة استثماراتهم مع قيمهم مع تحقيق الأهداف المالية.",
      availability: "توفر محدود",
      languages: ["الإنجليزية"],
      education: "ماجستير إدارة الأعمال في الأعمال المستدامة، جامعة كولورادو",
      featured: false,
      tags: ["استثمار ESG", "التمويل المستدام", "استثمار الأثر", "استثمار مسؤول اجتماعيًا"]
    },
    {
      id: 11,
      name: "صوفيا لي",
      specialty: "retirement",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      reviews: 79,
      location: "بورتلاند",
      experience: "11 سنة",
      bio: "متخصصة في دخل التقاعد تركز على إنشاء تدفقات دخل موثوقة خلال التقاعد. خبيرة في الأقساط السنوية وتحسين المعاشات التقاعدية.",
      availability: "متاحة للاستشارة",
      languages: ["الإنجليزية", "اليابانية"],
      education: "ماجستير في التخطيط المالي، جامعة ولاية بورتلاند",
      featured: false,
      tags: ["دخل التقاعد", "الأقساط السنوية", "تخطيط المعاشات التقاعدية", "استراتيجيات التقاعد"]
    },
    {
      id: 12,
      name: "توماس أندرسون",
      specialty: "realestate",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      reviews: 118,
      location: "أوستن",
      experience: "13 سنة",
      bio: "خبير في الاستثمار العقاري السكني متخصص في العقارات المؤجرة واستراتيجيات تجديد المنازل. مطور عقاري سابق يتمتع بمعرفة واسعة بالسوق.",
      availability: "بالموعد فقط",
      languages: ["الإنجليزية"],
      education: "بكالوريوس في العقارات، جامعة تكساس",
      featured: false,
      tags: ["العقارات السكنية", "العقارات المؤجرة", "تجديد المنازل", "الاستثمار العقاري"]
    }
  ]
};














function ExpertPage() {
  const { t, i18n } = useTranslation();
  const { expertId } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [authorArticles, setAuthorArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [articles,setArticles]=useState( i18n.language === 'ar'?arArticles:enArticles)
  useEffect(()=>{
    setArticles( i18n.language === 'ar'?arArticles:enArticles)

  },[i18n.language])
  // Sample author data - in a real app, this would be fetched from an API
  const authorData = {
    id: 'mounirHabbas',
    name: 'mounir habbas',
    title: 'Senior Financial Analyst & Investment Advisor',
    avatarLarge: 'https://randomuser.me/api/portraits/men/32.jpg',
    coverImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    location: 'setif , algeria',
    bio: `With over 15 years of experience in financial markets, I specialize in wealth management, 
          retirement planning, and sustainable investing strategies. My approach combines data-driven 
          analysis with personalized financial guidance to help clients achieve their long-term goals.
          
          I'm passionate about making complex financial concepts accessible to everyone and believe 
          that financial literacy is the foundation of economic empowerment. Through my articles and 
          advisory work, I aim to demystify investing and help people make informed financial decisions.`,
    expertise: ['Retirement Planning', 'Wealth Management', 'Sustainable Investing', 'Market Analysis', 'Financial Education'],
    education: [
      {
        degree: 'MBA in Finance',
        institution: 'Harvard Business School',
        year: '2008 - 2010'
      },
      {
        degree: 'B.S. in Economics',
        institution: 'University of Pennsylvania',
        year: '2004 - 2008'
      }
    ],
    experience: [
      {
        position: 'Senior Financial Analyst',
        company: 'Global Investments Inc.',
        period: '2018 - Present',
        description: 'Lead market analysis team and develop investment strategies for high-net-worth clients.'
      },
      {
        position: 'Investment Advisor',
        company: 'Wealth Partners LLC',
        period: '2012 - 2018',
        description: 'Managed diverse portfolios and provided personalized investment advice to clients.'
      },
      {
        position: 'Financial Analyst',
        company: 'Capital Markets Group',
        period: '2010 - 2012',
        description: 'Conducted research and analysis on market trends and investment opportunities.'
      }
    ],
    certifications: [
      'Certified Financial Planner (CFP)',
      'Chartered Financial Analyst (CFA)',
      'Certified Investment Management Analyst (CIMA)'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      medium: 'https://medium.com/@johndoe',
      email: 'mailto:john.doe@example.com'
    }
  };

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setAuthor(authorData);
    // In a real app, you would fetch the author data based on authorId
    // For this example, we'll use the sample data
    const foundExpert = expertsData.en.find(r => `${r.id}` === `${expertId}`);
    if (foundExpert) {
      console.log(expertsData);
      console.log(foundExpert);

      setAuthor({
        id: foundExpert.id,
        name: foundExpert.name,
        // title: 'Senior Financial Analyst & Investment Advisor',
        title: foundExpert.specialty,
        avatarLarge: foundExpert.image,
        coverImage:foundExpert.image,
        location: foundExpert.location,
        bio: foundExpert.bio,
        expertise: ['Retirement Planning', 'Wealth Management', 'Sustainable Investing', 'Market Analysis', 'Financial Education'],
        education: [
          {
            degree: 'MBA in Finance',
            institution: 'Harvard Business School',
            year: '2008 - 2010'
          },
          {
            degree: 'B.S. in Economics',
            institution: 'University of Pennsylvania',
            year: '2004 - 2008'
          }
        ],
        experience: [
          {
            position: 'Senior Financial Analyst',
            company: 'Global Investments Inc.',
            period: '2018 - Present',
            description: 'Lead market analysis team and develop investment strategies for high-net-worth clients.'
          },
          {
            position: 'Investment Advisor',
            company: 'Wealth Partners LLC',
            period: '2012 - 2018',
            description: 'Managed diverse portfolios and provided personalized investment advice to clients.'
          },
          {
            position: 'Financial Analyst',
            company: 'Capital Markets Group',
            period: '2010 - 2012',
            description: 'Conducted research and analysis on market trends and investment opportunities.'
          }
        ],
        certifications: [
          'Certified Financial Planner (CFP)',
          'Chartered Financial Analyst (CFA)',
          'Certified Investment Management Analyst (CIMA)'
        ],
        socialLinks: {
          twitter: 'https://twitter.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe',
          github: 'https://github.com/johndoe',
          medium: 'https://medium.com/@johndoe',
          email: 'mailto:john.doe@example.com'
        }
      });

    }

    // {
    //   id: 3,
    //   name: "Jessica Williams",
    //   specialty: "realestate",
    //   image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    //   rating: 4.8,
    //   reviews: 76,
    //   location: "Chicago, IL",
    //   experience: "10 years",
    //   bio: "Real estate investment specialist focused on commercial properties and REITs. Expert in analyzing market trends and identifying high-potential properties.",
    //   availability: "Available for consultation",
    //   languages: ["English"],
    //   education: "BS in Real Estate, University of Illinois",
    //   featured: false,
    //   tags: ["commercial real estate", "REITs", "property investment", "real estate market"]
    // },


    // Filter articles by this author
    // In a real app, you would have an author field in your articles
    const authorArticlesList = articles
      .filter(article => article.category === 'investing') // Just a placeholder filter
      .slice(0, 6);
    
    setAuthorArticles(authorArticlesList);
    
    setTimeout(() => setLoading(false), 100); // Simulate network delay
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [expertId]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      calendar: i18n.language === 'ar' ? 'islamic' : 'gregory'
    };
    return new Date(dateString).toLocaleDateString(i18n.language, options);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <ExpertLoadingPage/>;
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('author_not_found.title', 'Author Not Found')}</h1>
          <p className="text-gray-600 mb-6">{t('author_not_found.message', 'We couldn\'t find the author you\'re looking for.')}</p>
          <button 
            onClick={goBack}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('article_text.back_to_articles', 'Back to Articles')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <NavBarbg isLightBackground={true} />
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={(userData) => {
          // Handle successful login here
          console.log('Logged in user:', userData);
          // You can add booking logic here
        }}
      />
      
      {/* Cover Image & Author Info */}
      <div className="relative pt-16">
        {/* Cover Image */}
        <div className="h-64 sm:h-80 lg:h-96 w-full overflow-hidden relative">
          <img 
            src={author.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        {/* Author Card (overlapping) */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-24 sm:-mt-32 mb-6">
            <div className="bg-white rounded-xl shadow-lg ">
              <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Avatar */}
                <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden shadow-lg flex-shrink-0 flex relative z-10 -mt-20 md:-mt-0 md:mt-0">
                  <img 
                    src={author.avatarLarge} 
                    alt={author.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Author Info with Book Ticket Button */}
                <div className="text-center md:text-left flex-1 flex flex-col md:flex-row items-center md:items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{author.name}</h1>
                    <p className="text-blue-600 text-lg mb-2">{author.title}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {author.location}
                      </span>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex justify-center md:justify-start space-x-4 mb-6 md:mb-0">
                      {author.socialLinks.twitter && (
                        <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <FaTwitter size={18} />
                        </a>
                      )}
                      {author.socialLinks.linkedin && (
                        <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-blue-700 hover:bg-blue-50 hover:text-blue-800 transition-colors">
                          <FaLinkedin size={18} />
                        </a>
                      )}
                      {author.socialLinks.github && (
                        <a href={author.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <FaGithub size={18} />
                        </a>
                      )}
                      {author.socialLinks.medium && (
                        <a href={author.socialLinks.medium} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <FaMedium size={18} />
                        </a>
                      )}
                      {author.socialLinks.email && (
                        <a href={author.socialLinks.email} className="p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                          <FaEnvelope size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Book a Ticket Button */}
                  <div className="md:self-center">
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95 duration-300"
                    >
                      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                      <span className="relative flex items-center">
                        <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        
                        <span className='mx-2'>
                           {t('book_ticket', 'Book a Ticket')} 
                        </span>
                        
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="border-t border-gray-100 mt-6">
                <div className="flex overflow-x-auto">
                  <button 
                    onClick={() => setActiveTab('about')} 
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      activeTab === 'about' 
                        ? 'border-b-2 border-blue-600 text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {t('author_tabs.about', 'About')}
                  </button>
                  <button 
                    onClick={() => setActiveTab('resume')} 
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      activeTab === 'resume' 
                        ? 'border-b-2 border-blue-600 text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {t('author_tabs.resume', 'Resume')}
                  </button>
                  <button 
                    onClick={() => setActiveTab('articles')} 
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      activeTab === 'articles' 
                        ? 'border-b-2 border-blue-600 text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {t('author_tabs.articles', 'Articles')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bio */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaUserTie className="mr-2 text-blue-600" />
                    {t('author_about.bio', 'Biography')}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {author.bio.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Featured Articles */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaBookOpen className="mr-2 text-blue-600" />
                    {t('author_about.featured_articles', 'Featured Articles')}
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {authorArticles.slice(0, 2).map((article) => (
                      <div key={article.id} className="group">
                        <div className="h-48 rounded-lg overflow-hidden mb-3">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <FaCalendarAlt className="mr-1" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => setActiveTab('articles')}
                    className="w-full mt-6 text-center py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {t('author_about.view_all_articles', 'View All Articles')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Expertise */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {t('author_about.expertise', 'Areas of Expertise')}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {author.expertise.map((skill, index) => (
                      <span key={index} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Certifications */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaAward className="mr-2 text-blue-600" />
                    {t('author_about.certifications', 'Certifications')}
                  </h2>
                  <ul className="space-y-3">
                    {author.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
                <div className="p-6">
                  <div className="text-center">
                    <span className="inline-block p-2 rounded-full bg-blue-100 text-blue-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <h3 className="text-lg font-bold mb-2">
                      {t('author_about.subscribe', 'Subscribe to Updates')}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {t('author_about.subscribe_text', 'Get notified when I publish new articles and insights.')}
                    </p>
                    
                    <input
                      type="email"
                      placeholder={t('newsletter_text.email_placeholder', 'Your email address')}
                      className="w-full px-4 py-2 rounded-lg mb-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all">
                      {t('newsletter_text.subscriberNow', 'Subscribe Now')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Resume Tab */}
        {activeTab === 'resume' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('author_resume.title', 'Professional Experience')}
                </h2>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t('author_resume.download', 'Download CV')}
                </button>
              </div>
              
              {/* Experience Section */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FaBriefcase className="mr-2 text-blue-600" />
                  {t('author_resume.work_experience', 'Work Experience')}
                </h3>
                
                <div className="relative border-l-2 border-blue-200 pl-6 space-y-8">
                  {author.experience.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-10 p-1 bg-white">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          <FaBriefcase size={12} />
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-6">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{exp.position}</h4>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-blue-700 font-medium mb-3">{exp.company}</p>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Education Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FaGraduationCap className="mr-2 text-blue-600" />
                  {t('author_resume.education', 'Education')}
                </h3>
                
                <div className="relative border-l-2 border-blue-200 pl-6 space-y-8">
                  {author.education.map((edu, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-10 p-1 bg-white">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          <FaGraduationCap size={12} />
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-6">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {edu.year}
                          </span>
                        </div>
                        <p className="text-blue-700 font-medium">{edu.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div>
            <div className="flex justify-between gap-[20px] flex-wrap items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('author_articles.title', 'Published Articles')}
              </h2>
              
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                  <option>{t('author_articles.all_categories', 'All Categories')}</option>
                  <option>{t('categories.investing', 'Investing')}</option>
                  <option>{t('categories.saving', 'Saving')}</option>
                  <option>{t('categories.retirement', 'Retirement')}</option>
                </select>
                
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                  <option>{t('author_articles.newest', 'Newest First')}</option>
                  <option>{t('author_articles.oldest', 'Oldest First')}</option>
                  <option>{t('author_articles.popular', 'Most Popular')}</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden group">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-gray-500 text-sm ml-auto flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {formatDate(article.date)}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      <Link to={`/article/${article.id}`}>
                        {article.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                    
                    <Link 
                      to={`/article/${article.id}`}
                      className="text-blue-600 font-medium hover:underline inline-flex items-center"
                    >
                      {t('author_articles.read_more', 'Read More')}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex justify-center">
              <div className="inline-flex rounded-md shadow-sm">
                <button className="px-3 py-2 border border-gray-300 rounded-l-md bg-white text-gray-700 hover:bg-gray-50">
                  {i18n.language === 'ar' ? <FaArrowRight /> : <FaArrowLeft />}
                </button>
                <button className="px-4 py-2 border-t border-b border-gray-300 bg-blue-50 text-blue-600 font-medium">1</button>
                <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">3</button>
                <button className="px-3 py-2 border border-gray-300 rounded-r-md bg-white text-gray-700 hover:bg-gray-50">
                  {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Contact Tab */}
{activeTab === 'contact' && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="md:col-span-2">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('author_contact.title', 'Get in Touch')}
          </h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('author_contact.name', 'Your Name')}
                </label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={t('author_contact.name_placeholder', 'John Doe')}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('author_contact.email', 'Your Email')}
                </label>
                <input 
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={t('author_contact.email_placeholder', 'john@example.com')}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t('author_contact.subject', 'Subject')}
              </label>
              <input 
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={t('author_contact.subject_placeholder', 'How can I help you?')}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t('author_contact.message', 'Message')}
              </label>
              <textarea 
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={t('author_contact.message_placeholder', 'Write your message here...')}
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              {t('author_contact.send_message', 'Send Message')}
            </button>
          </form>
        </div>
      </div>
    </div>

    {/* Contact Info */}
    <div className="md:col-span-1">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {t('author_contact.contact_info', 'Contact Information')}
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <span className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaEnvelope className="text-blue-600 text-xl" />
            </span>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                {t('author_contact.email_title', 'Email')}
              </h4>
              <a 
                href={author.socialLinks.email} 
                className="text-blue-600 hover:underline break-all"
              >
                john.doe@example.com
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <span className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
            </span>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                {t('author_contact.location_title', 'Location')}
              </h4>
              <p className="text-gray-600">{author.location}</p>
            </div>
          </div>

          <div className="flex items-start">
            <span className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaUserTie className="text-blue-600 text-xl" />
            </span>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                {t('author_contact.social_title', 'Social Media')}
              </h4>
              <div className="flex space-x-3 mt-2">
                {author.socialLinks.twitter && (
                  <a href={author.socialLinks.twitter} className="p-2 rounded-full text-blue-400 hover:bg-blue-50">
                    <FaTwitter size={20} />
                  </a>
                )}
                {author.socialLinks.linkedin && (
                  <a href={author.socialLinks.linkedin} className="p-2 rounded-full text-blue-700 hover:bg-blue-50">
                    <FaLinkedin size={20} />
                  </a>
                )}
                {author.socialLinks.github && (
                  <a href={author.socialLinks.github} className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
                    <FaGithub size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
</div>
</div>
  )}
  export default ExpertPage


  function ExpertLoadingPage() {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBarbg isLightBackground={true} />
      
      
        
        <div className="relative pt-16">
          {/* Cover Image Skeleton */}
          <div className="h-64 sm:h-80 lg:h-96 w-full bg-gray-200 animate-pulse"></div>
          
          <div className="container mx-auto px-4">
            <div className="relative -mt-24 sm:-mt-32 mb-6">
              {/* Author Card Skeleton */}
              <div className="bg-white rounded-xl shadow-lg ">
                <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* Avatar Skeleton */}
                  <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden shadow-lg flex-shrink-0 -mt-20 bg-gray-200 animate-pulse"></div>
                  
                  {/* Info Skeleton */}
                  <div className="text-center md:text-left flex-1 space-y-4">
                    <div className="h-8 bg-gray-200 rounded-full w-3/4 mx-auto md:mx-0 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-1/2 mx-auto md:mx-0 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/4 mx-auto md:mx-0 animate-pulse"></div>
                    <div className="flex justify-center md:justify-start space-x-4">
                      {[1,2,3].map((i) => (
                        <div key={i} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Button Skeletons */}
                  <div className="flex flex-col gap-3 sm:self-start w-full md:w-auto">
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-32"></div>
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-32"></div>
                  </div>
                </div>
  
                {/* Tabs Skeleton */}
                <div className="border-t border-gray-100">
                  <div className="flex overflow-x-auto">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="px-6 py-4 w-32 h-12 bg-gray-200 animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Main Content Skeleton */}
        <div className="container mx-auto px-4 pb-16">
          {/* About Tab Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Bio Skeleton */}
              <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded-full w-1/4 animate-pulse"></div>
                {[1,2,3].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded-full w-full animate-pulse"></div>
                ))}
              </div>
              
              {/* Featured Articles Skeleton */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="h-6 bg-gray-200 rounded-full w-1/3 animate-pulse mb-6"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1,2].map((i) => (
                    <div key={i} className="group">
                      <div className="h-48 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded-full w-1/2 animate-pulse mt-2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Right Column */}
            <div className="md:col-span-1 space-y-6">
              {/* Expertise Skeleton */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="h-6 bg-gray-200 rounded-full w-1/3 animate-pulse mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                  ))}
                </div>
              </div>
  
              {/* Certifications Skeleton */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="h-6 bg-gray-200 rounded-full w-1/3 animate-pulse mb-4"></div>
                <div className="space-y-3">
                  {[1,2,3].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded-full w-full animate-pulse"></div>
                  ))}
                </div>
              </div>
  
              {/* Newsletter Skeleton */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="h-4 bg-gray-200 rounded-full w-1/2 mx-auto animate-pulse mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
  
          {/* Resume Tab Skeleton */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="h-6 bg-gray-200 rounded-full w-1/3 animate-pulse mb-6"></div>
            <div className="space-y-8">
              {[1,2,3].map((i) => (
                <div key={i} className="flex items-start">
                  <div className="w-6 h-6 bg-gray-200 rounded-full mr-4 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded-full w-1/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-1/3 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Articles Tab Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded-full w-1/4 animate-pulse mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-3/4 animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Contact Tab Skeleton */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
              <div className="h-6 bg-gray-200 rounded-full w-1/4 animate-pulse mb-6"></div>
              <div className="space-y-6">
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="md:col-span-1 bg-white rounded-xl shadow-md p-6">
              <div className="h-6 bg-gray-200 rounded-full w-1/3 animate-pulse mb-6"></div>
              <div className="space-y-6">
                {[1,2,3].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg mr-4 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded-full w-1/2 animate-pulse mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded-full w-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
  
        {/* Animation Keyframes */}
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