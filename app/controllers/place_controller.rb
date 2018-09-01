class PlaceController < ApplicationController
  def index
    if params['activity']
    @activities = Category.find_by(category: params[:activity]).places
  end
    respond_to do |format|
      format.html
      format.json { render json: {activities: @activities} }
    end
  end

  def show

  end
end
