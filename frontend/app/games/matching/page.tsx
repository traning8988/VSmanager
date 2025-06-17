'use client';
import api from '@/app/utils/api';
import MatchingList from './matching-list';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useResetAuth from '@/hooks/useResetAuth';
import { type MatchingIndex } from '@/types/match';

export default function Matching() {
  const [matchingIndex, setMatchingIndex] = useState<MatchingIndex[]>([]);
  const { resetAuth } = useResetAuth();
  useEffect(() => {
    const fetchMatchingList = async () => {
      const token = localStorage.getItem('jwt-token');
      if (!token) {
        toast.error('認証情報が不足しています。ログインしてください。');
        resetAuth();
        return;
      }
      try {
        const res = await api.get(`/api/matches`);
        if (res.status !== 200) {
          throw new Error('データの取得に失敗しました');
        }
        setMatchingIndex(res.data.response);
      } catch (error) {
        console.log('データの取得に失敗しました:', error);
      }
    };
    fetchMatchingList();
    console.log('matchingIndex', matchingIndex);
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-center my-4">今週の試合リスト</h1>
      <MatchingList matchingIndex={matchingIndex} />
    </div>
  );
}
