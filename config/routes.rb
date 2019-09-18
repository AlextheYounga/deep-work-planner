Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "pages#home"
  get "concept", to: "pages#concept"
  get "tutorial", to: "pages#tutorial"

  resources :timesheets, except: [:signup]
  post "/timesheet-auto-save" => "timesheets#create"
end
