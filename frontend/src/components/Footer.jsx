import React from 'react';
import { FaInstagram, FaFacebookF, FaXTwitter, FaEnvelope, FaPhone } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo96x96.png';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Columna 1: Logo + Descripción */}
        <div className="footer-section">
          <div className="footer-logo-container">
            <img src={logo} alt="Logo NomadaX" className="footer-logo" />
            <span className="footer-title">NomadaX</span>
          </div>
          <p className="footer-description">
            Descubre los mejores alojamientos para tu próxima aventura.
          </p>
        </div>

        {/* Columna 2: Enlaces rápidos */}
        <div className="footer-section">
          <h4>Enlaces rápidos</h4>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/hoteles">Hoteles</Link></li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div className="footer-section">
          <h4>Contacto</h4>
          <ul className="footer-contact">
            <li><FaPhone /> +34 123 456 789</li>
            <li><FaEnvelope /> info@NomadaX.com</li>
          </ul>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaXTwitter /></a>
          </div>
        </div>
      </div>

      <hr className="footer-line" />
      <div className="footer-bottom">
        <p>&copy; 2025 NomadaX. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
