import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems} from './tileData';
import Logo from '../../../../assets/images/Logo.png'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'scroll',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});





function ClippedDrawer(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar} style= {{backgroundColor:"#007bff"}}>
        <Toolbar>
          <Typography variant="title" color="inherit" style={{
            fontFamily: 'Baloo Tammudu',
            fontSize: "2em",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            paddingTop: "8px",
            paddingBottom: "2px",
            marginBottom: "-8px"
          }} noWrap>


         <strong>HALF WAY</strong>

         <div><i className="fas fa-map-marker"></i><i className="fas fa-long-arrow-alt-right">
         </i>&nbsp;<i className="fas fa-long-arrow-alt-left"></i><i className="fas fa-map-marker"></i>
         </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >

        <div className={classes.toolbar} />
        <List>{mailFolderListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        {props.children}
      </main>

    </div>
  );
 d}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
