import { getAllCategories } from "../commons/ReadableAPI";

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const selectCategory = (categoryName) => ({
  type: SELECT_CATEGORY,
  categoryName
}); 

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES
});

function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export function fetchCategories() {
  return function(dispatch) {
    dispatch(requestCategories());
    return getAllCategories().then(categories => dispatch(receiveCategories(categories)))
  };
}
