import React from 'react';
import DashboardPost from './containers/DashboardPost';

const Dashboard = ({ posts }) => {
  const postIds = Object.keys(posts);
  return (
    <div>
      {posts &&
        postIds
          .filter(id => !posts[id].deleted)
          .map(id => <DashboardPost key={id} post={posts[id]} disableLink={false}/>)}
    </div>
  );
};

export default Dashboard;
