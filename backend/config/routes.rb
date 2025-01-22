Rails.application.routes.draw do
  post '/sign_in', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  namespace :api do
    resources :teams, only: [:show]
    resources :leagues, only: [:show]
    resources :matches, only: [:index, :show, :create, :update, :destroy]
    resources :match_requests, only: [:index, :create, :destroy]
    resources :match_reports, only: [:index, :create]
  end
end
