class CreateMatches < ActiveRecord::Migration[7.1]
  def change
    create_table :matches do |t|
      t.references :league, null: false, foreign_key: true
      t.datetime :date, null: false
      t.references :team1, null: false, foreign_key: { to_table: :teams }
      t.references :team2, null: false, foreign_key: { to_table: :teams}
      t.integer :team1_score
      t.integer :team2_score
      t.string :result
      t.string :place, null: false

      t.timestamps
    end
  end
end
