const url = 'http://localhost:3001';
const headers = { Authorization: 'readable-api-auth' };

export const getAllCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getAllPosts = () =>
  fetch(`${url}/posts`, { headers }).then(res => res.json());

export const getAllPostsByCategory = category => {
  if (category === 'all') return getAllPosts();
  else
    return fetch(`${url}/${category}/posts`, { headers }).then(res =>
      res.json()
    );
};

export const postNewPost = post =>
  fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

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
  }).then(res => res.json());

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

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
