# Next.js Dockerfile
FROM node:20

# 作業ディレクトリを作成
WORKDIR /myapp

# 依存関係をインストール
COPY package.json yarn.lock ./
RUN yarn install

# アプリケーションのソースコードをコピー
COPY . .

# Next.js のポート
EXPOSE 3001

# 開発用サーバーの起動コマンド
CMD ["yarn", "dev", "--port", "3001"]