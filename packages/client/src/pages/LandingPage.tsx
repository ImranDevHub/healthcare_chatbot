import React from 'react';
import Hero from './Hero';
import FeatureSection from './Feature';
import Footer from './Footer';

const LandingPage: React.FC = () => {
    return (
        <>
            <main>
                {/* Hero Section */}
                {/* <section className="bg-blue-600 text-white text-center py-20">
                    <h1 className="text-5xl font-bold mb-4">
                        Welcome to ሸጋ-Health
                    </h1>
                    <p className="text-xl mb-8">
                        Your trusted partner in health and wellness.
                    </p>
                    <a
                        href="/signup"
                        className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-gray-200"
                    >
                        Get Started
                    </a>
                </section> */}
                <Hero />
            </main>
            {/* Features Section */}
            {/* <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Our Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-bold mb-4">
                                Personalized Health Chatbot
                            </h3>
                            <p>
                                Get instant answers to your health questions
                                from our AI-powered chatbot.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-bold mb-4">
                                Symptom Checker
                            </h3>
                            <p>
                                Describe your symptoms and get a preliminary
                                analysis of potential conditions.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-bold mb-4">
                                Connect with Doctors
                            </h3>
                            <p>
                                Find and connect with qualified doctors in your
                                area for consultations.
                            </p>
                        </div>
                    </div>
                </div>
            </section> */}
            <FeatureSection />
        </>
    );
};

export default LandingPage;
