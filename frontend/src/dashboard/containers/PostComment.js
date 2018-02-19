import React from 'react';
import { connect } from 'react-redux';
import {
  fetchDeleteComment,
  updatePostCommentCounter,
  editComment
} from '../dashboardActions';
import Comment from '../components/Comment';

class PostComment extends React.Component {
  render() {
    const { deleteComment, submitEditedComment, comment } = this.props;
    return (
      <Comment
        comment={comment}
        deleteComment={deleteComment}
        submitEditedComment={submitEditedComment}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteComment: comment => {
    dispatch(fetchDeleteComment(comment));
    dispatch(updatePostCommentCounter(comment.parentId, -1));
  },
  submitEditedComment: comment => dispatch(editComment(comment))
});

export default connect(null, mapDispatchToProps)(PostComment);
