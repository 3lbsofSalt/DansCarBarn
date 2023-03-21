import fetch from './index.js';

const login = (email, password) => {
  return fetch('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then((response) => response.json())
    .then((res) => {
      localStorage.setItem('auth', res.token);
    });
}

export { login };
