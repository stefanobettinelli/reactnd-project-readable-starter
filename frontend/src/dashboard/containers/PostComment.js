import React from 'react';
import { connect } from 'react-redux';
import {
  fetchDeleteComment,
  updatePostCommentCounter,
  editComment,
  fetchChangedVoteComment
} from '../dashboardActions';
import Comment from '../components/Comment';

class PostComment extends React.Component {
  render() {
    const { deleteComment, submitEditedComment, comment, updateVoteToComment } = this.props;
    return (
      <Comment
        comment={comment}
        deleteComment={deleteComment}
        submitEditedComment={submitEditedComment}
        onVoteChange={updateVoteToComment}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateVoteToComment: (voteScore, commentId) =>
    dispatch(fetchChangedVoteComment(voteScore, commentId)),
  deleteComment: comment => {
    dispatch(fetchDeleteComment(comment));
    dispatch(updatePostCommentCounter(comment.parentId, -1));
  },
  submitEditedComment: comment => dispatch(editComment(comment))
});

export default connect(null, mapDispatchToProps)(PostComment);
