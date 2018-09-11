import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export default class Popup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="popup">
        <img className="popup-image" src={this.props.place.image_url}></img>
        <a className="place-name" href={this.props.place.url} target="_blank">{this.props.place.name}</a>
        <p>{this.props.place.phone}</p>
      </div>
    );
  }
}
