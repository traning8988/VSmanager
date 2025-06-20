export type MatchRecord = {
  team1_common: string;
  team2_common: string;
  place: string;
  times: string;
  league: string;
  date: string;
};

export type MatchRequestsIndex = {
  id: number | string;
  common_name: string;
  category: string;
  division: number;
  requested_date: string;
  double_header: boolean;
};

export type MatchingIndex = {
  id: number | null;
  league: string;
  date: string;
  time: string;
  place: string;
  team1: string;
  team2: string;
  team1_score: number | null;
  team2_score: number | null;
};

export type Match = {
  message: string;
  league: string;
  date: string;
  place: string;
  team1: string;
  team2: string;
};

export type MatchResult = {
  id: number;
  team1: string;
  team2: string;
  team1_score: number | null;
  team2_score: number | null;
  date: string;
  place: string;
  league: string;
};
