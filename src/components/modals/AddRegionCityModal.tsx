import { ConfigProvider, Form, Input, Modal, Select } from "antd";
import { ActiveTab, CityType, RegionType } from "../../types/types";
import React from "react";
const { Option } = Select;
 export default function AddRegionCityModal({
    open,
    onCancel,
    onSubmit,
    editingItem,
    activeTab,
    regionOptions,
}: {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    editingItem: RegionType | CityType | null;
    activeTab: ActiveTab;
    regionOptions: RegionType[];
}) {
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (open) {
            if (editingItem) {
                // populate fields depending on activeTab
                if (activeTab === 'region') {
                    const r = editingItem as RegionType;
                    form.setFieldsValue({
                        regionName: r.regionName,
                        totalCity: r.totalCity,
                        status: r.status,
                    });
                } else {
                    const c = editingItem as CityType;
                    form.setFieldsValue({
                        regionName: c.regionName,
                        cityName: c.cityName,
                        status: c.status,
                    });
                }
            } else {
                form.resetFields();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, editingItem, activeTab]);

    const title = editingItem
        ? `Edit ${activeTab === 'region' ? 'Region' : 'City'}`
        : `Add ${activeTab === 'region' ? 'Region' : 'City'}`;

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#2E4F3E' } }}>
            <Modal
                title={title}
                open={open}
                centered
                onCancel={() => {
                    form.resetFields();
                    onCancel();
                }}
                onOk={async () => {
                    try {
                        const values = await form.validateFields();
                        onSubmit(values);
                        form.resetFields();
                    } catch (err) {
                        // validation failed
                    }
                }}
                okText={editingItem ? 'Update' : 'Add'}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    {activeTab === 'region' ? (
                        <>
                            <Form.Item
                                label="Region Name"
                                name="regionName"
                                rules={[{ required: true, message: 'Please enter region name' }]}
                            >
                                <Input placeholder="e.g. Ontario" />
                            </Form.Item>

                            <Form.Item
                                label="Total City"
                                name="totalCity"
                                rules={[
                                    { required: true, message: 'Please enter total city count' },
                                    {
                                        validator: (_, value) => {
                                            if (value === undefined || value === null || value === '') {
                                                return Promise.reject('Please enter total city count');
                                            }
                                            if (isNaN(Number(value)) || Number(value) < 0) {
                                                return Promise.reject('Total City must be a non-negative number');
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <Input type="number" min={0} />
                            </Form.Item>

                            <Form.Item label="Status" name="status" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="active">active</Option>
                                    <Option value="inactive">inactive</Option>
                                </Select>
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item label="Region" name="regionName" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select region"
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.children as unknown as string)
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                >
                                    {regionOptions.map((r) => (
                                        <Option key={r.key} value={r.regionName}>
                                            {r.regionName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="City Name"
                                name="cityName"
                                rules={[{ required: true, message: 'Please enter city name' }]}
                            >
                                <Input placeholder="e.g. Toronto" />
                            </Form.Item>

                            <Form.Item label="Status" name="status" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="active">active</Option>
                                    <Option value="inactive">inactive</Option>
                                </Select>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>
        </ConfigProvider>
    );
}