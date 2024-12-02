class CreateMatchRequests < ActiveRecord::Migration[7.1]
  def change
    create_table :match_requests do |t|
      t.references :team, null: false, foreign_key: true
      t.date :requested_date, null: false

      t.timestamps
    end
  end
end
