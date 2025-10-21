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
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav
                aria-label="Global"
                className="flex items-center justify-between p-6 lg:px-8"
            >
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">ሸጋ Health</span>
                        <img alt="" src={logo} className="h-8 w-auto" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
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
                            className="text-sm/6 font-semibold text-white"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {user ? (
                        <Menu as="div" className="relative px-3">
                            <MenuButton className="flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                <span className="size-8 rounded-full bg-white text-indigo-900 font-bold flex items-center justify-center outline-2 outline-offset-2 outline-indigo-700">
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
