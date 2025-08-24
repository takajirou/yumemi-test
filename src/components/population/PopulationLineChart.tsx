import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { ChartDataPoint } from '@/types/population';
import styles from '@styles/components/PopulationChart.module.scss';

interface PopulationLineChartProps {
    data: ChartDataPoint[];
    successfulData: Array<{ prefCode: number }>;
    prefNames: { [key: number]: string };
}

const PopulationLineChart = ({ data, successfulData, prefNames }: PopulationLineChartProps) => {
    const generateColors = (count: number) => {
        const colors = [
            '#2563eb',
            '#dc2626',
            '#059669',
            '#d97706',
            '#7c3aed',
            '#db2777',
            '#0891b2',
            '#ea580c',
            '#65a30d',
            '#c026d3',
        ];
        return colors.slice(0, count);
    };

    const lineColors = generateColors(successfulData.length);

    const formatYAxisTick = (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
        return value.toString();
    };

    const formatTooltip = (value: number, name: string) => [value.toLocaleString() + '人', name];

    const formatTooltipLabel = (year: number) => `${year}年`;

    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} tickFormatter={formatYAxisTick} />
                    <Tooltip
                        formatter={formatTooltip}
                        labelFormatter={formatTooltipLabel}
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                        }}
                    />
                    <Legend />
                    {successfulData.map((item, index) => {
                        const prefName = prefNames[item.prefCode] || `都道府県${item.prefCode}`;
                        return (
                            <Line
                                key={item.prefCode}
                                type="monotone"
                                dataKey={prefName}
                                stroke={lineColors[index]}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        );
                    })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PopulationLineChart;
