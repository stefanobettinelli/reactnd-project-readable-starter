import { selectedCategory, categories } from './nav/reducer';
import dashboardReducer from './dashboard/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  selectedCategory,
  categories,
  dashboardReducer
});
