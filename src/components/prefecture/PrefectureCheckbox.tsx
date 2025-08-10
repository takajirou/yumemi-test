import usePrefectures from '@/hooks/usePrefectures';
import { useEffect, useState } from 'react';
import styles from '@styles/components/PrefectureCheckbox.module.scss';

interface Pref {
    prefCode: number;
    prefName: string;
}

interface Props {
    onChange: (selected: number[]) => void;
}

const PrefectureCheckbox = ({ onChange }: Props) => {
    const { data, isLoading, isError, error } = usePrefectures();
    const [selectedPref, setSelectedPref] = useState<number[]>([13, 27]);

    useEffect(() => {
        onChange(selectedPref);
    }, [selectedPref, onChange]);

    if (isLoading) return <p>読み込み中...</p>;
    if (isError) return <p>エラーが発生しました: {error.message}</p>;

    // 選択状態の更新
    const handleCheck = (prefCode: number, checked: boolean) => {
        setSelectedPref(prev =>
            checked ? [...prev, prefCode] : prev.filter(code => code !== prefCode)
        );
    };

    const handleReset = () => {
        setSelectedPref([]);
    };

    return (
        <section className={styles.wrap}>
            <h2 className={styles.title}>都道府県を選択</h2>
            {/* APIから受け取った都道府県リストを元にチェックボックスを表示 */}
            <div className={styles.selectorWrap}>
                {data.map((pref: Pref) => (
                    <label key={pref.prefCode} className={styles.checkBox}>
                        <input
                            type="checkbox"
                            value={pref.prefCode}
                            checked={selectedPref.includes(pref.prefCode)}
                            onChange={e => handleCheck(pref.prefCode, e.target.checked)}
                        />
                        {pref.prefName}
                    </label>
                ))}
            </div>
            <button className={styles.resetBtn} onClick={handleReset}>
                選択をリセットする
            </button>
        </section>
    );
};

export default PrefectureCheckbox;
