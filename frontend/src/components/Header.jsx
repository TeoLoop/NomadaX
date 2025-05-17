import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { IoLogOut, IoPencil, IoPerson, IoChevronDown } from "react-icons/io5";
import { FaHeart, FaHistory  } from "react-icons/fa";
import '../styles/Header.css';
import logo from "../assets/Logo96x96.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import swal from 'sweetalert';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);


  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup al desmontar el componente
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dispatch = useDispatch();

  const name = localStorage.getItem("name");
  const lastName = localStorage.getItem("lastName");
  const image = localStorage.getItem("image");
  const role = localStorage.getItem("role");



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const token = localStorage.getItem("token");

  const clickAdmin = async (path) => {
    console.log("ROL ACTUAL:", role);
    if (role === "ADMIN") {
      navigate(path); // Redirige al área de administración según el enlace
    } else {
      swal ( "Error" ,  "Debes ser Administrador para ingresar a esta seccion!" ,  "error" )
    }
  };


  const userToggle = () => {
    setProfileMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideProfile);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideProfile);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("lastName");
    localStorage.removeItem("role");
    localStorage.removeItem("image");
    localStorage.removeItem("id");
    dispatch(logoutUser());
    navigate("/");
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
            <div className="dropdown">
              <button className="dropdown-btn" onClick={toggleDropdown}>
                Administracion <IoChevronDown />
              </button>
              {dropdownOpen && (
                <div className="dropdown-content" ref={dropdownRef}>
                  <button onClick={() => { clickAdmin("/administracion/hoteles"); closeMenu() }}>Hoteles</button>
                  <button onClick={() => { clickAdmin("/administracion/usuarios"); closeMenu() }}>Usuarios</button>
                  <button onClick={() => { clickAdmin("/administracion/categorias"); closeMenu() }}>Categorías</button>
                  <button onClick={() => { clickAdmin("/administracion/caracteristicas"); closeMenu() }}>Características</button>
                </div>
              )}
            </div>
            {/* Contenedor de Iniciar sesión - Register*/}
            <li>
              {
                token ? (
                  <div className="action" ref={profileRef}>
                    <div className="profile" onClick={userToggle}>
                      <img src={image} alt="Imagen de perfil" className="profile-image" />
                    </div>
                    <div className={`menu ${profileMenuOpen ? 'active' : ''}`}>
                      <h3>{name + " " + lastName}</h3>
                      <ul>
                        <li>
                          <span className='icon'><IoPerson size={20} /></span><a href="#">Mi perfil</a>
                        </li>
                        <li>
                          <span className='icon'><FaHistory size={20} /></span><a href="/historial">Historial de reservas</a>
                        </li>
                        <li className="favorite-icon">
                          <span className='icon'><FaHeart size={20} /></span><Link to="/favoritos" >Favoritos</Link>
                        </li>
                        <li className='logout'>
                          <span className='icon'><IoLogOut size={20} /></span><a onClick={handleLogout}>Cerrar sesión</a>
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
