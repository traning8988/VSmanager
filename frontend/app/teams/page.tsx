'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai/react';
import { teamIdAtom } from '../utils/store/atoms';
import useResetAuth from '@/hooks/useResetAuth';
import { LineConnectButton } from './components/LineConnectButton';

type Team = {
  team_name: string;
  common_name: string;
  league: {
    category: string;
    division: string;
  };
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
};

export default function Teams() {
  const [team, setTeam] = useState<Team | null>(null);
  const [teamId] = useAtom(teamIdAtom);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { resetAuth } = useResetAuth();
  const [message, setMessage] = useState('');
  const [, setMatch] = useState<string | null>(null);
  // const liffId = process.env.NEXT_PUBLIC_LIFF_CHANNEL_ID;
  // const liffUrl = `https://liff.line.me/${liffId}`;

  useEffect(() => {
    const fetchTeam = async () => {
      const token = localStorage.getItem('jwt-token');

      if (!token) {
        toast.error('認証情報が不足しています。ログインしてください。');
        resetAuth();
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get(`api/teams/${teamId}`);
        setTeam(res.data);
      } catch {
        console.log('チーム情報の取得に失敗しました。再ログインしてください。');
        resetAuth();
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, [router]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get(`/api/matches/${teamId}`);
        console.log('teamId', teamId);
        console.log('今週の試合', res.data);
        if (res.data) {
          setMatch(res.data.date);
          setMessage(res.data.message);
        } else {
          setMessage('今週の試合はありません。');
        }
      } catch {
        console.log('試合情報の取得に失敗しました。再ログインしてください。');
        resetAuth();
      }
    };
    fetchMatches();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-5 mt-4">
      {team && (
        <>
          <h1 className="text-2xl text-center">{team.team_name}</h1>
          <div className="flex justify-between w-4/5 max-w-lg space-x-8">
            <h2>お知らせ</h2>
            <LineConnectButton />
          </div>

          <div className="bg-gray-100 flex items-start justify-between text-black w-4/5 max-w-lg min-h-[150px] border-2 p-4">
            <p>{message}</p>
          </div>
          <div className="flex justify-between w-4/5 max-w-lg space-x-8">
            <p>通称</p>
            <p>{team.common_name}</p>
          </div>
          <div className="flex justify-between w-4/5 max-w-lg space-x-8">
            <p>所属リーグ</p>
            <p>
              {team.league.category}
              {team.league.division}部
            </p>
          </div>
          <div className="flex justify-between w-4/5 max-w-lg space-x-8">
            <p>成績</p>
            <p>
              {team.record.wins}勝{team.record.losses}負{team.record.draws}分
            </p>
          </div>
        </>
      )}
    </div>
  );
}
