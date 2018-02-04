import { getAllPosts, getAllPostsByCategory } from '../commons/ReadableAPI';
import { requestPostsByCategory } from '../nav/navActions';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

const requestPosts = () => ({
  type: REQUEST_POSTS
});

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPosts = () => dispatch => {
  dispatch(requestPosts());
  return getAllPosts().then(posts => dispatch(receivePosts(posts)));
};

export const fetchPostsByCategory = category => dispatch => {
  dispatch(requestPostsByCategory(category));
  return getAllPostsByCategory(category).then(posts => dispatch(receivePosts(posts)));
};
