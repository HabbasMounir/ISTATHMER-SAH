import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpApi) // load translations using http backend
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    backend: {
      // Path where resources get loaded from
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