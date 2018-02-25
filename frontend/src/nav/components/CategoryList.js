import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router-dom';

const drawerWidth = 150;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
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
    variant="permanent"
    classes={{
      paper: classes.drawerPaper
    }}
  >
    <div>
      <Typography style={{ padding: '17px' }} color="inherit" variant="title" gutterBottom>
        Readable
      </Typography>
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
  </Drawer>
);

export default withStyles(styles)(CategoryList);
