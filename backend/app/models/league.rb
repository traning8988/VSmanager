class League < ApplicationRecord
  has_many :teams
  has_many :matches

  validates :category, :division, presence: true
end
