class SessionsController < ApplicationController
  skip_before_action :authenticate_request, only: [:create]

  def create
    team = Team.find_by(email: params[:email])

    if team&.authenticate(params[:password])
      token = JwtService.encode({ team_id: team.id })
      render json: { token: token, team: team }, status: :ok
    else
      render json: { error: 'メールアドレスまたはパスワードが間違っています' }, status: :unauthorized
    end
  end

  def destroy
    token = request.headers['Authorization']&.split(' ')&.last
    if token
      JwtBlacklist.create(token: token) rescue nil
      # トークンの有効性を問わず、レスポンスを返す
      render json: { message: 'ログアウトしました' }, status: :ok
    else
      render json: { message: 'ログアウト処理が完了しました' }, status: :ok
    end
  end
end
