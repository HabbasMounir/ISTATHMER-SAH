import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; 
i18n
  .use(HttpApi) 
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: savedLanguage,
    backend: {
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }    },
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  });

export default i18n;