import usePrefectures from '@/hooks/usePrefectures';
import { useEffect, useState } from 'react';

interface Pref {
    prefCode: number;
    prefName: string;
}

interface Props {
    onChange: (selected: number[]) => void;
}

const PrefectureCheckbox = ({ onChange }: Props) => {
    const { data, isLoading, isError, error } = usePrefectures();
    const [selectedPref, setSelectedPref] = useState<number[]>([]);

    useEffect(() => {
        onChange(selectedPref);
    }, [selectedPref, onChange]);

    if (isLoading) return <p>読み込み中...</p>;
    if (isError) return <p>エラーが発生しました: {error.message}</p>;

    // 選択した都道府県を保存
    const handleCheck = (prefCode: number, checked: boolean) => {
        setSelectedPref(prev =>
            checked ? [...prev, prefCode] : prev.filter(code => code !== prefCode)
        );
    };

    return (
        <div>
            {/* APIから受け取った都道府県リストを元にチェックボックスを表示 */}
            {data.map((pref: Pref) => (
                <div key={pref.prefCode}>
                    <input
                        type="checkbox"
                        id={`pref-${pref.prefCode}`}
                        value={pref.prefCode}
                        checked={selectedPref.includes(pref.prefCode)}
                        onChange={e => handleCheck(pref.prefCode, e.target.checked)}
                    />
                    <label htmlFor={`pref-${pref.prefCode}`}>{pref.prefName}</label>
                </div>
            ))}
        </div>
    );
};

export default PrefectureCheckbox;
