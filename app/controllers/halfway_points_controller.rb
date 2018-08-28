class HalfwayPointsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    point_a = params[:point_a]
    point_b = params[:point_b]
    a_coords = Geocoder.search(point_a).first.coordinates.reverse
    b_coords = Geocoder.search(point_b).first.coordinates.reverse
    halfway = Geocoder::Calculations.geographic_center([a_coords, b_coords])
    render json: {point_a: a_coords, point_b: b_coords, halfway: halfway}
  end
end
