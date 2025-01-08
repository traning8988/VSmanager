'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/sign_in', { email, password });

      const accessToken = res.headers['access-token'];
      const client = res.headers['client'];
      const uid = res.headers['uid'];

      console.log("Access Token:", accessToken);
      console.log("Client:", client);
      console.log("UID:", uid);
      
      if (accessToken && client && uid) {
        localStorage.setItem('access-token', accessToken);
        localStorage.setItem('client', client);
        localStorage.setItem('uid', uid);

        console.log("レスポンスデータ:", res.data);

        const teamId = res.data.data?.id || res.data.id;
        console.log("Team ID:", teamId);

        toast.success('ログインに成功しました');
        router.push(`/teams/${teamId}`)

      } else {
        throw new Error('トークン情報が不足しています');
      }

    } catch (error) {
      console.error(error)
      toast.error('ログインに失敗しました');
    }
  } 
  return (
    <div className="flex items-center justify-center pt-32">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 text-black">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">ログイン</h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Button
            onClick={handleLogin}
            className="w-full"
          >
            ログイン
          </Button>
        </div>
        {/* <p className="mt-4 text-sm text-gray-600 text-center">
          アカウントをお持ちでない場合は{" "}
          <a href="#" className="text-blue-500 hover:underline">
            登録
          </a>
        </p> */}
      </div>
    </div>
  )
}