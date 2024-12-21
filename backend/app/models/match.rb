class Match < ApplicationRecord
  belongs_to :league
  belongs_to :team1, class_name: 'Team'
  belongs_to :team2, class_name: 'Team'
  has_many :match_reports

  validates :league_id, :date, :team1_id, :team2_id, :place, presence: true
end
