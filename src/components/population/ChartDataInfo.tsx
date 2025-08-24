import { ChartDataPoint } from '@/types/population';
import styles from '@styles/components/PopulationChart.module.scss';

interface ChartDataInfoProps {
    data: ChartDataPoint[];
}

const ChartDataInfo = ({ data }: ChartDataInfoProps) => {
    const getDataPeriod = () => {
        if (data.length === 0) return '';
        return `${data[0].year}年 - ${data[data.length - 1].year}年`;
    };

    return <div className={styles.dataInfo}>データ期間: {getDataPeriod()}</div>;
};

export default ChartDataInfo;
