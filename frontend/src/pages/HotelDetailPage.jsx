import "../styles/HotelDetailPage.css"
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HotelDetailPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/hotels/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setHotel(data);
      })
      .catch((error) => console.error('Error fetching hotel details:', error));
  }, [id]);

  const handleBackToHome = () => {
    navigate('/'); 
  };

  if (!hotel) {
    return <p>Cargando detalles...</p>;
  }

  return (
    <div className="hotel-detail">
      <button onClick={handleBackToHome} className="back-button">Volver a la página principal</button>
      
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <p><strong>{hotel.city}, {hotel.country}</strong></p>
      <p><strong>Precio por noche:</strong> ${hotel.pricePerNight}</p>

      <div className="hotel-images">
        <h3>Imágenes del Hotel</h3>
        {hotel.images.map((image) => (
          <img key={image.id} src={image.url} alt={image.title} className="hotel-image" />
        ))}
      </div>

      <div className="hotel-info">
        <h3>Información adicional</h3>
        <p><strong>Capacidad:</strong> {hotel.capacity} personas</p>
        <p><strong>Dirección:</strong> {hotel.address}</p>
      </div>
    </div>
  );
};

export default HotelDetailPage;
