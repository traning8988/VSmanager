Rails.application.routes.draw do
  mount_devise_token_auth_for 'Team', at: 'auth'
  namespace :api do
    resources :teams, only: [:show]
    resources :leagues, only: [:show]
    resources :matches, only: [:index, :show, :create, :update, :destroy]
    resources :match_requests, only: [:index, :create, :destroy]
    resources :match_reports, only: [:index, :create]
  end
end
