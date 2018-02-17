import {
  REQUEST_POST_COMMENTS,
  RECEIVE_POST_COMMENTS,
  REQUEST_SUBMIT_COMMENT,
  RECEIVE_SUBMIT_COMMENT_RESULT,
  REQUEST_DELETE_COMMENT,
  RECEIVE_DELETE_COMMENT_RESULT,
  REQUEST_EDIT_COMMENT,
  RECEIVE_EDIT_COMMENT_RESULT
} from './dashboardActions';

const comments = (state = { isFetching: false, items: {} }, action) => {
  switch (action.type) {
    case REQUEST_SUBMIT_COMMENT:
    case REQUEST_POST_COMMENTS:
    case REQUEST_DELETE_COMMENT:
    case REQUEST_EDIT_COMMENT:
      return {
        isFetching: true,
        ...state
      };
    case RECEIVE_POST_COMMENTS: {
      const { comments } = action;
      if (!comments || comments.length === 0) {
        return {
          isFetching: false,
          ...state
        };
      }
      return {
        isFetching: false,
        items: {
          ...state.items,
          [comments[0].parentId]: comments.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
          }, {})
        }
      };
    }
    case RECEIVE_DELETE_COMMENT_RESULT: {
      const comments = { ...state.items };
      const parentId = action.comment.parentId;
      const commentId = action.comment.id;
      comments[parentId][commentId].deleted = true;
      return {
        isFetching: false,
        items: comments
      };
    }
    case RECEIVE_EDIT_COMMENT_RESULT:
    case RECEIVE_SUBMIT_COMMENT_RESULT:
      return {
        isFetching: false,
        items: {
          ...state.items,
          [action.comment.parentId]: {
            ...state.items[action.comment.parentId],
            [action.comment.id]: action.comment
          }
        }
      };
    default:
      return state;
  }
};

export default comments;
