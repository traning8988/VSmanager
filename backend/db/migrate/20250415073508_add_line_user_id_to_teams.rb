class AddLineUserIdToTeams < ActiveRecord::Migration[7.1]
  def change
    add_column :teams, :line_user_id, :string
  end
end
