'use client';

import api from '@/app/utils/api';
import MatchingForm from './MatchingForm';
import MatchingTable from './MatchingTable';
import useResetAuth from '@/hooks/useResetAuth';
import { toast } from 'react-toastify';
import { DialogContent, DialogHeader, DialogTitle, Dialog } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import CheckMatching from './CheckMatching';
import { Button } from '@/components/ui/button';
import { MatchRecord } from '@/types/match';
import SubmitMatches from './SubmitMatches';
import { MatchRequestsIndex } from '@/types/match';

export default function Matching() {
  const { resetAuth } = useResetAuth();
  const [error, setError] = useState<string | null>(null);
  const [matchRequestsIndex, setMatchRequestsIndex] = useState<MatchRequestsIndex[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [matchRecord, setMatchRecord] = useState<MatchRecord[]>([]);

  useEffect(() => {
    const fetchMatchRequests = async () => {
      const token = localStorage.getItem('jwt-token');
      if (!token) {
        toast.error('認証情報が不足しています。ログインしてください。');
        resetAuth();
        return;
      }

      try {
        const res = await api.get(`/api/match_requests`);
        if (Array.isArray(res.data)) {
          setMatchRequestsIndex(res.data);
        } else {
          setError(res.data.error || 'データの取得に失敗しました');
        }
        console.log('データの取得に成功しました:', res.data);
      } catch (error) {
        console.log('データの取得に失敗しました:', error);
      }
    };
    fetchMatchRequests();
  }, []);

  const handleFormSubmit = (matches: MatchRecord[]) => {
    setMatchRecord(matches);
  };
  useEffect(() => {
    if (matchRecord.length > 0) setOpenDialog(true);
    console.log('matchRecord', matchRecord);
  }, [matchRecord]);

  if (error) {
    return <p className="text-center text-red-500 mt-16">{error}</p>;
  }

  return (
    <div>
      <MatchingTable matchRequestsIndex={matchRequestsIndex} />
      <br />
      <br />
      <MatchingForm matchRequestsIndex={matchRequestsIndex} onSubmit={handleFormSubmit} />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className="text-zinc-600 w-[800px] max-w-[800px]"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">組み合わせ確認画面</DialogTitle>
          </DialogHeader>
          <CheckMatching matchRecord={matchRecord} />
          <div className="flex justify-center gap-2 mt-6">
            <Button onClick={() => setOpenDialog(false)}>閉じる</Button>
            <SubmitMatches matchRecord={matchRecord} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
