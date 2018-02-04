import { selectedCategory, categories } from './nav/navReducer';
import posts from './dashboard/dashboardReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  selectedCategory,
  categories,
  posts
});
