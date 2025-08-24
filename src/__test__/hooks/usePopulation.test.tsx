import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import usePopulation from '@/hooks/usePopulation';
import fetchPopulation from '@/libs/fetchPopulation';

jest.mock('@/libs/fetchPopulation');

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                retryDelay: 0,
            },
        },
    });

const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = createQueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('usePopulation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('複数都道府県コードでfetchPopulationの結果を取得できる', async () => {
        const mockResults = [
            {
                boundaryYear: 2020,
                data: [{ label: '総人口', data: [{ year: 1980, value: 1000000 }] }],
            },
            {
                boundaryYear: 2020,
                data: [{ label: '総人口', data: [{ year: 1980, value: 500000 }] }],
            },
        ];

        (fetchPopulation as jest.Mock)
            .mockResolvedValueOnce(mockResults[0])
            .mockResolvedValueOnce(mockResults[1]);

        const prefCodes = [1, 2];
        const { result } = renderHook(() => usePopulation(prefCodes), { wrapper });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.isError).toBe(false);
        });

        expect(result.current.data).toHaveLength(prefCodes.length);

        expect(result.current.data[0]).toMatchObject({
            prefCode: 1,
            data: mockResults[0],
            isLoading: false,
            isError: false,
            error: null,
        });

        expect(result.current.data[1]).toMatchObject({
            prefCode: 2,
            data: mockResults[1],
            isLoading: false,
            isError: false,
            error: null,
        });

        expect(result.current.errors).toEqual([]);
    });

    it('fetchPopulationの一部が失敗した場合、エラー状態を返す', async () => {
        const mockResult = {
            boundaryYear: 2020,
            data: [{ label: '総人口', data: [{ year: 1980, value: 1000000 }] }],
        };

        (fetchPopulation as jest.Mock)
            .mockResolvedValueOnce(mockResult)
            .mockImplementationOnce(() => Promise.reject(new Error('API Error')));

        const prefCodes = [1, 2];
        const { result } = renderHook(() => usePopulation(prefCodes), { wrapper });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.data).toHaveLength(prefCodes.length);

        // 成功した場合
        expect(result.current.data[0]).toMatchObject({
            prefCode: 1,
            data: mockResult,
            isLoading: false,
            isError: false,
            error: null,
        });

        // 失敗した場合
        expect(result.current.data[1].prefCode).toBe(2);
        expect(result.current.data[1].data).toBeUndefined();
        expect(result.current.data[1].isError).toBe(true);
        expect(result.current.data[1].error).toBeInstanceOf(Error);
        expect(result.current.data[1].error?.message).toEqual(expect.any(String));

        expect(result.current.errors).toEqual(expect.arrayContaining([expect.any(Error)]));
    });

    it('prefCodesが空配列の場合は空配列を返す', () => {
        const prefCodes: number[] = [];
        const { result } = renderHook(() => usePopulation(prefCodes), { wrapper });

        expect(result.current.data).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.errors).toEqual([]);
    });
});
