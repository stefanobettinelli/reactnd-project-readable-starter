import filter from './nav/reducer';
import dashboardReducer from './dashboard/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  filter,
  dashboardReducer
});
