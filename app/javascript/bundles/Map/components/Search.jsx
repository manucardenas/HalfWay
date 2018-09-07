import React, { Component } from 'react';
import Radio from "@material-ui/core/Radio"
import blue from '@material-ui/core/colors/blue'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

var searchStyle = {
  boxSizing: "border-box",
  width: "100%",
  height: "60px",
  padding: "0 20px",
  outline: "none",
  fontSize: "1em",
  borderRadius: "50px",
  color: "#29313a",
  border: "3px solid blue",
  transition: "all 0.8s ease",
  marginTop: "65px",
  marginRight: "3px",

}

var searchStyleB = Object.assign( {}, searchStyle);
searchStyleB.marginTop = "5px";

var buttonStyle = {
  backgroundColor: "blue",
  border: "none",
  color: "white",
  padding: "10px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "1.5em",
  margin: "4px 2px",
  borderRadius: "8px",
  height:  "60px",
  width: "100%",
}

const radioStyles ={
  root: {
    color: blue[600],
    '&$checked': { color: blue[500]}
  },
  checked: {},
  size:{
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize:20,
  }
}

var center = {
  textAlign: "center"
}
class Search extends Component {


  render(){
    const {classes} = this.props;
    return(
      <div style={center}>

        <form onSubmit={this.props.mapCenter}>
          <input name="pointA" style={searchStyle} placeholder="Point A" ></input>
          <input name="pointB"  style={searchStyleB} placeholder="Point B" ></input>
          <Radio id="brunch"
            name="activity" value="brunch"
            checked={this.props.activity=="brunch"}
            onChange={this.props.updateChoice}
            classes={{root: classes.root, checked: classes.checked}}
            />
          <label htmlFor="brunch" >Brunch</label>
          <Radio name="activity"
            value="breakfast"
            checked={this.props.activity=="breakfast"}
            onChange={this.props.updateChoice}
            classes={{root: classes.root, checked: classes.checked}}
            />
          <label htmlFor="breakfast">Breakfast</label>
          <Radio name="activity"
            value="beer"
            checked={this.props.activity=="beer"}
            onChange={this.props.updateChoice}
            classes={{root: classes.root, checked: classes.checked}}
            />
          <label htmlFor="beer">Beer</label>
        <button style={buttonStyle}>Search</button>
        </form>


      </div>
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(radioStyles)(Search);
