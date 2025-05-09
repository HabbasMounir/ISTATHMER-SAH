import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaFilter, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaChevronRight, FaChevronLeft, FaEnvelope, FaPhone, FaLinkedin, FaChevronDown, FaTimes, FaCheck } from 'react-icons/fa';
import { NavBarbg } from '../components/navBar';
import { Link } from 'react-router-dom';

// Sample experts data - you would replace this with your API call or import
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

export default function ExpertsPage() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSpecialty, setActiveSpecialty] = useState('all');
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [isLoading, setIsLoading] = useState(true);

  // Get experts based on current language
  const experts = expertsData[i18n.language] || expertsData.en;

  // List of specialties for filter
  const specialties = [
    { id: 'all', label: t('experts.all_specialties', 'All Specialties') },
    { id: 'accounting', label: t('experts.accounting', 'Accounting') },
    { id: 'investing', label: t('experts.investing', 'Investing') },
    { id: 'realestate', label: t('experts.realestate', 'Real Estate') },
    { id: 'law', label: t('experts.law', 'Law') },
    { id: 'retirement', label: t('experts.retirement', 'Retirement') },
    { id: 'stocks', label: t('experts.stocks', 'Stocks') },
    { id: 'saving', label: t('experts.saving', 'Saving') }
  ];

  // Filter and sort experts
  useEffect(() => {
    setIsLoading(true);
    let filtered = [...experts];

    // Apply specialty filter
    if (activeSpecialty !== 'all') {
      filtered = filtered.filter(expert => expert.specialty === activeSpecialty);
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(expert =>
        expert.name.toLowerCase().includes(searchLower) ||
        expert.bio.toLowerCase().includes(searchLower) ||
        expert.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    setFilteredExperts(filtered);
    setTimeout(() => setIsLoading(false), 100);
  }, [experts, activeSpecialty, searchTerm, sortBy, i18n.language]);

  return (
    <div className="min-h-screen bg-gray-50" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <NavBarbg isLightBackground={false} />
      
      {/* Header Section */}
      <div className="pt-24 pb-12  bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container h-28 mx-auto px-4">
          {/* <h1 className="text-4xl font-bold text-white mb-4">
            {t('experts.title', 'Financial Experts')}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {t('experts.subtitle', 'Connect with top financial experts for personalized guidance and professional advice.')}
          </p> */}
        </div>
      </div>

      {/* Search and Filter Section */}
      {/* <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('experts.search_placeholder', 'Search experts by name, expertise, or keywords...')}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="w-full md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white"
              >
                <option value="rating">{t('experts.sort_by_rating', 'Sort by Rating')}</option>
                <option value="experience">{t('experts.sort_by_experience', 'Sort by Experience')}</option>
                <option value="reviews">{t('experts.sort_by_reviews', 'Sort by Reviews')}</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {specialties.map(specialty => (
              <button
                key={specialty.id}
                onClick={() => setActiveSpecialty(specialty.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSpecialty === specialty.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {specialty.label}
              </button>
            ))}
          </div>
        </div>
      </div> */}


{/* Search and Filter Section */}
<div className="container mx-auto px-4 -mt-20  mb-6">
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <div className="flex flex-col space-y-5">
      {/* Search and Sort Row */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar with Animation */}
        <div className="flex-1 relative group">
          <FaSearch className={`absolute ${i18n.language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('experts.search_placeholder', 'Search experts by name, expertise, or keywords...')}
            className={`w-full ${i18n.language === 'ar' ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-3.5 rounded-lg border border-gray-200 bg-gray-50 group-focus-within:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className={`absolute ${i18n.language === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`}
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown with Custom Styling */}
        <div className="w-full md:w-56 relative">
          <div 
            onClick={() => document.getElementById('sort-dropdown').classList.toggle('hidden')}
            className="w-full px-4 py-3.5
             rounded-lg border-1
             border-gray-200 
              bg-gradient-to-r from-gray-50 to-white
              hover:from-blue-50 hover:to-white
              cursor-pointer transition-all duration-300 
              flex items-center justify-between
              text-gray-700 font-medium shadow-sm hover:shadow-md"
          >
            <span>{t(`experts.sort_by_${sortBy}`, sortBy === 'rating' ? 'Sort by Rating' : 
                   sortBy === 'experience' ? 'Sort by Experience' : 
                   'Sort by Reviews')}</span>
            <FaChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-300" />
          </div>

          <div 
            id="sort-dropdown"
            className="hidden 
            absolute z-50 w-full mt-2 
            bg-white border border-gray-200 
            rounded-lg shadow-lg overflow-hidden"
          >
            <div 
              onClick={() => {
                setSortBy('rating');
                document.getElementById('sort-dropdown').classList.add('hidden');
              }}
              className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors flex items-center justify-between
                ${sortBy === 'rating' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
            >
              {t('experts.sort_by_rating', 'Sort by Rating')}
            </div>
            <div 
              onClick={() => {
                setSortBy('experience');
                document.getElementById('sort-dropdown').classList.add('hidden');
              }}
              className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors flex items-center justify-between
                ${sortBy === 'experience' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
            >
              {t('experts.sort_by_experience', 'Sort by Experience')}
            </div>
            <div 
              onClick={() => {
                setSortBy('reviews');
                document.getElementById('sort-dropdown').classList.add('hidden');
              }}
              className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors flex items-center justify-between
                ${sortBy === 'reviews' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
            >
              {t('experts.sort_by_reviews', 'Sort by Reviews')}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* Specialty Filters with scrollable container */}
<div className="relative">
  {/* Desktop view */}
  <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-2">
    {specialties.map(specialty => (
      <button
        key={specialty.id}
        onClick={() => setActiveSpecialty(specialty.id)}
        className={`
          px-4 py-2 rounded-lg
          text-sm font-medium
          transition-colors duration-200
          ${activeSpecialty === specialty.id
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-100'
          }
        `}
      >
        {specialty.label}
      </button>
    ))}
  </div>

  {/* Mobile dropdown */}
  <div className="md:hidden">
    <button 
      onClick={() => document.getElementById('specialty-dropdown').classList.toggle('hidden')}
      className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-100
        flex items-center justify-between
        text-gray-700"
    >
      {specialties.find(s => s.id === activeSpecialty)?.label || 'Select Specialty'}
      <FaChevronDown className="text-gray-400" />
    </button>

    <div 
      id="specialty-dropdown"
      className="hidden absolute top-full left-0 right-0 mt-1
        bg-white rounded-lg shadow-sm border border-gray-100
        max-h-48 overflow-y-auto z-50"
    >
      {specialties.map(specialty => (
        <button
          key={specialty.id}
          onClick={() => {
            setActiveSpecialty(specialty.id);
            document.getElementById('specialty-dropdown').classList.add('hidden');
          }}
          className={`
            w-full px-4 py-2
            text-left text-sm
            ${activeSpecialty === specialty.id
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          {specialty.label}
        </button>
      ))}
    </div>
  </div>
</div>
    </div>
  </div>
</div>
      {/* Experts Grid */}
      <div className="container mx-auto px-4 pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : filteredExperts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {t('experts.no_results', 'No experts found matching your criteria.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperts.map(expert => (

<Link
  to={`/expert/${expert.id}`}
  key={expert.id}
  className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
>
  <div className="flex flex-col h-full">
    {/* Image Container with Gradient Overlay */}
    <div className="relative h-60 overflow-hidden">
      <img
        src={expert.image}
        alt={expert.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      {/* Rating Badge - Positioned on top right */}
      {/* <div className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md"> */}
      <span className="absolute top-4 right-4  inline-block text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
            {t(`experts.${expert.specialty}`, expert.specialty)}
          </span>
      {/* </div> */}
    </div>
    
    {/* Content Section */}
    <div className="p-5 flex flex-col flex-grow">
      {/* Expert Name and Categories */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{expert.name}</h3>
       {/*  <div className="flex flex-wrap gap-2 mb-3"> 
         
          <span className="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            {expert.experience}
          </span> 
        </div> */}
      </div>
      
      {/* Bio Text */}
      <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
        {expert.bio}
      </p>
      
      {/* Footer Section */}
      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
        {/* Location */}
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-gray-400 w-4 h-4 mr-1.5" />
          <span className="text-gray-600 text-sm">{expert.location}</span>
        </div>
        
        {/* View Details Button */}
        <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
          {/* {t('experts.view_details', 'View Details')} */}
          {/* <FaChevronRight className="ml-1.5 w-3 h-3 transform group-hover:translate-x-1 transition-transform" /> */}
          <FaStar className="text-yellow-500 w-4 h-4 mr-1.5" />
        <span className="font-bold text-gray-800">{expert.rating}</span>
        <span className="text-gray-600 text-sm ml-1">
          ({expert.reviews})
        </span>
        </div> 

       
      </div>
    </div>
  </div>
</Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}