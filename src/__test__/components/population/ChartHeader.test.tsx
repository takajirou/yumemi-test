import { render, screen } from '@testing-library/react';
import ChartHeader from '@/components/population/ChartHeader';

describe('ChartHeader', () => {
    test('propsのcategoryLabelとprefectureCountを正しく表示する', () => {
        const categoryLabel = '総人口';
        const prefectureCount = 47;

        render(<ChartHeader categoryLabel={categoryLabel} prefectureCount={prefectureCount} />);

        // h2要素のテキスト確認
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
            `${categoryLabel}の推移`
        );

        // p要素のテキスト確認
        expect(screen.getByText(`${prefectureCount}都道府県の比較`)).toBeInTheDocument();
    });
});
