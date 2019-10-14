class Timesheet < ActiveRecord::Base
  belongs_to :user
  validates :user_id, presence: true
  validates :uuid, presence: true, uniqueness: true
end
