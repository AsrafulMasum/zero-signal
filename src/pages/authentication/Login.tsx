import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/apiSlices/authSlice';
import toast from 'react-hot-toast';

export type errorType = {
    data: {
        errorMessages: { message: string }[];
        message: string;
    };
};

const Login = () => {
    const navigate = useNavigate();

    const [login] = useLoginMutation();

    const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

    const onFinish = async (values: { email: string; password: string; remember: boolean }) => {
        try {
            const res = await login({
                email: values.email,
                password: values.password,
            }).unwrap();

            if (res?.success) {
                localStorage.setItem('token', JSON.stringify(res?.data?.accessToken));
                toast.success('Login successful!');
                if (values?.remember) {
                    localStorage.setItem(
                        'user',
                        JSON.stringify({
                            email: values?.email,
                            password: values?.password,
                        }),
                    );
                } else {
                    localStorage.removeItem('user');
                }
                navigate('/');
            } else {
                toast.error('Login failed.', res?.message || 'Please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Check your credentials.');
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
            <div className="flex items-center justify-center p-5 h-screen  ">
                <div
                    className="bg-transparent max-w-[630px] w-full rounded-lg p-10"
                    style={{
                        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.14)',
                    }}
                >
                    <div className=" space-y-5 !pb-3 text-center">
                        <h1 className="text-3xl text-[#2C2C2C] font-medium text-center mt-2">Login to Account!</h1>
                        <p className="text-[#565656]">Please enter your email and password to continue</p>
                    </div>

                    <Form
                        name="normal_login"
                        className="login-form"
                        layout="vertical"
                        initialValues={{
                            email: savedUser?.email || '',
                            password: savedUser?.password || '',
                            remember: !!savedUser,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="email" className="block text-textBlack mb-1 text-lg">
                                    Email
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                placeholder="Enter your email address"
                                type="email"
                                className="h-12 px-6 bg-[#F5E9DF] hover:bg-[#F5E9DF] focus:bg-[#F5E9DF]"
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-textBlack mb-1 text-lg">
                                    Password
                                </label>
                            }
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password
                                placeholder="Enter your password"
                                className=" h-12 px-6 bg-[#F5E9DF] hover:bg-[#F5E9DF] focus:bg-[#F5E9DF]"
                            />
                        </Form.Item>

                        <div className="flex items-center justify-between mb-4">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className="text-textBlack text-lg">Remember password</Checkbox>
                            </Form.Item>
                            <Link
                                to="/forget-password"
                                className="text-[#FC6057] text-md hover:text-[#FC6057] hover:underline"
                            >
                                Forget password
                            </Link>
                        </div>

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
                                }}
                                // onClick={() => navigate('/')}
                            >
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Login;
