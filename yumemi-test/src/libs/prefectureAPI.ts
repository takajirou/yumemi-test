import apiClient from "./apiClient";

export const fetchPrefectures = async () => {
    const res = await apiClient.get('prefectures');
    return res.data.result;
}