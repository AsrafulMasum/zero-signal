import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Select, Card } from 'antd';
import { earningsData } from '../../../demo-data/home-data';

const { Option } = Select;

const CustomLegend = () => {
    return (
        <div className="flex gap-2 2xl:gap-4 text-sm text-[#757575] pr-4">
            <div className="flex items-center gap-1 whitespace-nowrap">
                <div className="w-3 h-3 bg-[#353355] rounded-full" />
                Weekly
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
                <div className="w-3 h-3 bg-[#8B8A9D] rounded-full" />
                Monthly
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
                <div className="w-3 h-3 bg-[#2E4F3E] rounded-full" />
                Yearly
            </div>
        </div>
    );
};

const SubscriptionPlansChart = () => {
    const [selectedYear, setSelectedYear] = useState('2025');

    return (
        <div>
            <Card className="mb-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Total Revenue (AED)</h2>
                    <div className="flex gap-2">
                        <CustomLegend />

                        {/* Year Dropdown */}
                        <Select value={selectedYear} onChange={setSelectedYear} className="w-24">
                            <Option value="2023">2023</Option>
                            <Option value="2024">2024</Option>
                            <Option value="2025">2025</Option>
                        </Select>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#999" style={{ fontSize: '12px' }} tickFormatter={(value) => `${value}`} />
                        <Tooltip
                            formatter={(value) => `${value}`}
                            contentStyle={{
                                backgroundColor: '#f5f5f5',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 12px',
                            }}
                            labelStyle={{ color: '#c61f1f' }}
                        />
                        <Bar dataKey="value" name="Subscriptions" radius={[6, 6, 0, 0]} barSize={30}>
                            {earningsData?.map((item, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        item.type === 'weekly'
                                            ? '#353355'
                                            : item.type === 'monthly'
                                            ? '#8B8A9D'
                                            : '#2E4F3E'
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default SubscriptionPlansChart;
