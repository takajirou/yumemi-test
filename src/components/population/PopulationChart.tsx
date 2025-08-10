import { useState } from 'react';
import usePopulation from '@/hooks/usePopulation';
import CategoryButtons, {
    POPULATION_CATEGORIES,
} from '@/components/population/PopulationCategoryButtons';
import ChartHeader from '@/components/population/ChartHeader';
import { LoadingState, ErrorState, NoDataState } from '@/components/population/LoadingError';
import PopulationLineChart from '@/components/population/PopulationLineChart';
import ChartDataInfo from '@/components/population/ChartDataInfo';
import { useChartDataFormatter } from '@/hooks/useChartFormatters';
import styles from '@styles/components/PopulationChart.module.scss';
import { PREFECTURE_MAP } from '@/constants/prefectures';

type PopulationChartProps = {
    prefCode: number[];
    prefNames?: { [key: number]: string };
};

const PopulationChart = ({ prefCode, prefNames = PREFECTURE_MAP }: PopulationChartProps) => {
    const { data, isLoading, isError, errors } = usePopulation(prefCode);
    const [selectedCategory, setSelectedCategory] = useState<string>('total');

    // 成功したデータのみを抽出
    const successfulData = data.filter(item => item.data && !item.isError);

    // グラフデータの整形
    const chartData = useChartDataFormatter({
        successfulData,
        selectedCategory,
        prefNames,
    });

    // 現在選択されているカテゴリ情報を取得
    const currentCategory = POPULATION_CATEGORIES.find(cat => cat.key === selectedCategory);

    // ローディング状態
    if (isLoading) {
        return <LoadingState />;
    }

    // エラー状態
    if (isError) {
        return <ErrorState errors={errors} prefCodes={prefCode} />;
    }

    // データが空の場合
    if (successfulData.length === 0) {
        return <NoDataState />;
    }

    return (
        <div className={styles.container}>
            <CategoryButtons
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            <ChartHeader
                categoryLabel={currentCategory?.label || ''}
                prefectureCount={successfulData.length}
            />

            <PopulationLineChart
                data={chartData}
                successfulData={successfulData}
                prefNames={prefNames}
            />

            <ChartDataInfo data={chartData} />
        </div>
    );
};

export default PopulationChart;
