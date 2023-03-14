
const BASE_URL = 'http://localhost:3001';

export default (relUrl, ...params) => {
  if(localStorage.getItem('auth')) {
    params[0].headers['Authorization'] = 'Bearer ' + localStorage.getItem('auth');
  }
  if(relUrl.startsWith('/')) {
    return fetch(BASE_URL + relUrl, ...params);
  } else {
    return fetch(relUrl, ...params);
  }
}
