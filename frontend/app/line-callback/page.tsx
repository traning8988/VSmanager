'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { lineIdAtom } from "../utils/store/atoms";
import liff from "@line/liff";
import { toast } from "react-toastify";
import api from "../utils/api";

export default function LineCallback() {
  const [, setLineId] = useAtom(lineIdAtom);
  const router = useRouter();
  useEffect(() => {
    const connect = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_CHANNEL_ID!;
        await liff.init({ liffId });

        if (!liff.isLoggedIn()) {
          // 万が一ログインしてなかったら
          router.push("/teams");
          return;
        }

        const profile = await liff.getProfile();
        const lineUserId = profile.userId;

        const res = await api.post("/api/teams", { line_user_id: lineUserId})
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("LINE連携APIに失敗しました");
        }



        setLineId(lineUserId);
        localStorage.setItem("lineUserId", lineUserId);
        toast.success("LINE連携が完了しました。");

        // 連携できたらマイページなどへ戻す
        router.push("/teams");
      } catch (error) {
        console.error("LINE連携失敗", error);
        toast.error("LINE連携に失敗しました");
        router.push("/teams");
      }
    };

    connect();
  }, [router, setLineId]);


  return (
    <p>LINE連携中...</p>
  );
}