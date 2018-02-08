import React from 'react';
import Post from './Post';

const Dashboard = ({ posts, filter }) => {
  const postIds = Object.keys(posts);
  return (
    <div>
      {posts &&
        postIds.map(id => <Post key={id} post={posts[id]} />)}
    </div>
  );
};

export default Dashboard;
