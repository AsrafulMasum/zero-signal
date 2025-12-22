import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Select, Card } from 'antd';
import { earningsData } from '../../../demo-data/home-data';

const { Option } = Select;

const CustomLegend = () => {
    return (
        <div className="flex gap-2 2xl:gap-4 text-sm text-[#757575] pr-4">
            <div className="flex items-center gap-1 whitespace-nowrap">
                <div className="w-3 h-3 bg-[#52C41A] rounded-full" />
                Subscribers
            </div>
        </div>
    );
};

const TotalSubscriberChart = () => {
    const [selectedYear, setSelectedYear] = useState('2025');

    return (
        <div>
            <Card className="rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4 gap-4">
                    <h2 className="text-lg font-semibold">Total Revenue</h2>
                    <div className="flex gap-2">
                        <CustomLegend />
                        <Select value={selectedYear} onChange={setSelectedYear} className="w-24">
                            <Option value="2023">2023</Option>
                            <Option value="2024">2024</Option>
                            <Option value="2025">2025</Option>
                        </Select>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={earningsData} margin={{ top: 5, right: 30, left: 10, bottom: 0 }}>
                        <CartesianGrid horizontal={false} />
                        <XAxis dataKey="month" tickFormatter={(month) => month.substring(0, 3)} />
                        <YAxis />
                        <Tooltip />
                        <Line
                            name="Subscribers"
                            type="monotone"
                            dataKey="value"
                            stroke="#52C41A"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default TotalSubscriberChart;
