import React from 'react';
import { connect } from 'react-redux';
import { GetUUID } from '../../commons/Utils';
import {
  fetchChangedVotePost,
  fetchPostComments,
  postComment,
  updatePostCommentCounter,
  fetchDeleteComment
} from '../dashboardActions';
import { submitDeletePost } from '../../post-editor/postEditorActions';
import Post from '../components/Post';

class DashboardPost extends React.Component {
  componentDidMount() {
    const { getPostComments, post } = this.props;
    getPostComments(post);
  }

  submitComment = (event, commentAuthor, commentText) => {
    const { post, submitPostCommet, updatePostCommentCount } = this.props;
    if (event.type === 'click' || (event.key === 'Enter' && !event.shiftKey)) {
      event.preventDefault();
      const newComment = {
        id: GetUUID(),
        timestamp: Date.now(),
        body: commentText,
        author: commentAuthor,
        parentId: post.id
      };
      if (commentAuthor && commentText) {
        submitPostCommet(newComment).then(() => {
          this.setState({
            commentAuthor: '',
            commentText: ''
          });
          updatePostCommentCount(post.id, 1);
        });
      }
    }
  };

  render() {
    const {
      post,
      updateVoteToPost,
      deleteThePost,
      getPostComments,
      comments,
      deletePostComments,
      expandComments,
      disableLink
    } = this.props;
    const postComments = comments[post.id];
    return (
      <Post
        post={post}
        postComments={postComments}
        updateVoteToPost={updateVoteToPost}
        deleteThePost={deleteThePost}
        deletePostComments={deletePostComments}
        getPostComments={getPostComments}
        submitComment={this.submitComment}
        expandComments={expandComments} 
        disableLink={disableLink}
      />
    );
  }
}

const mapStateToProps = ({ comments }) => ({
  comments: comments.items
});

const mapDispatchToProps = dispatch => ({
  updateVoteToPost: (voteScore, postId) =>
    dispatch(fetchChangedVotePost(voteScore, postId)),
  deleteThePost: post => dispatch(submitDeletePost(post)),
  getPostComments: post => dispatch(fetchPostComments(post)),
  submitPostCommet: comment => dispatch(postComment(comment)),
  updatePostCommentCount: (postId, val) =>
    dispatch(updatePostCommentCounter(postId, val)),
  deletePostComments: comments =>
    comments.forEach(comment => {
      dispatch(fetchDeleteComment(comment));
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPost);
