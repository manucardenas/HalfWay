class PlaceController < ApplicationController
  def index
    p params
    @activities = Category.find_by(category: params[:activity]).places
    respond_to do |format|
      format.html
      format.json { render json: {activities: @activities} }
    end
  end

  def show

  end
end
