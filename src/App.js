import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import './App.css';
import {SvgIcon, Icon} from "@material-ui/core";

const styles = {
  root: {
    width: '100%',
    maxWidth: 360,
    //backgroundColor: theme.palette.background.paper,
  },
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  }
};

const websites = ["mail.google.com/", "news.google.com/", "www.polygon.com/", "www.slickdeals.net/"];

const getIcon = link => {
  return fetch('https://favicongrabber.com/api/grab/' + link)
    .then(response => response.json())
    .then(response => response.icons[0].src)
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: []
    };
  }

  async componentDidMount() {
    const icons = [];
    await Promise.all(websites.map((value, index) => getIcon(value).then(response => icons.push(response))));
    this.setState({icons});
  }

  render() {
    const { icons } = this.state;
    const { classes } = this.props;;

    return (
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          {websites.map((value, index) => {
            console.log(icons);
            return (
              <ListItem button>
                <ListItemIcon>
                  <Icon classes={{root: classes.iconRoot}}>
                    <img className={classes.imageIcon} src={icons[index]} />
                  </Icon>
                </ListItemIcon>
                <ListItemText primary={value} />
              </ListItem>
            )
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(App);
