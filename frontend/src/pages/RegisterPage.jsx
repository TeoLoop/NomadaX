import React, { useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm';
import Image from '../assets/Logo-text.png';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import '../styles/RegisterPage.css';
import { register } from '../services/authService';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialForm = {
    name: '',
    lastname: '',
    email: '',
    password: ''
  };

  //Estado para el formulario
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    //Actualizar el estado del formulario
    setForm({...form, [e.target.name]: e.target.value});
  };

  //Funcion para el submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await register(form);
      console.log("Registro existoso");
      console.log(form);
      setForm(initialForm);
    }catch(error){
      console.log('Error al registrar el usuario', error);
    }
  }

  return (
    <div className="register-main">
      <div className="register-left">
        <div className="register-left-container">
          <div className="register-logo"></div>
          <div className="register-center">
            <h2>Registrate</h2>
            <p>Por favor, ingrese sus datos</p>
            <form>
              <input
                type="text"
                placeholder="Nombre"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Apellido"
                id="lastname"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="register-center-buttons">
                <button type="submit" onClick={handleSubmit}>Registrarse</button>
              </div>
            </form>
          </div>

          <p className="register-bottom-p">
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </div>
      </div>

      {/* Ahora la imagen */}
      <div className="register-right">
        <img src={Image} alt="Logo" />
      </div>
    </div>
  );
};

export default RegisterPage;
