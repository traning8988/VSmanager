class Information < ApplicationRecord
  self.table_name = "informations"

  has_many :team_information
  has_many :team, through: :team_information

  validates :content, presence: true
end
