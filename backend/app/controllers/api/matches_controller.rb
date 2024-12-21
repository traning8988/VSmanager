module Api
  class MatchesController < ApplicationController
    #試合確定後の対戦表表示
    def index
      requested_date = Date.today

      # リクエストされた日付以降の試合を取得
      matches = Match.joins(:league).includes(:team1, :team2)
                 .where("DATE(matches.date) >= ?", requested_date)
                 .order("leagues.category ASC, leagues.division ASC, matches.date ASC")

      if matches.empty?
        render json: { message: "まだ試合が組まれていません" }, status: :ok
        return
      end

      render json: matches.map { |match|
        league = "#{match.league.category}#{match.league.division}部"
        {
          league: league,
          date:   match.date.strftime("%Y/%m/%d %H:%M"),
          place:  match.place,
          team1:  match.team1.common_name,
          team2:  match.team2.common_name,
          team1_score: match.team1_score || nil,
          team2_score: match.team2_score || nil
        }
      }, status: :ok
    end
    #マイページに表示
    def show
      match = Match.includes(:league, :team1, :team2).find(params[:id])
      render json: {
        league: "#{match.league.category}#{match.league.division}部",
        date:   match.date.strftime("%Y/%m/%d %H:%M"),
        place:  match.place,
        team1:  match.team1.common_name,
        team2:  match.team2.common_name
      }
    end

    #管理者用の試合組み合わせ決定ページ
    def create
      # リクエストボディから直接取得
      matches = match_params

      if matches.blank? || !matches.is_a?(Array)
        render json: { error: 'データ形式が正しくありません' }, status: :unprocessable_entity
        return
      end

      created_matches = []
      errors = []

      matches.each do |match|
        # チームの検証と取得
        team1 = Team.find_by(common_name: match[:team1_common])
        team2 = Team.find_by(common_name: match[:team2_common])

        if team1.nil? || team2.nil? || team1.league_id != team2.league_id
          errors << { error: "適切なチームを選択してください: #{match[:team1_common]} vs #{match[:team2_common]}" }
          next
        end

        # 会場の検証
        if match[:place].blank?
          errors << { error: "試合会場を指定してください", match: match }
          next
        end

        # 試合日時の計算
        league_category = team1.league.category
        game_date = next_available_date(league_category, match[:times])

        # Matchの作成
        new_match = Match.new(
          league_id: team1.league_id,
          date: game_date,
          team1_id: team1.id,
          team2_id: team2.id,
          place: match[:place]
        )

        if new_match.save
          created_matches << new_match
        else
          errors << { error: new_match.errors.full_messages, match: match }
        end
      end

      if errors.empty?
        render json: { message: 'すべての試合を作成しました', matches: created_matches }, status: :created
      else
        render json: { message: "一部または全ての試合の作成に失敗しました", errors: errors }, status: :unprocessable_entity
      end
    end

    private
    def match_params
      params.require(:matches).map do |match|
        match.permit(:team1_common, :team2_common, :place, :times)
      end
    end

    def next_available_date(category, times)
      today = Date.today
      target_weekday = category == "土曜" ? 6 : 0
      days_to_add = (target_weekday - today.wday) % 7
      days_to_add = 7 if days_to_add == 0
      next_date = today + days_to_add
      game_times = times.split(":").map(&:to_i)
      Time.new(next_date.year, next_date.month, next_date.day, game_times[0], game_times[1])
    end
  end
end
