import React from 'react';
import DashboardPost from './containers/DashboardPost';

const Dashboard = ({ posts, filter }) => {
  const postIds = Object.keys(posts);
  return (
    <div>
      {posts &&
        postIds
          .filter(id => !posts[id].deleted)
          .map(id => <DashboardPost key={id} post={posts[id]} />)}
    </div>
  );
};

export default Dashboard;
