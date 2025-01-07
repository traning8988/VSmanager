class AddConfirmedAtToTeams < ActiveRecord::Migration[7.1]
  def change
    add_column :teams, :confirmed_at, :datetime
  end
end
