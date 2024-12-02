class CreateLeagues < ActiveRecord::Migration[7.1]
  def change
    create_table :leagues do |t|
      t.string :category, null: false
      t.integer :division, null: false

      t.timestamps
    end
  end
end
