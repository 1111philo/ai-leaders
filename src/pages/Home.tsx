import Hero from '../components/Hero';
import About from '../components/About';
import Partners from '../components/Partners';
import WaitlistForm from '../components/WaitlistForm';
import OpenSourceCallout from '../components/OpenSourceCallout';
import PlatoSection from '../components/PlatoSection';
import FAQ from '../components/FAQ';

function Home() {
    return (
        <>
            <Hero />
            <Partners />
            <About />
            <PlatoSection />
            <OpenSourceCallout />
            <FAQ />
            <WaitlistForm />
        </>
    );
}

export default Home;
