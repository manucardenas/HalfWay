Rails.application.routes.draw do
  resources :place, only: [:index, :show]
  root 'place#index'
  get 'place/index'
  get 'place/show'
end
