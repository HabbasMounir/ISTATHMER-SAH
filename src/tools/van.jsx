import { useState, useRef } from 'react';
import { FaArrowLeft, FaMapMarkerAlt, FaMoneyBillWave, FaCalculator } from 'react-icons/fa';

// البيانات المنظمة
const investmentFields = {
  realEstate: {
    name: 'العقارات',
    projects: [
      { id: 1, name: 'مجمع سكني', description: 'بناء مجمع سكني متكامل الخدمات' },
      { id: 2, name: 'مركز تجاري', description: 'إنشاء مركز تجاري بمواصفات عصرية' },
    ],
    specificCosts: ['بناء', 'تصريح البناء']
  },
  agriculture: {
    name: 'الزراعة',
    projects: [
      { id: 3, name: 'مزرعة نخيل', description: 'إنشاء مزرعة نخيل حديثة' },
      { id: 4, name: 'بيوت محمية', description: 'زراعة محاصيل في بيوت محمية' },
    ],
    specificCosts: ['تجهيز الأرض', 'أنظمة ري']
  }
};

const regions = {
  state1: {
    name: 'الولاية الشمالية',
    areas: [
      { name: 'البلدية أ', cost: 50000 },
      { name: 'البلدية ب', cost: 75000 }
    ]
  },
  state2: {
    name: 'الولاية الجنوبية',
    areas: [
      { name: 'البلدية ج', cost: 60000 },
      { name: 'البلدية د', cost: 80000 }
    ]
  }
};

const generalCosts = [
  { id: 1, name: 'تراخيص', default: 10000 },
  { id: 2, name: 'تصميم', default: 20000 },
  { id: 3, name: 'إدارة مشروع', default: 15000 }
];

function FinancialCalculator() {
  const [step, setStep] = useState(1);
  const [selectedField, setSelectedField] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedArea, setSelectedArea] = useState(null);
  const [costs, setCosts] = useState({});
  const [additionalCosts, setAdditionalCosts] = useState([]);
  const [financing, setFinancing] = useState('self');
  const [loanDetails, setLoanDetails] = useState({ rate: 5, years: 5 });
  
  const revenueRef = useRef(0);
  const yearsRef = useRef(5);

  // معالجة اختيار المجال
  const selectField = (field) => {
    setSelectedField(field);
    setStep(2);
  };

  // حساب VAN
  const calculateNPV = () => {
    const initialInvestment = Object.values(costs).reduce((a, b) => a + b, 0) +
      additionalCosts.reduce((a, c) => a + c.value, 0);
      
    const annualCashFlow = revenueRef.current - (initialInvestment / yearsRef.current);
    const discountRate = financing === 'loan' ? loanDetails.rate / 100 : 0;

    let npv = -initialInvestment;
    for (let i = 1; i <= yearsRef.current; i++) {
      npv += annualCashFlow / Math.pow(1 + discountRate, i);
    }
    
    return npv.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-8">
          <FaCalculator className="text-3xl text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold">الآلة الحاسبة الاستثمارية</h1>
        </div>

        {step === 1 && (
          <InvestmentFieldStep 
            fields={Object.entries(investmentFields)}
            onSelect={selectField}
          />
        )}

        {step === 2 && (
          <ProjectStep 
            projects={investmentFields[selectedField].projects}
            onSelect={(p) => {
              setSelectedProject(p);
              setStep(3);
            }}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <RegionStep 
            regions={regions}
            onSelect={(state, area) => {
              setSelectedState(state);
              setSelectedArea(area);
              setStep(4);
            }}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <CostsStep 
            generalCosts={generalCosts}
            specificCosts={investmentFields[selectedField].specificCosts}
            areaCost={selectedArea?.cost}
            onCostChange={(id, value) => setCosts(prev => ({...prev, [id]: value}))}
            onAddCost={(cost) => setAdditionalCosts([...additionalCosts, cost])}
            onBack={() => setStep(3)}
            onNext={() => setStep(5)}
          />
        )}

        {step === 5 && (
          <FinancingStep 
            financing={financing}
            loanDetails={loanDetails}
            onFinancingChange={setFinancing}
            onLoanChange={(e) => setLoanDetails({...loanDetails, [e.target.name]: e.target.value})}
            onBack={() => setStep(4)}
            onCalculate={() => setStep(6)}
          />
        )}

        {step === 6 && (
          <FinalCalculation 
            npv={calculateNPV()}
            onRestart={() => {
              setStep(1);
              setSelectedField('');
              setSelectedProject(null);
              setCosts({});
            }}
          />
        )}
      </div>
    </div>
  );
}

// مكونات الخطوات
const InvestmentFieldStep = ({ fields, onSelect }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6">اختر مجال الاستثمار</h2>
    <div className="grid grid-cols-2 gap-4">
      {fields.map(([key, field]) => (
        <button 
          key={key}
          onClick={() => onSelect(key)}
          className="p-6 border rounded-xl hover:border-blue-500 transition-all"
        >
          <h3 className="text-lg font-medium">{field.name}</h3>
        </button>
      ))}
    </div>
  </div>
);

