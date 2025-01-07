import Link from "next/link"

export default function Header() {
  const teamId = 2;
  return (
    <header className="bg-slate-900 text-white h-20">
      <ul className="list-none flex space-x-10 justify-end">
        <li><Link href={`/teams/${teamId}`} className="hover:underline">マイページ</Link></li>
        <li><Link href={`/games`} className="hover:underline">試合情報</Link></li>
        <li><Link href="/results" className="hover:underline">成績表</Link></li>
        <li><Link href="/setting" className="hover:underline">ユーザー設定</Link></li>
        <li><Link href="/logout" className="hover:underline mr-2">ログアウト</Link></li>
      </ul>
    </header>
  )
}