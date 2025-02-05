'use client'
import Link from "next/link"
import SignOut from "./SignOut";
import { useAtom } from "jotai/react";
import { isLoggedInAtom, teamIdAtom } from "../utils/store/atoms";

export default function Header() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [teamId] = useAtom(teamIdAtom); 

  return (
    <header className="bg-zinc-950 text-zinc-50 h-12 flex z-50 px-16 w-full fixed shadow-md top-0 left-0 opacity-90">
      <h1 className="flex text-2xl items-center pl-6 font-bold">VSmanager</h1>
      {teamId === 1 && <li className="flex w-full h-full items-center p-6 text-sm opacity-50">管理者ページ</li>}
      <ul className="list-none flex text-sm max-w-[600px] w-full ml-auto justify-end">
        {isLoggedIn && (
          teamId !== 1 ? (
            <>
              <li className="flex-1"><Link href={'/teams'} className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center">チーム情報</Link></li>
              {/* <li className="flex-1"><Link href={'/games'} className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center">試合情報</Link></li> */}
              <li className="flex-1"><Link href={'/games/match-requests'} className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center">試合申し込み</Link></li>
              {/* <li className="flex-1"><Link href={'/games/match-reports'} className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center">試合結果届け</Link></li>
              <li className="flex-1"><Link href={'/results'} className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center">成績表</Link></li> */}
              <li className="flex-1"><Link href={"/games/matching"} className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center">今週の試合情報</Link></li>
              <li className="flex-1"><SignOut /></li> 
            </>
          ) : (
            <div className="max-w-[400px] w-full flex">
              <li className="flex-1"><Link href={"/admin/matching"} className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center">対戦管理</Link></li>
              <li className="flex-1"><Link href={"/games/matching"} className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center">今週の試合情報</Link></li>
              <li className="flex-1"><SignOut /></li> 
            </div>
          )
        )}
      </ul>
    </header>
  )
}