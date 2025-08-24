import apiClient from './apiClient';

const fetchPrefectures = async () => {
    const res = await apiClient.get('prefectures');
    return res.data.result;
};

export default fetchPrefectures;
