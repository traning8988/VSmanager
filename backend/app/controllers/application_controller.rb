class ApplicationController < ActionController::API
  before_action :authenticate_request

  private

  def authenticate_request
    token = request.headers['Authorization']
    decoded_token = JwtService.decode(token.split(' ').last) if token

    if decoded_token
      @current_team = Team.find_by(id: decoded_token[:team_id])
      return if @current_team
    end

    line_user_id = extract_line_user_id_from_request
    if line_user_id
      @current_team = Team.find_by(line_user_id: line_user_id)
      return if @current_team
    end

    render json: { error: 'Not Authorized' }, status: :unauthorized
  end

  def current_team
    @current_team
  end

  def authenticate_team!
    unless current_team
      render json: { error: "ログインしてください" }, status: :unauthorized
    end
  end
end
