import MatchingList from '@/app/games/matching/matching-list';
import { type MatchRecord } from '@/types/match';

export default function CheckMatching({ matchRecord }: { matchRecord: MatchRecord[] }) {
  console.log('CheckMatching received:', matchRecord);
  const checkMatchingFormat = matchRecord.map((match) => ({
    id: Math.random(), // 🔹 仮のIDを振る
    league: match.league,
    date: match.date, // 🔹 試合日も未定
    time: match.times,
    place: match.place,
    team1: match.team1_common,
    team2: match.team2_common,
    team1_score: null,
    team2_score: null,
  }));

  return (
    <>
      <MatchingList matchingIndex={checkMatchingFormat} />
    </>
  );
}
