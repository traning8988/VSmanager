class ApplicationController < ActionController::API
	include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  # 新しいパラメーターを許可する場合の設定
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def current_team
    @current_team ||= Team.find_by(uid: request.headers['uid'])
  end
end
