import fetch from './index.js';

const getSelf = () => {
  return fetch('/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => response.json());
};

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

const addBalance = (id, balance) => {
  return fetch('/user/' + id + '/balance', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      total: balance
    })
  })
}

export { getAll, create, update, addBalance, getSelf };
