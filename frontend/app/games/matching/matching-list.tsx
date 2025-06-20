'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type MatchingIndex } from '@/types/match';

export default function MatchingList({ matchingIndex }: { matchingIndex: MatchingIndex[] }) {
  console.log('matchingIndexの型:', typeof matchingIndex, matchingIndex);
  return (
    <div>
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
          {matchingIndex.map((match, index) => (
            <TableRow key={index}>
              <TableCell>{match.league || ''}</TableCell>
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
