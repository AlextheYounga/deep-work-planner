class Timesheet < ActiveRecord::Base
  belongs_to :user
  has_many :timeblocks
  validates :user_id, presence: true
  validates :uuid, presence: true, uniqueness: true
  validates :date, presence: true, uniqueness: true
end
