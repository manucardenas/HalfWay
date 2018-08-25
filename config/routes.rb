Rails.application.routes.draw do
  root 'place#index'
  get 'place/index'
  get 'place/show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
