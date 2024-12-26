class DeviseTokenAuthCreateTeams < ActiveRecord::Migration[7.1]
  def change
    change_table :teams do |t|
      ## Required
      t.string :provider, null: false, default: 'email'
      t.string :uid, null: false, default: ''

      ## Tokens
      t.json :tokens

      # Uncomment below if timestamps were not included in your original model.
      # t.timestamps
    end

    add_index :teams, [:uid, :provider], unique: true
  end
end
