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
import FilterHotelPage from './pages/FilterHotelPage';
import AdminHotelsDashboard from './pages/AdminHotelDashboard';
import AdminUsersDashboard from './pages/AdminUserDashboard';  
import AdminCategoriesDashboard from './pages/AdminCategoryDashboard';
import AdminFeaturesDashboard from './pages/AdminFeatureDashboard';
import CategoriesPage from './pages/CategoriesPage';
import FavoritesPage from './pages/FavoritesPage';
import ReservePage from './pages/ReservePage';

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
          <Route path="/administracion/caracteristicas" element={<AdminFeaturesDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reservar" element={<ReservePage />} />
          <Route path="/resultados" element={<FilterHotelPage />} />
          <Route path="/categorias/:id" element={<CategoriesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
