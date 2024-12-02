module Api
  class TeamsController < ApplicationController
    def show
      team = Team.find(params[:id])
      render json: team, status: :ok
    end
  end
end
