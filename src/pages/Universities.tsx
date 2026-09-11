import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import UniversityHero from '../components/universities/UniversityHero';
import UniversityBenefits from '../components/universities/UniversityBenefits';
import UniversityRequirements from '../components/universities/UniversityRequirements';
import PartnershipProcess from '../components/universities/PartnershipProcess';
import UniversityForm from '../components/universities/UniversityForm';
import Partners from '../components/Partners';
import { usePageTitle } from '../hooks/usePageTitle';

function UniversitiesPage() {
    const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    usePageTitle('For Universities');

    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey || ''}>
            <UniversityHero />
            <UniversityBenefits />
            <UniversityRequirements />
            <PartnershipProcess />
            <Partners />
            <UniversityForm />
        </GoogleReCaptchaProvider>
    );
}

export default UniversitiesPage;
