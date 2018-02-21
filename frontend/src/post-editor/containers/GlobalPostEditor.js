import React from 'react';
import PostEditor from '../components/PostEditor';
import { connect } from 'react-redux';
import { GetUUID } from '../../commons/Utils';
import { submitNewPost, submitEditedPost } from '../../post-editor/postEditorActions';
import { postNewPost, putEditedPost } from '../../commons/ReadableAPI';

class GlobalPostEditor extends React.Component {
  handleSubmit = (post, isNewPost) => {
    const { handleClose } = this.props;
    if (isNewPost) {
      const newPost = {
        ...post,
        id: GetUUID(),
        timestamp: Date.now()
      };
      this.submitPost(newPost, true);
    } else {
      this.submitPost({ ...post }, false);
    }
    handleClose();
  };

  submitPost = (post, isNewPost) => {
    const {
      dispatchPostSubmitted,
      dispatchEditedPostSubmitted,
      selectedCategory
    } = this.props;
    if (selectedCategory === 'all' || selectedCategory === post.category) {
      isNewPost
        ? dispatchPostSubmitted(post)
        : dispatchEditedPostSubmitted(post);
    } else {
      isNewPost ? postNewPost(post) : putEditedPost(post);
    }
  };

  onChangeBody = () => {};
  handleChangeCategory = () => {};
  render() {
    const { post, categories, open, handleClose, isNewPost } = this.props;
    return (
      <PostEditor
        post={post}
        categories={categories}
        open={open}
        isNewPost={isNewPost}
        handleClose={handleClose}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchPostSubmitted: post => dispatch(submitNewPost(post)),
  dispatchEditedPostSubmitted: post => dispatch(submitEditedPost(post))
});

const mapStateToProps = ({ categories, selectedCategory }) => ({
  categories: categories.items,
  selectedCategory
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalPostEditor);
