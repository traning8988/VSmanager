"use client";

import api from "../utils/api";
import useResetAuth from "@/hooks/useResetAuth";

export default function SignOut() {
  const { resetAuth } = useResetAuth();

  const handleLogout = async () => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      await api.delete("/logout");
    }
    resetAuth();
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
