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
import { openPostEditor, submitDeletePost } from '../../app/appActions';

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
      openPostEditor,
      deleteThePost,
      getPostComments,
      comments,
      deletePostComments
    } = this.props;
    const postComments = comments[post.id];
    return (
      <Post
        post={post}
        postComments={postComments}
        updateVoteToPost={updateVoteToPost}
        openPostEditor={openPostEditor}
        deleteThePost={deleteThePost}
        deletePostComments={deletePostComments}
        getPostComments={getPostComments}
        submitComment={this.submitComment}
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
  openPostEditor: post => dispatch(openPostEditor(post)),
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
