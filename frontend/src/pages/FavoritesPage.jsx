import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavoritesByUser, removeFavorite } from '../services/favoriteService';
import { FaStar, FaMapMarkerAlt, FaHeartBroken } from 'react-icons/fa';
import '../styles/FavoritePage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (userId) {
      getFavoritesByUser(userId)
        .then(setFavorites)
        .catch((err) => console.error('Error al cargar favoritos', err));
    }
  }, [userId]);

  const handleRemoveFavorite = async (hotelId) => {
    try {
      await removeFavorite(userId, hotelId);
      setFavorites(prev => prev.filter(hotel => hotel.id !== hotelId));
    } catch (error) {
      console.error('Error al eliminar favorito', error);
    }
  };

  const handleViewDetails = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="body-hotels">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Mis favoritos</h2>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((hotel) => (
            <div key={hotel.id} className="favorite-card">
              <img
                src={hotel.images?.[0]?.url || 'https://placehold.co/300x200?text=Sin+imagen'}
                alt={hotel.name}
                className="favorite-image"
              />
              <div className="favorite-details">
                <h3>{hotel.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaMapMarkerAlt className="icon-location" />
                  <span>{hotel.city}, {hotel.country}</span>
                </div>
                <p className="description">{hotel.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaStar style={{ color: 'rgb(234, 179, 8)' }} /> {hotel.rating}
                </div>
                <p className="price">${hotel.pricePerNight}<span className="precio-noche">/noche</span></p>
                <div className="favorite-actions">
                  <button onClick={() => handleViewDetails(hotel.id)}>Ver detalles</button>
                  <button className="remove-favorite-button" onClick={() => handleRemoveFavorite(hotel.id)}>
                    <FaHeartBroken />
                    Quitar de favoritos
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No tienes hoteles favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
