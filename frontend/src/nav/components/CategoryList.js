import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router-dom';

const drawerWidth = 150;

const styles = theme => ({
  root: {
    position: 'fixed',    
    width: drawerWidth
  },
  drawerHeader: {
    height: '64px',
    textAlign: 'center'
  },
  drawerPaper: {
    border: '0px',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative'
    }
  }
});

const CategoryList = ({
  classes,
  type,
  open,
  onClose,
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
        <Typography style={{padding: '20px'}} type="title">Readable</Typography>
      </div>
      <Divider />
      <List>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItem
            onClick={() => {
              selectedCategory !== 'all' && selectCategory('all');
            }}
            button
          >
            <ListItemText primary="all" />
          </ListItem>
        </Link>
        {categories &&
          categories.length > 0 &&
          categories.map(category => (
            <Link
              key={category.name}
              to={category.name}
              style={{ textDecoration: 'none' }}
            >
              <ListItem
                onClick={() => {
                  selectedCategory !== category.name &&
                    selectCategory(category.name);
                }}
                button
              >
                <ListItemText primary={category.name} />
              </ListItem>
            </Link>
          ))}
      </List>
    </div>
  </Drawer>
);

export default withStyles(styles)(CategoryList);
