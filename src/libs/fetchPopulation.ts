import apiClient from './apiClient';
import { PopulationResponse, PopulationResult } from '@/types/population';

const fetchPopulation = async (prefCode: number): Promise<PopulationResult> => {
    const res = await apiClient.get<PopulationResponse>('population/composition/perYear', {
        params: {
            prefCode: prefCode.toString(),
        },
    });
    return res.data.result;
};

export default fetchPopulation;
