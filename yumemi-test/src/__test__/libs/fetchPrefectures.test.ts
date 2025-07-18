import apiClient from '@/libs/apiClient';
import fetchPrefectures from '@/libs/fetchPrefectures';

jest.mock('@/libs/apiClient');

describe('fetchPrefectures', () => {
    it('APIから正しいデータを返す', async () => {
        const mockResponse = {
            data: {
                result: [
                    { code: '01', name: '北海道' },
                    { code: '02', name: '青森県' },
                ],
            },
        };
        (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

        const data = await fetchPrefectures();
        expect(data).toEqual(mockResponse.data.result);
        expect(apiClient.get).toHaveBeenCalledWith('prefectures');
    });

    it('APIエラー時に例外がスローされる', async () => {
        (apiClient.get as jest.Mock).mockRejectedValue(new Error('Network Error'));
        await expect(fetchPrefectures()).rejects.toThrow('Network Error');
    });
});
