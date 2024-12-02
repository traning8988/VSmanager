module Api
  class MatchesController < ApplicationController
    #試合確定後の対戦表表示
    def index
      requested_date = params[:date]

      if requested_date.blank?
        render json: { error: "日付を指定してください" },status: :unprocessable_entity
        return
      end

      matches = Match.includes(:league, :team1, :team2)
                     .where("DATE(matches.date) = ?", requested_date)
                     .order("leagues.category ASC, leagues.division ASC")

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
      team1 = Team.find_by(common_name: params[:team1_common])
      team2 = Team.find_by(common_name: params[:team2_common])
      league_id = team1.league_id

      if team1.nil? || team2.nil? || team1.league_id != team2.league_id
        render json: {error: '適切なテームを選択してください'},status: :unprocessable_entity
        return
      end

      if params[:place].blank?
        render json: { error: '試合会場を指定してください' }, status: :unprocessable_entity
        return
      end

      match = Match.new(
        league_id: league_id,
        date:      params[:date],
        team1_id:  team1.id,
        team2_id:  team2.id,
        place:     params[:place]
      )

      if match.save
        render json: { message: '組み合わせを作成しました',match: match },status: :created
      else
        render json: { errors: match.errors.full_messages },status: :unprpssesable_entity
      end
    end
    #match_reportを元に更新
    def update
      match = Match.find(params[:id])
      if match.nil?
        render json: { error: "指定された試合が見つかりません" }, status: :not_found
        return
      end

      if match.update(match_update_params)
        render json: { message: "試合結果を更新しました", match: match }, status: :ok
      else
        render json: { errors: match.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      match = Match.find(id: params[:id])
      if match.nil?
        render json: { error: "指定された試合が見つかりません" }, status: :not_found
        return
      end

      if match.destroy
        render json: { message: "試合を削除しました" }, status: :ok
      else
        render json: { errors: match.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    # 更新時に許可するパラメータ
    def match_update_params
      params.require(:match).permit(:team1_score, :team2_score)
    end
  end
end
