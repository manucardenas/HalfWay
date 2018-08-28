import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios'

export default class Search extends Component {

  render(){
    return(
      <div >
        <input name="point-a" placeholder="Point A" ></input>
        <input name="point-b" placeholder="Point B" ></input>
        <button>Submit</button>
      </div>
    )
  }
}
