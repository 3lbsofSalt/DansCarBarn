import fetch from './';

const getUserReservations = () => {
    return fetch('/reservation/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
};

export { getUserReservations };