class MatchReport < ApplicationRecord
  belongs_to :match
  belongs_to :reporting_team, class_name: 'Team'
  belongs_to :opponent_team, class_name: 'Team'

  validates :match_id, :reporting_team, :opponent_team, :reporting_team_score, :opponent_team_score, presence: true
end
