// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { NavBarbg } from '../components/navBar';
// import { 
//   FaChartLine, 
//   FaPiggyBank, 
//   FaShoppingCart, 
//   FaCoins, 
//   FaChartPie, 
//   FaCalculator 
// } from 'react-icons/fa';

// function FinancialLiteracyPage() {
//   const { t, i18n } = useTranslation();

//   return (
//     <div 
//       className="min-h-screen bg-gradient-to-br from-blue-50 to-white" 
//       dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
//     >
//       <NavBarbg isLightBackground={true} />
      
//       <div className="container mx-auto px-4 pt-20 pb-16">
//         <div className="max-w-5xl mx-auto">
//           {/* Hero Section */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
//             <div className="p-8 text-center">
//               <h1 className="text-4xl font-bold text-blue-900 mb-4">
//                 التوعية المالية للمواطنين
//               </h1>
//               <p className="text-xl text-gray-600 leading-relaxed">
//                 قبل أن تنطلق في رحلة الاستثمار، ابنِ حصنك المالي! تخيل الادخار كبذور تزرعها، وإدارة الاستهلاك كتربة خصبة تغذيها. عندما تكون قاعدتك المالية راسخة، ستتمكن من استثمار أموالك بثقة، وتحقيق عوائد تضمن لك مستقبلاً مشرقاً ومزدهراً.
//               </p>
//             </div>
//           </div>

//           {/* Investment Section */}
//           <div className="grid md:grid-cols-2 gap-8 mb-12">
//             <div className="bg-white rounded-2xl shadow-xl p-6">
//               <div className="flex items-center mb-4">
//                 <FaChartLine className="text-blue-600 text-4xl ml-4" />
//                 <h2 className="text-2xl font-bold text-blue-900">ما هو الاستثمار؟</h2>
//               </div>
//               <p className="text-gray-700 leading-relaxed">
//                 الاستثمار: ليس مجرد قرار مالي، بل هو قفزة نحو مستقبل مشرق، رحلة تحولك من متفرج إلى صانع للثروة. تخيل أنك تبني قصرًا من الأحلام، لبنة تلو الأخرى، وكل لبنة تمثل استثمارًا ذكيًا.
//               </p>
//             </div>
//             <div className="bg-white rounded-2xl shadow-xl p-6">
//               <div className="flex items-center mb-4">
//                 <FaCoins className="text-green-600 text-4xl ml-4" />
//                 <h2 className="text-2xl font-bold text-green-900">لماذا يجب أن تستثمر؟</h2>
//               </div>
//               <ul className="space-y-3 text-gray-700">
//                 <li className="flex items-center">
//                   <span className="w-3 h-3 bg-green-500 rounded-full ml-3"></span>
//                   تحقيق الاستقلال المالي
//                 </li>
//                 <li className="flex items-center">
//                   <span className="w-3 h-3 bg-green-500 rounded-full ml-3"></span>
//                   تنمية الاقتصاد الوطني
//                 </li>
//                 <li className="flex items-center">
//                   <span className="w-3 h-3 bg-green-500 rounded-full ml-3"></span>
//                   تحقيق الأحلام
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Savings Section */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
//             <div className="flex items-center mb-6">
//               <FaPiggyBank className="text-purple-600 text-4xl ml-4" />
//               <h2 className="text-3xl font-bold text-purple-900">ما هو الادخار؟</h2>
//             </div>
//             <p className="text-gray-700 text-xl mb-6">
//               الادخار هو أن تضع جانبًا جزءًا من مالك اليوم لتحقق أهدافك في المستقبل
//             </p>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="text-xl font-semibold text-purple-800 mb-4">خطواتك الأولى نحو مستقبل مالي آمن</h3>
//                 <ul className="space-y-3 text-gray-700">
//                   <li>• ضع خريطة مالية</li>
//                   <li>• حدد وجهتك</li>
//                   <li>• اجعل الادخار عادة</li>
//                   <li>• راقب رحلتك</li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold text-purple-800 mb-4">كيف تدخر صح؟</h3>
//                 <ul className="space-y-3 text-gray-700">
//                   <li>• ابدأ بمبلغ صغير</li>
//                   <li>• كن صبورًا</li>
//                   <li>• استخدم أدوات الادخار</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Consumption Section */}
//           <div className="grid md:grid-cols-2 gap-8 mb-12">
//             <div className="bg-white rounded-2xl shadow-xl p-6">
//               <div className="flex items-center mb-4">
//                 <FaShoppingCart className="text-red-600 text-4xl ml-4" />
//                 <h2 className="text-2xl font-bold text-red-900">ما هو الاستهلاك؟</h2>
//               </div>
//               <p className="text-gray-700 leading-relaxed mb-4">
//                 الاستهلاك هو استخدام السلع والخدمات لتلبية الاحتياجات والرغبات. إنه عنصر أساسي في الحياة الاقتصادية.
//               </p>
//               <h3 className="text-xl font-semibold text-red-800 mb-3">كيف تستهلك صح؟</h3>
//               <ul className="space-y-2 text-gray-700">
//                 <li>• اشترِ فقط ما تحتاجه</li>
//                 <li>• اختر المنتجات المستدامة</li>
//                 <li>• قلل من النفايات</li>
//                 <li>• ادعم الشركات المسؤولة</li>
//                 <li>• كن واعيًا بتأثيرك</li>
//               </ul>
//             </div>
//             <div className="bg-white rounded-2xl shadow-xl p-6">
//               <div className="flex items-center mb-4">
//                 <FaChartPie className="text-orange-600 text-4xl ml-4" />
//                 <h2 className="text-2xl font-bold text-orange-900">العلاقة بين الاستهلاك والاستثمار والادخار</h2>
//               </div>
//               <p className="text-gray-700 leading-relaxed">
//                 هي علاقة وثيقة ومترابطة، وتشكل هذه العناصر الثلاثة أساسًا للاقتصاد على المستويين الفردي والوطني
//               </p>
//             </div>
//           </div>

