import styles from '@styles/components/PopulationChart.module.scss';

interface ChartHeaderProps {
    categoryLabel: string;
    prefectureCount: number;
}

const ChartHeader = ({ categoryLabel, prefectureCount }: ChartHeaderProps) => {
    return (
        <div className={styles.titleContainer}>
            <h2 className={styles.title}>{categoryLabel}の推移</h2>
            <p className={styles.subtitle}>{prefectureCount}都道府県の比較</p>
        </div>
    );
};

export default ChartHeader;
