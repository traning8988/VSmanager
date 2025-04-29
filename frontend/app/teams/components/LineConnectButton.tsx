'use client';

import { useAtom } from "jotai";
import { lineIdAtom } from "@/app/utils/store/atoms";
import { Button } from "@/components/ui/button";

export const LineConnectButton = () => {
  const [lineId] = useAtom(lineIdAtom);
  const ConnectLiff = () => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_CHANNEL_ID!;
    window.location.href =  `https://miniapp.line.me/${liffId}`;
  };

  return (
    <Button onClick={ConnectLiff} className="bg-green-500 text-black" disabled={lineId !== null}>
      { lineId === null ? "LINEと連携する" : "LINE連携済み" }
    </Button>
  )
};