Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "pages#home"
  get "concept", to: "pages#concept"
  get "tutorial", to: "pages#tutorial"

  resources :users
  get 'signup', to: 'users#signup'
  get 'login', to: 'sessions#login'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  resources :timesheets, except: [:signup, :show]
  post "timesheets/autosave" => "timesheets#autosave"
end
