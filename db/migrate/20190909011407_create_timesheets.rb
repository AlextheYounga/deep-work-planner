class CreateTimesheets < ActiveRecord::Migration[5.2]
  def change
    create_table :timesheets do |t|
      t.string :title
      t.text :description
      t.integer :timecolumn
      t.string :timestart
      t.text :taskbody
      t.string :timelast
      t.datetime :created_at
      t.datetime :updated_at
      t.integer :user_id
    end
  end
end
