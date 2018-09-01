import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export default class Search extends Component {

  render(){
    return(
      <div>
        <form onSubmit={this.props.mapCenter}>
          <input name="pointA" placeholder="Point A" ></input>
          <input name="pointB" placeholder="Point B" ></input>
          <button>Submit</button>
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

          <button>Submit</button>
        </form>
      </div>
    )
  }
}
