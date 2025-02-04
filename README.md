# VSmanager

## サービス概要

「VSmanager」は、草野球大会の運営を効率化する為の対戦管理アプリです。  
草野球大会運営者、草野球チーム運営者に向けて、  
試合の申し込み、対戦組み合わせの決定、対戦情報の表示、（試合結果の報告、試合結果の表示）機能があり草野球大会の運営をサポートします。

URL:[VSmanager](https://vsmanager-baseball.com)

## サービスのきっかけ

私が運営している草野球チームが、現在加盟しているリーグは試合の申し込みに FAX を、試合の組み合わせの確認に音声ダイヤルを使っている為、草野球大会運営者、草野球チーム運営者双方にとって手間と時間がかかるという課題があります。  
その課題を web アプリの導入によって解決し、大会運営者、チーム運営者それぞれにとってプラスとなる形にすることで、両者が効率化でき、週末の楽しい試合だけに集中できる環境を作りたいという思いから開発を始めました。

## 機能(表示画面)一覧

### ログインページ

<table style="width:100%;">
  <tr>
    <td><img width="1256" alt="ログインページ" src="frontend/public/スクリーンショット 2025-02-02 3.10.37.png" alt="スクリーンショット 2024-07-15 10 04 36" style="width:100%; max-width:800px;"></td>
  </tr>
  <tr>
    <td>JWTを使用した認証を採用し、セキュアでスケーラブルなユーザー管理を実現しました。フロントエンドはNext.js（App Router）、バックエンドはRails API（PostgreSQL）を使用し、クライアントとサーバー間での安全な通信を考慮して実装しました。</td>
  </tr>
</table>

<!-- ### 試合情報ページ(ユーザー)

<table style="width:100%;">
  <tr>
    <td><img width="1280" alt="スクリーンショット 2024-07-25 15 27 15" src="https://github.com/user-attachments/assets/518b59ff-c931-4c64-946c-01f501659db4" style="width:100%; max-width:600px;"></td>
  </tr>
  <tr>
    <td>今週の時チームの試合が組まれているか確認することができます。今週の試合の申し込みと試合結果を報告するページに遷移するボタンがあります。</td>
  </tr>
</table> -->

### チーム情報ページ(ユーザー)

<table style="width:100%;">
  <tr>
    <td><img width="1280" alt="スクリーンショット 2024-07-25 15 27 15" src="frontend/public/スクリーンショット 2025-02-04 18.40.52.png" style="width:100%; max-width:600px;"></td>
  </tr>
  <tr>
    <td>チームの詳細情報（と管理者からのお知らせ）を表示します。</td>
  </tr>
</table>

### 試合申し込みページ(ユーザー)

<table style="width:100%;">
  <tr>
    <td><img width="1280" alt="スクリーンショット 2024-07-25 15 27 15" src="frontend/public/スクリーンショット 2025-02-04 18.41.10.png" style="width:100%; max-width:600px;"></td>
  </tr>
  <tr>
    <td>試合の申し込み、取り消し、ダブルヘッダーの有無を選択して送信することができます。</td>
  </tr>
</table>

### 対戦管理ページ(管理者)

<table style="width:100%;">
  <tr>
    <td><img width="1280" alt="スクリーンショット 2024-07-25 15 27 15" src="frontend/public/スクリーンショット 2025-02-05 0.00.02.png" style="width:100%; max-width:600px;"></td>
  </tr>
  <tr>
    <td>試合申し込みがあった各チームの情報が上部に表示されます。下部で対戦組み合わせ、試合会場、試合開始時間を選択して組み合わせ決定ボタンを押すと今週の試合情報に反映されます。</td>
  </tr>
</table>

### 今週の試合情報(共通)

<table style="width:100%;">
  <tr>
    <td><img width="1280" alt="スクリーンショット 2024-07-25 15 27 15" src="frontend/public/スクリーンショット 2025-02-04 18.41.34.png" style="width:100%; max-width:600px;"></td>
  </tr>
  <tr>
    <td>今週行われる全試合の詳細リストを表示します。</td>
  </tr>
</table>

## ER 図

![ER図](frontend/public/VSmanagerER.png)

<!-- ## インフラ構成図

あとで作ります -->

## 主な使用技術

| Category       | Technology Stack                                                   |
| -------------- | ------------------------------------------------------------------ |
| フロントエンド | React(18.3.1), Next.js(15.0.4), TypeScript, shadcn/ui, TailwindCSS |
| バックエンド   | Ruby (3.2.5), Ruby on Rails (7.1.4.2)                              |
| データベース   | postgreSQL(15)                                                     |
| 開発環境       | Docker, Docker Compose                                             |
| 本番環境       | Render, Vercel                                                     |
| その他         | ESLint, rubocop, prettier, Git, GitHub, jotai, Axios, JWT          |

## 追加実装予定

- 試合結果報告機能
- 運営からの通知機能
- スマホ対応
