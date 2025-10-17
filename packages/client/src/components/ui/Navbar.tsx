import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '@/assets/images/SHEGAAsset-7@4x.png';
import { Button } from './button';

const navigation = [
    { name: 'Chatbot', href: '/chatbot', current: true },
    { name: 'Recommendation', href: '#', current: false },
    { name: 'Symptom Checking', href: '#', current: false },
    { name: 'placeHolder', href: '#', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <Disclosure
            as="nav"
            className="relative bg-black after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block size-6 group-data-open:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden size-6 group-data-open:block"
                            />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Link to="/">
                                <img
                                    alt="ሸጋ Health"
                                    src={logo}
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map(item => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={
                                            item.current ? 'page' : undefined
                                        }
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-950/50 text-white'
                                                : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="size-6" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            {user ? (
                                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">
                                        Open user menu
                                    </span>

                                    <span className="size-8 rounded-full bg-white outline -outline-offset-1 outline-white/50 text-black font-semibold">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </span>
                                </MenuButton>
                            ) : (
                                <div className="space-x-4">
                                    <Link to="/login">
                                        <button className="text-white font-bold py-2 px-4 rounded">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/signup">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded">
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
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
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map(item => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current
                                    ? 'bg-gray-950/50 text-white'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>

        // <nav className="bg-white shadow-md w-full p-4 flex justify-between items-center">
        //     <Link to="/" className="text-2xl font-bold text-blue-600">
        //         ሸጋ-Health
        //     </Link>
        //     <div>
        // {user ? (
        //     <div className="flex items-center space-x-4">
        //         <span className="text-gray-700">
        //             Welcome, {user.email || 'User'}
        //         </span>
        //         <button
        //             onClick={handleLogout}
        //             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        //         >
        //             Logout
        //         </button>
        //     </div>
        // ) : (
        //     <div className="space-x-4">
        //         <Link to="/login">
        //             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        //                 Login
        //             </button>
        //         </Link>
        //         <Link to="/signup">
        //             <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        //                 Sign Up
        //             </button>
        //         </Link>
        //     </div>
        // )}
        //     </div>
        // </nav>
    );
};

export default Navbar;
