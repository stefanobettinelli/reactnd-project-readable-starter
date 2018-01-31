const url = 'http://localhost:3001';
const header = { headers: { 'Authorization': 'readable-api-auth' }};

export const getAllCategories = () =>
  fetch(`${url}/categories`, header)
    .then(res => res.json())
    .then(data => data.categories);

export const getAllPosts = () => 
  fetch(`${url}/posts`, header)
    .then(res => res.json())
