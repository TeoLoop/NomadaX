import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import '../styles/Header.css';
import logo from "../assets/Logo96x96.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo + nombre */}
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src={logo} alt="Logo" className="navbar-logo-img" />
            <span className="navbar-logo-text">NomadaX</span>
          </Link>

          {/* Botón de menú hamburguesa*/}
          <div className="navbar-hamburger" onClick={toggleMenu}>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
          </div>

          {/* Menú */}
          <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
            <li><Link to="/" className="navbar-item" onClick={closeMenu}>Inicio</Link></li>
            <li><Link to="/hoteles" className="navbar-item" onClick={closeMenu}>Hoteles</Link></li>
            <li><Link to="/administracion" className="navbar-item" onClick={closeMenu}>Admin</Link></li>

            {/* Contenedor de Iniciar sesión - Register*/}
            <li className="auth-buttons">
              <Link to="/login" className="login-button" onClick={closeMenu}>
                <User size={18} className="login-icon" />
                <span>Iniciar sesión</span>
              </Link>
              <div className="register-message">
                <span>¿No tienes cuenta? <Link to="/register" className="register-link" onClick={closeMenu}>Regístrate aquí</Link></span>
              </div>
            </li>
          </ul>

        </div>
      </nav>
    </header>
  );
}

export default Header;
