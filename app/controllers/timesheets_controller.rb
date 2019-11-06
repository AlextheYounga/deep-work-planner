require 'securerandom'
require 'simple_calendar'
class TimesheetsController < ApplicationController
  before_action :set_timesheet, only: [:edit, :destroy]
  before_action :restrict, only: [:new, :edit, :index]

def new
  today = Time.now.strftime("%A, %B %d")
  @timesheet = Timesheet.new
  @timesheet.user = User.find(session[:user_id]) if session[:user_id]
  @timesheet.date = Time.now.strftime("%A, %B %d")
  @timesheet.uuid = SecureRandom.uuid

  
  if Timesheet.where(:date => today).exists?
    timesheet_today = Timesheet.find_by(date: today)
    redirect_to edit_timesheet_path(timesheet_today)
    flash[:notice] = "Redirected to today's timesheet"
    return false
  end

  if @timesheet.save!
    render "new"
  else
    flash[:notice] = "Failed to create new timesheet"
    raise ActiveRecord::Rollback
  end
end

def autosave
  if (params["timeblock"] != nil)
    Timesheet.where(uuid: params["uuid"], date: params["date"]).update(
      timeblock: params["timeblock"]
    )
  else
    return
  end
end

def edit
end

def index
  @timesheets = Timesheet.order("created_at desc")
end

def destroy
    @timesheet.destroy
    flash[:notice] = "Article was successfully obliterated"
    redirect_to timesheets_path
end


  private
  def restrict
    if not logged_in?
      redirect_to root_path
    end
  end

  def set_timesheet
    @timesheet = Timesheet.find(params[:id])
  end

  def timesheet_params
    params.permit(:date, :uuid, timeblock: [])
  end

end
