Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "pages#home"
  
  resources :timesheets
  post "/timesheet-auto-save" => "timesheets#timesheet_auto_save", :as => :timesheet_auto_save
end
