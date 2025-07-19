import usePrefectures from '@/hooks/usePrefectures';

const PrefectureCheckbox = () => {
    const { data, isLoading, isError, error } = usePrefectures();
    if (isLoading) return <p>読み込み中...</p>;
    if (isError) return <p>エラーが発生しました: {error.message}</p>;

    console.log(data);
};

export default PrefectureCheckbox;
