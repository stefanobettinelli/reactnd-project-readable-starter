import {
  getAllPosts,
  getAllPostsByCategory,
  submitVotePost,
  getCommentsForPost
} from '../commons/ReadableAPI';
import { requestPostsByCategory } from '../nav/navActions';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_CHANGE_VOTE = 'REQUEST_CHANGE_VOTE';
export const RECEIVE_CHANGED_VOTE = 'RECEIVE_CHANGED_VOTE';
export const REQUEST_POST_COMMENTS = 'REQUEST_POST_COMMENTS';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';

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

const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments
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
