import { Button, Descriptions, Modal, Tag } from 'antd';

import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { imageUrl } from '../../../redux/api/baseApi';
import { CiImageOn } from 'react-icons/ci';
import { PiUserFocus } from 'react-icons/pi';
export default function UserModal({
    isModalVisible,
    handleModalClose,
    selectedUser,
}: {
    isModalVisible: boolean;
    handleModalClose: () => void;
    selectedUser: any;
}) {

    return (
        <Modal
            title={<span className="text-lg font-semibold">User Details</span>}
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={[
                <Button key="close" onClick={handleModalClose}>
                    Close
                </Button>,
            ]}
            width={600}
            centered
        >
            {selectedUser && (
                <div className="py-4">
                    <Descriptions bordered column={1} size="middle">
                        <Descriptions.Item
                            label={
                                <span className="font-medium flex items-center">
                                    <CiImageOn className="mr-2 size-5" />
                                    Image
                                </span>
                            }
                        >
                            <img
                                src={
                                    selectedUser.image && selectedUser.image.startsWith('http')
                                        ? selectedUser.image
                                        : `${imageUrl}${selectedUser.image}`
                                }
                                alt="user"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={
                                <span className="font-medium flex items-center">
                                    <UserOutlined className="mr-2" />
                                    User Name
                                </span>
                            }
                        >
                            {selectedUser.name}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={
                                <span className="font-medium flex items-center">
                                    <MailOutlined className="mr-2" />
                                    Email
                                </span>
                            }
                        >
                            {selectedUser.email}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={
                                <span className="font-medium flex items-center">
                                    <PiUserFocus className="mr-2" />
                                    Role
                                </span>
                            }
                        >
                            <Tag color="blue">{selectedUser.role}</Tag>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            )}
        </Modal>
    );
}
