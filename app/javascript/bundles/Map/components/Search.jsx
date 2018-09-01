import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export default class Search extends Component {

  render(){
    return(
      <form onSubmit={this.props.mapCenter}>
        <input name="pointA" placeholder="Point A" ></input>
        <input name="pointB" placeholder="Point B" ></input>
        <button>Submit</button>
        <button>Brunch</button>
      </form>

    )
  }
}
