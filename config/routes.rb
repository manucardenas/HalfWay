Rails.application.routes.draw do
  resources :place, only: [:index, :show]
  root 'place#index'
  get 'place/index'
  resources :halfway_points, only: [:create]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
