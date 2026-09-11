import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import PartnerHero from '../components/partners/PartnerHero';
import WhatWeOffer from '../components/partners/WhatWeOffer';
import PartnershipProcess from '../components/partners/PartnershipProcess';
import PartnerForm from '../components/partners/PartnerForm';
import CaseStudy from '../components/partners/CaseStudy';
import Partners from '../components/Partners';
import { usePageTitle } from '../hooks/usePageTitle';

function PartnersPage() {
    const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    usePageTitle('For Partners');

    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey || ''}>
            <PartnerHero />
            <WhatWeOffer />
            <Partners />
            <CaseStudy />
            <PartnershipProcess />
            <PartnerForm />
        </GoogleReCaptchaProvider>
    );
}

export default PartnersPage;
