import { render, screen } from '@testing-library/react';
import { LoadingState, ErrorState, NoDataState } from '@/components/population/LoadingError';

describe('LoadingState', () => {
    test('デフォルトメッセージが表示される', () => {
        render(<LoadingState />);
        expect(screen.getByText('データを読み込み中...')).toBeInTheDocument();
    });

    test('カスタムメッセージが表示される', () => {
        const customMessage = 'ロード中です';
        render(<LoadingState message={customMessage} />);
        expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
});

describe('ErrorState', () => {
    test('エラーメッセージが正しく表示される', () => {
        const errors = [new Error('ネットワークエラー'), null, new Error('タイムアウト')];
        const prefCodes = [1, 2, 3];

        render(<ErrorState errors={errors} prefCodes={prefCodes} />);

        expect(screen.getByText('エラーが発生しました:')).toBeInTheDocument();
        expect(screen.getByText('都道府県コード 1: ネットワークエラー')).toBeInTheDocument();
        expect(screen.getByText('都道府県コード 2:')).toBeInTheDocument();
        expect(screen.getByText('都道府県コード 3: タイムアウト')).toBeInTheDocument();
    });
});

describe('NoDataState', () => {
    test('デフォルトメッセージが表示される', () => {
        render(<NoDataState />);
        expect(screen.getByText('表示可能なデータがありません')).toBeInTheDocument();
    });

    test('カスタムメッセージが表示される', () => {
        const customMessage = 'データなし';
        render(<NoDataState message={customMessage} />);
        expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
});
