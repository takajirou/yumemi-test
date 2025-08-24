import styles from '@styles/components/PopulationChart.module.scss';

interface LoadingStateProps {
    message?: string;
}

export const LoadingState = ({ message = 'データを読み込み中...' }: LoadingStateProps) => {
    return (
        <div className={styles.loadingContainer}>
            <p className={styles.loadingText}>{message}</p>
        </div>
    );
};

interface ErrorStateProps {
    errors: (Error | null)[];
    prefCodes: number[];
}

export const ErrorState = ({ errors, prefCodes }: ErrorStateProps) => {
    return (
        <div className={styles.errorContainer}>
            <p className={styles.errorTitle}>エラーが発生しました:</p>
            {errors.map((error, index) => (
                <p key={index} className={styles.errorMessage}>
                    都道府県コード {prefCodes[index]}: {error?.message}
                </p>
            ))}
        </div>
    );
};

interface NoDataStateProps {
    message?: string;
}

export const NoDataState = ({ message = '表示可能なデータがありません' }: NoDataStateProps) => {
    return (
        <div className={styles.noDataContainer}>
            <p className={styles.noDataText}>{message}</p>
        </div>
    );
};
