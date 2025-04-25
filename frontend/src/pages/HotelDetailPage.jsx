import "../styles/HotelDetailPage.css";
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchById } from '../services/hotelService';

const HotelDetailPage = () => {

  const carouselRef = useRef();
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();


  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -600, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 600, behavior: 'smooth' });
  };



  useEffect(() => {

    const getHotelDetails = async () =>{
      const hotelData = await fetchById(id);           //llamo a la funcion
      setHotel(hotelData);
    }

    getHotelDetails(); 
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
      <button onClick={handleBackToHome} className="back-button">
        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span>Regresar</span></button>

      <h1 >{hotel.name}</h1>

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

      {isModalOpen && (
        <div className="modal-gallery" onClick={handleCloseGallery}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseGallery}>✕</button>
            <button className="carousel-button left" onClick={scrollLeft}>‹</button>

            <div className="modal-images" ref={carouselRef}>
              {hotel.images.map((img) => (
                <img key={img.id} src={img.url} alt={img.title} />
              ))}
            </div>

            <button className="carousel-button right" onClick={scrollRight}>›</button>
          </div>
        </div>
      )}


      <div className="container-info">

        <div className="hotel-extra-info">
          <p className="hotel-description">{hotel.description}</p>
          <p className="capacity">Capacidad: Hasta {hotel.capacity} personas</p>
        </div>
        <div className="booking-card">
          <div className="price">${hotel.pricePerNight}<span>/ noche</span></div>

          <div className="date-section">
            <label>Llegada</label>
            <input type="date" />
            <label>Salida</label>
            <input type="date" />
          </div>

          <div className="guests-section">
            <label htmlFor="guests">Huéspedes</label>
            <select id="guests">
              <option>1 huésped</option>
              <option>2 huéspedes</option>
              <option>3 huéspedes</option>
              <option>4 huéspedes</option>
            </select>
          </div>

          <button className="reserve-btn">Reservar</button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;
