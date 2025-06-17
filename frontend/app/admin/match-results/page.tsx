import ResultsTable from './results-table';
import { type MatchResult } from '@/types/match';

export default async function MatchResults() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/match_results`, {
  //   cache: 'no-store',
  // });
  // if (!res.ok) {
  //   throw new Error('データの取得に失敗しました');
  // }
  // const matchResults = await res.json();

  return (
    <div>
      {/* <ResultsTable matchResults={matchResults} />
      <br />
      <br />
      <ResultsForm matchResults={matchResults} /> */}
    </div>
  );
}
