const BASE_URL = 'http://localhost:8080/ratings';

export const submitRating = async (ratingData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ratingData),
  });

  if (!response.ok) {
    const error = new Error("Error al enviar la puntuación");
    error.status = response.status;
    throw error;
  }

  return await response.json();
};

  

export const getRatingsByHotel = async (hotelId) => {
  try {
    const response = await fetch(`${BASE_URL}/${hotelId}`);
    if (!response.ok) {
      throw new Error("Error al obtener las puntuaciones");
    }

    return await response.json();
  } catch (error) {
    console.error("getRatingsByHotel error:", error);
    throw error;
  }
};
