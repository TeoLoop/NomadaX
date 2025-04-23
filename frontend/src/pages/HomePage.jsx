// src/pages/HomePage.js
import React from 'react';
import '../styles/HomePage.css';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import Recommendations from '../components/Recomendations';


const HomePage = () => {
  return (
    <main className="home-page">
      <div className="hero-section">
        <div className="text-overlay">
          <h1>Encuentra tu alojamiento perfecto</h1>
          <p className="slogan">Descubre los mejores hoteles y reserva tu próxima estancia con StayEase</p>
        </div>
        <div className="search-container">
          <SearchBar />
        </div>
      </div>

      <div className="content-section">
        <Categories/>
        <Recommendations />
      </div>
    </main>
  );
};

export default HomePage;
