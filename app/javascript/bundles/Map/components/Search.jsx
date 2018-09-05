import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

var searchStyle = {

  boxSizing: "border-box",
  width: "200px",
  height: "30px",
  padding: "0 20px",
  outline: "none",
  fontSize: "18px",
  borderRadius: "50px",
  color: "#29313a",
  border: "3px solid blue",
  transition: "all 0.8s ease",
  marginTop: "60px",
}

var radioStyle = {

}

var center = {
  textAlign: "center"
}
export default class Search extends Component {


  render(){
    return(
      <div style={center}>

        <form onSubmit={this.props.mapCenter}>
          <input name="pointA" style={searchStyle} placeholder="Point A" ></input>
          <input name="pointB"  style={searchStyle} placeholder="Point B" ></input>
          <button>Search</button>
        </form>

        <form onSubmit={this.props.pickChoice}>
          <input id="brunch" type="radio" name="activity" value="brunch"
                  checked={this.props.activity=="brunch"}
                  onChange={this.props.updateChoice}/>
          <label htmlFor="brunch" >Brunch</label>
            <input type="radio" name="activity" value="breakfast"
                    checked={this.props.activity=="breakfast"}
                    onChange={this.props.updateChoice}/>
              <label htmlFor="breakfast">Breakfast</label>
                <input type="radio" name="activity" value="beer"
                        checked={this.props.activity=="beer"}
                        onChange={this.props.updateChoice}/>
                <label htmlFor="beer">Beer</label>

          <button>Search</button>
        </form>
      </div>
    )
  }
}

