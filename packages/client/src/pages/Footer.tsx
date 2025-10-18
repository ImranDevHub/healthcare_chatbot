import AnimatedIcon from '@/components/ui/AnimatedIcon';
import facebook from 'react-useanimations/lib/facebook';
import github from 'react-useanimations/lib/github';
import instagram from 'react-useanimations/lib/instagram';
import linkedin from 'react-useanimations/lib/linkedin';
import twitter from 'react-useanimations/lib/twitter';
import logo from '/logo/SHEGAAsset-7@4x.png';

const social_medias = [
    { animation: github, link: 'https://github.com' },
    { animation: facebook, link: 'https://facebook.com' },
    { animation: instagram, link: 'https://instagram.com' },
    { animation: linkedin, link: 'https://linkedin.com' },
    { animation: twitter, link: 'https://twitter.com' },
];

const Footer = () => {
    return (
        <footer className="bg-gray-900 pt-20 text-gray-300 relative border-t border-gray-700">
            {/* Call to Action Section */}
            <div className="text-center py-5 rounded-3xl border border-gray-700 bg-violet-950 shadow-gray-100/30 shadow-xl/20 w-10/12 mx-auto absolute left-1/2 -translate-x-1/2 -top-1/2">
                <p className="text-indigo-400 font-medium">Get started</p>
                <h2 className="text-4xl md:text-5xl font-bold mt-2">
                    Boost your health.
                    <br />
                    Start using our AI assistant today.
                </h2>
                <p className="mt-4 max-w-xl mx-auto text-gray-400">
                    Get tailored health advice, track your wellness, and stay
                    informed with our AI-powered assistant.
                </p>
                <button className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                    Get started
                </button>
            </div>

            {/* Links Section */}
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Logo */}
                <div className="col-span-1 flex items-center">
                    <img src={logo} className="size-10" alt="" />
                    <span className="ml-2 text-2xl font-bold">ሸጋ-Health</span>
                </div>

                {/* Solutions */}
                <div>
                    <h3 className="font-semibold text-white">Solutions</h3>
                    <ul className="mt-2 space-y-1">
                        <li>Checker</li>
                        <li>Assistant</li>
                        <li>Learning</li>
                        <li>Wellness</li>
                        <li>Support</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-semibold text-white">Support</h3>
                    <ul className="mt-2 space-y-1">
                        <li>Tickets</li>
                        <li>Help</li>
                        <li>Guides</li>
                        <li>Docs</li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="font-semibold text-white">Company</h3>
                    <ul className="mt-2 space-y-1">
                        <li>About</li>
                        <li>Blog</li>
                        <li>Careers</li>
                        <li>Press</li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="font-semibold text-white">Legal</h3>
                    <ul className="mt-2 space-y-1">
                        <li>Terms of service</li>
                        <li>Privacy policy</li>
                        <li>Compliance</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-6 flex justify-between items-center px-6 max-w-6xl mx-auto">
                <p className="text-sm">
                    © 2025 ሸጋ-Health, Inc. All rights reserved.
                </p>
                <div className="flex space-x-4">
                    {social_medias.map((media, i) => (
                        <AnimatedIcon
                            key={i}
                            animation={media.animation}
                            link={media.link}
                        />
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
