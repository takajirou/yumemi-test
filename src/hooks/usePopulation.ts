import { useQueries, UseQueryResult } from '@tanstack/react-query';
import fetchPopulation from '@/libs/fetchPopulation';
import { PopulationResult } from '@/types/population';

// 個別クエリの結果型定義
interface PopulationQueryResult {
    prefCode: number;
    data: PopulationResult | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

// usePopulationフックの戻り値型定義
interface UsePopulationReturn {
    data: PopulationQueryResult[];
    isLoading: boolean;
    isError: boolean;
    errors: (Error | null)[];
    queries: UseQueryResult<PopulationResult, Error>[];
}

const usePopulation = (prefCodes: number[]): UsePopulationReturn => {
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
    const data: PopulationQueryResult[] = queries.map((query, index) => ({
        prefCode: prefCodes[index],
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    }));

    return {
        data,
        isLoading,
        isError,
        errors,
        queries, // 個別のクエリ結果も必要に応じて使用可能
    };
};

export default usePopulation;
