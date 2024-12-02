class CreateMatchReports < ActiveRecord::Migration[7.1]
  def change
    create_table :match_reports do |t|
      t.references :match, null: false, foreign_key: true
      t.references :reporting_team, null: false, foreign_key: {to_table: :teams}
      t.references :opponent_team, null: false, foreign_key: {to_table: :teams}
      t.integer :reporting_team_score, null: false
      t.integer :opponent_team_score, null: false


      t.timestamps
    end
  end
end
