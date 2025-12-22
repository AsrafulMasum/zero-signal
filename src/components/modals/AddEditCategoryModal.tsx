import { Modal, Form, Input, Select, ConfigProvider } from 'antd';

const { Option } = Select;

type CategoryFormValues = {
    categoryName?: string;
    totalDishes?: number;
    city?: string;
    deliveryStatus: 'active' | 'inactive';
};

interface AddEditCategoryModalProps {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: CategoryFormValues) => void;
    editingItem?: Record<string, any> | null;
    activeTab?: 'category' | 'sub-category' | string;
    canadianCities: string[];
}

const AddEditCategoryModal = ({
    open,
    onCancel,
    onSubmit,
    editingItem,
    activeTab,
    // canadianCities,
}: AddEditCategoryModalProps) => {
    const [form] = Form.useForm<CategoryFormValues>();

    // When editing, prefill form values
    if (editingItem) {
        form.setFieldsValue(editingItem);
    }

    const handleFinish = (values: CategoryFormValues) => {
        onSubmit(values);
        form.resetFields();
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#2E4F3E' } }}>
            <Modal
                centered
                title={
                    editingItem
                        ? `Edit ${activeTab === 'category' ? 'Category' : 'Sub-Category'}`
                        : `Add ${activeTab === 'category' ? 'Category' : 'Sub-Category'}`
                }
                open={open}
                onCancel={() => {
                    form.resetFields();
                    onCancel();
                }}
                onOk={() => form.submit()}
                okText={editingItem ? 'Update' : 'Add'}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={editingItem || {}}>
                    <Form.Item
                        name="categoryName"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter a name' }]}
                    >
                        <Input
                            placeholder="Enter category name"
                            style={{
                                height: '48px',
                            }}
                        />
                    </Form.Item>

                    {/* <Form.Item
                        name="totalDishes"
                        label="Total Dishes"
                        rules={[{ required: true, message: 'Please enter total dishes' }]}
                    >
                        <Input type="number" placeholder="Enter total dishes" />
                    </Form.Item> */}

                    {/* <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please select a city' }]}>
                        <Select placeholder="Select a city" showSearch>
                            {canadianCities.map((city) => (
                                <Option key={city} value={city}>
                                    {city}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item> */}

                    <Form.Item
                        name="deliveryStatus"
                        label="Status"
                        rules={[{ required: true, message: 'Please select a status' }]}
                    >
                        <Select
                            placeholder="Select status"
                            style={{
                                height: '48px',
                            }}
                        >
                            <Option value="active">Active</Option>
                            <Option value="inactive">Inactive</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};

export default AddEditCategoryModal;
