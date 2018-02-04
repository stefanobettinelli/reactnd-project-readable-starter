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

export const submitPost = post =>
  fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(data => console.log(data));
