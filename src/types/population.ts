export interface YearlyPopulationData {
    year: number;
    value: number;
    rate: number;
}

export interface PopulationCategory {
    label: string;
    data: YearlyPopulationData[];
}

export interface PopulationResponse {
    message: string | null;
    result: {
        boundYear: number;
        data: PopulationCategory[];
    }[];
}
