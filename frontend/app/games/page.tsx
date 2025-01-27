'use client';

import { Button } from "@/components/ui/button"
import useResetAuth from "@/hooks/useResetAuth";
import Link from "next/link"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Games() {
  const { resetAuth } = useResetAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('jwt-token');
      if (!token) {
        toast.error("認証情報が不足しています。ログインしてください。");
        resetAuth();
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 mt-4">
      <h1 className="text-2xl text-center">試合情報</h1>
      <div className="bg-gray-100 flex items-start justify-between text-black w-4/5 max-w-lg min-h-[200px] border-2 p-4">
        <p className="mr-10">2024/12/4</p>
        <p>今週の試合はありません</p>
      </div>
      <div className="flex space-x-10">
        <Button asChild>
          <Link href="/games/match-requests">試合申し込み</Link>
        </Button>
        <Button asChild>
          <Link href="/games/match-reports">試合結果届け</Link>
          </Button>
      </div>
    </div>
  )
}