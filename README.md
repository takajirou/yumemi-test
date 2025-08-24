### 課題レポートへのリンク： [`report.md`](./report.md)

---

# 都道府県別・人口構成グラフアプリ

## 機能概要

- ✅ 都道府県一覧をチェックボックスで選択
- ✅ 総人口・年少人口・生産年齢人口・老年人口の切り替え表示
- ✅ Recharts を用いた人口推移グラフの描画
- ✅ ReactQueryを使用したキャッシュ管理による API 通信の最適化
- ✅ レスポンシブ対応済み

---

## デプロイ先

- URL: [都道府県別・人口構成グラフ](https://yumemi-test-git-dev-takajirous-projects.vercel.app/)

---

## 技術スタック

| 項目           | 使用技術                          |
| -------------- | --------------------------------- |
| フレームワーク | Next.js 15 (App Router)           |
| 言語           | TypeScript                        |
| グラフ描画     | Recharts                          |
| 状態管理       | React Hooks (useState, useEffect) |
| API         | Axios                          |
| テスト         | Jest + React Testing Library      |
| CI/CD          | GitHub Actions + Vercel           |

---

## テストについて

- APIのユニットテスト
- カスタムフックのロジックテスト
- UIコンポーネントの描画テスト

---

## セットアップ手順

```bash
git clone https://github.com/takajirou/yumemi-test.git
cd yumemi-test
npm install
```

### 環境変数の設定

1. プロジェクトのルートディレクトリに `.env` ファイルを作成
2. 以下の内容を追加:

```
NEXT_PUBLIC_API_KEY=<APIキー>
NEXT_PUBLIC_API_URL=<APIURL>
```

### 開発サーバーの起動

```bash
npm run dev
```

---

## お礼の言葉

今回の課題を通して、今まで実装経験がなかった CI/CD や Testing の実装を経験する事ができ、フロントエンド開発に関する知識を大きく広げることができました。
GitHub Actions を活用した自動テスト・デプロイの流れを学べたことは、今後の開発において大きな財産になると感じています。
この経験を糧に、今後も学び続け、より品質の高いプロダクトを開発できるよう精進していきたいと思います。
