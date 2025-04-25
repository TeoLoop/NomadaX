import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelDetailPage from './pages/HotelDetailPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import { HotelsPage } from './pages/HotelsPage';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotel/:id" element={<HotelDetailPage />} />
          <Route path="/hoteles" element={<HotelsPage />} />
          <Route path="/administracion" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
