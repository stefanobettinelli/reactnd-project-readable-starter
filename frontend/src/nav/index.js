import React from 'react';
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
