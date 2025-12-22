import React, { useRef, useState } from 'react';
import { Card, Avatar, Button, Input, Typography } from 'antd';
import { EditOutlined, CameraOutlined } from '@ant-design/icons';

const { Text } = Typography;

const AdminProfile: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        fullName: 'Admin Humphrey',
        contact: '+99-01846875456',
        email: 'admin.humphrey@example.com',
        avatar: 'https://i.pravatar.cc/150?img=12',
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAvatarClick = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, avatar: preview }));

        // keep `file` for API upload if needed
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        console.log('Saved Data:', formData);
        setIsEditing(false);
    };

    return (
        <Card
            style={{
                maxWidth: 900,
                margin: '0 auto',
                borderRadius: 12,
                border: 'none',
                backgroundColor: 'transparent',
                marginTop: 32,
            }}
            bodyStyle={{ padding: 24 }}
        >
            {/* Header */}
            <div
                style={{
                    position: 'relative',
                    marginBottom: 24,
                    paddingTop: 40,
                    paddingBottom: 40,
                    backgroundColor: '#FBFBFB',
                    borderRadius: 12,
                }}
            >
                {/* Edit profile button */}
                {!isEditing && (
                    <Button
                        icon={<EditOutlined />}
                        onClick={handleEdit}
                        style={{
                            position: 'absolute',
                            right: 20,
                            top: 20,
                            color: '#2E7D32',
                            backgroundColor: '#099F2A26',
                            border: 'none',
                            borderRadius: 6,
                            fontSize: 14,
                            padding: '0px 16px',
                            height: 40,
                        }}
                    >
                        Edit profile
                    </Button>
                )}

                {/* Avatar + name */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            cursor: isEditing ? 'pointer' : 'default',
                        }}
                        onClick={handleAvatarClick}
                    >
                        <Avatar size={80} src={formData.avatar} />

                        {/* Camera icon when editing */}
                        {isEditing && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: -2,
                                    right: -2,
                                    width: 22,
                                    height: 22,
                                    backgroundColor: '#2E7D32',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CameraOutlined style={{ color: '#fff', fontSize: 12 }} />
                            </div>
                        )}
                    </div>

                    <Text style={{ fontSize: 16, fontWeight: 600 }}>{formData.fullName}</Text>

                    {/* Hidden file input */}
                    <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                </div>
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Full Name */}
                <div>
                    <Text style={{ fontSize: 13, color: '#6B7280' }}>Full Name</Text>
                    <Input
                        value={formData.fullName}
                        disabled={!isEditing}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        style={{
                            marginTop: 6,
                            height: 52,
                            backgroundColor: '#FBFBFB',
                            borderRadius: 12,
                            border: 'none',
                            WebkitTextFillColor: '#1F1F1F',
                        }}
                    />
                </div>

                {/* Email */}
                {!isEditing && (
                    <div>
                        <Text style={{ fontSize: 13, color: '#6B7280' }}>Email</Text>
                        <Input
                            value={formData.email}
                            disabled
                            style={{
                                marginTop: 6,
                                height: 52,
                                backgroundColor: '#FBFBFB',
                                borderRadius: 12,
                                border: 'none',
                                WebkitTextFillColor: '#1F1F1F',
                            }}
                        />
                    </div>
                )}

                {/* Contact Number */}
                <div>
                    <Text style={{ fontSize: 13, color: '#6B7280' }}>Contact Number</Text>
                    <Input
                        value={formData.contact}
                        disabled={!isEditing}
                        onChange={(e) => handleChange('contact', e.target.value)}
                        style={{
                            marginTop: 6,
                            height: 52,
                            backgroundColor: '#FBFBFB',
                            borderRadius: 12,
                            border: 'none',
                            WebkitTextFillColor: '#1F1F1F',
                        }}
                    />
                </div>

                {/* Save & Change button */}
                {isEditing && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: 16,
                        }}
                    >
                        <Button
                            onClick={handleSave}
                            style={{
                                backgroundColor: '#D4A017',
                                border: 'none',
                                borderRadius: 8,
                                height: 40,
                                padding: '0 24px',
                                fontWeight: 500,
                                color: '#fff',
                            }}
                        >
                            Save & Change
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default AdminProfile;
