module Api
  class MatchRequestsController < ApplicationController
    #管理者用の試合届確認画面に表示
    def index
      next_saturday = next_available_date("土曜")
      next_sunday = next_available_date("日曜")

      match_requests = MatchRequest.includes(team: :league).where(requested_date: [next_saturday, next_sunday])

      if match_reports.nil?
        render json: { error: "期間内の試合届けはありません"}
        return
      end

      next_week_request = []
      match_requests.each do |request|
        next_week_request << {
          team_name: request.team.team_name,
          category:  request.team.league.category,
          division:  request.team.league.division,
          requested_date: request.requested_date
        }
        if request.double_header == true
          next_week_request << {
            team_name: request.team.team_name,
            category:  request.team.league.category,
            division:  request.team.league.division,
            requested_date: request.requested_date
          }
        end
      end
      render json: next_week_request
    end

    #ユーザーの試合届提出
    def create
      #例外処理
      begin
        team = Team.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Team not found" }, status: :not_found
        return
      end
      league_category = team.league.category
      game_date = next_available_date(league_category)
      double_header = params[:double_header] || false
      match_request = MatchRequest.find_by(team_id: team.id, requested_date: game_date)

      #同じデータがあるときは更新
      if match_request
        match_request.update(double_header: double_header)
        render json:  { message: 'Match request updated successfully', match_request: match_request }, status: :ok
      else
        match_request = MatchRequest.new(
          team_id: team.id,
          requested_date: game_date,
          double_header: double_header
        )

        if match_request.save
          render json: { message: 'Match request created successfully', match_request: match_request }, status: :created
        else
          render json: { errors: match_request.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end

  private
    def next_available_date(category)
      today = Date.today
      target_weekday = category == "土曜" ? 6 : 0
      days_to_add = (target_weekday - today.wday) % 7
      days_to_add = 7 if days_to_add == 0
      today + days_to_add
    end
  end
end
