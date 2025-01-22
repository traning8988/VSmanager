class Team < ApplicationRecord
  has_secure_password

  belongs_to :league
  has_many :match_requests
  has_many :team_informations
  has_many :match_as_team1, class_name: 'Match', foreign_key: 'team1_id'
  has_many :match_as_team2, class_name: 'Match', foreign_key: 'team2_id'
  has_many :match_reports_as_reporting, class_name: 'MatchReport', foreign_key: 'reporting_team_id'
  has_many :match_reports_as_opponent, class_name: 'MatchReport', foreign_key: 'opponent_team_id'
  has_many :informations, through: :team_informations

  validates :leader_name, :team_name, :common_name, :email, presence: true
  validates :team_name, :email, uniqueness: true
end
