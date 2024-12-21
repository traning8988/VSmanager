import { redirect } from "next/navigation";

export default async function Home({ params }: { params: { teamId: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/teams/${params.teamId}`,{
    cache: "no-store"
  })
  if (!res.ok) {
    if (res.status === 404) {
      redirect('/not-found');
    } else {
      throw new Error('サーバーエラーが発生しました');
    }
  }
  const team = await res.json();
  return (
    <div className="flex flex-col items-center justify-center space-y-6 mt-4">
      <h1 className="text-2xl text-center">{team.team_name}</h1>
      <h2 className="text-left w-4/5 max-w-lg mb-2">お知らせ</h2>
      <div className="bg-gray-100 flex items-start justify-between text-black w-4/5 max-w-lg min-h-[200px] border-2 p-4">
        <p className="mr-10">2024/12/4</p>
        <p>今週の試合はありません</p>
      </div>
      <div className="flex justify-between w-4/5 max-w-lg space-x-8">
        <p>通称</p>
        <p>{team.common_name}</p>
      </div>
      <div className="flex justify-between w-4/5 max-w-lg space-x-8">
        <p>所属リーグ</p>
        <p>{team.league.category}{team.league.division}部</p>
      </div>
      <div className="flex justify-between w-4/5 max-w-lg space-x-8">
        <p>成績</p>
        <p>{team.record.wins}勝{team.record.losses}負{team.record.draws}分</p>
      </div>
    </div>
  );
}