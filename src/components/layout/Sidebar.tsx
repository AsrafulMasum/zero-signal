import { ConfigProvider, Menu, MenuProps } from 'antd';
import { TSidebarItem } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import { LogOut } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const getIcon = (icon: ReactNode | string) => {
        if (typeof icon === 'string') {
            return <img src={icon} className="w-6" alt="icon" />;
        }
        return icon;
    };

    const sidebarItemsGenerator = (items: TSidebarItem[]): MenuProps['items'] => {
        return items.map((item) => {
            if (item.children) {
                return {
                    key: item.key,
                    icon: getIcon(item.icon),
                    label: item.label,
                    children: item.children.map((child) => ({
                        key: `/${child.path}`,
                        icon: getIcon(child.icon),
                        label: <Link to={`/${child.path}`}>{child.label}</Link>,
                    })),
                };
            }
            return {
                key: `/${item.path}`,
                icon: getIcon(item.icon),
                label: <Link to={`/${item.path}`}>{item.label}</Link>,
            };
        });
    };

    return (
        <div className="relative h-[calc(100vh-97px)] w-full border-r border-gray-200">
            <div className="flex flex-col h-[calc(100vh-97px)]">
                {/* Left section - Greeting */}
                <Link to="/">
                    <div className="flex flex-col gap-1 items-center justify-center py-2 pt-10">
                        <img src="/logo.png" alt="" className="h-20" />
                    </div>
                </Link>

                <div className="flex-1 overflow-y-auto pb-12 -ml-1 mr-4 mt-4">
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: '#808080',
                                motionDurationFast: '0.1s',
                            },
                            components: {
                                Menu: {
                                    itemActiveBg: '#2E4F3E',
                                    itemSelectedColor: '#FFF',
                                    itemBorderRadius: '0px 10px 10px 0px' as any,
                                    itemHeight: 45,
                                    itemMarginBlock: 9,
                                    itemSelectedBg: '#2E4F3E',
                                    itemColor: '#808080',
                                },
                            },
                        }}
                    >
                        <Menu
                            theme="light"
                            mode="inline"
                            selectedKeys={[location.pathname]}
                            openKeys={openKeys}
                            onOpenChange={handleOpenChange}
                            items={sidebarItemsGenerator(sidebarItems)}
                            style={{ background: 'transparent', fontSize: '16px' }}
                        />
                    </ConfigProvider>
                </div>

                <div className="py-3 ps-4 absolute bottom-0 w-full bg-[#F5E9DF]">
                    <button
                        onClick={() => {
                            handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 text-[#F44336] font-semibold rounded-md transition"
                    >
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
