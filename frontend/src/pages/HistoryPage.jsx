import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { fetchReservationByUserId } from '../services/reservationService';
import '../styles/HistoryPage.css';

const HistoryPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (userId) {
      fetchReservationByUserId(userId)
        .then((data) => {
          setReservations(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error al cargar historial', err);
          setLoading(false);
        });
    }
  }, [userId]);

  const handleViewDetails = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="history-container">
      <h2 className="history-title">Historial de Reservaciones</h2>

      {loading ? (
        <p className="loading-text">Cargando historial...</p>
      ) : reservations.length > 0 ? (
        <div className="reservations-grid">
          {reservations.map((reservation) => (
            <div key={reservation.hotelId} className="reservation-card">
              <img
                src={reservation.hotelImage?.url || 'https://placehold.co/300x200?text=Sin+imagen'}
                alt={`Imagen de ${reservation.hotelName}`}
                className="reservation-image"
              />
              <div className="reservation-info">
                <h3 className="hotel-name">{reservation.hotelName}</h3>
                <div className="hotel-location">
                  <FaMapMarkerAlt />
                  <span>{reservation.hotelLocation}</span>
                </div>
                <div className="reservation-dates">
                  <span><strong>Llegada:</strong> {reservation.checkIn}</span>
                  <span><strong>Salida:</strong> {reservation.checkOut}</span>
                </div>
                <button
                  className="view-details-btn"
                  onClick={() => handleViewDetails(reservation.hotelId)}
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-reservations">No tienes reservas realizadas.</p>
      )}
    </div>
  );
};

export default HistoryPage;
