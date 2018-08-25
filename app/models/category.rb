class Category < ApplicationRecord
  has_many :places_categories
  has_many :places, through: :places_categories

  def self.fetch_all
    @list ||= all.pluck(:category, :description)
  end
end
