import React from 'react';
import { fetchAllPosts } from '../../dashboard/dashboardActions';
import { connect } from 'react-redux';
import App from '../components/App';


class AppContainer extends React.Component {
  state = {
    posts: [],
    selectedCategory: 'all'
  };

  componentDidMount() {
    const { dispatchGetAllPosts } = this.props;
    dispatchGetAllPosts();
  }

  componentWillReceiveProps(nextProps) {
    const { posts, selectedCategory } = nextProps;
    this.setState({
      selectedCategory,
      posts: posts.items
    });
  }

  render() {
    const { posts, selectedCategory } = this.state;
    return (
      <App posts={posts} selectedCategory={selectedCategory} />
    );
  }
}

const mapStateToProp = ({
  selectedCategory,
  posts
}) => ({
  selectedCategory,
  posts
});

const mapDispatchToProps = dispatch => ({
  dispatchGetAllPosts: () => dispatch(fetchAllPosts())
});

export default connect(mapStateToProp, mapDispatchToProps)(AppContainer);
