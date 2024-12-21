# Next.jsベースイメージ
FROM node:20

# 作業ディレクトリを指定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリのソースコードをコピー
COPY . .

# Next.js のポート
EXPOSE 3001

# 開発用サーバーの起動コマンド
CMD ["npm", "run", "dev", "--", "--port", "3000"]