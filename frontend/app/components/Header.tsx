'use client';
import Link from 'next/link';
import SignOut from './sign-out';
import { useAtom } from 'jotai/react';
import { isLoggedInAtom, teamIdAtom } from '../utils/store/atoms';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [teamId] = useAtom(teamIdAtom);

  return (
    <header className="bg-zinc-950 text-zinc-50 h-12 flex z-50">
      <h1 className="flex md:text-2xl items-center pl-6 font-bold">VSmanager</h1>
      {teamId === 1 && (
        <li className="flex w-full h-full items-center p-6 text-sm opacity-50">管理者ページ</li>
      )}
      <ul className="list-none text-sm max-w-[600px] w-full ml-auto justify-end hidden md:flex">
        {isLoggedIn &&
          (teamId !== 1 ? (
            <>
              <li className="flex-1">
                <Link
                  href={'/teams'}
                  className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center"
                >
                  チーム情報
                </Link>
              </li>
              {/* <li className="flex-1"><Link href={'/games'} className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center">試合情報</Link></li> */}
              <li className="flex-1">
                <Link
                  href={'/games/match-requests'}
                  className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center"
                >
                  試合申し込み
                </Link>
              </li>
              {/* <li className="flex-1"><Link href={'/games/match-reports'} className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center">試合結果届け</Link></li>
              <li className="flex-1"><Link href={'/results'} className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center">成績表</Link></li> */}
              <li className="flex-1">
                <Link
                  href={'/games/matching'}
                  className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center"
                >
                  今週の試合情報
                </Link>
              </li>
              <li className="flex-1">
                <SignOut />
              </li>
            </>
          ) : (
            <div className="max-w-[400px] w-full flex">
              <li className="flex-1">
                <Link
                  href={'/admin/matching'}
                  className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center"
                >
                  対戦管理
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  href={'/games/matching'}
                  className="flex h-full justify-center hover:bg-zinc-50 hover:text-zinc-950 items-center"
                >
                  今週の試合情報
                </Link>
              </li>
              <li className="flex-1">
                <SignOut />
              </li>
            </div>
          ))}
      </ul>
      <div className="md:hidden relative flex items-center ml-auto pr-4">
        {isLoggedIn &&
          (teamId !== 1 ? (
            <DropdownMenu>
              <DropdownMenuTrigger>menu</DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={'/teams'} className="w-full">
                    チーム情報
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={'/games/match-requests'} className="w-full">
                    試合申し込み
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={'/games/matching'} className="w-full">
                    今週の試合情報
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>menu</DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={'/admin/matching'} className="w-full">
                    対戦管理
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={'/games/matching'} className="w-full">
                    {' '}
                    今週の試合情報
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
      </div>
    </header>
  );
}
