import React from 'react';
import {
  fetchAllPosts,
  fetchPostsByCategory
} from '../../dashboard/dashboardActions';
import { connect } from 'react-redux';
import App from '../components/App';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import SinglePostView from '../../dashboard/containers/SinglePostView';

class AppContainer extends React.Component {
  state = {
    posts: [],
    selectedCategory: 'all'
  };

  componentDidMount() {
    const { dispatchGetAllPosts } = this.props;
    dispatchGetAllPosts().then(res => this.setState({ posts: res.posts }));
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatchFetchPostByCategory,
      posts,
      selectedCategory,
      categories
    } = nextProps;

    if (categories.length === 0) return;
    const isValidCategory =
      selectedCategory === 'all' ||
      categories
        .map(category => category.name)
        .filter(name => name === selectedCategory).length === 1;

    if (
      selectedCategory.length > 0 &&
      isValidCategory &&
      this.state.selectedCategory !== selectedCategory
    ) {
      dispatchFetchPostByCategory(selectedCategory).then(() =>
        this.setState({
          selectedCategory          
        })
      );
    }

    this.setState({
      posts: Object.keys(posts.items).map(id => posts.items[id])
    })
  }

  render() {
    const { posts } = this.state;
    const { selectedCategory } = this.props;
    return (
      <div>
        <Route
          exact={selectedCategory === 'all'}
          path={selectedCategory === 'all' ? '/' : `/${selectedCategory}`}
          render={() => {
            return (
              <App
                posts={posts}
                selectedCategory={this.state.selectedCategory}
              />
            );
          }}
        />
        <Route
          exact
          path="/:category/:postId"
          render={({ history, match }) => {
            const postId = match.params.postId;
            return (
              <SinglePostView
                open={true}
                post={posts.filter(post => post.id === postId)[0]}
                history={history}
              />
            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProp = ({ selectedCategory, posts, categories }, ownProps) => {
  //need to use ownProps in order to keep in sync the selected cat. with the current url
  const category =
    ownProps.location.pathname === '/'
      ? 'all'
      : ownProps.location.pathname.slice(1);
  return {
    categories: categories.items,
    selectedCategory: category,
    posts
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchGetAllPosts: () => dispatch(fetchAllPosts()),
  dispatchFetchPostByCategory: category =>
    dispatch(fetchPostsByCategory(category))
});

export default withRouter(
  connect(mapStateToProp, mapDispatchToProps)(AppContainer)
);
