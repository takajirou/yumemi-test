import apiClient from './apiClient';
import { PopulationResponse } from '@/types/population';

const fetchPopulation = async (prefCode: number): Promise<PopulationResponse['result']> => {
    const res = await apiClient.get<PopulationResponse>('population/composition/perYear', {
        params: {
            prefCode: prefCode.toString(),
        },
    });
    return res.data.result;
};

export default fetchPopulation;
