import fetch from '../index.js';

const getVehicles = async () => {
  const res = await fetch('/vehicle', {
    method: 'GET',
  });

  return await res.json();
}

const postVehicle = async (vehicle) => {
    const res = await fetch('/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle)
    });

    return await res.json();
}

export { getVehicles, postVehicle };
