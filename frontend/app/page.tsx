import { redirect } from 'next/navigation';

export default async function Home() {
  // サーバーサイドでのリダイレクト
  redirect('/sign-in');
}
