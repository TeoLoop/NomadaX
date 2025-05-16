const BASE_URL = 'http://localhost:8080/reservations';

const fetchReservations= async (hotelId) =>{
    try {
        const response= await fetch(`${BASE_URL}/user`)
    } catch (error) {
        
    }
}

export const saveReservation = async (reservationData) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });
  
    if (!response.ok) {
      const error = new Error("Error al enviar la reserva");
      error.status = response.status;
      throw error;
    }
  
    return await response.json();
  };