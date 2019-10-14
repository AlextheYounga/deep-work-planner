class CreateTimesheets < ActiveRecord::Migration[5.2]
  def change
    create_table :timesheets do |t|
      t.string :date
      t.string :title, :null => true
      t.json :timeblock
      t.references :user, foreign_key: true
      t.string :uuid
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end