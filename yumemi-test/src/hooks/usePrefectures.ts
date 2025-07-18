import { useQuery } from '@tanstack/react-query';
import fetchPrefectures from '@/libs/fetchPrefectures';

const usePrefectures = () => {
    return useQuery({
        queryKey: ['prefectures'],
        queryFn: fetchPrefectures,
        staleTime: 1000 * 60 * 5, // 5分間は再フェッチしない
        retry: 1,
    });
};

export default usePrefectures;
