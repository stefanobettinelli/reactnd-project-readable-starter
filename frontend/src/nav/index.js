import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import { selectCategory } from './navActions';
import { fetchPostsByCategory } from '../dashboard/dashboardActions';

const drawerWidth = 150;

const styles = theme => ({
  root: {
    position: 'fixed',
    width: drawerWidth
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative'
    }
  }
});

const Nav = ({
  classes,
  type,
  open,
  onClose,
  ModalProps,
  categories,
  selectedCategory,
  selectCategory
}) => (
  <Drawer
    type={type}
    open={open}
    classes={{
      paper: classes.drawerPaper
    }}
    onClose={onClose}
    ModalProps={{
      keepMounted: true // Better open performance on mobile.
    }}
  >
    <div className={classes.root}>
      <div className={classes.drawerHeader}>
        <Typography type="title">Readable</Typography>
      </div>
      <Divider />
      <List>
        <ListItem
          onClick={() => {
            selectedCategory !== 'all' && selectCategory('all');
          }}
          button
        >
          <ListItemText primary="all" />
        </ListItem>
        {categories &&
          categories.length > 0 &&
          categories.map(category => (
            <ListItem
              key={category.name}
              onClick={() => {
                selectedCategory !== category.name &&
                  selectCategory(category.name);
              }}
              button
            >
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
      </List>
    </div>
  </Drawer>
);

const mapStateToProps = ({ selectedCategory }) => ({ selectedCategory });

const mapDispatchToProps = dispatch => ({
  selectCategory: data => {
    dispatch(selectCategory(data));
    dispatch(fetchPostsByCategory(data));
  }
});

const navComponent = withStyles(styles)(Nav);

export default connect(mapStateToProps, mapDispatchToProps)(navComponent);
