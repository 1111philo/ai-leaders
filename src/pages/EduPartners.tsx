import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import EduHero from '../components/edu/EduHero';
import PartnerBenefits from '../components/edu/PartnerBenefits';
import PartnerRequirements from '../components/edu/PartnerRequirements';
import PartnershipProcess from '../components/edu/PartnershipProcess';
import EduPartnerForm from '../components/edu/EduPartnerForm';
import Partners from '../components/Partners';

function EduPartnersPage() {
    const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey || ''}>
            <EduHero />
            <PartnerBenefits />
            <PartnerRequirements />
            <PartnershipProcess />
            <Partners />
            <EduPartnerForm />
        </GoogleReCaptchaProvider>
    );
}

export default EduPartnersPage;
