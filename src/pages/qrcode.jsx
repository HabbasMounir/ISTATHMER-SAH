import { useTranslation } from 'react-i18next';
import { NavBarbg } from '../components/navBar';
import qrCodeImage from '@/assets/qrcode.png';

function QRCodePage() {
  const { i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <NavBarbg isLightBackground={true} />
      
      <div className="relative p-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur opacity-50"></div>
        <div className="relative bg-white rounded-xl p-6">
          <img
            src={qrCodeImage}
            alt="QR Code"
            className="w-72 h-72 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default QRCodePage;