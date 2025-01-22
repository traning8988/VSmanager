"use client";

import { useRouter } from "next/navigation";
import api from "../utils/api";
import { useAtom } from "jotai/react";
import { teamCommonNameAtom, teamIdAtom } from "../utils/store/atoms";

export default function SignOut() {
  const router = useRouter();
  const [, setTeamId] = useAtom(teamIdAtom);
  const [, setCommonName] = useAtom(teamCommonNameAtom);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwt-token");
      if (token) {
      await api.delete("/logout");
      }
    } catch {
      console.error("ログアウトに失敗しました:");
    } finally {
      localStorage.removeItem("jwt-token");
      setTeamId(null);
      setCommonName('');
      router.push("/sign-in");
    }
  };

  return (
    <button onClick={handleLogout} className="hover:underline mr-2">
      ログアウト
    </button>
  );
}
