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
                <div className="search-container">
                    <SearchBar />
                </div>
            </div>
        </main>
    );
};

export default HomePage;
