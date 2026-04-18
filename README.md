# 甘今美味の個人サイト

このリポジトリは GitHub Pages で公開できるシンプルな個人サイトです。  
以下のURLからサイトを閲覧することができます。  
https://amaimauma.github.io/

## 目次
- [概要](#概要)
- [ローカルでのプレビュー](#ローカルでのプレビュー)
- [GitHub Pages へのデプロイ](#github-pages-へのデプロイ)
- [リンクの追加方法](#リンクの追加方法)

## 概要
`index.html` と `style.css` で構成され、Note と YouTube へのリンクが表示されます。リンクは `index.html` 内の JavaScript 配列 `links` を編集するだけで簡単に追加できます。

## ローカルでのプレビュー
```bash
# プロジェクトディレクトリへ移動
cd /Path/to/develop/amaimauma.github.io

# Python の簡易 HTTP サーバーを起動 (ポート 8000)
python3 -m http.server 8000
```
ブラウザで `http://localhost:8000` にアクセスするとサイトが表示されます。

## GitHub Pages へのデプロイ
1. GitHub に新しいリポジトリを作成（例: `amaimauma.github.io`）
2. ローカルリポジトリを初期化し、リモートを追加
```bash
git init
git remote add origin https://github.com/amaimauma/amaimauma.github.io.git
```
3. ファイルをコミットしてプッシュ
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```
4. GitHub のリポジトリ設定で **Pages** を有効化し、`main` ブランチの `/ (root)` をソースに選択
5. 数分後に `https://amaimauma.github.io/` で公開されます。

## リンクの追加方法
`index.html` の `<script>` 部分にある `links` 配列にオブジェクトを追加します。
```javascript
const links = [
  { name: "Note", url: "https://note.com/umeda1230" },
  { name: "YouTube", url: "https://www.youtube.com/@uma1230-xxxe/videos" },
  // ここに新しいリンクを追加
];
```
保存してページをリロードすると新しいリンクが表示されます。
