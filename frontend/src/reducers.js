import { selectedCategory, categories } from './nav/navReducer';
import posts from './dashboard/dashboardReducer';
import comments from './dashboard/commentsReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  selectedCategory,
  categories,
  posts,
  comments
});