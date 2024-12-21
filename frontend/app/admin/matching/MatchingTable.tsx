import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type MatchRequestsIndex = {
  id: number;
  common_name: string;
  category: string;
  division: number;
  requested_date: string;
  double_header: boolean;
}

export default function MatchingTable({ matchRequestsIndex }: { matchRequestsIndex: MatchRequestsIndex[] }) {

  return (
    <div>
      <h1>試合申し込み一覧</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>試合日</TableHead>
            <TableHead>所属リーグ</TableHead>
            <TableHead>チーム名</TableHead>
            <TableHead>ダブルヘッダー</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchRequestsIndex.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.requested_date}</TableCell>
              <TableCell>{request.category}{request.division}部</TableCell>
              <TableCell>{request.common_name}</TableCell>
              <TableCell>{request.double_header ? "◯" : ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


