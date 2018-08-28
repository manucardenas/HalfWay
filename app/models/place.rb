class Place < ApplicationRecord
  has_many :places_categories, dependent: :destroy
  has_many :categories, through: :places_categories
end
