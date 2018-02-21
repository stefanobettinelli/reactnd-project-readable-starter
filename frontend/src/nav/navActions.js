import { getAllCategories } from '../commons/ReadableAPI';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const REQUEST_POSTS_BY_CATEGORY = 'REQUEST_POSTS_BY_CATEGORY';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';

export const selectCategory = categoryName => ({
  type: SELECT_CATEGORY,
  categoryName
});

export const requestPostsByCategory = () => ({
  type: REQUEST_POSTS_BY_CATEGORY
});

// request-receive categories - start
const requestCategories = () => ({
  type: REQUEST_CATEGORIES
});

const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch => {
  dispatch(requestCategories());
  return getAllCategories().then(categories =>
    dispatch(receiveCategories(categories))
  );
};
// request-receive categories - end
