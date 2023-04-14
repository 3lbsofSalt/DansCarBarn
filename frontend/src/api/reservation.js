import fetch from './';

const getUserReservations = () => {
    return fetch('/reservation/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
};

const setReservationStatus = (reservationId, status) => {
  return fetch(`/reservation/status/${reservationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status
    })
  });
}

export { getUserReservations, setReservationStatus };