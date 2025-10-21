import React from 'react';
import Hero from './Hero';
import FeatureSection from './Feature';
import Footer from './Footer';

const LandingPage: React.FC = () => {
    return (
        <>
            <main>
                <Hero />
            </main>
            <FeatureSection />
            <Footer />
        </>
    );
};

export default LandingPage;
