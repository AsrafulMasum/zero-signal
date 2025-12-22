import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../../utils/local-storage';
export type errorType = {
    data: {
        errorMessages: { message: string }[];
        message: string;
    };
};
const VerifyOtp = () => {
    const navigate = useNavigate();
    const email = getFromLocalStorage('forgetEmail');

    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
        const token = localStorage.getItem('resetToken')||'true'
        if (token) {
            navigate('/new-password', { state: { token: token, email: email } });
        }
        console.log('Received values of form: ', values);
        
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
            <div className="flex  items-center justify-center h-screen p-5 " style={{}}>
                <div className="bg-white max-w-[630px] w-full rounded-lg drop-shadow-2xl shadow-lg p-10 ">
                    <div className="text-primaryText space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2 text-[#000]">Check your email</h1>
                        <p>We sent a reset link to {email} enter 5 digit code that mentioned in the email</p>
                    </div>

                    <Form
                        name="normal_VerifyOtp"
                        className="my-5"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className="flex items-center justify-center mx-auto"
                            name="otp"
                            rules={[{ required: true, message: 'Please input otp code here!' }]}
                        >
                            <Input.OTP
                                style={{
                                    width: 300,
                                }}
                                className=""
                                variant="filled"
                                length={5}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                            className='!bg-primary'
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
                            <p className="text-primary cursor-pointer active:text-red-400">Resend</p>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
