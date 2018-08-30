import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios'
import Search from './Search'

export default class Map extends Component {

  mapCenter = (e) => {
    e.preventDefault();
    const pointA = e.target.elements.pointA.value
    const pointB = e.target.elements.pointB.value
    const map = this.map;
    axios.post(`/halfway_points.json`, {point_a: pointA, point_b: pointB})
      .then((response) => {
        const halfWay = response.data.features.find((feature) => {
          return feature.properties.title === "Halfway"
        });
        map.getSource('points').setData(response.data);
        map.flyTo({center: halfWay.geometry.coordinates});
      });
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5keXdlaXNzMTk4MiIsImEiOiJIeHpkYVBrIn0.3N03oecxx5TaQz7YLg2HqA'
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: `mapbox://styles/mapbox/streets-v9`
    });
    const map = this.map;
    map.on('load', function() {
      map.addSource(
        'points',
        {
            type: 'geojson',
            data: {
                    type: "FeatureCollection",
                    features: []
                  }
        }
      );
      map.addLayer({ id: 'points', type: 'circle', source: 'points'});
    })
  }

  render() {
    const style = {
      width: '80%',
      height: '500px',
      backgroundColor: 'azure'
    };
    return(
      <div>
        <div style={style} ref={el => this.mapContainer = el}>
        </div>
        <Search mapCenter={this.mapCenter} />
      </div>
  );
  }

  componentWillUnmount() {
    this.map.remove();
  }
}
