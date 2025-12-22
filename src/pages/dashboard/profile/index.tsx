import { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, CameraOutlined } from '@ant-design/icons';
import { Tabs, Button, Input, message, Avatar, Form, ConfigProvider } from 'antd';

// JSON input describing form fields for both profile and password change
const profileFormFields = [
    {
        name: 'name',
        label: 'Name',
        placeholder: 'Enter your name',
        rules: [{ required: true, message: 'Please enter your name!' }],
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        rules: [
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
        ],
    },
    {
        name: 'contact',
        label: 'Contact No',
        placeholder: 'Enter your contact number',
        rules: [
            { required: true, message: 'Please enter your contact number!' },
            { pattern: /^[\d+\-\s()]+$/, message: 'Please enter a valid contact number!' },
        ],
    },
];

const passwordFormFields = [
    {
        name: 'current',
        label: 'Current Password',
        placeholder: 'Enter current password',
        rules: [{ required: true, message: 'Please enter your current password!' }],
        type: 'password',
    },
    {
        name: 'new',
        label: 'New Password',
        placeholder: 'Enter new password',
        rules: [{ required: true, message: 'Please enter your new password!' }],
        type: 'password',
    },
    {
        name: 'confirm',
        label: 'Confirm New Password',
        placeholder: 'Confirm new password',
        dependencies: ['new'],
        type: 'password',
        rules: [
            { required: true, message: 'Please confirm your new password!' },
            // Custom validator for passwords match
            ({ getFieldValue }: any) => ({
                validator(_: any, value: string) {
                    if (!value || getFieldValue('new') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                },
            }),
        ],
    },
];

export default function Profile() {
    const [activeTab, setActiveTab] = useState('1');
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    // Initial values for the forms
    const initialProfileValues = {
        name: 'Abdullah Al Noman',
        email: 'abdullahalnoman1512@gmail.com',
        contact: '+99 3487 4985',
    };
    const initialPasswordValues = { current: '', new: '', confirm: '' };

    // Form Handlers
    const handleProfileSubmit = (values: typeof initialProfileValues) => {
        console.log(values);
        // TODO: Submit form values to backend as needed
        console.log(values);

        message.success('Profile updated successfully!');
    };

    const handlePasswordSubmit = (values: typeof initialPasswordValues) => {
        if (values.new !== values.confirm) {
            message.error('New passwords do not match!');
            return;
        }
        message.success('Password changed successfully!');
    };

    // Toggle password field visibility
    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    // Helper to render fields from JSON
    const renderFields = (
        fields: typeof profileFormFields | typeof passwordFormFields,
        isPassword?: boolean,
        values?: any,
    ) =>
        fields.map((field: any) => {
            console.log(values);
            if (isPassword) {
                // For password fields, show/hide based on toggle
                return (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        label={<label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>}
                        dependencies={field.dependencies}
                        rules={field.rules}
                    >
                        <div className="relative">
                            <Input
                                size="large"
                                type={showPasswords[field.name as keyof typeof showPasswords] ? 'text' : 'password'}
                                placeholder={field.placeholder}
                                className="rounded-lg pr-10"
                                autoComplete="off"
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                                onClick={() => togglePasswordVisibility(field.name as 'current' | 'new' | 'confirm')}
                            >
                                {showPasswords[field.name as keyof typeof showPasswords] ? (
                                    <EyeOutlined className="text-lg" />
                                ) : (
                                    <EyeInvisibleOutlined className="text-lg" />
                                )}
                            </span>
                        </div>
                    </Form.Item>
                );
            }
            // For profile fields
            return (
                <Form.Item
                    key={field.name}
                    name={field.name}
                    label={<label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>}
                    rules={field.rules}
                >
                    <Input
                        size="large"
                        placeholder={field.placeholder}
                        className="rounded-lg"
                        autoComplete={field.name === 'email' ? 'email' : undefined}
                    />
                </Form.Item>
            );
        });

    // Tab configuration
    const tabItems = [
        {
            key: '1',
            label: 'Profile Info',
            children: (
                <div className="space-y-6">
                    <div className="flex flex-col items-center ">
                        <div className="relative">
                            <Avatar
                                size={120}
                                src="https://noman1.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAbdullah_Al_Noman.c5d6012f.jpg&w=640&q=75"
                                className="border-4 border-teal-50"
                            />
                            <div className="absolute bottom-0 right-0 bg-primary rounded-full p-2 cursor-pointer hover:bg-primary transition">
                                <CameraOutlined className="text-white text-lg" />
                            </div>
                        </div>
                    </div>
                    <Form
                        name="profileForm"
                        layout="vertical"
                        initialValues={initialProfileValues}
                        onFinish={handleProfileSubmit}
                        requiredMark={false}
                    >
                        {renderFields(profileFormFields)}
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                className="bg-primary hover:bg-primary rounded-lg h-12 text-base text-white w-full"
                            >
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Change Password',
            children: (
                <div className="space-y-6">
                    <Form
                        name="passwordForm"
                        layout="vertical"
                        initialValues={initialPasswordValues}
                        onFinish={handlePasswordSubmit}
                        requiredMark={false}
                    >
                        {renderFields(passwordFormFields, true)}
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                className="bg-primary hover:bg-primary rounded-lg h-12 text-base text-white w-full"
                            >
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
    ];

    return (
        <div className=" py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <ConfigProvider theme={{ token: { colorPrimary: '#2E4F3E' } }}>
                            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" />
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}
