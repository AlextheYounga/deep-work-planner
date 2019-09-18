class Timesheet < ActiveRecord::Base
  # belongs_to :user
  validates :timestart, presence: true
end
