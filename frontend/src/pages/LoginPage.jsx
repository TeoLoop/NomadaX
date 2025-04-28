import React, { useEffect, useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import Image from "../assets/Logo-text.png";
import { useForm } from "../hooks/useForm";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const initialForm = {
        email: '',
        password: ''
    }

    const { formState, email, password, onInputChange } = useForm(initialForm)

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
    );
};

export default Login;