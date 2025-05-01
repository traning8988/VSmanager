'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from '../utils/api';
import { toast } from 'react-toastify';
import { isLoggedInAtom, lineIdAtom, teamCommonNameAtom, teamIdAtom } from "../utils/store/atoms";
import { useAtom } from "jotai/react";


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setTeamId] = useAtom(teamIdAtom);
  const [, setCommonName] = useAtom(teamCommonNameAtom);
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [disabled, setDisabled] = useState(false);
  const [, setLineId] = useAtom(lineIdAtom);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("jwt-token");
    setIsLoggedIn(false);
    setTeamId(null);
    setCommonName('');
    setDisabled(false);
    setLineId('');
  }, []);

  const handleLogin = async () => {
    setDisabled(true);
    try {
      const res = await api.post('/sign_in', { email, password });

      const { token, team } = res.data;
      console.log('team', team);
      if (token && team && team.id) {
        localStorage.setItem('jwt-token', token);
        setTeamId(team.id);
        setCommonName(team.common_name);
        setIsLoggedIn(true);
        setLineId(team.line_user_id);
        if (team.id === 1) {
          router.push('/admin/matching');
        } else {
          router.push('/teams');
        }
      } else {
        throw new Error('トークンが見つかりません');
      }
    } catch (error) {
      console.error('エラー:', error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || 'ログインに失敗しました');
    } finally {
      setDisabled(false);
    }
  }
  return (
    <div className="flex items-center justify-center pt-24">
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
            disabled={disabled}
            className="w-full hover:bg-zinc-800 hover:text-white"
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