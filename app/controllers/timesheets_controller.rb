require 'securerandom'
class TimesheetsController < ApplicationController
  before_action :set_timesheet, only: [:edit, :destroy]
  before_action :restrict, only: [:new, :edit, :index]

def new
  @timesheet = Timesheet.new
  @timesheet.user = User.find(session[:user_id]) if session[:user_id]
  @timesheet.date = Time.now.strftime("%A, %B %d")
  @timesheet.uuid = SecureRandom.uuid
  @timesheet.save!
end

def autosave
  Timesheet.where(uuid: params["uuid"]).update(
    timeblock: params["timeblock"]
  )
end

def edit
end

def index
  @timesheets = Timesheet.order("created_at desc")
end

def destroy
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
