'use client'
import api from "@/app/utils/api";
import MatchingList from "./MatchingList";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useResetAuth from "@/hooks/useResetAuth";

type MatchingIndex = {
  id: number
  league: string
  date:   string
  time:   string
  place:  string
  team1:  string
  team2:  string
  team1_score: number | null
  team2_score: number | null
}

export default function Matching () {
  const [matchingIndex, setMatchingIndex] = useState<MatchingIndex[]>([]);
  const { resetAuth } = useResetAuth();
  useEffect(() => {
    const fetchMatchingList = async () => {
      const token = localStorage.getItem('jwt-token');
      if (!token) {
        toast.error("認証情報が不足しています。ログインしてください。");
        resetAuth();
        return;
      }
      try {
        const res = await api.get(`/api/matches`);
        if (res.status !== 200) {
          throw new Error("データの取得に失敗しました");
        }
        setMatchingIndex(res.data.response);
      } catch(error) {
        console.log("データの取得に失敗しました:", error);
      }
    }
    fetchMatchingList();
    console.log("matchingIndex", matchingIndex);
  }, [])


  return(
    <div>
      <MatchingList matchingIndex={matchingIndex} />
    </div>
  )
}