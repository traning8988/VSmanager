class AddDeviseToTeams < ActiveRecord::Migration[7.1]
  def self.up
    change_table :teams do |t|
      ## Database authenticatable
      t.string :email, default: "", null: false unless column_exists?(:teams, :email)
      t.string :encrypted_password, default: "", null: false unless column_exists?(:teams, :encrypted_password)

      ## Recoverable
      t.string   :reset_password_token unless column_exists?(:teams, :reset_password_token)
      t.datetime :reset_password_sent_at unless column_exists?(:teams, :reset_password_sent_at)

      ## Rememberable
      t.datetime :remember_created_at unless column_exists?(:teams, :remember_created_at)

      ## Trackable
      # 以下のカラムも必要であれば同様に確認を追加
      # t.integer  :sign_in_count, default: 0, null: false unless column_exists?(:teams, :sign_in_count)
      # t.datetime :current_sign_in_at unless column_exists?(:teams, :current_sign_in_at)
      # t.datetime :last_sign_in_at unless column_exists?(:teams, :last_sign_in_at)
      # t.string   :current_sign_in_ip unless column_exists?(:teams, :current_sign_in_ip)
      # t.string   :last_sign_in_ip unless column_exists?(:teams, :last_sign_in_ip)

      ## Confirmable
      # 同様に必要であれば確認を追加

      ## Lockable
      # 必要なら確認を追加
    end

    add_index :teams, :email, unique: true unless index_exists?(:teams, :email)
    add_index :teams, :reset_password_token, unique: true unless index_exists?(:teams, :reset_password_token)
    # 必要に応じて追加のインデックス確認
  end

  def self.down
    # 必要であれば、削除処理を追加
    remove_column :teams, :reset_password_token if column_exists?(:teams, :reset_password_token)
    remove_column :teams, :reset_password_sent_at if column_exists?(:teams, :reset_password_sent_at)
    remove_column :teams, :remember_created_at if column_exists?(:teams, :remember_created_at)
    remove_index :teams, :email if index_exists?(:teams, :email)
    remove_index :teams, :reset_password_token if index_exists?(:teams, :reset_password_token)
  end
end
