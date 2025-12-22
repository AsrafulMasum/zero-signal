import { useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input } from 'antd';
import { SubscriptionType } from '.';

interface EditProps {
    packageData: SubscriptionType | null;
    setOpenEditModal: (v: boolean) => void;
    handleEdit: (pkg: SubscriptionType) => void;
}

const EditInputForm: React.FC<EditProps> = ({ packageData, setOpenEditModal, handleEdit }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (packageData) {
            form.setFieldsValue(packageData);
        }
    }, [packageData]);

    const onFinish = (values: any) => {
        if (!packageData) return;

        const updated: SubscriptionType = {
            ...packageData,
            name: values.name,
            duration: values.duration,
            price: Number(values.price),
            features: values.features,
        };

        handleEdit(updated);
        setOpenEditModal(false);
    };

    return (
        <ConfigProvider
            theme={{
                token: { colorPrimary: '#2E4F3E' },
            }}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="name" label="Package Name" rules={[{ required: true }]}>
                    <Input className="h-12" />
                </Form.Item>

                <Form.Item name="duration" label="Package Type" rules={[{ required: true }]}>
                    <Input className="h-12" />
                </Form.Item>

                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <Input type="number"  className="h-12 mb-2"/>
                </Form.Item>

                {/* Dynamic Feature Fields */}
                <Form.List name="features">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <div key={field.key} className="flex items-center gap-3 mb-2">
                                    <Form.Item
                                        {...field}
                                        className="flex-1"
                                        rules={[{ required: true, message: 'Enter feature' }]}
                                    >
                                        <Input placeholder="Feature"  className="h-12"/>
                                    </Form.Item>

                                    <MinusCircleOutlined className="text-red-600" onClick={() => remove(field.name)} />
                                </div>
                            ))}

                            <Button
                                type="dashed"
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                                style={{ width: '100%', height: '48px' }}
                            >
                                Add Feature
                            </Button>
                        </>
                    )}
                </Form.List>

                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full mt-5 h-11"
                    style={{ backgroundColor: '#2E4F3E' }}
                >
                    Update
                </Button>
            </Form>
        </ConfigProvider>
    );
};

export default EditInputForm;
