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

export const updateHotel = (updatedHotel) => {
  console.log("Sending the following hotel data:", updatedHotel); 

  return fetch(`${BASE_URL}/hotels`, {  
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedHotel),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update hotel');
      }
      return res.json();
    })
    .catch(err => {
      console.error('Error during the update process:', err);
    });
};


export const fetchRandomHotels = async () => {
    const response = await fetch(`${BASE_URL}/hotels/random`);
    if (!response.ok) {
      throw new Error('Error al obtener hoteles aleatorios');
    }
    return await response.json();
};