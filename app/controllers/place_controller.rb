class PlaceController < ApplicationController
  def index
    @categories = Category.pluck(:category)
    if params[:activity].present?
      @activities = Category.find_by(category: params[:activity]).places
    else
      @activities = []
    end
    respond_to do |format|
      format.html
      format.json { render json: {activities: @activities} }
    end
  end

  def show

  end
end
