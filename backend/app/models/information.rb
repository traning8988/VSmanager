class Information < ApplicationRecord
  self.table_name = "informations"

  has_many :team_informations
  has_many :teams, through: :team_information

  validates :content, presence: true
end
