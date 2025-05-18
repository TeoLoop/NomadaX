import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ReservePage.css";
import swal from "sweetalert";
import { saveReservation } from "../services/reservationService";
import { sendMailReservation } from "../services/mailService";

const ReservePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div className="reserve-page">No hay datos de reserva.</div>;
  }

  const { hotel, checkIn, checkOut } = state;

  const user = {
    name: localStorage.getItem("name"),
    lastName: localStorage.getItem("lastName"),
    email: localStorage.getItem("email"),
    id: localStorage.getItem("id")
  };

  const mail = {
    to: user.email,  // ✅ este campo debe llamarse igual que lo que espera el backend
    subject: `Confirmación de Reserva hotel: ${hotel.name}, ${hotel.country} - NomadaX`,
    body: `Gracias por reservar en NomadaX. Tu reserva ha sido confirmada.\nHotel: ${hotel.name}
  Ciudad: ${hotel.city}, ${hotel.country}
  Día de llegada: ${checkIn}
  Día de salida: ${checkOut}
  
  Gracias por elegir NomadaX`
  };

  const handleConfirm = async () => {

    try {
      const reservationData = {
        checkIn,
        checkOut,
        hotelId: hotel.id,
        userId: user.id,
      };
      const response = await saveReservation(reservationData);
      console.log("Reservacion guardada:", response);
      try {
        await sendMailReservation(mail.to, mail.subject, mail.body);
        console.log("Mail enviado correctamente: ");
      } catch (error) {
        console.log(error);
      }
      swal("Reserva Confirmada", "Tu reserva ha sido registrada exitosamente, se envio un mail con los datos correspondientes", "success");
      navigate('/');
    } catch (err) {
      console.log(err);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ratingData = {
        hotelId: hotelId,
        userId: userId,
        rating,
        comment,
      };

      const response = await submitRating(ratingData);
      console.log("Valoración guardada:", response);
      onClose();
    } catch (err) {
      if (err.status === 403) {
        alert("No puedes valorar este hotel porque no tienes una reserva.");
      } else {
        alert("No se pudo realizar la valoración. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className="reserve-page">
      <h2>Confirmar Reserva</h2>

      <section className="info-block">
        <h3>Hotel</h3>
        <p><strong>Nombre:</strong> {hotel.name}</p>
        <p><strong>Ubicación:</strong> {hotel.city}, {hotel.country}</p>
      </section>

      <section className="info-block">
        <h3>Datos del Usuario</h3>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Apellido:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </section>

      <section className="info-block">
        <h3>Fechas Seleccionadas</h3>
        <p><strong>Llegada:</strong> {checkIn}</p>
        <p><strong>Salida:</strong> {checkOut}</p>
      </section>

      <button className="btn-confirm" onClick={handleConfirm}>
        Confirmar Reserva
      </button>
    </div>
  );
};

export default ReservePage;
