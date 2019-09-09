class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.string :password_digest
    end
  end
end
