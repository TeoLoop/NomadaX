import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelDetailPage from './pages/HotelDetailPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <>
      <Header />
      <Routes>  {/* Usa Routes para gestionar las rutas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
