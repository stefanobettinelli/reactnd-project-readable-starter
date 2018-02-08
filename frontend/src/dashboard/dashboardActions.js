import {
  getAllPosts,
  getAllPostsByCategory,
  submitVotePost
} from '../commons/ReadableAPI';
import { requestPostsByCategory } from '../nav/navActions';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_CHANGE_VOTE = 'REQUEST_CHANGE_VOTE';
export const RECEIVE_CHANGED_VOTE = 'RECEIVE_CHANGED_VOTE';

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
