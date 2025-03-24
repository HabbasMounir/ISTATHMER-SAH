import { useState } from 'react';
import { 
  FaArrowLeft, FaArrowRight, FaCalculator, FaLocationArrow, 
  FaMoneyBillWave, FaBuilding, FaChartLine, FaMapMarkedAlt, 
  FaWallet, FaPercentage, FaHandHoldingUsd, FaCity, 
  FaBookmark
} from 'react-icons/fa';

const investmentFields = [
  { 
    id: 'real_estate', 
    title: 'العقارات', 
    icon: <FaBuilding className="text-3xl text-blue-600" />,
    description: 'استثمار في العقارات السكنية والتجارية',
    projects: [
      { id: 'residential', name: 'مشروع سكني', minCost: 5000000 },
      { id: 'commercial', name: 'مشروع تجاري', minCost: 8000000 },
      { id: 'mixed_use', name: 'مشروع متعدد الاستخدامات', minCost: 12000000 },
    ] 
  },
  { 
    id: 'commerce', 
    title: 'التجارة', 
    icon: <FaMoneyBillWave className="text-3xl text-green-600" />,
    description: 'استثمار في تجارة التجزئة والجملة',
    projects: [
      { id: 'retail', name: 'محل تجزئة', minCost: 2000000 },
      { id: 'wholesale', name: 'تجارة جملة', minCost: 4000000 },
      { id: 'e_commerce', name: 'تجارة إلكترونية', minCost: 1000000 },
    ]
  },
  { 
    id: 'services', 
    title: 'الخدمات', 
    icon: <FaChartLine className="text-3xl text-purple-600" />,
    description: 'استثمار في قطاع الخدمات المختلفة',
    projects: [
      { id: 'restaurant', name: 'مطعم', minCost: 3000000 },
      { id: 'cafe', name: 'مقهى', minCost: 1500000 },
      { id: 'salon', name: 'صالون تجميل', minCost: 1000000 },
    ]
  },
];

// Data for regions and their cost modifiers
const regionsData = {
  'الجزائر العاصمة': {
    costModifier: 1.5,
    locations: [
      { id: 'hydra', name: 'حيدرة', modifier: 1.8 },
      { id: 'el_biar', name: 'الأبيار', modifier: 1.6 },
      { id: 'bab_el_oued', name: 'باب الواد', modifier: 1.3 },
    ]
  },
  'وهران': {
    costModifier: 1.2,
    locations: [
      { id: 'ain_turk', name: 'عين الترك', modifier: 1.3 },
      { id: 'center', name: 'وسط المدينة', modifier: 1.4 },
      { id: 'es_senia', name: 'السانية', modifier: 1.1 },
    ]
  },
  'قسنطينة': {
    costModifier: 1.1,
    locations: [
      { id: 'sidi_mabrouk', name: 'سيدي مبروك', modifier: 1.2 },
      { id: 'zouaghi', name: 'زواغي', modifier: 1.1 },
      { id: 'downtown', name: 'وسط المدينة', modifier: 1.3 },
    ]
  },
};

// Common project costs categories
const commonCosts = [
  { id: 'land', name: 'تكلفة الأرض', isRequired: true },
  { id: 'permits', name: 'تراخيص وتصاريح', isRequired: true },
  { id: 'utilities', name: 'مرافق (ماء، كهرباء، غاز)', isRequired: true },
  { id: 'marketing', name: 'تسويق وإعلان', isRequired: true },
  { id: 'operations', name: 'تكاليف التشغيل', isRequired: true },
  { id: 'staff', name: 'الموظفين والعمال', isRequired: true },
];

// Specific costs by project type
const specificCosts = {
  'real_estate': [
    { id: 'construction', name: 'تكاليف البناء', isRequired: true },
    { id: 'design', name: 'تصميم هندسي', isRequired: true },
    { id: 'furniture', name: 'أثاث وتجهيزات', isRequired: false },
  ],
  'commerce': [
    { id: 'inventory', name: 'المخزون', isRequired: true },
    { id: 'equipment', name: 'معدات وتجهيزات', isRequired: true },
    { id: 'delivery', name: 'نظام التوصيل', isRequired: false },
  ],
  'services': [
    { id: 'equipment', name: 'معدات وتجهيزات', isRequired: true },
    { id: 'training', name: 'تدريب الموظفين', isRequired: true },
    { id: 'maintenance', name: 'صيانة دورية', isRequired: false },
  ]
};

