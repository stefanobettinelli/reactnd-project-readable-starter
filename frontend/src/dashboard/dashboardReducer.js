import { REQUEST_POSTS, RECEIVE_POSTS } from './dashboardActions';
import {
  RECEIVE_POST_SUBMISSION_RESULT,
  REQUEST_POST_SUBMISSION
} from '../app/appActions';

const posts = (state = { isFetching: false, items: {} }, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        isFetching: true,
        items: { ...state.items }
      };
    case RECEIVE_POSTS:
      return {
        isFetching: false,
        items: action.posts.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {})
      };
    case REQUEST_POST_SUBMISSION:
      return {
        isFetching: true,
        items: { ...state.items }
      };
    case RECEIVE_POST_SUBMISSION_RESULT: {
      return {
        isFetching: false,
        items: {
          ...state.items,
          [action.submittedPost.id]: action.submittedPost
        }
      };
    }
    default:
      return state;
  }
};

export default posts;
