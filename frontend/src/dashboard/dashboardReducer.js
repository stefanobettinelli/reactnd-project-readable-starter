import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  RECEIVE_CHANGED_VOTE,
  REQUEST_CHANGE_VOTE
} from './dashboardActions';
import {
  RECEIVE_POST_SUBMISSION_RESULT,
  REQUEST_POST_SUBMISSION,
  REQUEST_EDIT_POST_SUBMISSION,
  RECEIVE_EDITED_POST_SUBMISSION_RESULT
} from '../app/appActions';

const posts = (state = { isFetching: false, items: {} }, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case REQUEST_POST_SUBMISSION:
    case REQUEST_EDIT_POST_SUBMISSION:
    case REQUEST_CHANGE_VOTE:
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
    case RECEIVE_CHANGED_VOTE:
    case RECEIVE_POST_SUBMISSION_RESULT:
    case RECEIVE_EDITED_POST_SUBMISSION_RESULT: {
      return {
        isFetching: false,
        items: {
          ...state.items,
          [action.post.id]: action.post
        }
      };
    }
    default:
      return state;
  }
};

export default posts;
