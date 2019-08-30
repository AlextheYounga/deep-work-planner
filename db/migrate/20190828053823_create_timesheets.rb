class CreateTimesheets < ActiveRecord::Migration[5.2]
  def change
    create_table :timesheets do |t|
      t.string :title
      t.text :body
      t.datetime :time_start
      t.datetime :created_at
      t.integer :user_id
    end
  end
end
