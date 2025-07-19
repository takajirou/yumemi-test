import { render, screen, fireEvent } from '@testing-library/react';
import PrefectureCheckbox from '@/components/prefecture/PrefectureCheckbox';
import usePrefectures from '@/hooks/usePrefectures';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/hooks/usePrefectures');

// モックデータ
const mockPrefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 13, prefName: '東京都' },
];

// 型に合わせたモックを返す
(usePrefectures as jest.Mock).mockReturnValue({
    data: mockPrefectures,
    isLoading: false,
    isError: false,
    error: null,
    refetch: jest.fn(),
    status: 'success',
    isSuccess: true,
    isFetching: false,
    isRefetching: false,
    isStale: false,
    failureCount: 0,
    isFetched: true,
    isLoadingError: false,
    isRefetchError: false,
    isPlaceholderData: false,
    isPreviousData: false,
    dataUpdatedAt: Date.now(),
    errorUpdatedAt: 0,
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('PrefectureCheckbox', () => {
    it('都道府県のチェックボックスが表示される', () => {
        const mockOnChange = jest.fn();
        render(<PrefectureCheckbox onChange={mockOnChange} />, { wrapper });

        expect(screen.getByLabelText('北海道')).toBeInTheDocument();
        expect(screen.getByLabelText('東京都')).toBeInTheDocument();
    });

    it('チェック時にonChangeが呼ばれる', () => {
        const mockOnChange = jest.fn();
        render(<PrefectureCheckbox onChange={mockOnChange} />, { wrapper });

        const tokyoCheckbox = screen.getByLabelText('東京都') as HTMLInputElement;

        fireEvent.click(tokyoCheckbox);

        expect(mockOnChange).toHaveBeenCalledWith([13]);
    });
});
