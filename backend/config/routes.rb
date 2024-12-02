Rails.application.routes.draw do
  namespace :api do
    resources :teams, only: [:show]
    resources :league, only: [:show]
    resources :matches, only: [:index, :show, :create, :update, :destroy]
    resources :match_requests, only: [:index, :create]
    resources :match_reports, only: [:index, :create]
  end
end
