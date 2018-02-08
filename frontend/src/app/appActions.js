import { submitPost } from '../commons/ReadableAPI';

export const OPEN_POST_EDITOR = 'OPEN_POST_EDITOR';
export const CLOSE_POST_EDITOR = 'CLOSE_POST_EDITOR';
export const REQUEST_POST_SUBMISSION = 'REQUEST_POST_SUBMISSION';
export const RECEIVE_POST_SUBMISSION_RESULT = 'RECEIVE_POST_SUBMISSION_RESULT';

export const openPostEditor = post => ({
  type: OPEN_POST_EDITOR,
  post
});

export const closePostEditor = () => ({
  type: CLOSE_POST_EDITOR
});

export const requestPostSubmission = newPost => ({
  type: REQUEST_POST_SUBMISSION,
  newPost
});

export const receivePostSubmissionResult = submittedPost => ({
  type: RECEIVE_POST_SUBMISSION_RESULT,
  submittedPost
});

export const submitNewPost = newPost => dispatch => {
  dispatch(requestPostSubmission(newPost));
  submitPost(newPost).then(newPost =>
    dispatch(receivePostSubmissionResult(newPost))
  );
};
