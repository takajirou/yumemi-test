// 人口データポイントの型定義
export interface PopulationDataPoint {
    year: number;
    value: number;
    rate: number;
}

// 人口カテゴリの型定義
export interface PopulationCategory {
    label: string;
    data: PopulationDataPoint[];
}

// APIレスポンスの結果部分の型定義
export interface PopulationResult {
    boundaryYear: number;
    data: PopulationCategory[];
    rate: number;
}

// APIレスポンス全体の型定義
export interface PopulationResponse {
    message: string;
    result: PopulationResult;
}

// グラフ用のデータポイントの型定義
export interface ChartDataPoint {
    year: number;
    [prefectureName: string]: number; // 都道府県名をキーとした人口データ
}
