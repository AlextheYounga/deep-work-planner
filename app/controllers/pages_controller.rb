require 'json'
class PagesController < ApplicationController
  def home
  end

  def concept
    # @current_time = Time.now.strftime("%I:%M %p")
    # @am_pm = Time.now.strftime("%p").downcase
    @timesheet = Timesheet.new
  end


end
