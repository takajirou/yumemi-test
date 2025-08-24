import { useMemo } from 'react';
import { PopulationDataPoint, PopulationCategory, ChartDataPoint } from '@/types/population';

interface PopulationQueryResult {
    prefCode: number;
    data: { data: PopulationCategory[] } | undefined;
    isError: boolean;
}

interface UseChartDataFormatterProps {
    successfulData: PopulationQueryResult[];
    selectedCategory: string;
    prefNames: { [key: number]: string };
}

export const useChartDataFormatter = ({
    successfulData,
    selectedCategory,
    prefNames,
}: UseChartDataFormatterProps) => {
    const chartData = useMemo((): ChartDataPoint[] => {
        // 全ての年度を取得
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
                const prefName = prefNames[item.prefCode] || `都道府県${item.prefCode}`;

                if (selectedCategory === 'total') {
                    // 総人口を計算（各カテゴリの合計）
                    let totalValue = 0;
                    item.data?.data?.forEach((category: PopulationCategory) => {
                        const yearData = category.data.find(d => d.year === year);
                        if (yearData) totalValue += yearData.value;
                    });
                    dataPoint[prefName] = totalValue || 0;
                } else {
                    // 特定のカテゴリのデータを取得
                    const categoryData = item.data?.data?.find(
                        (cat: PopulationCategory) => cat.label === selectedCategory
                    );
                    const yearData = categoryData?.data.find(d => d.year === year);
                    dataPoint[prefName] = yearData?.value || 0;
                }
            });

            return dataPoint;
        });
    }, [successfulData, selectedCategory, prefNames]);

    return chartData;
};
