import {
  REQUEST_POST_COMMENTS,
  RECEIVE_POST_COMMENTS
} from './dashboardActions';

const comments = (state = { isFetching: false, items: {} }, action) => {
  switch (action.type) {
    case REQUEST_POST_COMMENTS:
      return {
        isFetching: true,
        items: { ...state.items }
      };
    case RECEIVE_POST_COMMENTS: {
      console.log(action.comments);
      return {
        isFetching: false
      };
    }

    default:
      return state;
  }
};

export default comments;