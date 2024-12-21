class RenamePasswordDigestToEncryptedPasswordInTeams < ActiveRecord::Migration[7.1]
  def change
    rename_column :teams, :password_digest, :encrypted_password
  end
end
