import { TSidebarItem } from './generateSidebarItems';
import { LuClipboardList, LuLayoutDashboard } from 'react-icons/lu';
import { TbBook } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import { PiUsers } from 'react-icons/pi';
// import { LucideUserRound } from 'lucide-react';
// import { CgLock } from 'react-icons/cg';
import { MdOutlineCategory } from 'react-icons/md';
import { TfiLocationPin } from 'react-icons/tfi';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { BiSupport } from 'react-icons/bi';
import { GoQuestion } from 'react-icons/go';

const sidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '',
        icon: <LuLayoutDashboard size={24} />,
    },
    {
        key: 'users',
        label: 'Users',
        path: 'users',
        icon: <PiUsers size={24} />,
    },
    {
        key: 'categories',
        label: 'Categories',
        path: 'categories',
        icon: <MdOutlineCategory size={24} />,
    },
    {
        key: 'reports',
        label: 'Reports',
        path: 'reports',
        icon: <HiOutlineClipboardDocumentList size={24} />,
    },
    {
        key: 'spots',
        label: 'Spots',
        path: 'spots',
        icon: <TfiLocationPin size={24} />,
    },
    {
        key: 'supports',
        label: 'Supports',
        path: 'supports',
        icon: <BiSupport size={24} />,
    },
    {
        key: 'settings',
        label: 'Settings',
        path: 'settings',
        icon: <IoSettingsOutline size={24} />,
        children: [
            // {
            //     key: 'changePassword',
            //     label: 'Change Password',
            //     path: 'changePassword',
            //     icon: <CgLock size={20} />,
            // },
            // {
            //     key: 'adminProfile',
            //     label: 'Profile',
            //     path: 'adminProfile',
            //     icon: <LucideUserRound size={20} />,
            // },
            {
                key: 'faq',
                label: 'FAQ',
                path: 'faq',
                icon: <GoQuestion size={20} />,
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
        ],
    },
];

export default sidebarItems;
