import React, { useEffect, useState } from "react";
import { getRatingsByHotel } from "../services/ratingService";
import StarRating from "../components/StarRating";

const HotelRatings = ({ hotelId }) => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const data = await getRatingsByHotel(hotelId);
                setRatings(data);
            } catch (error) {
                console.error("Error al cargar las valoraciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRatings();
    }, [hotelId]);

    if (loading) return <p>Cargando valoraciones...</p>;

    if (ratings.length === 0) return <p>Este hotel aún no tiene valoraciones.</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Valoraciones de clientes</h2>
            {ratings.map((rating) => (
                <div
                    key={rating.id}
                    className="border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">
                            {rating.user?.name + " " || "Usuario "}
                        </span>
                        <span className="text-sm text-gray-500">
                            {new Date(rating.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="flex items-center mb-2">
                        <StarRating value={rating.rating} />
                        <span className="ml-2 text-sm text-gray-600">({rating.rating.toFixed(1)})</span>
                    </div>

                    <p className="text-gray-700">{rating.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default HotelRatings;
