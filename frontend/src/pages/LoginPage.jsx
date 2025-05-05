import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import Image from "../assets/Logo-text.png";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { login } from "../services/authService";
import { infoOfUser } from "../services/userService";

const Login = () => {
    const navigate = useNavigate(); //Se utiliza para navegar entre las rutas
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch(); //Se utiliza para enviar acciones al store

    const initialForm = {
        email: '',
        password: ''
    }

    const [formState, setFormState] = useState(initialForm);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if(formState.email === '' || formState.password === ''){
            alert("Por favor, ingrese sus datos");
            return;
        }

        try {
            const response = await login(formState); //Se llama a la función login del servicio authService y se guarda en la variable response
           
            const infoUser = await infoOfUser(formState.email);

            dispatch(loginUser({
                name: infoUser.name,
                lastName: infoUser.lastName,
                role: infoUser.role,
                image: infoUser.image
            })); //Se envía la información del usuario al store


            // Se almacena la información del usuario en el localStorage
            localStorage.setItem("name", infoUser.name);
            localStorage.setItem("lastName", infoUser.lastName);
            localStorage.setItem("role", infoUser.role);
            localStorage.setItem("image", infoUser.image);


            // Se almacena el token en el localStorage
            console.log("Login exitoso");
            const token = response.token;
            localStorage.setItem("token", token);
            
            
            console.log("Token y email almacenado en localStorage:");

            navigate("/");

            setFormState(initialForm);
        } catch (error) {
            setError(error.message);
            console.log("Error al iniciar sesión", error);
        }
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
                        {error && <p className="error-message">{error}</p>}
                        <form>
                            <input
                                type="email"
                                placeholder="Email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <div className="pass-input-div">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    value={formState.password}
                                    onChange={handleChange}
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
                                <button type="submit" onClick={HandleSubmit}>Iniciar sesión</button>
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


