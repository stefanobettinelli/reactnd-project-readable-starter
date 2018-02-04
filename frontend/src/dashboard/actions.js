import { getAllPosts } from '../commons/ReadableAPI';

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
