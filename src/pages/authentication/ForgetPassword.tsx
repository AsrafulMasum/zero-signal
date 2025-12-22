import { Button, ConfigProvider, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation } from '../../redux/apiSlices/authSlice';

const ForgetPassword = () => {
    const navigate = useNavigate();
    // const onFinish: FormProps<FieldNamesType>['onFinish'] = (values: any) => {
    //     localStorage.setItem('forgetEmail', JSON.stringify(values.email));
    //     navigate('/verify-otp');
    // };

    const [forgotPassword] = useForgetPasswordMutation();

    const onFinish = async (values: any) => {
        try {
            const res = await forgotPassword({
                email: values?.email,
            }).unwrap();
            if (res?.success) {
                toast.success(res?.message);
                navigate(`/verify-otp?email=${values?.email}`);
            } else {
                console.error('Failed to send OTP');
            }
        } catch (error) {
            console.error('Error:', error);
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
            <div className="flex  items-center justify-center h-screen p-5">
                <div
                    className="bg-transparent max-w-[630px] w-full rounded-lg p-10"
                    style={{
                        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.14)',
                    }}
                >
                    <div className=" space-y-3 text-center">
                        <h1 className="text-3xl font-medium text-center my-2 text-[#2C2C2C]">Forget Password</h1>
                        <p className="text-[#565656] !mb-10">
                            Enter your email address to ger a verification code for resetting your password.
                        </p>
                    </div>

                    <Form
                        name="normal_ForgetPassword"
                        className="ForgetPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
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

                        <Form.Item>
                            <Button
                                className="!bg-primary"
                                htmlType="submit"
                                style={{
                                    height: 48,
                                    width: '100%',
                                    fontWeight: 500,
                                    color: '#fff',
                                    fontSize: 20,
                                    marginTop: 20,
                                }}
                                // onClick={() => navigate('/')}
                            >
                                Send a code
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;
