import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import Search from './Search';
import Menu from '../../Menu/components/Menu';

export default class Map extends Component {

  state = {activity: null}

  mapCenter = (e) => {
    e.preventDefault();
    const pointA = e.target.elements.pointA.value
    const pointB = e.target.elements.pointB.value
    const map = this.map;
    //post request to show pointA, pointB and Halfway point
    axios.post(`/halfway_points.json`, {point_a: pointA, point_b: pointB})
      .then((response) => {
        const halfWay = response.data.features.find((feature) => {
          return feature.properties.title === "Halfway"
        });
        map.getSource('points').setData(response.data);
        map.flyTo({center: halfWay.geometry.coordinates, zoom: 12});
      });
  }

  updateChoice = (e) => {
    this.setState({
      activity: e.currentTarget.value
    })
  }

 pickChoice = (e)=>{
   e.preventDefault();
   //
   //  console.log(e.target)

   axios.defaults.headers.common['Accept'] = 'application/json'
   axios.get(`/place?activity=${this.state.activity}`)
    .then((response) => {
      response.data.activities.map((place)=>{
        console.log(place.name)
      })
    })

  }
  componentDidMount() {
    //render map
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5keXdlaXNzMTk4MiIsImEiOiJIeHpkYVBrIn0.3N03oecxx5TaQz7YLg2HqA'
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: `mapbox://styles/mapbox/streets-v9`,
      // center: set to current location with params
    });
    const map = this.map;
    //When map loads, add the source from the geojson to show points
    map.on('load', function() {
      map.addSource(
        'points',
        {
            type: 'geojson',
            data: {
                    type: "FeatureCollection",
                    features: []
                  }
        });
      map.addLayer({ id: 'points', type: 'circle', source: 'points'});
      //add navigation controls to top right of map
      map.addControl(new mapboxgl.NavigationControl());
      //allow map to center to user location enter under this line
    })
}

  render() {
    const style = {
      marginTop: '10vh',
      width: '100%',
      height: '500px',
      backgroundColor: 'azure'
    };
    return(
      <Menu>
        <div>
          <div style={style} ref={el => this.mapContainer = el}>
          </div>
          <Search activity={this.state.activity} mapCenter={this.mapCenter} updateChoice={this.updateChoice} pickChoice={this.pickChoice} />
        </div>
      </Menu>
  );
  }

  componentWillUnmount() {
    this.map.remove();
  }
}
