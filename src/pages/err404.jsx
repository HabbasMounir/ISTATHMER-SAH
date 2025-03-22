import { useTranslation } from 'react-i18next';
import { FaExclamationTriangle, FaHome, FaArrowLeft, FaCompass } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Navbar, NavBarbg } from '../components/navBar';

function NotFoundPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Main Content */}
      <NavBarbg isLightBackground={true} />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8">
          {/* Error Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Decorative Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-center space-x-3">
                <FaCompass className="text-white text-3xl animate-bounce" />
                <h1 className="text-white text-2xl font-bold">{t('notFound.header')}</h1>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-8 py-12 sm:p-12">
              <div className="text-center">
                {/* Error Icon */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                  <FaExclamationTriangle className="h-10 w-10 text-red-600" />
                </div>

                {/* Error Details */}
                <h2 className="mt-6 text-8xl font-extrabold text-gray-900">404</h2>
                <p className="mt-4 text-xl text-gray-600">
                  {t('notFound.message')}
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:to-blue-700 transition-all duration-300"
                  >
                    <FaArrowLeft className="mr-2" />
                    {t('notFound.goBack')}
                  </button>
                  
                  <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:to-purple-700 transition-all duration-300"
                  >
                    <FaHome className="mr-2" />
                    {t('notFound.dashboard')}
                  </Link>
                </div>

                {/* Additional Help */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    {t('notFound.needHelp')}{' '}
                    <a href="mailto:support@example.com" className="font-medium text-blue-600 hover:text-blue-500">
                      {t('notFound.contactSupport')}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {t('notFound.footer')}
        </div>
      </footer>
    </div>
  );
}

export default NotFoundPage;