import { useEffect, useRef, useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, CameraOutlined } from '@ant-design/icons';
import { Tabs, Button, Input, message, Avatar, Form, ConfigProvider } from 'antd';
import {
    useChangePasswordMutation,
    useProfileQuery,
    useUpdateProfileMutation,
} from '../../../redux/apiSlices/authSlice';
import { imageUrl } from '../../../redux/api/baseApi';
import toast from 'react-hot-toast';

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
        type: 'email',
        disabled: true,
        rules: [
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
        ],
    },
];

const passwordFormFields = [
    {
        name: 'current',
        label: 'Current Password',
        placeholder: 'Enter current password',
        rules: [{ required: true }],
        type: 'password',
    },
    {
        name: 'new',
        label: 'New Password',
        placeholder: 'Enter new password',
        rules: [{ required: true }],
        type: 'password',
    },
    {
        name: 'confirm',
        label: 'Confirm New Password',
        placeholder: 'Confirm new password',
        dependencies: ['new'],
        type: 'password',
        rules: [
            { required: true },
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

    const fileRef = useRef<HTMLInputElement | null>(null);

    const { data } = useProfileQuery({});
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [changePassword, { isLoading: isUpdatingPassword }] = useChangePasswordMutation();

    const profile = data?.data;

    const [avatarPreview, setAvatarPreview] = useState<string | undefined>();
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const [form] = Form.useForm();

    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                name: profile.name,
                email: profile.email,
            });
            if (profile?.image?.startsWith('http')) setAvatarPreview(profile.image);
            else {
                setAvatarPreview(`${imageUrl}${profile.image}`);
            }
        }
    }, [profile, form]);

    // Image change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    // Profile submit
    const handleProfileSubmit = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);

            if (avatarFile) {
                formData.append('image', avatarFile);
            }

            await updateProfile(formData).unwrap();
            message.success('Profile updated successfully!');
        } catch (err: any) {
            message.error(err?.data?.message || 'Profile update failed');
        }
    };

    const handleChangePassword = async (values: any) => {
        const payload = {
            currentPassword: values.current,
            newPassword: values.new,
            confirmPassword: values.confirm,
        };

        try {
            const res = await changePassword(payload).unwrap();
            if (res?.success) {
                toast.success(res?.message);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const renderFields = (fields: any[], isPassword = false) =>
        fields.map((field) => (
            <Form.Item
                key={field.name}
                name={field.name}
                label={<label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>}
                dependencies={field.dependencies}
                rules={field.rules}
            >
                {isPassword ? (
                    <div className="relative">
                        <Input
                            size="large"
                            type={showPasswords[field.name as keyof typeof showPasswords] ? 'text' : 'password'}
                            placeholder={field.placeholder}
                            className="rounded-lg pr-10"
                            style={{
                                backgroundColor: '#0000000a',
                            }}
                        />
                        <span
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={() => togglePasswordVisibility(field.name as 'current' | 'new' | 'confirm')}
                        >
                            {showPasswords[field.name as 'current' | 'new' | 'confirm'] ? (
                                <EyeOutlined />
                            ) : (
                                <EyeInvisibleOutlined />
                            )}
                        </span>
                    </div>
                ) : (
                    <Input
                        size="large"
                        placeholder={field.placeholder}
                        className="rounded-lg"
                        disabled={field.disabled}
                        style={{
                            backgroundColor: '#0000000a',
                        }}
                    />
                )}
            </Form.Item>
        ));

    const tabItems = [
        {
            key: '1',
            label: 'Profile Info',
            children: (
                <div className="space-y-6">
                    {/* Avatar */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <Avatar size={120} src={avatarPreview} className="border-4 border-teal-50" />
                            <div
                                onClick={() => fileRef.current?.click()}
                                className="absolute bottom-0 right-0 bg-primary rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
                            >
                                <CameraOutlined className="text-white text-lg" />
                            </div>
                            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
                        </div>
                    </div>

                    {/* Form */}
                    <Form form={form} layout="vertical" onFinish={handleProfileSubmit} requiredMark={false}>
                        {renderFields(profileFormFields)}
                        <Button
                            htmlType="submit"
                            loading={isLoading}
                            className="bg-primary hover:!bg-primary h-12 text-white hover:!text-white w-full mt-4 rounded-lg"
                        >
                            Save Changes
                        </Button>
                    </Form>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Change Password',
            children: (
                <Form layout="vertical" onFinish={handleChangePassword} requiredMark={false}>
                    {renderFields(passwordFormFields, true)}
                    <Button
                        htmlType="submit"
                        loading={isUpdatingPassword}
                        className="bg-primary hover:!bg-primary h-12 text-white hover:!text-white w-full mt-4 rounded-lg"
                    >
                        Save Changes
                    </Button>
                </Form>
            ),
        },
    ];

    return (
        <div className="py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <ConfigProvider theme={{ token: { colorPrimary: '#2E4F3E' } }}>
                    <Tabs items={tabItems} activeKey={activeTab} onChange={setActiveTab} />
                </ConfigProvider>
            </div>
        </div>
    );
}
