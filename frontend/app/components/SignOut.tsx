"use client";

import api from "../utils/api";
import useResetAuth from "@/hooks/useResetAuth";

export default function SignOut() {
  const { resetAuth } = useResetAuth();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwt-token");
      if (token) {
      await api.delete("/logout");
      }
    } catch {
      console.error("ログアウトに失敗しました:");
    } finally {
      resetAuth();
    }
  };

  return (
    <button onClick={handleLogout} className="flex h-full hover:bg-white hover:text-slate-900 items-center p-6">
      ログアウト
    </button>
  );
}
