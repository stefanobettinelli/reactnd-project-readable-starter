import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

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

export default CategoryList;