const InvestmentCalculator = () => {
  // State variables for the multi-step form
  const [step, setStep] = useState(1);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [costs, setCosts] = useState({});
  const [customCosts, setCustomCosts] = useState([]);
  const [financingType, setFinancingType] = useState(null);
  const [loanDetails, setLoanDetails] = useState({
    amount: 0,
    interestRate: 5,
    term: 5
  });
  const [revenue, setRevenue] = useState({
    initialAmount: 0,
    growthRate: 5
  });
  const [vanResults, setVanResults] = useState(null);

  // Handle selecting an investment field
  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setStep(2);
  };

  // Handle selecting a project
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setStep(3);
  };

  // Handle region and location selection
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setStep(4);
  };

  // Handle cost inputs
  const handleCostChange = (id, value) => {
    setCosts(prev => ({
      ...prev,
      [id]: parseFloat(value) || 0
    }));
  };

  // Add custom cost
  const handleAddCustomCost = () => {
    const newCustomCost = { id: `custom_${customCosts.length + 1}`, name: '', value: 0 };
    setCustomCosts([...customCosts, newCustomCost]);
  };

  // Update custom cost
  const handleCustomCostChange = (index, field, value) => {
    const updatedCosts = [...customCosts];
    updatedCosts[index] = { ...updatedCosts[index], [field]: value };
    setCustomCosts(updatedCosts);
  };

  // Handle financing selection
  const handleFinancingSelect = (type) => {
    setFinancingType(type);
    if (type === 'loan') {
      setStep(6);
    } else {
      calculateVAN();
      setStep(7);
    }
  };

  // Handle loan details
  const handleLoanDetailChange = (field, value) => {
    setLoanDetails(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  // Handle revenue details
  const handleRevenueChange = (field, value) => {
    setRevenue(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };
  const formatNumber = (num) => 
    num?.toLocaleString('ar-DZ', { style: 'currency', currency: 'DZD', maximumFractionDigits: 0 }) || 'DZD 0';

  // Enhanced progress bar
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goBack}
          disabled={step === 1}
          className={`px-4 py-2 rounded-lg flex items-center ${
            step === 1 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90'
          }`}
        >
          <FaArrowLeft className="inline-block ml-2" />
          رجوع
        </button>
        
        <div className="text-lg font-bold text-gray-600">
          الخطوة {step} من 7
        </div>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${(step / 7) * 100}%` }}
        />
      </div>
    </div>
  );

  // Enhanced step headers
  const StepHeader = ({ title, icon }) => (
    <div className="text-center mb-8">
      <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white mb-4">
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
  );

  // Enhanced card component
  const Card = ({ children, className = '', onClick }) => (
    <div 
      onClick={onClick}
      className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-300 ${className}`}
    >
      {children}
    </div>
  );

  // Enhanced input component
  const InputField = ({ label, icon, value, onChange, type = 'number', required = false }) => (
    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative rounded-lg shadow-sm">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="block w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          required={required}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
          {icon}
        </div>
        {type === 'number' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
            دج
          </div>
        )}
      </div>
    </div>
  );


  const calculateVAN = () => {
    // Calculate total initial costs
    let totalInitialCost = Object.values(costs).reduce((sum, cost) => sum + (cost || 0), 0);
    
    // Add custom costs
    const totalCustomCosts = customCosts.reduce((sum, cost) => sum + (parseFloat(cost.value) || 0), 0);
    totalInitialCost += totalCustomCosts;

    // Calculate cashflows for 10 years
    const years = 10;
    const cashflows = [];
    let loanPayment = 0;
    
    // Calculate loan payment if financing by loan
    if (financingType === 'loan') {
      const principal = loanDetails.amount;
      const interestRate = loanDetails.interestRate / 100;
      const term = loanDetails.term;
      
      // Calculate annual payment using the formula for equal payments
      // P * r * (1 + r)^n / ((1 + r)^n - 1)
      const r = interestRate;
      loanPayment = principal * r * Math.pow(1 + r, term) / (Math.pow(1 + r, term) - 1);
    }

    // Initial period (year 0) - initial investment
    cashflows.push(-totalInitialCost);
    
    // Calculate cash flows for each year
    for (let year = 1; year <= years; year++) {
      // Revenue with growth
      let yearlyRevenue = revenue.initialAmount * Math.pow(1 + revenue.growthRate / 100, year - 1);
      
      // Operating expenses (estimate as 40% of revenue)
      const operatingExpenses = yearlyRevenue * 0.4;
      
      // Loan payment if applicable
      const yearlyLoanPayment = financingType === 'loan' && year <= loanDetails.term ? loanPayment : 0;
      
      // Net cash flow
      const netCashFlow = yearlyRevenue - operatingExpenses - yearlyLoanPayment;
      
      cashflows.push(netCashFlow);
    }
    
    // Calculate NPV (VAN)
    const discountRate = 0.1; // 10% discount rate
    const npv = calculateNPV(cashflows, discountRate);
    
    // Calculate IRR
    const irr = calculateIRR(cashflows);
    
    // Calculate payback period
    let cumulativeCashFlow = -totalInitialCost;
    let paybackPeriod = 0;
    
    for (let i = 1; i < cashflows.length; i++) {
      cumulativeCashFlow += cashflows[i];
      if (cumulativeCashFlow >= 0 && paybackPeriod === 0) {
        // Simple payback period calculation
        paybackPeriod = i - 1 + (-cumulativeCashFlow + cashflows[i]) / cashflows[i];
      }
    }
    
    setVanResults({
      npv,
      irr,
      paybackPeriod,
      cashflows,
      totalInvestment: totalInitialCost
    });
    
    setStep(7);
  };

  // Calculate NPV (VAN)
  const calculateNPV = (cashflows, rate) => {
    return cashflows.reduce((npv, cashflow, t) => npv + cashflow / Math.pow(1 + rate, t), 0);
  };

  // Calculate IRR (Use approximation)
  const calculateIRR = (cashflows) => {
    const maxIterations = 1000;
    const precision = 0.00001;
    
    let guess = 0.1; // Start with 10%
    
    for (let i = 0; i < maxIterations; i++) {
      const npv = calculateNPV(cashflows, guess);
      
      if (Math.abs(npv) < precision) {
        return guess;
      }
      
      // Use a simple approach to adjust the guess
      guess = npv > 0 ? guess + 0.01 : guess - 0.01;
      
      if (guess <= 0) {
        return 0; // Negative IRR doesn't make sense in most cases
      }
      
      if (guess > 1) {
        return 1; // Cap at 100% for simplicity
      }
    }
    
    return null; // Could not converge
  };

  // Handle final submission
  const handleCalculate = () => {
    if (financingType === 'loan') {
      calculateVAN();
    }
  };

  // Go to previous step
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <StepHeader 
              title="اختر مجال الاستثمار" 
              icon={<FaBuilding className="text-3xl" />}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {investmentFields.map(field => (
                <Card key={field.id} onClick={() => handleFieldSelect(field)}>
                  <div className="flex flex-col items-center text-center space-y-4">
                    {field.icon}
                    <h3 className="text-xl font-bold">{field.title}</h3>
                    <p className="text-gray-600">{field.description}</p>
                    <div className="mt-4 bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm">
                      الحد الأدنى: {formatNumber(field.projects[0].minCost)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

// Step 2: Project Selection
case 2:
  return (
    <div className="space-y-6">
      <StepHeader 
        title="اختر نوع المشروع" 
        icon={<FaChartLine className="text-3xl" />}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedField?.projects.map(project => (
          <Card key={project.id} onClick={() => handleProjectSelect(project)}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <FaMoneyBillWave className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold">{project.name}</h3>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm">
                الحد الأدنى: {formatNumber(project.minCost)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

// Step 3: Region Selection
case 3:
  return (
    <div className="space-y-8">
      <StepHeader
        title="اختر منطقة المشروع"
        icon={<FaMapMarkedAlt className="text-3xl" />}
      />
      
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-blue-800">الولاية</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(regionsData).map(region => (
            <Card
              key={region}
              onClick={() => handleRegionSelect(region)}
              className={selectedRegion === region ? 'border-blue-500 bg-blue-50' : ''}
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <FaCity className="text-blue-500" />
                <span className="font-medium">{region}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedRegion && (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-6 text-blue-800">المنطقة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {regionsData[selectedRegion].locations.map(location => (
              <Card
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className={selectedLocation?.id === location.id ? 'border-blue-500 bg-blue-50' : ''}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{location.name}</span>
                  <FaLocationArrow className="text-blue-500" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

// Step 4: Cost Calculation
case 4:
  return (
    <div className="space-y-8">
      <StepHeader
        title="تحديد تكاليف المشروع"
        icon={<FaCalculator className="text-3xl" />}
      />

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-blue-800">التكاليف الأساسية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commonCosts.map(cost => (
            <InputField
              key={cost.id}
              label={cost.name}
              icon={<FaWallet className="text-gray-500" />}
              value={costs[cost.id] || ''}
              onChange={(e) => handleCostChange(cost.id, e.target.value)}
              required={cost.isRequired}
            />
          ))}
        </div>
      </div>

      {selectedField && (
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-6 text-blue-800">التكاليف الخاصة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specificCosts[selectedField.id].map(cost => (
              <InputField
                key={cost.id}
                label={cost.name}
                icon={<FaMoneyBillWave className="text-gray-500" />}
                value={costs[cost.id] || ''}
                onChange={(e) => handleCostChange(cost.id, e.target.value)}
                required={cost.isRequired}
              />
            ))}
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-800">تكاليف إضافية</h3>
          <button
            onClick={handleAddCustomCost}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:opacity-90"
          >
            + إضافة تكلفة
          </button>
        </div>
        
        {customCosts.map((cost, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <InputField
              label="اسم التكلفة"
              type="text"
              value={cost.name}
              onChange={(e) => handleCustomCostChange(index, 'name', e.target.value)}
              icon={<FaBookmark className="text-gray-500" />}
            />
            <InputField
              label="القيمة"
              value={cost.value}
              onChange={(e) => handleCustomCostChange(index, 'value', e.target.value)}
              icon={<FaWallet className="text-gray-500" />}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
              <button
                onClick={() => setStep(5)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                متابعة
              </button>
            </div>
    </div>
  );

// Step 5: Financing Selection
case 5:
  return (
    <div className="space-y-8">
      <StepHeader
        title="طريقة التمويل"
        icon={<FaHandHoldingUsd className="text-3xl" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card onClick={() => handleFinancingSelect('self')}>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white">
              <FaWallet className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold">تمويل ذاتي</h3>
            <p className="text-gray-600">استخدام رأس المال الشخصي</p>
          </div>
        </Card>

        <Card onClick={() => handleFinancingSelect('loan')}>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white">
              <FaMoneyBillWave className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold">قرض بنكي</h3>
            <p className="text-gray-600">تمويل جزئي أو كلي</p>
          </div>
        </Card>
      </div>
    </div>
  );

// Step 6: Loan Details
case 6:
  return (
    <div className="space-y-8">
      <StepHeader
        title="تفاصيل القرض"
        icon={<FaPercentage className="text-3xl" />}
      />
      
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            label="مبلغ القرض"
            icon={<FaHandHoldingUsd className="text-gray-500" />}
            value={loanDetails.amount}
            onChange={(e) => handleLoanDetailChange('amount', e.target.value)}
          />
          
          <InputField
            label="معدل الفائدة"
            icon={<FaPercentage className="text-gray-500" />}
            value={loanDetails.interestRate}
            onChange={(e) => handleLoanDetailChange('interestRate', e.target.value)}
          />
          
          <InputField
            label="مدة القرض (سنوات)"
            icon={<FaCalendarAlt className="text-gray-500" />}
            value={loanDetails.term}
            onChange={(e) => handleLoanDetailChange('term', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

      case 7:
        return (
          <div className="space-y-8">
            <StepHeader
              title="نتائج التحليل المالي"
              icon={<FaCalculator className="text-3xl" />}
            />
            {vanResults && (
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-6 rounded-xl">
                    <p className="text-sm">القيمة الحالية الصافية (VAN)</p>
                    <p className="text-2xl font-bold">{formatNumber(vanResults.npv)}</p>
                  </div>
                  {/* Add other result cards similarly */}
                </div>
                {/* Rest of results display */}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-800 rounded-3xl p-8 shadow-2xl">
          <ProgressBar />
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;