import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router-dom';


const ForgetPassword = () => {
    const navigate = useNavigate();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values:any) => {

        localStorage.setItem('forgetEmail',JSON.stringify(values.email))
        navigate('/verify-otp')
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
            <div className="flex  items-center justify-center h-screen p-5 " style={{

        }}>
                <div className="bg-white max-w-[630px] w-full  rounded-lg drop-shadow-2xl p-10 ">
                    <div className=" space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2 text-[#000]">Forget Password</h1>
                        <p className='text-xl text-gray-400'>Enter your email address to ger a verification code for resetting your password.</p>
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
                                <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                                    Email
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input placeholder="Enter your email address" type="email" className="h-12" />
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
