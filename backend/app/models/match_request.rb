class MatchRequest < ApplicationRecord
  belongs_to :team

  validates :team_id, :requested_date, presence: true

end
