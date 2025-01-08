DeviseTokenAuth.setup do |config|
  config.token_lifespan = 1.week
  config.change_headers_on_each_request = false
  # config.enable_standard_devise_support = true

  # config.session_store = :cookie_store  # セッションストアの設定
end
