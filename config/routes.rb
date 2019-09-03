Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "pages#home"
  get 'timesheet', to: 'pages#timesheet'
  get 'tutorial', to: 'pages#tutorial'
  
  resources :timesheets
  post "/timesheet-auto-save" => "pages#timesheet_auto_save", :as => :timesheet_auto_save
end
