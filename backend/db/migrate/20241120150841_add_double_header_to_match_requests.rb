class AddDoubleHeaderToMatchRequests < ActiveRecord::Migration[7.1]
  def change
    add_column :match_requests, :double_header, :boolean, null: false, default: false
  end
end
