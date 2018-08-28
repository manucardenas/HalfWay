Rails.application.routes.draw do
  resources :place, only: [:index, :show]
  root 'place#index'
  get 'place/index'
  resources :halfway_points, only: [:create]
  get 'place/show'
end
