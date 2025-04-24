import "../styles/HotelDetailPage.css";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

const HotelDetailPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/hotels/${id}`)
      .then((response) => response.json())
      .then((data) => setHotel(data))
      .catch((error) => console.error('Error fetching hotel details:', error));
  }, [id]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleOpenGallery = () => setIsModalOpen(true);
  const handleCloseGallery = () => setIsModalOpen(false);

  if (!hotel) {
    return <p>Cargando detalles...</p>;
  }

  const imagesToShow = hotel.images.slice(0, 5);
  const extraCount = hotel.images.length - 5;

  return (
    <div className="hotel-detail">
      <button onClick={handleBackToHome} className="back-button"><FaArrowLeftLong /></button>

      <h1>{hotel.name}</h1>

      {/* GALERÍA GRID */}
      <div className="hotel-images-grid">
        {imagesToShow.map((img, index) => (
          <div
            key={img.id}
            className={`grid-item ${index === 0 ? 'large' : index === 1 ? 'medium' : 'small'}`}
            onClick={handleOpenGallery}
          >
            <img src={img.url} alt={img.title} />
            {index === 4 && extraCount > 0 && (
              <div className="image-overlay" onClick={handleOpenGallery}>
                +{extraCount}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL DE TODAS LAS IMÁGENES */}
      {isModalOpen && (
        <div className="modal-gallery" onClick={handleCloseGallery}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseGallery}>✕</button>
            <div className="modal-images">
              {hotel.images.map((img) => (
                <img key={img.id} src={img.url} alt={img.title} />
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="hotel-description">{hotel.description}</p>

      <div className="hotel-extra-info">
        <p><strong>Capacidad:</strong> {hotel.capacity} personas</p>
        <p className="hotel-price"><strong>Precio por noche:</strong> ${hotel.pricePerNight}</p>
      </div>
    </div>
  );
};

export default HotelDetailPage;
