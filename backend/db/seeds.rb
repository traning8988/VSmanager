# リーグデータ作成
league1 = League.create!(category: "土曜", division: 1)
league2 = League.create!(category: "日曜", division: 2)

# チームデータ作成
team1 = Team.create!(
  leader_name: "田中",
  team_name: "土曜1部チームA",
  common_name: "TeamA",
  email: "teamA@example.com",
  password_digest: "passwordA",
  league_id: league1.id
)

team2 = Team.create!(
  leader_name: "佐藤",
  team_name: "土曜1部チームB",
  common_name: "TeamB",
  email: "teamB@example.com",
  password_digest: "passwordB",
  league_id: league1.id
)

team3 = Team.create!(
  leader_name: "鈴木",
  team_name: "日曜2部チームC",
  common_name: "TeamC",
  email: "teamC@example.com",
  password_digest: "passwordC",
  league_id: league2.id
)

team4 = Team.create!(
  leader_name: "高橋",
  team_name: "日曜2部チームD",
  common_name: "TeamD",
  email: "teamD@example.com",
  password_digest: "passwordD",
  league_id: league2.id
)

# 試合データ作成
match1 = Match.create!(
  league_id: league1.id,
  date: DateTime.now + 1.day,
  team1_id: team1.id,
  team2_id: team2.id,
  place: "スタジアムA"
)

match2 = Match.create!(
  league_id: league2.id,
  date: DateTime.now + 2.days,
  team1_id: team3.id,
  team2_id: team4.id,
  place: "スタジアムB"
)

# 試合届データ作成
MatchRequest.create!(
  team_id: team1.id,
  requested_date: Date.today + 7.days,
  double_header: false
)

MatchRequest.create!(
  team_id: team3.id,
  requested_date: Date.today + 7.days,
  double_header: true
)

# 試合レポートデータ作成
MatchReport.create!(
  match_id: match1.id,
  reporting_team_id: team1.id,
  opponent_team_id: team2.id,
  reporting_team_score: 3,
  opponent_team_score: 2
)

MatchReport.create!(
  match_id: match1.id,
  reporting_team_id: team2.id,
  opponent_team_id: team1.id,
  reporting_team_score: 2,
  opponent_team_score: 3
)

MatchReport.create!(
  match_id: match2.id,
  reporting_team_id: team3.id,
  opponent_team_id: team4.id,
  reporting_team_score: 4,
  opponent_team_score: 4
)
