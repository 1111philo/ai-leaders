import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import EmployerHero from '../components/partners/EmployerHero';
import WhyHire from '../components/partners/WhyHire';
import PlatoPlatform from '../components/partners/PlatoPlatform';
import HiringProcess from '../components/partners/HiringProcess';
import EmployerForm from '../components/partners/EmployerForm';
import Partners from '../components/Partners';

function PartnersPage() {
    const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey || ''}>
            <EmployerHero />
            <WhyHire />
            <PlatoPlatform />
            <HiringProcess />
            <Partners />
            <EmployerForm />
        </GoogleReCaptchaProvider>
    );
}

export default PartnersPage;
