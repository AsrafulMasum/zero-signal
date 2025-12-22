import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useOtpVerifyMutation, useResendOTPMutation } from '../../redux/apiSlices/authSlice';
export type errorType = {
    data: {
        errorMessages: { message: string }[];
        message: string;
    };
};
const VerifyOtp = () => {
    const navigate = useNavigate();
    const email = new URLSearchParams(location.search).get('email');
    const [otpVerify] = useOtpVerifyMutation();
    const [resendOTP] = useResendOTPMutation();

    const onFinish: FormProps<FieldNamesType>['onFinish'] = async (values: any) => {
        const data = {
            email: email,
            oneTimeCode: Number(values?.otp),
        };

        try {
            const res = await otpVerify(data).unwrap();
            if (res?.success) {
                toast.success(res?.message);
                navigate(`/new-password?token=${res?.data}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleResendEmail = async () => {
        try {
            const res = await resendOTP({ email }).unwrap();
            if (res?.success) {
                toast.success(res?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        // lineHeight: 3,
                        controlHeight: 50,
                        borderRadius: 10,
                    },
                },
                token: {
                    colorPrimary: '#2E4F3E',
                },
            }}
        >
            <div className="flex  items-center justify-center h-screen p-5">
                <div
                    className="bg-transparent max-w-[630px] w-full rounded-lg drop-shadow-2xl shadow-lg p-10"
                    style={{
                        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.14)',
                    }}
                >
                    <div className="text-primaryText space-y-3 text-center">
                        <h1 className="text-3xl font-medium text-center mt-2 text-[#2C2C2C]">Check your email</h1>
                        <p className="text-[#565656]">
                            We sent a reset link to {email} enter 5 digit code that mentioned in the email
                        </p>
                    </div>

                    <Form
                        name="normal_VerifyOtp"
                        className="my-5"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className="flex items-center justify-center mx-auto py-5"
                            name="otp"
                            rules={[{ required: true, message: 'Please input otp code here!' }]}
                        >
                            <Input.OTP
                                style={{
                                    width: 300,
                                }}
                                variant="filled"
                                length={4}
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
                                }}
                                // onClick={() => navigate('/')}
                            >
                                Verify Code
                            </Button>
                        </Form.Item>
                        <div className="text-center text-lg flex items-center justify-center gap-2">
                            <p className="text-primaryText">Didn't receive the code?</p>
                            <p onClick={handleResendEmail} className="text-primary cursor-pointer active:text-red-400">Resend</p>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
