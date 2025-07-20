import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import usePrefectures from '@/hooks/usePrefectures';
import fetchPrefectures from '@/libs/fetchPrefectures';

jest.mock('@/libs/fetchPrefectures');

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, // テストでの自動リトライを無効化
                retryDelay: 0, // リトライ間隔を0に設定
            },
        },
    });

const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = createQueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('usePrefectures', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetchPrefecturesから返却されたデータを取得できる', async () => {
        const mockData = [{ code: '01', name: '北海道' }];
        (fetchPrefectures as jest.Mock).mockResolvedValue(mockData);

        const { result } = renderHook(() => usePrefectures(), { wrapper });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });
        expect(result.current.data).toEqual(mockData);
    });

    it('API呼び出しに失敗した場合、エラーになる', async () => {
        const mockError = new Error('API Error');
        (fetchPrefectures as jest.Mock).mockRejectedValue(mockError);

        const { result } = renderHook(() => usePrefectures(), { wrapper });

        // 最初はローディング状態になることを確認
        expect(result.current.isLoading).toBe(true);

        // エラー状態になるまで待機
        await waitFor(
            () => {
                expect(result.current.isError).toBe(true);
            },
            { timeout: 5000 }
        ); // タイムアウトを5秒に設定

        expect(result.current.error).toBeDefined();
        expect(result.current.error).toHaveProperty('message', 'API Error');
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSuccess).toBe(false);
    });
});
