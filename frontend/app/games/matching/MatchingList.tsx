'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type MatchingIndex = {
  id: number;
  league: string;
  date: string;
  time: string;
  place: string;
  team1: string;
  team2: string;
  team1_score: number | null;
  team2_score: number | null;
};

export default function MatchingList({ matchingIndex }: { matchingIndex: MatchingIndex[] }) {

  return (
    <div>
      <h1 className="m-2">今週の試合リスト</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>リーグ</TableHead>
            <TableHead>試合日</TableHead>
            <TableHead>チーム名</TableHead>
            <TableHead>対</TableHead>
            <TableHead>チーム名</TableHead>
            <TableHead>試合会場</TableHead>
            <TableHead>試合開始時間</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchingIndex.map((match) => (
            <TableRow key={match.id}>
              <TableCell>{match.league}</TableCell>
              <TableCell>{match.date}</TableCell>
              <TableCell>{match.team1}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>{match.team2}</TableCell>
              <TableCell>{match.place}</TableCell>
              <TableCell>{match.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
