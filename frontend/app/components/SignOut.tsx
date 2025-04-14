"use client";

import api from "../utils/api";
import useResetAuth from "@/hooks/useResetAuth";

export default function SignOut() {
  const { resetAuth } = useResetAuth();
  const handleLogout = async () => {
    const token = localStorage.getItem("jwt-token");
    try {
      if (token) {
        await api.delete("/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.warn("JWTが期限切れなのでサーバー側では無視してOK");
      } else {
        console.error("ログアウト中に想定外のエラー:", error);
      }
    } finally {
      resetAuth(); // ローカル側は確実にログアウト
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full h-full md:justify-center md:items-center 
        md:hover:bg-zinc-50 md:hover:text-zinc-950"
    >
      ログアウト
    </button>
  );  
  
}
