# leagues
league1 = League.create!(category: "土曜", division: 1)
league2 = League.create!(category: "土曜", division: 2)
league3 = League.create!(category: "日曜", division: 1)
league4 = League.create!(category: "日曜", division: 2)

# リーグを配列でまとめる
leagues = [league1, league2, league3, league4]

# teams
teams = []
("A".."T").each_with_index do |letter, i|
  league = leagues.sample # リーグをランダムに選択
  teams << Team.create!(
    leader_name: "リーダー#{i + 1}",
    team_name: "team_name#{letter}",
    common_name: "common_name#{letter}",
    email: "team#{letter}@example.com",
    password: "password#{letter}",
    league: league # リレーションを正確に指定
  )
end

# 土日を計算する関数
def next_or_previous_weekend(today)
  target_weekdays = [6, 0] # 土曜日:6, 日曜日:0

  # 今日以降の最初の土日
  upcoming = (0..6).map { |i| today + i }.find { |d| target_weekdays.include?(d.wday) }

  # 今日以前の最後の土日
  previous = (-6..0).map { |i| today + i }.find { |d| target_weekdays.include?(d.wday) }

  [upcoming, previous].compact.sample # どちらかをランダムで返す
end

# match_requests
teams.each do |team|
  MatchRequest.create!(
    team: team,
    requested_date: next_or_previous_weekend(Date.today),
    double_header: [true, false].sample
  )
end

# matches
10.times do
  league = leagues.sample
  league_teams = league.teams

  # 同じリーグ内でランダムに2チーム選択
  if league_teams.size >= 2
    team1, team2 = league_teams.sample(2)

    # 同じリーグ内のリクエスト日からランダムに1つ選択
    common_requested_date = MatchRequest.where(team: [team1, team2]).pluck(:requested_date).uniq.sample

    next unless common_requested_date # 共通の日付がない場合はスキップ

    Match.create!(
      league: league,
      date: common_requested_date,
      team1: team1,
      team2: team2,
      place: "グラウンド#{rand(1..5)}",
      team1_score: rand(0..10),
      team2_score: rand(0..10),
      result: %w[win lose draw].sample
    )
  end
end

# informations
5.times do |i|
  Information.create!(
    title: "お知らせ #{i + 1}",
    content: "これはお知らせ #{i + 1} の内容です。",
    target_audience: %w[全員 リーダー].sample,
    end_date: Date.today + rand(5..20)
  )
end

# team_informations
Team.all.each do |team|
  information = Information.all.sample
  TeamInformation.create!(
    team: team,
    information: information
  )
end

# match_reports
Match.all.each do |match|
  reporting_team = [match.team1, match.team2].sample
  opponent_team = (reporting_team == match.team1 ? match.team2 : match.team1)

  MatchReport.create!(
    match: match,
    reporting_team: reporting_team,
    opponent_team: opponent_team,
    reporting_team_score: match.team1 == reporting_team ? match.team1_score : match.team2_score,
    opponent_team_score: match.team1 == reporting_team ? match.team2_score : match.team1_score
  )
end

puts "Seed data created successfully!"
