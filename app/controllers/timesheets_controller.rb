class TimesheetsController < ApplicationController

  def index
    #@timesheets = Timesheet.all
    @timesheets = Timesheet.order("created_at desc")
  end


  def new
    @timesheet = Timesheet.new
  end


  def edit

  end

  def create
    @timesheet = Timesheet.new(timesheet_params)
    @timesheet.user = User.last
    if @timesheet.save
      flash[:notice] = "Article was successfully created"
      redirect_to article_path(@timesheet)
    else
      render 'new'
    end
  end


  def update
    if @timesheet.update(timesheet_params)
      flash[:notice] = "Timesheet was successfully updated"
      # redirect_to index_path(@timesheet)
    else
      render 'edit'
    end
  end


  def show

  end


  def destroy
    @timesheet.destroy
    flash[:notice] = "Article was successfully obliterated"
    redirect_to articles_path
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

  def timesheet_params
    params.require(:timesheet).permit(:timeblock, :timestart, :timelast, :taskbody)
  end
end
