import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelDetailPage from './pages/HotelDetailPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { HotelsPage } from './pages/HotelsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { HotelsCategoryPage } from './pages/HotelsCategoryPage';
import AdminHotelsDashboard from './components/AdminHotelDashboard';
import AdminUsersDashboard from './components/AdminUserDashboard';
import AdminCategoriesDashboard from './components/AdminCategoryDashboard';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotel/:id" element={<HotelDetailPage />} />
          <Route path="/hoteles" element={<HotelsPage />} />
          <Route path="/administracion/hoteles" element={<AdminHotelsDashboard />} />
          <Route path="/administracion/usuarios" element={<AdminUsersDashboard />} />
          <Route path="/administracion/categorias" element={<AdminCategoriesDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/categorias/:category" element={<HotelsCategoryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
