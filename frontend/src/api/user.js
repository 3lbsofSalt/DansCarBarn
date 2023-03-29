import fetch from './index.js';

const getAll = () => {
  return fetch('/user/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
};

const create = (email, password, role) => {
  return fetch('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      role
    })
  });
};

const update = (id, password, role) => {
  return fetch('/user/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      role
    })
  });
}

export { getAll, create, update };
