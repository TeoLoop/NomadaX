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
  console.log("Mandando el siguiente hotel a actualizar:", updatedHotel); 
  console.log("/*******************************/");

  return fetch(`${BASE_URL}/hotels`, {  
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedHotel),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Fallo en actualizar el Hotel');
      }
      return res.json();
    })
    .catch(err => {
      console.error('El error fue:', err);
      return null;
    });
};


export const fetchRandomHotels = async () => {
    const response = await fetch(`${BASE_URL}/hotels/random`);
    if (!response.ok) {
      throw new Error('Error al obtener hoteles aleatorios');
    }
    return await response.json();
};

export const fetchHotelsPageables = async(page = 0, size = 10) =>{
  const response = await fetch(`${BASE_URL}/hotels/hoteles?page=${page}&size+${size}`);

  if (!response.ok) {
    throw new Error("Error al obtener los hoteles paginados");  
  }

  return await response.json();
}