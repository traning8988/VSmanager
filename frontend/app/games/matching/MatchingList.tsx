
type MatchingIndex = {
  league: string
  date:   string
  place:  string
  team1:  string
  team2:  string
  team1_score: number | null
  team2_score: number | null
}


export default function MatchingList ({ matchingIndex }: { matchingIndex: MatchingIndex[] }) {
  return(
    <div>
      <h1>試合リスト</h1>
      <ul>
        {matchingIndex.map((match, index) => (
          <li key={index} className="mb-4 border p-4 rounded">
            <p><strong>リーグ:</strong> {match.league}</p>
            <p><strong>日付:</strong> {match.date}</p>
            <p><strong>場所:</strong> {match.place}</p>
            <p><strong>チーム1:</strong> {match.team1} (得点: {match.team1_score ?? "未登録"})</p>
            <p><strong>チーム2:</strong> {match.team2} (得点: {match.team2_score ?? "未登録"})</p>
          </li>
        ))}
      </ul>
    </div>
  )
}