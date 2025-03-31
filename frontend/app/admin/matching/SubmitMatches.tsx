'use client'

import api from "@/app/utils/api";
import { Button } from "@/components/ui/button";
import { MatchRecord } from "@/types/match"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubmitMatches({ matchRecord }: { matchRecord: MatchRecord[] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  console.log("matchRecord", matchRecord);
  const handleSubmit = async () => {
    try {
      const res = await api.post("/api/matches", { matches: matchRecord });
      if (res.status !== 201) {
        console.log("データの送信に失敗しました", res.data);
        alert(`データの送信に失敗しました: ${res.data}`);
        return;
      }
    }
    catch(error) {
      console.log("データの送信に失敗しました", error);
      alert(`データの送信に失敗しました: ${error}`);
    }
    setIsLoading(false);
    router.push("/games/matching");
  }

  return (
    <Button onClick={handleSubmit} disabled={isLoading}>
      {isLoading ? "送信中..." : "送信"}
    </Button>
  )
}