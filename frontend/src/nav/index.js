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

const CategoryList = () => (
  <List>
    <ListItem button>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Spam" />
    </ListItem>
  </List>
);

class Nav extends React.Component {
  componentDidMount() {
    getAllCategories().then(categories => console.log(categories));
  }

  render() {
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
          <CategoryList />
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Nav);
