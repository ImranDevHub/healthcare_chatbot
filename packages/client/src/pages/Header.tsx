import { useAuth } from '@/hooks/useAuth';
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UseAnimations from 'react-useanimations';
import menu from 'react-useanimations/lib/menu';
import logo from '/logo/SHEGAAsset-7@4x.png';

const navigation = [
    { name: 'Chatbot', href: '/chatbot' },
    { name: 'Symptom Checking', href: '#' },
    { name: 'Health Suggestion', href: 'health-form' },
    { name: 'Condition Evaluation', href: '#' },
];

const Header = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const scrollPosition = useRef(0);
    const ticking = useRef(false);

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/';
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');

            if (heroSection) {
                const heroBottom = heroSection.getBoundingClientRect().bottom;
                const isPastHero = heroBottom <= 0;

                setIsSticky(isPastHero);
                setIsScrolled(currentScrollPos > 10);
            }

            scrollPosition.current = currentScrollPos;
            ticking.current = false;
        };

        const onScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(handleScroll);
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        // Initial check in case page loads with scroll
        handleScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [location.pathname]);

    // Close mobile menu when navigating
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const headerClasses = `inset-x-0 z-50 transition-all duration-300  ${
        isSticky
            ? 'fixed top-0 bg-transparent shadow-md backdrop-blur-sm'
            : `absolute top-0 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm' : 'bg-transparent'}`
    }`;

    return (
        <header ref={headerRef} className={headerClasses}>
            <nav
                aria-label="Global"
                className="flex items-center justify-between p-6 lg:px-8"
            >
                <div className="flex lg:flex-1">
                    <Link
                        to="/"
                        className="-m-1.5 p-1.5 transition-opacity hover:opacity-90"
                    >
                        <span className="sr-only">ሸጋ Health</span>
                        <img
                            alt=""
                            src={logo}
                            className={`w-auto transition-all duration-300 ${isSticky ? 'h-7' : 'h-8'}`}
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors ${
                            isSticky
                                ? 'text-gray-300 hover:text-gray-500'
                                : 'text-gray-200 hover:text-white'
                        }`}
                    >
                        <span className="sr-only">Open main menu</span>
                        <UseAnimations
                            animation={menu}
                            size={24}
                            strokeColor="#E0E0E0"
                        />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map(item => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`text-sm/6 font-semibold transition-colors duration-200 ${
                                isSticky
                                    ? 'text-gray-400 hover:text-gray-200'
                                    : 'text-white hover:text-gray-300'
                            }`}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {user ? (
                        <Menu as="div" className="relative px-3">
                            <MenuButton className="flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                <span
                                    className={`size-8 rounded-full flex items-center justify-center outline-2 outline-offset-2 transition-all duration-300 ${
                                        isSticky
                                            ? 'bg-indigo-600 text-white outline-indigo-300'
                                            : 'bg-white text-indigo-900 outline-indigo-700'
                                    }`}
                                >
                                    {user.email?.charAt(0).toUpperCase()}
                                </span>
                            </MenuButton>

                            <MenuItems className="absolute right-3 mt-3 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-white/10 focus:outline-none">
                                <MenuItem>
                                    <Link
                                        to="#"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Your Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link
                                        to="#"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Settings
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="block w-full px-4 py-2 text-sm text-red-400 text-left hover:bg-white/5"
                                    >
                                        Sign Out
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    ) : (
                        <Link
                            to="/login"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-white/5"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Log in &#8594;
                        </Link>
                    )}
                </div>
            </nav>
            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-transparent backdrop-blur-xl p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10 transition-all duration-1000 ease-in-out">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img alt="" src={logo} className="h-8 w-auto" />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-200"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">
                                {navigation.map(item => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="py-6">
                                {user ? (
                                    <Menu as="div" className="relative px-3">
                                        <MenuButton className="flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                            <span className="size-8 rounded-full bg-white text-indigo-700 font-bold flex items-center justify-center outline-2 outline-offset-2 outline-indigo-700">
                                                {user.email
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </MenuButton>

                                        <MenuItems className="absolute right-3 mt-3 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-white/10 focus:outline-none">
                                            <MenuItem>
                                                <Link
                                                    to="#"
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                                                    onClick={() =>
                                                        setMobileMenuOpen(false)
                                                    }
                                                >
                                                    Your Profile
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link
                                                    to="#"
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                                                    onClick={() =>
                                                        setMobileMenuOpen(false)
                                                    }
                                                >
                                                    Settings
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <button
                                                    onClick={() => {
                                                        handleLogout();
                                                        setMobileMenuOpen(
                                                            false
                                                        );
                                                    }}
                                                    className="block w-full px-4 py-2 text-sm text-red-400 text-left hover:bg-white/5"
                                                >
                                                    Sign Out
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-white/5"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Log in &#8594;
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
};

export default Header;
