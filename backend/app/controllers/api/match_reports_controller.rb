module Api
  class MatchReportsController < ApplicationController
    #１週間以内のデータに絞って取得
    def index
      one_week_ago = Date.today - 7
      match_reports = MatchReport.includes(:match, reporting_team: :league)
                                 .where("match_reports.created_at >= ?", one_week_ago)
                                 .order("leagues.category ASC, leagues.division ASC")

      render json: match_reports.map { |report|
        {
          id: report.id,
          match_id: report.match_id,
          date: report.match.date.strftime("%m月%d日") + "(#{format_wday(report.match.date.wday)})",
          league: "#{report.reporting_team.league.category}#{report.opponent_team.league.division}部",
          reporting_team: report.reporting_team.team_name,
          opponent_team: report.opponent_team.team_name,
          reporting_team_score: report.reporting_team_score,
          opponent_team_score: report.opponent_team_score
        }
      },status: :ok
    end

    def create
      reporting_team = Team.find_by(common_name: match_reports_params[:reporting_team_name])
      opponent_team =  Team.find_by(common_name: match_reports_params[:opponent_team_name])

      if reporting_team.nil? || opponent_team.nil?
        render json: { error: "指定されたチームが見つかりません" }, status: :unprocessable_entity
        return
      end

      match = Match.find_by(
        team1_id: [reporting_team.id, opponent_team.id],
        team2_id: [reporting_team.id, opponent_team.id]
      )

      if match.nil?
        render json: { error: "指定された試合が見つかりません" }, status: :unprocessable_entity
        return
      end

      #存在していれば参照してなければ新規作成
      match_report = MatchReport.find_or_initialize_by(
        match_id: match.id,
        reporting_team_id: reporting_team.id,
        opponent_team_id: opponent_team.id
      )

      #情報を追加更新するが、DBにはまだ保存しない
      match_report.assign_attributes(
        reporting_team_score: match_reports_params[:reporting_team_score],
        opponent_team_score: match_reports_params[:opponent_team_score]
      )

      if match_report.save
        #相手チームからのレポートが既にあって、同じ結果であればscoreを更新
        update_match_score(match)

        render json: { message: "試合結果を受け付けました", match_report: match_report }, status: :created
      else
        render json: { errors: match_reports.errors.full_messages }, status: :unprocessable_entity
      end
    end

    #管理者がレポートを変更して強制的に完了にする
    def update
    end

private
    def match_reports_params
      params.require(:match_report).permit(
        :reporting_team_name,#current_user実装可能性
        :opponent_team_name,
        :reporting_team_score,
        :opponent_team_score
      )
    end

    def format_wday(wday)
      %w[日 月 火 水 木 金 土][wday]
    end

    def update_match_score(match)
      reports = MatchReport.where(match_id: match.id)

      return unless reports.size == 2

      team1_report = reports.find { |r| r.reporting_team_id == match.team1_id }
      team2_report = reports.find { |r| r.reporting_team_id == match.team2_id }

      return unless team1_report && team2_report

      if team1_report.reporting_team_score == team2_report.opponent_team_score &&
        team1_report.opponent_team_score == team2_report.reporting_team_score
       match.update(
         team1_score: team1_report.reporting_team_score,
         team2_score: team1_report.opponent_team_score
       )
     end

    end
  end
end
