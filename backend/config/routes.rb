Rails.application.routes.draw do
  devise_for :teams
  namespace :api do
    resources :teams, only: [:show]
    resources :league, only: [:show]
    resources :matches, only: [:index, :show, :create, :update, :destroy]
    resources :match_requests, only: [:index, :create, :destroy]
    resources :match_reports, only: [:index, :create]
  end
end
