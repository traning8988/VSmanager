class ApplicationController < ActionController::API
  before_action :authenticate_request

  private

  def authenticate_request
    token = request.headers['Authorization']
    decoded_token = JwtService.decode(token.split(' ').last) if token

    if decoded_token
      @current_team = Team.find_by(id: decoded_token[:team_id])
    else
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end

  def current_team
    @current_team
  end
end
