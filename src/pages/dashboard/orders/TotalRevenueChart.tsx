import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, Card } from 'antd';
import { earningsData } from '../../../demo-data/home-data';

const { Option } = Select;

const CustomLegend = () => {
    return (
        <div className="flex gap-2 2xl:gap-4 text-sm text-[#757575] pr-4">
            <div className="flex items-center gap-1 whitespace-nowrap">
                <div className="w-3 h-3 bg-[#353355] rounded-full" />
                Revenue
            </div>
        </div>
    );
};

const TotalRevenueChart = () => {
    const [selectedYear, setSelectedYear] = useState('2025');

    return (
        <div>
            <Card className="rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4 gap-4">
                    <h2 className="text-lg font-semibold">Total Revenue</h2>
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
                    <AreaChart data={earningsData}>
                        <defs>
                            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#353355" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#353355" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#999" style={{ fontSize: '12px' }} tickFormatter={(value) => `${value}`} />
                        <Tooltip
                            formatter={(value) => `$${value}`}
                            contentStyle={{
                                backgroundColor: '#f5f5f5',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 12px',
                            }}
                            labelStyle={{ color: '#c61f1f' }}
                        />
                        <Area
                            type="monotone"
                            name="Revenue"
                            dataKey="value"
                            stroke="#353355"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorEarnings)"
                            activeDot={{ r: 6 }}
                            // dot={{ fill: '#353355', r: 4 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default TotalRevenueChart;
