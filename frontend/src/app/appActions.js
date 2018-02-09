import { postNewPost, putEditedPost } from '../commons/ReadableAPI';

export const OPEN_POST_EDITOR = 'OPEN_POST_EDITOR';
export const CLOSE_POST_EDITOR = 'CLOSE_POST_EDITOR';
export const REQUEST_POST_SUBMISSION = 'REQUEST_POST_SUBMISSION';
export const RECEIVE_POST_SUBMISSION_RESULT = 'RECEIVE_POST_SUBMISSION_RESULT';
export const REQUEST_EDIT_POST_SUBMISSION = 'REQUEST_EDIT_POST_SUBMISSION';
export const RECEIVE_EDITED_POST_SUBMISSION_RESULT =
  'RECEIVE_EDITED_POST_SUBMISSION_RESULT';

export const openPostEditor = post => ({
  type: OPEN_POST_EDITOR,
  post
});

export const closePostEditor = () => ({
  type: CLOSE_POST_EDITOR
});

export const requestPostSubmission = post => ({
  type: REQUEST_POST_SUBMISSION
});

export const receivePostSubmissionResult = post => ({
  type: RECEIVE_POST_SUBMISSION_RESULT,
  post
});

export const requestEditPostSubmission = post => ({
  type: REQUEST_EDIT_POST_SUBMISSION
});

export const receiveEditPostSubmissionResult = post => ({
  type: RECEIVE_EDITED_POST_SUBMISSION_RESULT,
  post
});

export const submitNewPost = newPost => dispatch => {
  dispatch(requestPostSubmission(newPost));
  postNewPost(newPost).then(post =>
    dispatch(receivePostSubmissionResult(post))
  );
};

export const submitEditedPost = editedPost => dispatch => {
  dispatch(requestEditPostSubmission(editedPost));
  putEditedPost(editedPost).then(post => {
    if (post) 
      return dispatch(receiveEditPostSubmissionResult(post));
  });
};
