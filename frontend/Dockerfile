# Next.js Dockerfile
FROM node:20

# 作業ディレクトリを作成
WORKDIR /app

# 依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# Next.js のポート
EXPOSE 3001

# 開発用サーバーの起動コマンド
CMD ["npm", "run", "dev", "--", "--port", "3001"]
