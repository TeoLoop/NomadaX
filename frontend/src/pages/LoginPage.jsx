import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import Image from "../assets/Logo-text.png";

const Login = () => {
  const [ showPassword, setShowPassword ] = useState(false);
  const [ email, setEmail ] = useState("");

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
          </div>
          <div className="login-center">
            <h2>Bienvenido de nuevo!</h2>
            <p>Por favor, ingrese sus datos</p>
            <form>
              <input type="email" placeholder="Email" />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" />
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Recordarme
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Olvidaste tu contraseña?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="button">Iniciar sesión</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            No tienes una cuenta? <a href="#">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;