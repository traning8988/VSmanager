'use client';

import liff from "@line/liff";
import { useAtom } from "jotai";
import { lineIdAtom } from "@/app/utils/store/atoms";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export const LineConnectButton = () => {
  const [lineId] = useAtom(lineIdAtom);
  const ConnectLiff = async () => {
    if (lineId !== null) {
      console.log("LINEID", lineId);
      toast("LINE連携済みです。");
      return;
    }
    await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_CHANNEL_ID! });
      
    if (!liff.isLoggedIn()) {
      liff.login({redirectUri: `${window.location.origin}/line-callback`});
      return
    }
  }

  return (
    <Button onClick={ConnectLiff} className="bg-green-500 text-black" disabled={lineId !== null}>
      { lineId === null ? "LINEと連携する" : "LINE連携済み" }
    </Button>
  )
};