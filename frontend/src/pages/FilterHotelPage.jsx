import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchHotelsCategory } from '../services/hotelService';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import "../styles/HotelsPage.css"       
import SearchBar from '../components/SearchBar';

const FilterHotelPage = () => {

    const [hotels, setHotels] = useState([]);
    const { category } = useParams();   // esto hace que se pueda acceder a la categoria que se esta buscando
    const navigate = useNavigate();

    useEffect(() => {
        fetchHotelsCategory(category)
            .then(data => {
                console.log(data);
                setHotels(data);
            })
            .catch(error => console.error('Error fetching hotels:', error));
    }, [category]);

    const handleViewDetails = (hotelId) => {
        navigate(`/hotel/${hotelId}`);
    };

    return (
        <div className='body-hotels'>
            <SearchBar className="search-bar" />

            <div className='resultados-busqueda'>
                <h2>{hotels.length} resultados de búsqueda</h2>
            </div>
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

        </div>
    )
}

export default FilterHotelPage;
