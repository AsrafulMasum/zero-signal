import React from 'react';
import { Input, Button, Typography } from 'antd';
import { EyeInvisibleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ChangePassword: React.FC = () => {
    return (
        <div
            style={{
                maxWidth: 820,
                margin: '0 auto',
                padding: '40px 20px',
                marginTop: 80,
            }}
        >
            {/* Current Password */}
            <div style={{ marginBottom: 22 }}>
                <Text style={{ fontSize: 16, fontWeight: 500, color: '#1F2937' }}>Current Password</Text>
                <Input.Password
                    placeholder="Enter your password"
                    iconRender={() => <EyeInvisibleOutlined />}
                    style={{
                        marginTop: 6,
                        height: 52,
                        backgroundColor: '#FBFBFB',
                        borderRadius: 12,
                        border: 'none',
                    }}
                />
            </div>

            {/* New Password */}
            <div style={{ marginBottom: 22 }}>
                <Text style={{ fontSize: 16, fontWeight: 500, color: '#1F2937' }}>New Password</Text>
                <Input.Password
                    placeholder="Enter your password"
                    iconRender={() => <EyeInvisibleOutlined />}
                    style={{
                        marginTop: 6,
                        height: 52,
                        backgroundColor: '#FBFBFB',
                        borderRadius: 12,
                        border: 'none',
                    }}
                />
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: 36 }}>
                <Text style={{ fontSize: 16, fontWeight: 500, color: '#1F2937' }}>New Password</Text>
                <Input.Password
                    placeholder="Re-enter your password"
                    iconRender={() => <EyeInvisibleOutlined />}
                    style={{
                        marginTop: 6,
                        height: 52,
                        backgroundColor: '#FBFBFB',
                        borderRadius: 12,
                        border: 'none',
                    }}
                />
            </div>

            {/* Submit Button */}
            <Button
                block
                style={{
                    height: 52,
                    backgroundColor: '#D4A017',
                    color: '#FFFFFF',
                    borderRadius: 6,
                    border: 'none',
                    fontWeight: 500,
                    fontSize: 18,
                }}
            >
                Submit
            </Button>
        </div>
    );
};

export default ChangePassword;
