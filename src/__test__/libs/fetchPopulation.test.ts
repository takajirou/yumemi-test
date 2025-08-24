import apiClient from '@/libs/apiClient';
import fetchPopulation from '@/libs/fetchPopulation';

jest.mock('@/libs/apiClient');

describe('fetchPopulation', () => {
    it('APIから正しいデータを返す', async () => {
        (apiClient.get as jest.Mock).mockResolvedValue({
            data: {
                result: {
                    boundaryYear: 2020,
                    data: [
                        {
                            label: '総人口',
                            data: [
                                { year: 1980, value: 1000000 },
                                { year: 1990, value: 1100000 },
                            ],
                        },
                    ],
                },
            },
        });

        const result = await fetchPopulation(1);

        expect(result).toEqual({
            boundaryYear: 2020,
            data: [
                {
                    label: '総人口',
                    data: [
                        { year: 1980, value: 1000000 },
                        { year: 1990, value: 1100000 },
                    ],
                },
            ],
        });
    });
    it('APIエラー時に例外がスローされる', async () => {
        (apiClient.get as jest.Mock).mockRejectedValue(new Error('Network Error'));
        await expect(fetchPopulation(1)).rejects.toThrow('Network Error');
    });
});
