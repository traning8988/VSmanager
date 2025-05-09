puts "Cleaning up database..."

# テーブルのクリア
MatchReport.delete_all
MatchRequest.delete_all
Match.delete_all
TeamInformation.delete_all
Information.delete_all
Team.delete_all
League.delete_all

# 自動増分のリセット（PostgreSQL 用）
ActiveRecord::Base.connection.execute("TRUNCATE TABLE match_reports RESTART IDENTITY CASCADE")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE match_requests RESTART IDENTITY CASCADE")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE matches RESTART IDENTITY CASCADE")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE team_informations RESTART IDENTITY CASCADE")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE informations RESTART IDENTITY CASCADE")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE teams RESTART IDENTITY CASCADE")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE leagues RESTART IDENTITY CASCADE")

# リーグの作成
league1 = League.create!(category: "土曜", division: 1)
league2 = League.create!(category: "土曜", division: 2)
league3 = League.create!(category: "日曜", division: 1)
league4 = League.create!(category: "日曜", division: 2)

# リーグを配列でまとめる
leagues = [league1, league2, league3, league4]

# 東京の地名リスト
city_names = ["調布", "渋谷", "新宿", "品川", "世田谷", "杉並", "豊島", "中野", "目黒", "大田"]

# チーム名リスト（実際にありそうな名前）
team_bases = [
  ["ブラックス", "Leaf", "サンダーズ", "ファルコンズ", "ライオンズ", "レッドスターズ", "ブルーウィングス", "ドラゴンズ", "フェニックス", "グリズリーズ"],
  ["タイガース", "ウルブズ", "シャークス", "パンサーズ", "オーシャンズ", "ブレイヴハーツ", "グリーンホークス", "スパークス", "コメッツ", "ボルテックス"],
  ["ストーム", "ハリケーンズ", "ジャガーズ", "ダイナモス", "レイヴンズ", "アルバトロス", "ペガサス", "サムライズ", "フレイムズ", "ブリッツ"],
  ["テンペスト", "コンドルズ", "ゴールデンイーグルス", "サンダーボルツ", "レパーズ", "ウォーリアーズ", "フォーチュンズ", "ノーザンウルブズ", "シルバーファング", "クラウンズ"]
]

# リーダーの苗字リスト（ランダムに選択）
last_names = %w(佐藤 鈴木 高橋 田中 伊藤 渡辺 山本 中村 小林 加藤 吉田 佐々木)

# 各リーグに10チームずつ作成
@teams = []
leagues.each_with_index do |league, i|
  team_bases[i].each_with_index do |base_name, j|
    city_name = city_names[j]
    team_name = "#{city_name}#{base_name}"
    common_name = base_name

    leader_name = last_names.sample
    email = "email#{i + 1}#{j + 1}@example.com"

    team = Team.create!(
      leader_name: leader_name,
      team_name: team_name,
      common_name: common_name,
      email: email,
      password_digest: BCrypt::Password.create("password"),
      league: league,
      line_user_id: nil
    )
    @teams << team
  end
end

# 試合リクエストを作成するヘルパーメソッド
def next_available_date(league_category)
  if league_category.include?("土曜")
    Date.today.next_occurring(:saturday)
  elsif league_category.include?("日曜")
    Date.today.next_occurring(:sunday)
  end
end


# 全チームが試合リクエストを送る
@teams.each_with_index do |team, index|
  game_date = next_available_date(team.league.category)
  MatchRequest.create!(
    team_id: index + 1,
    requested_date: game_date,
    double_header: [true, false, false, false].sample
  )
end

puts 'Seed data created successfully with match requests!'
