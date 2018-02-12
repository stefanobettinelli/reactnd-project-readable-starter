const url = 'http://localhost:3001';
const headers = { Authorization: 'readable-api-auth' };

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const getAllCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(handleErrors)
    .then(res => res.json())
    .then(data => data.categories)
    .catch(error => console.log(error));

export const getAllPosts = () =>
  fetch(`${url}/posts`, { headers })
    .then(handleErrors)
    .then(res => res.json())
    .catch(error => console.log(error));

export const getAllPostsByCategory = category => {
  if (category === 'all') return getAllPosts();
  else
    return fetch(`${url}/${category}/posts`, { headers })
      .then(handleErrors)
      .then(res => res.json())
      .catch(error => console.log(error));
};

export const postNewPost = post =>
  fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
    .then(handleErrors)
    .then(res => res.json())
    .catch(error => console.log(error));

export const submitVotePost = (voteScore, id) =>
  fetch(`${url}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body:
      voteScore > 0
        ? JSON.stringify({ option: 'upVote' })
        : JSON.stringify({ option: 'downVote' })
  })
    .then(handleErrors)
    .then(res => res.json())
    .catch(error => console.log(error));

export const putEditedPost = post =>
  fetch(`${url}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: post.title, body: post.body })
  })
    .then(handleErrors)
    .then(res => res.json())
    .catch(error => console.log(error));

export const deletePost = post =>
  fetch(`${url}/posts/${post.id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...post, deleted: true })
  })
    .then(handleErrors)
    .then(res => res.json())
    .catch(error => console.log(error));

export const getCommentsForPost = post =>
  fetch(`${url}/posts/${post.id}/comments`, { headers })
    .then(handleErrors)
    .then(res => res.json())
    .catch(error => console.log(error));

// DELETE /posts/:id
// USAGE:
//   Sets the deleted flag for a post to 'true'.
//   Sets the parentDeleted flag for all child comments to 'true'.
