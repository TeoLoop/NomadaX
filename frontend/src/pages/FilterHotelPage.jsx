import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchHotelSearch } from '../services/hotelService';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import "../styles/HotelsPage.css";
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';

const FilterHotelPage = () => {
    const [hotels, setHotels] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const categories = queryParams.get('categories');
    const checkIn = queryParams.get('checkIn');
    const checkOut = queryParams.get('checkOut');

    const checkInDate = checkIn ? new Date(checkIn) : null;
    const checkOutDate = checkOut ? new Date(checkOut) : null;

    const checkInDateString = checkInDate ? checkInDate.toISOString().split('T')[0] : null;
    const checkOutDateString = checkOutDate ? checkOutDate.toISOString().split('T')[0] : null;

    useEffect(() => {
        setLoading(true);
        fetchHotelSearch(query, categories, checkInDateString, checkOutDateString, page, 10)
            .then(data => {
                setHotels(data.content);
                setTotalPaginas(data.totalPages);
                window.scrollTo(0, 0);
            })
            .catch(error => console.error('Error fetching hotels:', error))
            .finally(() => setLoading(false));
    }, [query, categories, checkInDateString, checkOutDateString, page]);

    const handleViewDetails = (hotelId) => {
        navigate(`/hotel/${hotelId}`);
    };

    return (
        <div className='body-hotels'>
            <SearchBar className="search-bar" />

            {loading ? (
                <div className="spinner-container">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="hotels-grid">
                        {hotels.length > 0 ? (
                            hotels.map((hotel) => (
                                <div key={hotel.id} className="hotel-card">
                                    <img
                                        src={hotel.images?.[0]?.url || 'https://placehold.co/300x200?text=Sin+imagen'}
                                        alt={hotel.name}
                                        className="hotel-image"
                                    />
                                    <div className="hotel-name-rating">
                                        <h3>{hotel.name}</h3>
                                        <div className="hotel-rating">
                                            <FaStar style={{ color: 'rgb(234, 179, 8)', marginRight: '5px' }} /> {hotel.rating}
                                        </div>
                                    </div>
                                    <div className="hotel-location">
                                        <FaMapMarkerAlt className="icon-location" />
                                        {hotel.city}, {hotel.country}
                                    </div>
                                    <p className="description">{hotel.description}</p>
                                    <p className="price">${hotel.pricePerNight}<span className='precio-noche'>/noche</span></p>
                                    <button onClick={() => handleViewDetails(hotel.id)}>Ver detalles</button>
                                </div>
                            ))
                        ) : (
                            <p>No hay hoteles disponibles.</p>
                        )}
                    </div>

                    <div className="pagination">
                        {[...Array(totalPaginas)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`${page === i ? 'active' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default FilterHotelPage;
