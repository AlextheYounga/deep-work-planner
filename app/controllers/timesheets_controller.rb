class TimesheetsController < ApplicationController
  def create
    # puts params["time-start"]

    @timesheet = Timesheet.new(
      timestart: params["time-start"],
      taskbody: params["task-body"],
      timelast: params["time-last"]
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
