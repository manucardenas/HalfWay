class HalfwayPointsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    point_a = params[:point_a]
    point_b = params[:point_b]
    a_coords = Geocoder.search(point_a).first.coordinates.reverse
    b_coords = Geocoder.search(point_b).first.coordinates.reverse
    halfway = Geocoder::Calculations.geographic_center([a_coords, b_coords])
    points = [
      {
        title: params[:point_a],
        coordinates: a_coords
      },
      {
        title: params[:point_b],
        coordinates: b_coords
      },
      {
        title: "Halfway",
        coordinates: halfway
      }
    ]
    render json:  {
                    type: "FeatureCollection",
                    features: points.map do |point|
                      {
                        type: "Feature",
                        geometry: {
                          type: "Point",
                          coordinates: point[:coordinates]
                        },
                        properties: {
                          title: point[:title]
                        }
                      }
                    end
                  }
  end
end
