class CreateInformations < ActiveRecord::Migration[7.1]
  def change
    create_table :informations do |t|
      t.string :title
      t.text :content
      t.string :target_audience
      t.datetime :end_date

      t.timestamps
    end
  end
end
