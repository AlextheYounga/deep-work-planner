class CreateTimeblocks < ActiveRecord::Migration[5.2]
  def change
    create_table :timeblocks do |t|
      t.integer :timesheet_id
      t.integer :user_id
      t.string :timestart
      t.text :taskbody
      t.string :timelast
    end
  end
end
