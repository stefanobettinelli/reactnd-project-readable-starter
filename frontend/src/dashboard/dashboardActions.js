import {
  getAllPosts,
  getAllPostsByCategory,
  submitVotePost,
  getCommentsForPost,
  addCommentToPost,
  deleteCommentFromPost,
  putEditedComment
} from '../commons/ReadableAPI';
import { requestPostsByCategory } from '../nav/navActions';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_CHANGE_VOTE = 'REQUEST_CHANGE_VOTE';
export const RECEIVE_CHANGED_VOTE = 'RECEIVE_CHANGED_VOTE';
export const REQUEST_POST_COMMENTS = 'REQUEST_POST_COMMENTS';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const REQUEST_SUBMIT_COMMENT = 'REQUEST_SUBMIT_COMMENT';
export const RECEIVE_SUBMIT_COMMENT_RESULT = 'RECEIVE_SUBMIT_COMMENT_RESULT';
export const UPDATE_POST_COMMENT_COUNTER = 'UPDATE_POST_COMMENT_COUNTER';
export const REQUEST_DELETE_COMMENT = 'REQUEST_DELETE_COMMENT';
export const RECEIVE_DELETE_COMMENT_RESULT = 'RECEIVE_DELETE_COMMENT_RESULT';

const requestPosts = () => ({
  type: REQUEST_POSTS
});

const requestVoteChange = () => ({
  type: REQUEST_CHANGE_VOTE
});

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

const receiveChangedVote = post => ({
  type: RECEIVE_CHANGED_VOTE,
  post
});

const requestPostComments = () => ({
  type: REQUEST_POST_COMMENTS
});

const requestDeleteComment = () => ({
  type: REQUEST_DELETE_COMMENT
});

const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments
});

const deleteCommentResult = comment => ({
  type: RECEIVE_DELETE_COMMENT_RESULT,
  comment
});

const requestSubmitComment = () => ({
  type: REQUEST_SUBMIT_COMMENT
});

const receiveSubmitCommentResult = comment => ({
  type: RECEIVE_SUBMIT_COMMENT_RESULT,
  comment
});

export const updatePostCommentCounter = (postId, val) => ({
  type: UPDATE_POST_COMMENT_COUNTER,
  postId,
  val
});

export const fetchPosts = () => dispatch => {
  dispatch(requestPosts());
  return getAllPosts().then(posts => dispatch(receivePosts(posts)));
};

export const fetchPostsByCategory = category => dispatch => {
  dispatch(requestPostsByCategory());
  return getAllPostsByCategory(category).then(posts =>
    dispatch(receivePosts(posts))
  );
};

export const fetchChangedVotePost = (voteScore, postId) => dispatch => {
  dispatch(requestVoteChange());
  return submitVotePost(voteScore, postId).then(post =>
    dispatch(receiveChangedVote(post))
  );
};

export const fetchPostComments = post => dispatch => {
  dispatch(requestPostComments());
  return getCommentsForPost(post).then(comments =>
    dispatch(receivePostComments(comments))
  );
};

export const postComment = comment => dispatch => {
  dispatch(requestSubmitComment());
  return addCommentToPost(comment).then(comment => {
    return dispatch(receiveSubmitCommentResult(comment));
  });
};

export const fetchDeleteComment = comment => dispatch => {
  dispatch(requestDeleteComment());
  return deleteCommentFromPost(comment).then(resComment => {
    return dispatch(deleteCommentResult(resComment));
  });
};

// Edit comment
export const REQUEST_EDIT_COMMENT = 'REQUEST_EDIT_COMMENT';
export const RECEIVE_EDIT_COMMENT_RESULT = 'RECEIVE_EDIT_COMMENT_RESULT';

const requestEditComment = () => ({
  type: REQUEST_EDIT_COMMENT
});

const editCommentResult = comment => ({
  type: RECEIVE_EDIT_COMMENT_RESULT,
  comment
});

export const editComment = comment => dispatch => {
  dispatch(requestEditComment());
  return putEditedComment(comment).then(resComment =>
    dispatch(editCommentResult(resComment))
  );
};
