import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { getAllCategories } from '../ReadableAPI';
import Drawer from 'material-ui/Drawer';

const drawerWidth = 240;

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100vh',
    },
  }
});

class Nav extends React.Component {
  state = {
    categories: []
  };

  componentDidMount() {
    getAllCategories().then(categories => this.setState({ categories }));
  }

  render() {
    const { categories } = this.state;
    const { classes, type, open, onClose, ModalProps } = this.props;
    return (
      <Drawer
        type={type}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={onClose}
        ModalProps={ModalProps}
      >
        <div>
          <div className={classes.drawerHeader} >
            <Typography type="title">
              Readable
          </Typography>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText primary='all' />
            </ListItem>
            {
              categories.length > 0
              &&
              categories.map(cat => (
                <ListItem key={cat.name} button>
                  <ListItemText primary={cat.name} />
                </ListItem>
              ))
            }
          </List>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Nav);
