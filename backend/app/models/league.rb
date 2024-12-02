class League < ApplicationRecord
  has_many :team
  has_many :match

  validates :category, :division, presence: true
end
