import React from 'react';
import DashboardPost from './containers/DashboardPost';

class Dashboard extends React.Component {
  state = {
    posts: []
  };

  componentWillReceiveProps(nextProps) {
    const { posts } = nextProps;
    let postList = posts;
    const sortBy = nextProps.sorting.sortBy;
    const sortMethod = nextProps.sorting.sortMethod;

    postList = postList.sort(
      (postA, postB) =>
        sortMethod === 'asc'
          ? postA[sortBy] - postB[sortBy]
          : postB[sortBy] - postA[sortBy]
    );
    this.setState({ posts: postList });
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        {posts &&
          posts.length > 0 &&
          posts
            .filter(post => !post.deleted)
            .map(post => (
              <DashboardPost key={post.id} post={post} disableLink={false} />
            ))}
      </div>
    );
  }
}
export default Dashboard;
