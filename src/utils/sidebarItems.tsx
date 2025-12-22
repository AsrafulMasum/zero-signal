
import { TSidebarItem } from './generateSidebarItems';
import { LuClipboardList, LuLayoutDashboard} from 'react-icons/lu';
import { TbBook } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import { GiKeyring, GiMoneyStack } from 'react-icons/gi';
import { PiUserGear, PiUsers } from 'react-icons/pi';
import { LiaCcMastercard } from 'react-icons/lia';
import { LucideUserRound } from 'lucide-react';
import { CgLock } from 'react-icons/cg';

const sidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '',
        icon: <LuLayoutDashboard size={24} />,
    },
    {
        key: 'locker-management',
        label: 'Locker Management',
        path: 'locker-management',
        icon: <GiKeyring size={24} />,
    },
    // {
    //     key: 'categories',
    //     label: 'Categories',
    //     path: 'categories',
    //     icon: <MdOutlineCategory size={24} />,
    // },
    {
        key: 'users',
        label: 'Users',
        path: 'users',
        icon: <PiUsers size={24} />,
    },
    {
        key: 'subscriptions',
        label: 'Subscriptions',
        path: 'subscriptions',
        icon: <LiaCcMastercard size={24} />,
    },
    // {
    //     key: 'drivers',
    //     label: 'Subscribers',
    //     path: 'drivers',
    //     icon: <LuUserCheck size={24} />,
    // },
    {
        key: 'payments',
        label: 'Payments',
        path: 'payments',
        icon: <GiMoneyStack size={24} />,
    },
    {
        key: 'manage-admin',
        label: 'Manage Admin',
        path: 'manage-admin',
        icon: <PiUserGear size={24} />,
    },
    {
        key: 'settings',
        label: 'Settings',
        path: 'settings',
        icon: <IoSettingsOutline size={24} />,
        children: [
            {
                key: 'changePassword',
                label: 'Change Password',
                path: 'changePassword',
                icon: <CgLock size={20} />,
            },
            {
                key: 'adminProfile',
                label: 'Profile',
                path: 'adminProfile',
                icon: <LucideUserRound size={20} />,
            },
            {
                key: 'about-us',
                label: 'About us',
                path: 'about-us',
                icon: <TbBook size={20} />,
            },
            {
                key: 'terms-and-condition',
                label: 'Terms and Condition',
                path: 'terms-and-condition',
                icon: <LuClipboardList size={20} />,
            },
            {
                key: 'privacy-policy',
                label: 'Privacy Policy',
                path: 'privacy-policy',
                icon: <LuClipboardList size={20} />,
            },
            // {
            //     key: 'disclaimer',
            //     label: 'Disclaimer',
            //     path: 'disclaimer',
            //     icon: <BsPatchQuestion size={20} />,
            // },
        ],
    },
];

export default sidebarItems;
