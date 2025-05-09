module Api
  class TeamsController < ApplicationController
    before_action :authenticate_team!

    def show
      team = current_team
      if team.nil?
        render json: { error: "ログインしてください" }, status: :unauthorized
        return
      end

      league = team.league
      matches = Match.where("team1_id = ? or team2_id = ?", team.id, team.id)

      wins = matches.where("team1_id = ? AND team1_score > team2_score OR team2_id = ? AND team2_score > team1_score", team.id, team.id).count
      losses = matches.where("team1_id = ? AND team1_score < team2_score OR team2_id = ? AND team2_score < team1_score", team.id, team.id).count
      draws = matches.where("team1_id = team2_id").count

      render json: {
        team_name: team.team_name,
        common_name: team.common_name,
        league: {
          category: league.category,
          division: league.division
        },
        record: {
          wins: wins,
          losses: losses,
          draws: draws
        }
      }, status: :ok
    end

    def create
      team = current_team
      team.update(line_user_id: params[:line_user_id])
      if team.save
        render json: { message: 'LINE_IDを保存しました。' }, status: :created
      else
        render json: { error: team.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end