//           {/* Income Section */}
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <div className="flex items-center mb-6">
//               <FaCalculator className="text-teal-600 text-4xl ml-4" />
//               <h2 className="text-3xl font-bold text-teal-900">ما هو الدخل؟</h2>
//             </div>
//             <p className="text-gray-700 text-xl">
//               الدخل هو المبلغ المالي الذي يحصل عليه الفرد أو الكيان خلال فترة زمنية محددة. إنه يمثل الموارد المتاحة للاستهلاك أو الادخار أو الاستثمار.
//             </p>
//           </div>

//           {/* Closing Message */}
//           <div className="text-center mt-12 bg-blue-100 rounded-2xl p-8">
//             <h3 className="text-2xl font-bold text-blue-900 mb-4">
//               لا تتردد في بدء رحلتك المالية
//             </h3>
//             <p className="text-gray-700 text-xl">
//               لا تخف من المخاطرة، فكل نجاح يتطلب بعض المخاطرة. ابحث عن الفرص الاستثمارية المناسبة لك، واستشر الخبراء. ابدأ بمبلغ صغير، واستثمر بذكاء، وراقب نمو استثماراتك.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FinancialLiteracyPage;


import { useTranslation } from 'react-i18next';
import { NavBarbg } from '../components/navBar';
import { FaCoins, FaPiggyBank, FaShoppingCart, FaWallet } from 'react-icons/fa';

function FinancialAwarenessPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <NavBarbg isLightBackground={true} />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* الصفحة الرئيسية */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 mb-8">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                التوعية المالية للمواطنين
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                قبل أن تنطلق في رحلة الاستثمار، ابنِ حصنك المالي! تخيل الادخار كبذور تزرعها، 
                وإدارة الاستهلاك كتربة خصبة تغذيها. عندما تكون قاعدتك المالية راسخة، 
                ستتمكن من استثمار أموالك بثقة، وتحقيق عوائد تضمن لك مستقبلاً مشرقاً ومزدهراً.
              </p>
            </div>

            {/* الأيقونات التوضيحية */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center p-4">
                <FaCoins className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">الاستثمار</h3>
              </div>
              <div className="text-center p-4">
                <FaPiggyBank className="text-4xl text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">الادخار</h3>
              </div>
              <div className="text-center p-4">
                <FaShoppingCart className="text-4xl text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">الاستهلاك</h3>
              </div>
              <div className="text-center p-4">
                <FaWallet className="text-4xl text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">الدخل</h3>
              </div>
            </div>

            {/* محتوى الاستثمار */}
            <Section title="ما هو الاستثمار؟">
              <p className="text-lg text-gray-700 mb-4">
                الاستثمار: ليس مجرد قرار مالي، بل هو قفزة نحو مستقبل مشرق، رحلة تحولك من متفرج إلى صانع للثروة. 
                تخيل أنك تبني قصرًا من الأحلام، لبنة تلو الأخرى، وكل لبنة تمثل استثمارًا ذكيًا.
              </p>
              
              <SubSection title="لماذا يجب أن تستثمر؟">
                <ul className="list-disc pr-6 space-y-3 text-gray-600">
                  <li>تحقيق الاستقلال المالي وتأمين المستقبل</li>
                  <li>المساهمة في تنمية الاقتصاد الوطني</li>
                  <li>تمويل المشاريع والأحلام الشخصية</li>
                </ul>
              </SubSection>

              <SubSection title="نصائح استثمارية">
                <div className="grid md:grid-cols-2 gap-6">
                  <TipCard title="ابدأ مبكرًا">
                    كلما بدأت مبكرًا، زادت فترة نمو استثماراتك
                  </TipCard>
                  <TipCard title="تنويع المحفظة">
                    لا تضع كل بيضك في سلة واحدة لتقليل المخاطر
                  </TipCard>
                </div>
              </SubSection>
            </Section>

            {/* محتوى الادخار */}
            <Section title="ما هو الادخار؟">
              <p className="text-lg text-gray-700 mb-4">
                الادخار هو أن تضع جانبًا جزءًا من مالك اليوم لتحقق أهدافك في المستقبل
              </p>
              
              <StepsSection 
                steps={[
                  'حدد أهدافك المالية بوضوح',
                  'حلل دخلك ومصروفاتك',
                  'ضع خطة ادخار واقعية',
                  'استخدم أدوات الادخار المناسبة'
                ]}
              />
            </Section>

            {/* محتوى الاستهلاك */}
            <Section title="الاستهلاك الرشيد">
              <p className="text-lg text-gray-700 mb-4">
                الاستهلاك الرشيد هو استخدام الموارد بطريقة واعية تحقق التوازن بين الحاجات الحالية والمستقبلية
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">قواعد الاستهلاك الذكي:</h4>
                <ul className="space-y-3">
                  <ListItem>اشترِ ما تحتاج لا ما تريد</ListItem>
                  <ListItem>قارن الأسعار قبل الشراء</ListItem>
                  <ListItem>تجنب الشراء العشوائي</ListItem>
                </ul>
              </div>
            </Section>

            {/* محتوى الدخل */}
            <Section title="إدارة الدخل">
              <p className="text-lg text-gray-700 mb-4">
                الدخل هو الوقود الذي يحرك آلة حياتك المالية، إدارته السليمة تحدد مسار مستقبلك
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <PercentageCard title="الضروريات" percentage="50%" color="bg-green-100" />
                <PercentageCard title="الادخار" percentage="20%" color="bg-blue-100" />
                <PercentageCard title="الكماليات" percentage="30%" color="bg-orange-100" />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

// مكونات مساعدة
const Section = ({ title, children }) => (
  <section className="py-8 border-t border-gray-100">
    <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
    {children}
  </section>
);

const SubSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

const TipCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-gray-600">{children}</p>
  </div>
);

const StepsSection = ({ steps }) => (
  <div className="bg-gray-50 p-6 rounded-lg">
    <h4 className="text-xl font-semibold mb-4">خطوات عملية:</h4>
    <ol className="list-decimal pr-6 space-y-3">
      {steps.map((step, index) => (
        <li key={index} className="text-gray-700 pl-3">{step}</li>
      ))}
    </ol>
  </div>
);

const ListItem = ({ children }) => (
  <li className="flex items-start">
    <span className="text-blue-600 mr-2">•</span>
    {children}
  </li>
);

const PercentageCard = ({ title, percentage, color }) => (
  <div className={`${color} p-4 rounded-lg text-center`}>
    <div className="text-4xl font-bold mb-2">{percentage}</div>
    <div className="text-gray-700 font-medium">{title}</div>
  </div>
);

export default FinancialAwarenessPage;