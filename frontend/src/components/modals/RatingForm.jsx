import React, { useState } from "react";
import { submitRating } from "../../services/ratingService";
import '../../styles/RatingForm.css'

const RatingForm = ({ hotelId, onClose }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const userId = localStorage.getItem("id");

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
        <div className="rating-form">
            <h3>Valoración</h3>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Puntuación:
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(parseFloat(e.target.value))}
                        min="1"
                        max="5"
                        step="0.1"
                    />

                </label>
                <label>
                    Comentario:
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <button type="submit">Enviar valoración</button>
                <button type="button" className="btn-cancel" onClick={onClose}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default RatingForm;
