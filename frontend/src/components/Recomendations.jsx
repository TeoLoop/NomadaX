import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Recommendations = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/hotels/random')
      .then((response) => response.json())
      .then((data) => {
        setHotels(data);
      })
      .catch((error) => console.error('Error fetching hotels:', error));
  }, []);

  const handleViewDetails = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="recommendations">
      <h2>Hoteles destacados</h2>
      <div className="recommendation-grid">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.id} className="recommendation-card">
              <img
                src={hotel.images[0].url} // Mostrar la primera imagen del hotel
                alt={hotel.name}
                className="hotel-image"
              />
              <h3>{hotel.name}</h3>
              <p>{hotel.description}</p>
              <p>{hotel.city}, {hotel.country}</p>
              <p>Precio por noche: ${hotel.pricePerNight}</p>
              <button onClick={() => handleViewDetails(hotel.id)}>
                Ver detalles
              </button>
            </div>
          ))
        ) : (
          <p>No hay recomendaciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
