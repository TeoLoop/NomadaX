import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import Image from '../assets/Logo-text.png'
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const RegisterPage = () => {

  const [showPassword, setShowPassword] = useState(false);

  const initialForm = {
    name: '',
    lastname: '',
    email: '',
    password: ''
  }

  const { formState, name, lastname, email, password, onInputChange } = useForm(initialForm)

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(formState)
  }


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
            <form onSubmit={onSubmit}>
              <input type="text"
                placeholder="Nombre"
                id="name"
                name="name"
                value={name}
                onChange={onInputChange}
              />
              <input type="text"
                placeholder="Apellido"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={onInputChange}
              />
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={email}
                onChange={onInputChange}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
                {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}
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
                <button type="submit">Iniciar sesión</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            No tienes una cuenta? <a href="/register">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
