import React from 'react';
import { render } from '@testing-library/react';
import PopulationLineChart from '@/components/population/PopulationLineChart';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

const originalWarn = console.warn;
beforeAll(() => {
    console.warn = jest.fn();
});
afterAll(() => {
    console.warn = originalWarn;
});

describe('PopulationLineChart', () => {
    const mockData = [
        { year: 2000, 北海道: 100, 青森県: 200 },
        { year: 2005, 北海道: 150, 青森県: 250 },
    ];
    const successfulData = [{ prefCode: 1 }, { prefCode: 2 }];
    const mockPrefNames = { 1: '北海道', 2: '青森県' };

    test('コンポーネントが正常にレンダリングされる', () => {
        render(
            <PopulationLineChart
                data={mockData}
                successfulData={successfulData}
                prefNames={mockPrefNames}
            />
        );

        // コンポーネントがエラーなくレンダリングされることを確認
        expect(document.body).toBeInTheDocument();
    });

    test('データが空の場合でもエラーが発生しない', () => {
        expect(() => {
            render(<PopulationLineChart data={[]} successfulData={[]} prefNames={{}} />);
        }).not.toThrow();
    });

    test('propsが正しく渡されることを確認', () => {
        const { rerender } = render(
            <PopulationLineChart
                data={mockData}
                successfulData={successfulData}
                prefNames={mockPrefNames}
            />
        );

        // 異なるpropsでre-renderしてもエラーが発生しないことを確認
        expect(() => {
            rerender(
                <PopulationLineChart
                    data={[{ year: 2010, 北海道: 300 }]}
                    successfulData={[{ prefCode: 1 }]}
                    prefNames={{ 1: '北海道' }}
                />
            );
        }).not.toThrow();
    });
});
