import { selectedCategory, categories } from './nav/reducer';
import posts from './dashboard/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  selectedCategory,
  categories,
  posts
});
