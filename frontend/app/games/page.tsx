import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Games({ params }: { params: { teamId: string } }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 mt-4">
      <h1 className="text-2xl text-center">試合情報</h1>
      <div className="bg-gray-100 flex items-start justify-between text-black w-4/5 max-w-lg min-h-[200px] border-2 p-4">
        <p className="mr-10">2024/12/4</p>
        <p>今週の試合はありません</p>
      </div>
      <div className="flex space-x-10">
        <Button asChild>
          <Link href="/games/match-requests">試合申し込み</Link>
        </Button>
        <Button>試合結果届け</Button>
      </div>
    </div>
  )
}