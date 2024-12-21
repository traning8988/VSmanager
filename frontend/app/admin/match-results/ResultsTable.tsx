import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type MatchResults = {
  id: number
  match_id: number;
  date: string;
  league: string;
  reporting_team: string;
  opponent_team: string;
  reporting_team_score: number;
  opponent_team_score: number;
}

export default function ResultsTable({ matchResults }: { matchResults: MatchResults[] }) {

  return (
    <div>
      <h1>試合結果届一覧</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>試合コード</TableHead>
            <TableHead>試合日</TableHead>
            <TableHead>所属リーグ</TableHead>
            <TableHead>チーム名</TableHead>
            <TableHead>ダブルヘッダー</TableHead>
            <TableHead>ダブルヘッダー</TableHead>
            <TableHead>ダブルヘッダー</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchResults.map((result) => (
            <TableRow key={result.id}>
              <TableCell>{result.match_id}</TableCell>
              <TableCell>{result.date}</TableCell>
              <TableCell>{result.league}</TableCell>
              <TableCell>{result.reporting_team}</TableCell>
              <TableCell>{result.opponent_team}</TableCell>
              <TableCell>{result.reporting_team_score}</TableCell>
              <TableCell>{result.opponent_team_score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

