import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { useResetPasswordMutation } from '../../redux/apiSlices/authSlice';
import toast from 'react-hot-toast';

const NewPassword = () => {
    const navigate = useNavigate();
    const [resetPassword] = useResetPasswordMutation();

    const onFinish = async (values: { new_password: string; confirm_password: string }) => {
        if (values) {
            const token = new URLSearchParams(window.location.search).get('token');
            if (!token) {
                console.error('Reset token is missing!');
                return;
            }

            const data = {
                newPassword: values?.new_password,
                confirmPassword: values?.confirm_password,
            };

            try {
                const res = await resetPassword({
                    payload: data,
                    token,
                }).unwrap();

                if (res?.success) {
                    navigate('/login');
                    toast.success(res?.message);
                }
            } catch (error: any) {
                console.error(error?.data?.message);
                toast.error(error?.data?.message || 'Something went wrong. Please try again.');
            }
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#2E4F3E',

                    colorBgContainer: '#F1F4F9',
                },
                components: {
                    Input: {
                        borderRadius: 10,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },
                },
            }}
        >
            <div className="flex items-center justify-center h-screen p-5 " style={{}}>
                <div
                    className="bg-transparent max-w-[630px] w-full p-10"
                    style={{
                        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.14)',
                    }}
                >
                    <div className=" max-w-md mx-auto space-y-3 text-center mb-10">
                        <h1 className="text-3xl  font-medium text-center mt-2 text-[#000]">Set a new password</h1>
                        <p className="text-[#565656]">
                            Create a new password. Ensure it differs from previous ones for security
                        </p>
                    </div>

                    <Form
                        name="normal_NewPassword"
                        className="NewPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    New Password
                                </label>
                            }
                            name="new_password"
                            rules={[{ required: true, message: 'Please input new password!' }]}
                        >
                            <Input.Password
                                placeholder="KK!@#$15856"
                                className="h-12 px-6 bg-[#F5E9DF] hover:bg-[#F5E9DF] focus:bg-[#F5E9DF]"
                            />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Confirm Password
                                </label>
                            }
                            name="confirm_password"
                            rules={[
                                { required: true, message: 'Please input confirm password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (value && value !== getFieldValue('new_password')) {
                                            return Promise.reject(
                                                new Error('The two passwords that you entered do not match!'),
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder="KK!@#$15856"
                                className="h-12 px-6 bg-[#F5E9DF] hover:bg-[#F5E9DF] focus:bg-[#F5E9DF]"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className="!bg-primary"
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                    color: '#fff',
                                    fontSize: 20,
                                    marginTop: 20,
                                }}
                                // onClick={() => navigate('/')}
                            >
                                Update Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;
