import styles from '@styles/components/PopulationChart.module.scss';

interface CategoryButtonsProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const POPULATION_CATEGORIES = [
    { key: 'total', label: '総人口', color: '#2563eb' },
    { key: '年少人口', label: '年少人口', color: '#dc2626' },
    { key: '生産年齢人口', label: '生産年齢人口', color: '#059669' },
    { key: '老年人口', label: '老年人口', color: '#d97706' },
] as const;

const CategoryButtons = ({ selectedCategory, onCategoryChange }: CategoryButtonsProps) => {
    return (
        <div className={styles.buttonContainer}>
            {POPULATION_CATEGORIES.map(category => (
                <button
                    key={category.key}
                    onClick={() => onCategoryChange(category.key)}
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
    );
};

export default CategoryButtons;
export { POPULATION_CATEGORIES };
