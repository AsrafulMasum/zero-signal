import { Card } from 'antd';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

// ---------- Types ----------
interface ChartItem {
    name: string;
    value: number;
}

const data: ChartItem[] = [
    { name: 'Dubai Marina', value: 8 },
    { name: 'Business Bay', value: 6 },
    { name: 'Downtown', value: 10 },
    { name: 'JBR', value: 7 },
    { name: 'Other', value: 11 },
];

const COLORS: string[] = [
    '#C8921F', // Dubai Marina
    '#000026', // Business Bay
    '#43A5F5', // Downtown
    '#4DBF7D', // JBR
    '#A88BE0', // Other
];

// ---------- Custom Tooltip ----------
const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
        const item = payload[0];

        return (
            <div
                style={{
                    background: '#fff',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    boxShadow: '0px 2px 6px rgba(0,0,0,0.15)',
                }}
            >
                <p style={{ margin: 0, fontWeight: 600 }}>{item.name as string}</p>
                <p style={{ margin: 0 }}>{item.value as number} units</p>
            </div>
        );
    }
    return null;
};

// ---------- Component ----------
const PieChartComp: React.FC = () => {
    return (
        <Card className="flex flex-col gap-3 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-[#1A1A1A]">Locker Distribution</h3>

            <div className="flex flex-col items-center">
                {/* Pie Chart */}
                <div>
                    <PieChart width={250} height={250}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={105}
                            paddingAngle={1}
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} stroke="white" strokeWidth={3} />
                            ))}
                        </Pie>

                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-3 w-full">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                                <span className="text-sm text-[#222]">{item.name}</span>
                            </div>
                            <span className="text-sm text-[#444]">{item.value} units</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default PieChartComp;
