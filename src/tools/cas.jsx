import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCalculator, FaLocationArrow, FaMoneyBillWave, FaBuilding, FaChartLine, FaMapMarkedAlt, FaWallet } from 'react-icons/fa';
import { NavBarbg } from '../components/navBar';

// Data structure for investment fields
const investmentFields = [
  { 
    id: 'real_estate1', 
    title: 'test', 
    icon: <FaBuilding className="text-3xl text-blue-600" />,
    description: 'استثمار في العقارات السكنية والتجارية',
    projects: [
      { id: 'residential', name: 'مشروع ttttt', minCost: 5000000 },
      { id: 'commercial', name: 'مشروع تجاري', minCost: 8000000 },
      { id: 'mixed_use', name: 'مشروع متعدد الاستخدامات', minCost: 12000000 },
    ] 
  },
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
  'سطيف العاصمة': {
    costModifier: 1.5,
    locations: [
      { id: 'hydra', name: 'سطيف', modifier: 1.8 },
      { id: 'el_biar', name: 'العلمة', modifier: 1.6 },
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
//   { id: 'land', name: 'تكلفة الأرض', isRequired: true },
  { id: 'permits', name: 'تراخيص وتصاريح', isRequired: true },
  { id: 'utilities', name: 'مرافق (ماء، كهرباء، غاز)', isRequired: true },
//   { id: 'marketing', name: 'تسويق وإعلان', isRequired: true },
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

// Main component
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
    num?.toLocaleString('ar-DZ', { maximumFractionDigits: 0 }) || 0;
  const renderVANResults = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-blue-800">النتائج المالية</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">القيمة الحالية الصافية (VAN)</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatNumber(vanResults.npv)} دج
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">معدل العائد الداخلي (IRR)</p>
          <p className="text-2xl font-bold text-green-600">
            {(vanResults.irr * 100).toFixed(1)}%
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">فترة الاسترداد</p>
          <p className="text-2xl font-bold text-purple-600">
            {vanResults.paybackPeriod?.toFixed(1)} سنوات
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-4">التدفقات النقدية على مدى 10 سنوات</h4>
        <div className="flex items-end h-48 gap-2  border-gray-200 pb-4">
          {vanResults.cashflows.map((cf, idx) => (
            <div
              key={idx}
              className={`flex-1 min-h-2 ${cf == 0 ? 'bg-yellow-400':cf >= 0 ? 'bg-green-400' : 'bg-red-400'}`}
              style={{ 
                height: `${Math.abs(cf) / Math.max(...vanResults.cashflows.map(Math.abs)) * 80}%`
              }}
              title={`السنة ${idx}: ${formatNumber(cf)} دج`}
           />
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">السنة</th>
              <th className="p-3">التدفق النقدي</th>
              <th className="p-3">التراكمي</th>
            </tr>
          </thead>
          <tbody>
            {vanResults.cashflows.map((cf, idx) => {
              const cumulative = vanResults.cashflows
                .slice(0, idx + 1)
                .reduce((a, b) => a + b, 0);
              
              return (
                <tr key={idx} className="border-b-2 border-indigo-50 pb-4">
                  <td className="p-3">{idx}</td>
                  <td className={`p-3 ${cf >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatNumber(cf)} دج
                  </td>
                  <td className="p-3 font-medium">
                    {formatNumber(cumulative)} دج
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );



  // Calculate NPV (VAN)

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
  };

  // Render form based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">اختر مجال الاستثمار</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {investmentFields.map(field => (
                <div
                  key={field.id}
                  onClick={() => handleFieldSelect(field)}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-gray-100 rounded-full">{field.icon}</div>
                    <h3 className="text-xl font-bold">{field.title}</h3>
                    <p className="text-gray-600">{field.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">اختر نوع المشروع</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedField?.projects.map(project => (
                <div
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <p className="text-gray-600">الحد الأدنى للاستثمار</p>
                    <p className="text-blue-600 font-bold">{project.minCost.toLocaleString()} دج</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">اختر منطقة المشروع</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">الولاية</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.keys(regionsData).map(region => (
                    <div
                      key={region}
                      onClick={() => handleRegionSelect(region)}
                      className={`p-4 rounded-lg cursor-pointer border ${
                        selectedRegion === region 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <FaLocationArrow className={`${selectedRegion === region ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className="font-medium">{region}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedRegion && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4">المنطقة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {regionsData[selectedRegion]?.locations?.map(location => (
                      <div
                        key={location.id}
                        onClick={() => handleLocationSelect(location)}
                        className={`p-4 rounded-lg cursor-pointer border flex justify-between items-center ${
                          selectedLocation?.id === location.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <span className="font-medium">{location.name}</span>
                        <div className="flex items-center">
                          <button className="text-blue-500 p-1 bg-blue-50 rounded">
                            <FaMapMarkedAlt />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">تحديد تكاليف المشروع</h2>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">التكاليف الأساسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {commonCosts.map(cost => (
                  <div key={cost.id} className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                      {cost.name} {cost.isRequired && <span className="text-red-500">*</span>}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        value={costs[cost.id] || ''}
                        onChange={(e) => handleCostChange(cost.id, e.target.value)}
                        className="block w-full pr-12 pl-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="DA(دج)"
                        required={cost.isRequired}
                      />
                      {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedField && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4">تكاليف خاصة بالمشروع</h3>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {specificCosts[selectedField.id]?.map(cost => (
                    <div key={cost.id} className="space-y-2">
                      <label className="block text-gray-700 font-medium">
                        {cost.name} {cost.isRequired && <span className="text-red-500">*</span>}
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          value={costs[cost.id] || ''}
                          onChange={(e) => handleCostChange(cost.id, e.target.value)}
                          className="block w-full pr-12 pl-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="DA(دج)"
                          required={cost.isRequired}
                        />
                        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">دج</span>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">تكاليف إضافية</h3>
                <button 
                  onClick={handleAddCustomCost}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                >
                  إضافة تكلفة جديدة +
                </button>
              </div>
              
              {customCosts.length > 0 ? (
                <div className="space-y-4">
                  {customCosts.map((cost, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">اسم التكلفة</label>
                        <input
                          type="text"
                          value={cost.name}
                          onChange={(e) => handleCustomCostChange(index, 'name', e.target.value)}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="أدخل اسم التكلفة"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">المبلغ</label>
                        <div className="relative rounded-md shadow-sm">
                          <input
                            type="number"
                            value={cost.value}
                            onChange={(e) => handleCustomCostChange(index, 'value', e.target.value)}
                            className="block w-full pr-12 pl-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Da(دج)"
                          />
                          {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">دjjjjjjjjjjج</span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">لا توجد تكاليف إضافية. يمكنك إضافة تكاليف خاصة بالمشروع.</p>
              )}
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">الإيرادات المتوقعة</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    الإيرادات السنوية المتوقعة (السنة الأولى) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      value={revenue.initialAmount || ''}
                      onChange={(e) => handleRevenueChange('initialAmount', e.target.value)}
                      className="block w-full pr-12 pl-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Da(دج)"
                      required
                    />
                    {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">دج</span>
                    </div> */}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    معدل النمو السنوي المتوقع (%)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      value={revenue.growthRate || ''}
                      onChange={(e) => handleRevenueChange('growthRate', e.target.value)}
                      className="block w-full pr-12 pl-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="%"
                    />
                    {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div> */}
                  </div>
                </div>
              </div>
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
      
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">طريقة التمويل</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => handleFinancingSelect('self')}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <FaWallet className="text-3xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">تمويل ذاتي</h3>
                  <p className="text-gray-600">استخدام رأس المال الشخصي لتمويل المشروع بالكامل</p>
                </div>
              </div>
              
              <div
                onClick={() => handleFinancingSelect('loan')}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FaMoneyBillWave className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">قرض بنكي</h3>
                  <p className="text-gray-600">الحصول على قرض لتمويل المشروع كليًا أو جزئيًا</p>
                </div>
              </div>
            </div>
          </div>
        );
      
        case 6:
            return (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">تفاصيل القرض</h2>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium">
                        مبلغ القرض <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          value={loanDetails.amount || ''}
                          onChange={(e) => handleLoanDetailChange('amount', e.target.value)}
                          className="block w-full pr-12 pl-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Da(دج)"
                          required
                        />
                        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">دج</span>
                        </div> */}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium">
                        معدل الفائدة السنوي (%) <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          value={loanDetails.interestRate || ''}
                          onChange={(e) => handleLoanDetailChange('interestRate', e.target.value)}
                          className="block w-full pr-12 pl-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="%"
                          required
                        />
                        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">%</span>
                        </div> */}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium">
                        مدة القرض (سنوات) <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          value={loanDetails.term || ''}
                          onChange={(e) => handleLoanDetailChange('term', e.target.value)}
                          className="block w-full pr-12 pl-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="سنوات"
                          required
                        />
                        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">سنوات</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
  case 7:
    return (
      <div className="space-y-8">
        {/* <h2 className="text-3xl font-bold text-gray-800 text-center">
          <FaCalculator className="inline-block mr-2" />
        </h2> */}

        {vanResults && renderVANResults()}

        <div className="flex justify-between">
          <button
            onClick={goBack}
            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <FaArrowLeft className="inline-block ml-2" />
            رجوع
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            بدء حساب جديد
          </button>
        </div>
      </div>
    )}}
    return (

        <>
        
        <NavBarbg isLightBackground={true} />

        <div className="max-w-7xl mx-auto px-4 pt-16 py-8">

          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
            {/* شريط التقدم */}

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={goBack}
                  disabled={step === 1}
                  className={`px-4 py-2 rounded-lg ${
                    step === 1 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
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
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 7) * 100}%` }}
                />
              </div>
            </div>
    
            {/* محتوى الخطوات */}
            <div className="rounded-xl  min-h-[500px] ">
              {renderStepContent()}
            </div>
    
            {/* زر التقديم النهائي للخطوة 6 */}
            {step === 6 && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={calculateVAN}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  احسب VAN
                </button>
              </div>
            )}
          </div>
        </div>
        </>
      );
    };





export default InvestmentCalculator
                  