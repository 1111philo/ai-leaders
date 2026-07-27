import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import EmployerHero from '../components/partners/EmployerHero';
import WhyHire from '../components/partners/WhyHire';
import HiringProcess from '../components/partners/HiringProcess';
import EmployerForm from '../components/partners/EmployerForm';
import CaseStudy from '../components/partners/CaseStudy';
import Partners from '../components/Partners';
import { usePageTitle } from '../hooks/usePageTitle';

function PartnersPage() {
    const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    usePageTitle('For Employers');

    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey || ''}>
            <EmployerHero />
            <WhyHire />
            <Partners />
            <CaseStudy />
            <HiringProcess />
            <EmployerForm />
        </GoogleReCaptchaProvider>
    );
}

export default PartnersPage;
