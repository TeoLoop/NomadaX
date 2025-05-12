import React, { useEffect, useState } from 'react'
import { useNavigate,  useParams } from 'react-router-dom';
import { fetchHotelSearch } from '../services/hotelService';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import "../styles/HotelsPage.css"
import SearchBar from '../components/SearchBar';

const CategoriesPage = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();
    const { id: categoryId } = useParams(); // <-- aquí obtienes el parámetro `:id` de la URL
    const [page, setPage] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);

    useEffect(() => {
        console.log("Fetching hotels with categoryId:", categoryId);
        fetchHotelSearch(null,categoryId, null, null, page, 10)
            .then(data => {
                setHotels(data.content);
                setTotalPaginas(data.totalPages);
                window.scrollTo(0, 0);
            })
            .catch(error => console.error('Error fetching hotels:', error));
    }, [categoryId, page]);


    const handleViewDetails = (hotelId) => {
        navigate(`/hotel/${hotelId}`);
    };

    return (
        <div className='body-hotels'>
            <SearchBar className="search-bar" />
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

        </div>
    )
}

export default CategoriesPage;
