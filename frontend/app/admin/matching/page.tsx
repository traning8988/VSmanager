import MatchingForm from "./MatchingForm";
import MatchingTable from "./MatchingTable"

export default async function Matching() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/match_requests`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("データの取得に失敗しました");
  }
  const matchRequestsIndex = await res.json()

  return (
    <div>
      <MatchingTable matchRequestsIndex={matchRequestsIndex} />
      <br />
      <br />
      <MatchingForm matchRequestsIndex={matchRequestsIndex} />
    </div>

  )
}
