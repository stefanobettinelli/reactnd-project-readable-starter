import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import { selectCategory } from './navActions';
import { fetchPostsByCategory } from '../dashboard/dashboardActions';
import CategoryListContainer from './containers/CategoryListContainer';

const Nav = ({
  type,
  open,
  onClose
}) => (
  <CategoryListContainer
    type={type}
    open={open}
    onClose={onClose}
  />
);

export default Nav;
