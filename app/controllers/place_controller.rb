class PlaceController < ApplicationController
  def index
  end

  def show
    @activities = Category.find_by(category: params[:category]).places
  end
end
