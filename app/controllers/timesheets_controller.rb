class TimesheetsController < ApplicationController
  def new
    @timesheet = Timesheet.new
  end
  
  def create
    @timesheet = Timesheet.create(
      timestart: params["time-start"],
      taskbody: params["task-body"],
      timelast: params["time-last"],
      user_id: current_user.id
    )
    @timesheet.save
  end


  private
  # def restrict
  #   if not logged_in?
  #     redirect_to root_path
  #   end
  # end

  def set_timesheet
    @timesheet = Timesheet.find(params[:id])
  end

end
