import React from 'react';
import { render, screen } from '@testing-library/react';
import ChartDataInfo from '@/components/population/ChartDataInfo';

describe('ChartDataInfo', () => {
    test('データが空配列の場合は空文字を表示する', () => {
        render(<ChartDataInfo data={[]} />);
        expect(screen.getByText(/データ期間:/)).toHaveTextContent('データ期間:');
    });

    test('データの最初と最後のyearから期間を表示する', () => {
        const mockData = [
            { year: 2000, 北海道: 100 },
            { year: 2005, 北海道: 200 },
            { year: 2010, 北海道: 300 },
        ];
        render(<ChartDataInfo data={mockData} />);
        expect(screen.getByText(/データ期間:/)).toHaveTextContent('データ期間: 2000年 - 2010年');
    });

    test('データが1つの場合は同じ年を表示する', () => {
        const mockData = [{ year: 2000, 北海道: 100 }];
        render(<ChartDataInfo data={mockData} />);
        expect(screen.getByText(/データ期間:/)).toHaveTextContent('データ期間: 2000年 - 2000年');
    });
});
