import { render, screen, fireEvent } from '@testing-library/react';
import CategoryButtons, {
    POPULATION_CATEGORIES,
} from '@/components/population/PopulationCategoryButtons';

describe('CategoryButtons', () => {
    test('全てのカテゴリボタンが表示される', () => {
        const onCategoryChange = jest.fn();
        render(<CategoryButtons selectedCategory="total" onCategoryChange={onCategoryChange} />);

        POPULATION_CATEGORIES.forEach(category => {
            expect(screen.getByText(category.label)).toBeInTheDocument();
        });
    });

    test('選択中のカテゴリボタンにbuttonActiveクラスがつく', () => {
        const onCategoryChange = jest.fn();
        const selectedCategory = '年少人口';

        render(
            <CategoryButtons
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
            />
        );

        const activeButton = screen.getByText('年少人口');
        expect(activeButton.className).toMatch(/buttonActive/);

        // 他のボタンはbuttonInactiveクラス
        POPULATION_CATEGORIES.filter(c => c.key !== selectedCategory).forEach(category => {
            const btn = screen.getByText(category.label);
            expect(btn.className).toMatch(/buttonInactive/);
        });
    });

    test('ボタンをクリックするとonCategoryChangeが呼ばれる', () => {
        const onCategoryChange = jest.fn();
        render(<CategoryButtons selectedCategory="total" onCategoryChange={onCategoryChange} />);

        const targetCategory = POPULATION_CATEGORIES[2];
        const button = screen.getByText(targetCategory.label);

        fireEvent.click(button);
        expect(onCategoryChange).toHaveBeenCalledWith(targetCategory.key);
    });
});
