import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { IoLogOut, IoSettings, IoPencil, IoPerson } from "react-icons/io5";
import '../styles/Header.css';
import logo from "../assets/Logo96x96.png";
import { isAdmin } from '../services/userService';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const token = localStorage.getItem("token");

  const clickAdmin = async () => {
    const email = localStorage.getItem("email");
    const esAdmin = await isAdmin(email); // espera la respuesta del backend

    if (esAdmin) {
      navigate("/administracion");
    } else {
      alert("No tienes permisos para acceder");
    }
  };

  const userToggle = () => {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }



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
            <li><Link to="#" className="navbar-item" onClick={clickAdmin}>Admin</Link></li>
            {/* Contenedor de Iniciar sesión - Register*/}
            <li>
              {
                token ? (
                  <div className="action">
                    <div className="profile" onClick={userToggle}>
                      <span>IMAGEN DE PERFIL</span>
                    </div>
                    <div className="menu">
                      <h3>NOMBRE USUARIO</h3>
                      <ul>
                        <li>
                          <span className='icon'><IoPerson size={20} /></span><a href="#">Mi perfil</a>
                        </li>
                        <li>
                          <span className='icon'><IoPencil size={20} /></span><a href="#">Editar perfil</a>
                        </li>
                        <li>
                          <span className='icon'><IoSettings size={20} /></span><a href="#">Ajustes</a>
                        </li>
                        <li className='logout'>
                          <span className='icon'><IoLogOut size={20} /></span><a href="#">Cerrar sesión</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <ul>
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
                )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
