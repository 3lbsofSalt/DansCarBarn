import fetch from './index.js';

const login = async (email, password) => {
  const res = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await res.json();
  localStorage.setItem('auth', data.token);

  return data.token;
}

export { login };