const ProjectStep = ({ projects, onSelect, onBack }) => (
  <div>
    <div className="flex items-center mb-6">
      <button onClick={onBack} className="mr-4 text-blue-600">
        <FaArrowLeft />
      </button>
      <h2 className="text-xl font-semibold">اختر المشروع</h2>
    </div>
    
    <div className="space-y-4">
      {projects.map(project => (
        <div 
          key={project.id}
          onClick={() => onSelect(project)}
          className="p-4 border rounded-lg cursor-pointer hover:border-blue-500"
        >
          <h3 className="font-medium">{project.name}</h3>
          <p className="text-gray-600 text-sm">{project.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const RegionStep = ({ regions, onSelect, onBack }) => {
  const [selectedState, setSelectedState] = useState('');

  return (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-blue-600">
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-semibold">حدد الموقع</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">الولاية</label>
          <select 
            className="w-full p-2 border rounded"
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {Object.keys(regions).map(key => (
              <option key={key} value={key}>{regions[key].name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">المنطقة</label>
          <select 
            className="w-full p-2 border rounded"
            onChange={(e) => onSelect(selectedState, regions[selectedState].areas.find(a => a.name === e.target.value))}
          >
            {selectedState && regions[selectedState].areas.map(area => (
              <option key={area.name} value={area.name}>
                {area.name} (التكلفة: {area.cost.toLocaleString()} دولار)
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

const CostsStep = ({ generalCosts, specificCosts, areaCost, onCostChange, onAddCost, onBack, onNext }) => {
  const [newCost, setNewCost] = useState('');

  return (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-blue-600">
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-semibold">التكاليف</h2>
      </div>

      <div className="mb-8">
        <h3 className="font-medium mb-4">التكاليف العامة</h3>
        {generalCosts.map(cost => (
          <div key={cost.id} className="flex items-center mb-3">
            <span className="w-48">{cost.name}</span>
            <input
              type="number"
              defaultValue={cost.default}
              onChange={(e) => onCostChange(cost.id, +e.target.value)}
              className="p-2 border rounded w-32"
            />
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="font-medium mb-4">التكاليف الخاصة</h3>
        {specificCosts.map((cost, idx) => (
          <div key={idx} className="flex items-center mb-3">
            <span className="w-48">{cost}</span>
            <input
              type="number"
              onChange={(e) => onCostChange(cost, +e.target.value)}
              className="p-2 border rounded w-32"
            />
          </div>
        ))}
        {areaCost && (
          <div className="flex items-center mb-3">
            <span className="w-48">تكلفة المنطقة</span>
            <input
              type="number"
              value={areaCost}
              readOnly
              className="p-2 border rounded w-32 bg-gray-100"
            />
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="font-medium mb-4">إضافة تكاليف إضافية</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="اسم التكلفة"
            className="p-2 border rounded"
            value={newCost}
            onChange={(e) => setNewCost(e.target.value)}
          />
          <button 
            onClick={() => {
              if (newCost) {
                onAddCost({ name: newCost, value: 0 });
                setNewCost('');
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            إضافة
          </button>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="px-6 py-2 bg-green-500 text-white rounded"
      >
        التالي
      </button>
    </div>
  );
};

const FinancingStep = ({ financing, loanDetails, onFinancingChange, onLoanChange, onBack, onCalculate }) => (
  <div>
    <div className="flex items-center mb-6">
      <button onClick={onBack} className="mr-4 text-blue-600">
        <FaArrowLeft />
      </button>
      <h2 className="text-xl font-semibold">التمويل</h2>
    </div>

    <div className="mb-6">
      <label className="block mb-4">
        <input 
          type="radio" 
          name="financing" 
          value="self" 
          checked={financing === 'self'}
          onChange={() => onFinancingChange('self')}
          className="mr-2"
        />
        تمويل ذاتي
      </label>
      
      <label className="block mb-4">
        <input 
          type="radio" 
          name="financing" 
          value="loan" 
          checked={financing === 'loan'}
          onChange={() => onFinancingChange('loan')}
          className="mr-2"
        />
        الحصول على قرض
      </label>

      {financing === 'loan' && (
        <div className="ml-6 space-y-4">
          <div>
            <label className="block mb-2">معدل الفائدة (%)</label>
            <input
              type="number"
              name="rate"
              value={loanDetails.rate}
              onChange={onLoanChange}
              className="p-2 border rounded w-32"
            />
          </div>
          <div>
            <label className="block mb-2">مدة القرض (سنوات)</label>
            <input
              type="number"
              name="years"
              value={loanDetails.years}
              onChange={onLoanChange}
              className="p-2 border rounded w-32"
            />
          </div>
        </div>
      )}
    </div>

    <div className="mb-6">
      <label className="block mb-2">الإيرادات السنوية المتوقعة</label>
      <input
        type="number"
        ref={revenueRef}
        className="p-2 border rounded w-48"
      />
    </div>

    <div className="mb-6">
      <label className="block mb-2">مدة المشروع (سنوات)</label>
      <input
        type="number"
        ref={yearsRef}
        defaultValue={5}
        className="p-2 border rounded w-48"
      />
    </div>

    <button 
      onClick={onCalculate}
      className="px-6 py-2 bg-green-500 text-white rounded"
    >
      احسب VAN
    </button>
  </div>
);

const FinalCalculation = ({ npv, onRestart }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6">النتائج</h2>
    <div className="bg-gray-100 p-6 rounded-lg mb-6">
      <p className="text-lg font-medium">
        صافي القيمة الحالية (VAN): 
        <span className={`text-2xl ml-2 ${npv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {npv} دولار
        </span>
      </p>
    </div>

    <button 
      onClick={onRestart}
      className="px-6 py-2 bg-blue-500 text-white rounded"
    >
      بدء حساب جديد
    </button>
  </div>
);

export default FinancialCalculator;