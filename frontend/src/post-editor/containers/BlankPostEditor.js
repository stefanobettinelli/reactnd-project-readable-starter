import React from 'react';
import PostEditor from '../components/PostEditor';
import { connect } from 'react-redux';

// categories,
// classes,
// open,
// handleClose,
// post,
// onChangeAuthor,
// onChangeBody,
// handleChangeCategory,
// onChangeTitle,
// isNewPost

class BlankPostEditor extends React.Component {
  handleClose = () => {};
  onChangeBody = () => {};
  handleChangeCategory = () => {};
  render() {
    const { categories, open } = this.props;
    return <PostEditor categories={categories} open={open} />;
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: categories.items
});

export default connect(mapStateToProps, null)(BlankPostEditor);
