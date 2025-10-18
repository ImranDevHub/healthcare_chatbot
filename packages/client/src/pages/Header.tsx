import logo from '/logo/SHEGAAsset-7@4x.png';
import { useAuth } from '@/hooks/useAuth';
import {
    Button,
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

const navigation = [
    { name: 'Chatbot', href: '/chatbot' },
    { name: 'Symptom Checking', href: '#' },
    { name: 'Health Suggestion', href: '#' },
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
                <Menu
                    as="div"
                    className="hidden lg:flex lg:flex-1 lg:justify-end"
                >
                    {user ? (
                        <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>

                            <span className="size-8 rounded-full bg-white outline-2 outline-offset-2 outline-indigo-700 text-indigo-700 font-semibold align-middle">
                                {user.email?.charAt(0).toUpperCase()}
                            </span>
                        </MenuButton>
                    ) : (
                        <Link
                            to="/login"
                            className="text-sm/6 font-semibold text-white"
                        >
                            Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )}
                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <MenuItem>
                            <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                            >
                                Your profile
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                            >
                                Settings
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Button
                                onClick={handleLogout}
                                className="bg-red-500 w-full hover:bg-red-700"
                            >
                                Sign out
                            </Button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </nav>
            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-transparent backdrop-blur-xl p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10 transition-all duration-1000 ease-in-out">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img alt="" src={logo} className="h-8 w-auto" />
                        </a>
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
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <Link
                                    to="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
};

export default Header;
