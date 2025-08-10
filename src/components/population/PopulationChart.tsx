import { useState } from 'react';
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
import usePopulation from '@/hooks/usePopulation';
import { PopulationDataPoint, PopulationCategory, ChartDataPoint } from '@/types/population';
import styles from '@styles/components/PopulationChart.module.scss';

type PopulationChartProps = {
    prefCode: number[];
};

const POPULATION_CATEGORIES = [
    { key: 'total', label: '総人口', color: '#2563eb' },
    { key: '年少人口', label: '年少人口', color: '#dc2626' },
    { key: '生産年齢人口', label: '生産年齢人口', color: '#059669' },
    { key: '老年人口', label: '老年人口', color: '#d97706' },
] as const;

const PopulationChart = ({ prefCode }: PopulationChartProps) => {
    const { data, isLoading, isError, errors } = usePopulation(prefCode);
    const [selectedCategory, setSelectedCategory] = useState<string>('total');

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <p className={styles.loadingText}>データを読み込み中...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorTitle}>エラーが発生しました:</p>
                {errors.map((error, index) => (
                    <p key={index} className={styles.errorMessage}>
                        都道府県コード {prefCode[index]}: {error?.message}
                    </p>
                ))}
            </div>
        );
    }

    const successfulData = data.filter(item => item.data && !item.isError);

    if (successfulData.length === 0) {
        return (
            <div className={styles.noDataContainer}>
                <p className={styles.noDataText}>表示可能なデータがありません</p>
            </div>
        );
    }

    const formatChartData = (): ChartDataPoint[] => {
        const allYears = new Set<number>();
        successfulData.forEach(item => {
            item.data?.data?.forEach((category: PopulationCategory) => {
                category.data.forEach((point: PopulationDataPoint) => allYears.add(point.year));
            });
        });

        const sortedYears = Array.from(allYears).sort();

        return sortedYears.map(year => {
            const dataPoint: ChartDataPoint = { year };

            successfulData.forEach(item => {
                const prefName = `都道府県${item.prefCode}`;

                if (selectedCategory === 'total') {
                    let totalValue = 0;
                    item.data?.data?.forEach((category: PopulationCategory) => {
                        const yearData = category.data.find(d => d.year === year);
                        if (yearData) totalValue += yearData.value;
                    });
                    dataPoint[prefName] = totalValue || 0;
                } else {
                    const categoryData = item.data?.data?.find(
                        (cat: PopulationCategory) => cat.label === selectedCategory
                    );
                    const yearData = categoryData?.data.find(d => d.year === year);
                    dataPoint[prefName] = yearData?.value || 0;
                }
            });

            return dataPoint;
        });
    };

    const chartData = formatChartData();
    const currentCategory = POPULATION_CATEGORIES.find(cat => cat.key === selectedCategory);

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
            '#2563eb',
            '#dc2626',
        ];
        return colors.slice(0, count);
    };

    const lineColors = generateColors(successfulData.length);

    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                {POPULATION_CATEGORIES.map(category => (
                    <button
                        key={category.key}
                        onClick={() => setSelectedCategory(category.key)}
                        className={`${styles.button} ${
                            selectedCategory === category.key
                                ? styles.buttonActive
                                : styles.buttonInactive
                        }`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            <div className={styles.titleContainer}>
                <h2 className={styles.title}>{currentCategory?.label}の推移</h2>
                <p className={styles.subtitle}>{successfulData.length}都道府県の比較</p>
            </div>

            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" stroke="#666" fontSize={12} />
                        <YAxis
                            stroke="#666"
                            fontSize={12}
                            tickFormatter={value => {
                                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                                return value.toString();
                            }}
                        />
                        <Tooltip
                            formatter={(value: number, name: string) => [
                                value.toLocaleString() + '人',
                                name,
                            ]}
                            labelFormatter={year => `${year}年`}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                            }}
                        />
                        <Legend />
                        {successfulData.map((item, index) => {
                            const prefName = `都道府県${item.prefCode}`;
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

            <div className={styles.dataInfo}>
                データ期間:{' '}
                {chartData.length > 0
                    ? `${chartData[0].year}年 - ${chartData[chartData.length - 1].year}年`
                    : ''}
            </div>
        </div>
    );
};

export default PopulationChart;
