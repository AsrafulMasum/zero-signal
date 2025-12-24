import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, ConfigProvider, DatePicker } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import { useGetUserAnalyticsQuery } from '../../../redux/apiSlices/analyticsSlice';

const TotalUserChart = () => {
    const [selectedYear, setSelectedYear] = useState('');

    const { data: users } = useGetUserAnalyticsQuery({ year: selectedYear });
    const usersAnalytics = users?.data;

    return (
        <div>
            <Card
                className="mb-4 rounded-lg bg-transparent"
                style={{
                    boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.14)',
                }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Total User Statistics</h2>
                    <div className="flex gap-2">
                        {/* <CustomLegend /> */}

                        {/* Year Dropdown */}
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#2E4F3E',
                                    colorBgContainer: '#FFF4E9',
                                    colorBgElevated: '#FFF4E9',
                                    colorBorder: '#2E4F3E',
                                    colorText: '#000',
                                    colorTextPlaceholder: '#000',
                                    colorIcon: '#000',
                                },
                            }}
                        >
                            <DatePicker
                                className="!cursor-pointer"
                                picker="year"
                                suffixIcon={<FaChevronDown className="text-gray-500 text-sm" />}
                                onChange={(_, dateString) => {
                                    setSelectedYear(
                                        Array.isArray(dateString) ? dateString.join('-') : dateString || '',
                                    );
                                }}
                            />
                        </ConfigProvider>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={235}>
                    <BarChart data={usersAnalytics}>
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
                        <Bar dataKey="count" name="Users" fill="#484949" radius={[15, 15, 0, 0]} barSize={25} />
                        {/* <Bar dataKey="value" name="Organizers" fill="#7B61FF" radius={[6, 6, 0, 0]} barSize={10} /> */}
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default TotalUserChart;
