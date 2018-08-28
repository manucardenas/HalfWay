import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios'
import Search from './Search'

export default class Map extends Component {
  

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5keXdlaXNzMTk4MiIsImEiOiJIeHpkYVBrIn0.3N03oecxx5TaQz7YLg2HqA'
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: `mapbox://styles/mapbox/streets-v9`
    });
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
        <Search  />
      </div>
  );
  }

  componentWillUnmount() {
    this.map.remove();
  }
}
