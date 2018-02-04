import { REQUEST_POSTS, RECEIVE_POSTS } from './dashboardActions';

const posts = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        isFetching: true,
        items: [...state.items]
      };
    case RECEIVE_POSTS:
      return {
        isFetching: false,
        items: action.posts
      };
    default:
      return state;
  }
};

export default posts;
