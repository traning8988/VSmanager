class CreateTeamInformations < ActiveRecord::Migration[7.1]
  def change
    create_table :team_informations do |t|
      t.references :team, null: false, foreign_key: true
      t.references :information, null: false, foreign_key: { to_table: :informations }

      t.timestamps
    end
  end
end
