import {
  SELECT_CATEGORY,
  RECEIVE_CATEGORIES,
  REQUEST_CATEGORIES
} from './navActions';

export const selectedCategory = (state = 'all', action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.categoryName;
    default:
      return state;
  }
};

export const categories = (
  state = { isFetching: false, items: [] },
  action
) => {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return {
        isFetching: true,
        item: [...state.items]
      };
    case RECEIVE_CATEGORIES: {
      return {
        isFetching: false,
        items: action.categories
      };
    }
    default:
      return state;
  }
};
