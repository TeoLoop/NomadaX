import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHotels } from '../services/hotelService'; // Asegurate que este servicio trae TODOS los hoteles

const Recommendations = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels()
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10); // 10 hoteles únicos aleatorios
        setHotels(selected);
      })
      .catch((error) => console.error('Error fetching hotels:', error));
  }, []);

  const handleViewDetails = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="recommendations">
      <h2>Hoteles destacados</h2>
      <div className="recommendation-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.id} className="recommendation-card">
              <img
                src={hotel.images?.[0]?.url || 'https://placehold.co/300x200?text=Sin+imagen'}
                alt={hotel.name}
                className="hotel-image"
              />
              <h3>{hotel.name}</h3>
              <p>{hotel.description}</p>
              <p>{hotel.city}, {hotel.country}</p>
              <p>Precio por noche: ${hotel.pricePerNight}</p>
              <button onClick={() => handleViewDetails(hotel.id)}>Ver detalles</button>
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
