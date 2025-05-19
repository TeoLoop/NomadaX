import React, { useEffect, useState } from 'react';
import { infoOfUser, updateUser } from '../services/userService';
import '../styles/ProfilePage.css';
import avatarDefault from '../assets/avatar-deafult.png';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        lastName: '',
        email: '',
        image: '',
        role: ''
    });

    const mail = localStorage.getItem('email');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await infoOfUser(mail);
                setUser(data);
                setFormData({
                    id: data.id,
                    name: data.name || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    image: data.image || '',
                    role: data.role,
                });
            } catch (error) {
                console.error('Error al obtener los datos del perfil:', error);
            }
        };

        fetchUser();
    }, [mail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(formData);
            setUser(formData);
            setEditing(false);
            localStorage.setItem("name", formData.name);
            localStorage.setItem("lastName", formData.lastName);
            localStorage.setItem("email", formData.email);
            localStorage.setItem("image", formData.image);
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };

    if (!user) {
        return <div className="profile-loading">Cargando perfil...</div>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-title">Mi Perfil</h1>

            <div className="profile-card">
                <img
                    src={formData.image || avatarDefault}
                    alt="Foto de perfil"
                    className="profile-image"
                />

                {!editing ? (
                    <div className="profile-info">
                        <h2 className="profile-name">{user.name} {user.lastName}</h2>
                        <p className="profile-email">{user.email}</p>
                        <button className="profile-edit-button" onClick={() => setEditing(true)}>
                            Editar perfil
                        </button>
                    </div>
                ) : (
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Apellido:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Link de imagen de perfil:</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>


                        <div className="form-buttons">
                            <button type="submit" className="profile-save-button">
                                Guardar cambios
                            </button>
                            <button
                                type="button"
                                className="profile-cancel-button"
                                onClick={() => setEditing(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
