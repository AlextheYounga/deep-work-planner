class CreateTimesheets < ActiveRecord::Migration[5.2]
  def change
    create_table :timesheets do |t|
      t.string :title, :null => true
      t.text :description, :null => true
      t.integer :timecolumn, :null => true
      t.string :timestart, :null => true
      t.text :taskbody, :null => true
      t.string :timelast, :null => true
      t.references :user, foreign_key: true
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end