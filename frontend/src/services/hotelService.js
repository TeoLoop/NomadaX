const BASE_URL = 'http://localhost:8080';

//GET HOTELES
export const fetchHotels = () => {
  return fetch(`${BASE_URL}/hotels`).then(res => res.json());
};


//POST PARA HOTEL
export const addHotel = (hotel) => {
  return fetch(`${BASE_URL}/hotels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hotel),
  }).then(res => {
    if(!res.ok){

      if(res.status === 400){
        throw new Error("Nombre del hotel ya existe");
      }else{
        throw new Error('Error al agregar el hotel');
      }
    }
    return res.json();
  })
};

export const deleteHotel = (id) => {
  return fetch(`${BASE_URL}/hotels/${id}`, {
    method: 'DELETE',
  });
};


//PUT PARA ACTUALIZAR HOTEL
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


//GET PARA RECOMENDACIONES
export const fetchRandomHotels = async () => {
    const response = await fetch(`${BASE_URL}/hotels/random`);
    if (!response.ok) {
      throw new Error('Error al obtener hoteles aleatorios');
    }
    return await response.json();
};

//GET PARA PAGINA
export const fetchHotelsPageables = async(page = 0, size = 10) =>{
  const response = await fetch(`${BASE_URL}/hotels/hoteles?page=${page}&size+${size}`);

  if (!response.ok) {
    throw new Error("Error al obtener los hoteles paginados");  
  }

  return await response.json();
}

//GET POR ID
export const fetchById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/hotels/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw error;
  }
};

//GET POR CATEGORIA
export const fetchHotelSearch = async(query, categories, checkIn, checkOut, page = 0, size = 10) => {
  try {
    console.log("categories en el service", categories);
    //imprimo como seria el url
    console.log(`${BASE_URL}/hotels/search?query=${query}${categories ? `&categories=${categories}` : ''}${checkIn ? `&checkIn=${checkIn}` : ''}${checkOut ? `&checkOut=${checkOut}` : ''}&page=${page}&size=${size}`);
    
    const response = await fetch(`${BASE_URL}/hotels/search?${query ? `query=${query}` : ''}${categories ? `&categories=${categories}` : ''}${checkIn ? `&checkIn=${checkIn}` : ''}${checkOut ? `&checkOut=${checkOut}` : ''}&page=${page}&size=${size}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw error;
  }
};
