import {
  getAllPosts,
  getAllPostsByCategory,
  submitVotePost,
  getCommentsForPost,
  addCommentToPost,
  deleteCommentFromPost,
  putEditedComment,
  submitVoteComment
} from '../commons/ReadableAPI';
import { requestPostsByCategory } from '../nav/navActions';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const UPDATE_POST_COMMENT_COUNTER = 'UPDATE_POST_COMMENT_COUNTER';

export const updatePostCommentCounter = (postId, val) => ({
  type: UPDATE_POST_COMMENT_COUNTER,
  postId,
  val
});

// fetch all posts - start
const requestPosts = () => ({
  type: REQUEST_POSTS
});

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchAllPosts = () => dispatch => {
  dispatch(requestPosts());
  return getAllPosts().then(posts => dispatch(receivePosts(posts)));
};
// fetch all posts - end

export const fetchPostsByCategory = category => dispatch => {
  dispatch(requestPostsByCategory());
  return getAllPostsByCategory(category).then(posts =>
    dispatch(receivePosts(posts))
  );
};

// change post vote - start
export const REQUEST_CHANGE_VOTE_TO_POST = 'REQUEST_CHANGE_VOTE_TO_POST';
export const RECEIVE_CHANGE_VOTE_TO_POST_RESULT =
  'RECEIVE_CHANGE_VOTE_TO_POST_RESULT';

const requestVoteChangeToPost = () => ({
  type: REQUEST_CHANGE_VOTE_TO_POST
});

const receiveChangeVoteToPostResult = post => ({
  type: RECEIVE_CHANGE_VOTE_TO_POST_RESULT,
  post
});

export const fetchChangedVotePost = (voteScore, postId) => dispatch => {
  dispatch(requestVoteChangeToPost());
  return submitVotePost(voteScore, postId).then(post =>
    dispatch(receiveChangeVoteToPostResult(post))
  );
};
// change post vote - start

// change comment vote - start
export const REQUEST_CHANGE_VOTE_TO_COMMENT = 'REQUEST_CHANGE_VOTE_TO_COMMENT';
export const RECEIVE_CHANGE_VOTE_TO_COMMENT_RESULT =
  'RECEIVE_CHANGE_VOTE_TO_COMMENT_RESULT';

const requestVoteChangeToComment = () => ({
  type: REQUEST_CHANGE_VOTE_TO_COMMENT
});

const receiveChangeVoteToCommentResult = comment => ({
  type: RECEIVE_CHANGE_VOTE_TO_COMMENT_RESULT,
  comment
});

export const fetchChangedVoteComment = (voteScore, commentId) => dispatch => {
  dispatch(requestVoteChangeToComment());
  return submitVoteComment(voteScore, commentId).then(comment =>
    dispatch(receiveChangeVoteToCommentResult(comment))
  );
};
// change comment vote - start

// post comments - start
export const REQUEST_POST_COMMENTS = 'REQUEST_POST_COMMENTS';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';

const requestPostComments = () => ({
  type: REQUEST_POST_COMMENTS
});

const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments
});

export const fetchPostComments = post => dispatch => {
  dispatch(requestPostComments());
  return getCommentsForPost(post).then(comments =>
    dispatch(receivePostComments(comments))
  );
};
// post comments - end

// submit comment - start
export const REQUEST_SUBMIT_COMMENT = 'REQUEST_SUBMIT_COMMENT';
export const RECEIVE_SUBMIT_COMMENT_RESULT = 'RECEIVE_SUBMIT_COMMENT_RESULT';

const requestSubmitComment = () => ({
  type: REQUEST_SUBMIT_COMMENT
});

const receiveSubmitCommentResult = comment => ({
  type: RECEIVE_SUBMIT_COMMENT_RESULT,
  comment
});

export const postComment = comment => dispatch => {
  dispatch(requestSubmitComment());
  return addCommentToPost(comment).then(comment => {
    return dispatch(receiveSubmitCommentResult(comment));
  });
};
// submit comment - end

// Delete comment - start
export const REQUEST_DELETE_COMMENT = 'REQUEST_DELETE_COMMENT';
export const RECEIVE_DELETE_COMMENT_RESULT = 'RECEIVE_DELETE_COMMENT_RESULT';

const requestDeleteComment = () => ({
  type: REQUEST_DELETE_COMMENT
});

const receiveDeleteCommentResult = comment => ({
  type: RECEIVE_DELETE_COMMENT_RESULT,
  comment
});

export const fetchDeleteComment = comment => dispatch => {
  dispatch(requestDeleteComment());
  return deleteCommentFromPost(comment).then(resComment => {
    return dispatch(receiveDeleteCommentResult(resComment));
  });
};
// Delete comment - end

// Edit comment - start
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
// Edit comment - end
