
require "geocoder"

module Geocoder
  module Calculations
    extend self

    def geographic_center(points)

      # convert objects to [lat,lon] arrays and convert degrees to radians
      coords = points.map{ |p| to_radians(extract_coordinates(p)) }

      # convert to Cartesian coordinates
      x = []; y = []; z = []
      coords.each do |p|
        x << Math.cos(p[0]) * Math.cos(p[1])
        y << Math.cos(p[0]) * Math.sin(p[1])
        z << Math.sin(p[0])
      end

      # compute average coordinate values
      xa, ya, za = [x,y,z].map do |c|
        c.inject(0){ |tot,i| tot += i } / c.size.to_f
      end

      # convert back to latitude/longitude
      lon = Math.atan2(ya, xa)
      hyp = Math.sqrt(xa**2 + ya**2)
      lat = Math.atan2(za, hyp)

      # return answer in degrees
      to_degrees [lat, lon]
    end
  end
end

puts Geocoder::Calculations.geographic_center([[26.1597062, -80.143178], [26.1597118, -80.2089651]])
