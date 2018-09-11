import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import Search from './Search';
import Menu from '../../Menu/components/Menu';
import Popup from './Popup';

export default class Map extends Component {

  constructor(){
  super();
  this.state = {
    activity: null
  };
  window.map = this;
}

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
        map.flyTo({center: halfWay.geometry.coordinates, zoom: 8});
      });
      if(this.state.activity){ this.pickChoice() }
  }

  updateChoice = (e) => {
    this.setState({
      activity: e.currentTarget.value
    })
  }

  async componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYW5keXdlaXNzMTk4MiIsImEiOiJIeHpkYVBrIn0.3N03oecxx5TaQz7YLg2HqA'
    let { coordinates, geolocate } = this.props;
    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 3000,
      timeout: 27000
    };
    const mapOptions = {
      container: this.mapContainer,
      style: `mapbox://styles/mapbox/streets-v9`,
      zoom: 12,
      center: [-80.2044, 25.8028],
      height: "55vh"
    }

    if ("geolocation" in navigator && geolocate) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          coordinates = [
            position.coords.longitude,
            position.coords.latitude
          ];
        mapOptions.center = coordinates;
        await this.createMap(mapOptions, geolocationOptions)
      },
        async () => { await this.createMap(mapOptions, geolocationOptions) },
        geolocationOptions
      );
    } else {
      await this.createMap(mapOptions, geolocationOptions);
    }
}


//INITIALIZE MAPS
createMap = (mapOptions, geolocationOptions) => {
  this.map = new mapboxgl.Map(mapOptions);
  const map = this.map;
  //CENTERS MAP - REFER TO MAP-OPTIONS
  const { lat, lng } = map.getCenter();

  //APPENDS GEOLOCATOR BUTTON
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: geolocationOptions,
      trackUserLocation: true
    })
  );
  //APPEND EASY ZOOM IN / ZOOM OUT CONTROLS
  map.addControl(
    new mapboxgl.NavigationControl({
      positionOptions: geolocationOptions,
      trackUserLocation: true
    })
  );
  //ON MAP LOAD, ADD ALL PLACE MARKERS FROM .JSON DATA
  map.on('load', (event) => {
    //ADD USER POINTS AS GEOCODED json
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
    // this.pickChoice();

    //AFTER MAP SETTLES, FETCH NEW PLACE
    map.on('moveend', (e) => {
      if(this.state.activity){ this.pickChoice() }
    });
  });
}


  //METHOD THAT MAKES AXIOS REQUEST FOR PLACES.JSON

  pickChoice = (e) => {
    if (e){e.preventDefault();}
    const map = this.map;
    const self = this;
    const { lat, lng } = map.getCenter();
    axios.defaults.headers.common['Accept'] = 'application/json'

    axios.get(`/place?activity=${this.state.activity}`)
     .then((response) => {
       let places = response.data.activities.map((place)=>{
         return place;
       })
       places.forEach((place) =>{
         var elm = document.createElement('div');
         elm.className = "marker"
         //CREATE POPUP
         let popup = new mapboxgl.Popup({offset: 25})
         .setHTML(ReactDOMServer.renderToStaticMarkup(
            <Popup place={place} />
         ))

         let marker = new mapboxgl.Marker(elm)
         .setLngLat({lng: place.longitude, lat: place.latitude})
         .setPopup(popup)
         marker.addTo(map);
       });
     })
  }

  render() {
    const style = {
      marginTop: '2vh',
      width: '100%',
      height: '50vh',
      backgroundColor: 'azure'
    };
    return(
      <Menu>
        <div style={{height:"100vh"}} >
        <Search
          activity={this.state.activity}
          mapCenter={this.mapCenter}
          updateChoice={this.updateChoice}
          pickChoice={this.pickChoice}
          categories={this.props.categories}
        />

          <div style={style} ref={el => this.mapContainer = el}>
          </div>
        </div>
      </Menu>
  );
  }

  componentWillUnmount() {
    this.map.remove();
  }
}
