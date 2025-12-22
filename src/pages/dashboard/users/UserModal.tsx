import {  Button, Descriptions, Modal, Tag } from 'antd'

import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
export default function UserModal({
    isModalVisible,
    handleModalClose,
    selectedUser
}: {
    isModalVisible: boolean;
    handleModalClose: () => void;
    selectedUser: any
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
                  label={<span className="font-medium"><UserOutlined className="mr-2" />Serial ID</span>}
                >
                  <Tag color="blue">{selectedUser.serialId}</Tag>
                </Descriptions.Item>
                <Descriptions.Item 
                  label={<span className="font-medium"><UserOutlined className="mr-2" />User Name</span>}
                >
                  {selectedUser.userName}
                </Descriptions.Item>
                <Descriptions.Item 
                  label={<span className="font-medium"><MailOutlined className="mr-2" />Email</span>}
                >
                  {selectedUser.email}
                </Descriptions.Item>
                <Descriptions.Item 
                  label={<span className="font-medium"><PhoneOutlined className="mr-2" />Role</span>}
                >
                  {selectedUser.role}
                </Descriptions.Item>
              </Descriptions>
            </div>
          )}
        </Modal>
  )
}
