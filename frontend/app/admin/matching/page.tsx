'use client'

import api from "@/app/utils/api";
import MatchingForm from "./MatchingForm";
import MatchingTable from "./MatchingTable"
import useResetAuth from "@/hooks/useResetAuth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

type MatchRequestsIndex = {
  id: number;
  common_name: string;
  category: string;
  division: number;
  requested_date: string;
  double_header: boolean;
}

export default function Matching() {
  const { resetAuth } = useResetAuth();
  const [error, setError] = useState<string | null>(null);
  const [matchRequestsIndex, setMatchRequestsIndex] = useState<MatchRequestsIndex[]>([]);

  useEffect(() => {
    const fetchMatchRequests = async () => {
      const token = localStorage.getItem('jwt-token');
      if (!token) {
        toast.error("認証情報が不足しています。ログインしてください。");
        resetAuth();
        return;
      }

      try {
        const res = await api.get(`/api/match_requests`);
        if (Array.isArray(res.data)) {
          setMatchRequestsIndex(res.data);
        } else {
          setError(res.data.error || "データの取得に失敗しました");
        }
        console.log("データの取得に成功しました:", res.data);
      } catch(error) {
        console.log("データの取得に失敗しました:", error);
      }
    }
    fetchMatchRequests();
  }, []);

  if (error) {
    return <p className="text-center text-red-500 mt-16">{error}</p>;
  }

  return (
    <div>
      <MatchingTable matchRequestsIndex={matchRequestsIndex} />
      <br />
      <br />
      <MatchingForm matchRequestsIndex={matchRequestsIndex} />
    </div>
  )
}
