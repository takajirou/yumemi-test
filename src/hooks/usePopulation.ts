import { useQueries } from '@tanstack/react-query';
import fetchPopulation from '@/libs/fetchPopulation';

const usePopulation = (prefCodes: number[]) => {
    const queries = useQueries({
        queries: prefCodes.map(prefCode => ({
            queryKey: ['population', prefCode],
            queryFn: () => fetchPopulation(prefCode),
            enabled: !!prefCode && prefCode > 0, // prefCode が有効な値のときのみ実行
            staleTime: 1000 * 60 * 5,
            gcTime: 10 * 60 * 1000,
            retry: 1,
        })),
    });

    // すべてのクエリの状態をまとめて返す
    const isLoading = queries.some(query => query.isLoading);
    const isError = queries.some(query => query.isError);
    const errors = queries.filter(query => query.isError).map(query => query.error);
    const data = queries.map((query, index) => ({
        prefCode: prefCodes[index],
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    }));

    // 個別のクエリ結果も必要に応じて使用可能
    return {
        data,
        isLoading,
        isError,
        errors,
        queries,
    };
};

export default usePopulation;
