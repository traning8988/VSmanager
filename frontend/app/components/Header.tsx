'use client'
import Link from "next/link"
import SignOut from "./SignOut";
import { useAtom } from "jotai/react";
import { isLoggedInAtom, teamIdAtom } from "../utils/store/atoms";

export default function Header() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [teamId] = useAtom(teamIdAtom); 

  return (
    <header className="bg-slate-900 text-white h-12 flex">
      <h1 className="flex text-2xl items-center pl-6">VSmanager</h1>
      {teamId === 1 && <li className="flex h-full items-center p-6 text-sm opacity-50">管理者ページ</li>}
      <ul className="list-none flex ml-auto text-sm">
        {isLoggedIn && (
          teamId !== 1 ? (
            <>
              <li><Link href={'/teams'} className="flex h-full hover:bg-white hover:text-slate-900 items-center p-6">マイページ</Link></li>
              <li><Link href={'/games'} className="flex h-full hover:bg-white hover:text-slate-900 items-center p-6">試合情報</Link></li>
              <li><Link href={'/games/match-requests'} className="flex h-full hover:bg-white hover:text-slate-900 items-center p-6">試合申し込み</Link></li>
              {/* <li><Link href={'/games/match-reports'} className="flex h-full hover:bg-white hover:text-slate-900 items-center p-6">試合結果届け</Link></li>
              <li><Link href={'/results'} className="flex h-full hover:bg-white hover:text-slate-900 items-center p-6">成績表</Link></li> */}
              <li><Link href={"/games/matching"} className="flex h-full hover:bg-white hover:text-slate-900 items-center p-6">今週の試合情報</Link></li>
              <li><SignOut /></li> 
            </>
          ) : (
            <>
              <li><Link href={"/admin/matching"} className="flex h-full hover:bg-white hover:text-slate-900 items-center p-6">対戦管理ページ</Link></li>
              <li><Link href={"/games/matching"} className="flex h-full hover:bg-white hover:text-slate-900 items-center p-6">今週の試合情報</Link></li>
              <li><SignOut /></li> 
            </>

          )
        )}
      </ul>
    </header>
  )
}