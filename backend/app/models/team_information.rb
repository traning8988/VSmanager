class TeamInformation < ApplicationRecord
  belongs_to :team
  belongs_to :information

  validates :team_id, :information_id, presence: true
end
