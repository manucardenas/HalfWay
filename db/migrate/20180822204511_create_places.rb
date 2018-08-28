class CreatePlaces < ActiveRecord::Migration[5.2]
  def change
    create_table :places do |t|
      t.string :name
      t.string :image_url
      t.string :url
      t.float :rating
      t.string :location
      t.string :phone
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
