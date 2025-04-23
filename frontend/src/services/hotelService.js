const BASE_URL = 'http://localhost:8080';

export const fetchHotels = () => {
  return fetch(`${BASE_URL}/hotels`).then(res => res.json());
};

export const addHotel = (hotel) => {
  return fetch(`${BASE_URL}/hotels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hotel),
  }).then(res => res.json());
};

export const deleteHotel = (id) => {
  return fetch(`${BASE_URL}/hotels/${id}`, {
    method: 'DELETE',
  });
};

export const updateHotel = (id, updatedHotel) => {
  return fetch(`${BASE_URL}/hotels/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedHotel),
  }).then(res => res.json());
};
