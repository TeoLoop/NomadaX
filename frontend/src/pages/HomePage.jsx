// src/pages/HomePage.js
import React from 'react';
import '../styles/HomePage.css';  // Estilos para la página principal
import SearchBar from '../components/SearchBar';
import Recommendations from '../components/Recomendations';
import Categories from '../components/Categories';

const HomePage = () => {
    return (
        <main className="home-page">
            <div className="hero-section">
                <div className="text-overlay">
                    <h1>Encuentra tu alojamiento perfecto</h1>  {/* Nombre */}
                    <p className="slogan">Descubre los mejores hoteles y reserva tu próxima estancia con StayEase</p>  {/* Lema */}
                </div>
                <div className="search-container">
                    <SearchBar />
                </div>
            </div>
        </main>
    );
};

export default HomePage;
