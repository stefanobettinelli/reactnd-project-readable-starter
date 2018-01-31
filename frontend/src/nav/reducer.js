import { SELECT_CATEGORY } from './actions';

const nav = (state = 'all', action) => {
  switch(action.type) {
    case SELECT_CATEGORY:
      return action.categoryName;
    default:
      return state;
  }
};

export default nav;