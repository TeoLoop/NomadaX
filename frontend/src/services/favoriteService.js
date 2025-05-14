const BASE_URL = 'http://localhost:8080/favorites'; // Ajustá si usás una ruta base diferente

export const getFavoritesByUser = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`);
    if (!res.ok) throw new Error('Error al obtener favoritos');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addFavorite = async (userId, hotelId) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, hotelId }),
    });
    if (!res.ok) throw new Error('Error al añadir favorito');
  } catch (error) {
    console.error(error);
  }
};

export const removeFavorite = async (userId, hotelId) => {
  try {
    const url = new URL(`${BASE_URL}`);
    url.searchParams.append('userId', userId);
    url.searchParams.append('hotelId', hotelId);

    const res = await fetch(url, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Error al eliminar favorito');
  } catch (error) {
    console.error(error);
  }
};


export const isHotelFavorite = async (userId, hotelId) => {
  try {
    const res = await fetch(`${BASE_URL}/exists?userId=${userId}&hotelId=${hotelId}`);
    if (!res.ok) throw new Error('Error verificando favorito');
    return await res.json();
  } catch (error) {
    console.error(error);
    return false;
  }
};
