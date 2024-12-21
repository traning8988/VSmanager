class CreateTeams < ActiveRecord::Migration[7.1]
  def change
    create_table :teams do |t|
      t.string :leader_name, null: false
      t.string :team_name, null: false
      t.string :common_name, null: false
      t.string :email, null: false, default: ""
      t.string :password_digest, null: false, default: ""
      t.references :league, null: false, foreign_key: true

      t.timestamps
    end
    add_index :teams, :team_name, unique: true
    add_index :teams, :email, unique: true
  end
end
