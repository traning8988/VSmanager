import MatchingList from "./MatchingList";

export default async function Matching () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/matches`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("データの取得に失敗しました");
  }
  const matchingIndex = await res.json()

  return(
    <div>
      <MatchingList matchingIndex={matchingIndex} />
    </div>
  )
}