class PlaceController < ApplicationController
  def index
  end

  def show
    @activities = Category.find_by(category: params[:type]).places
                # .split(",")
    # puts @activity
  end
end
