Rails.application.routes.draw do
  resources :place
  root 'place#index'
  get 'place/index'
  resources :halfway_points, only: [:create]
  # get 'place/show'
end
