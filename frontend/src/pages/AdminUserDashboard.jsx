import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUser } from '../services/userService';
import { FaEdit } from 'react-icons/fa';
import '../styles/AdminDashboard.css';
import EditUserModal from '../components/modals/EditUserModal';

const AdminUsersDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [form, setForm] = useState({
        id: '',
        name: '',
        email: '',
        role: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            console.log("Mandando el siguiente usuario a actualizar:", form);
            await updateUser(form);
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
            setEditModalOpen(false);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchUsers()
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const openEditModal = (user) => {
        setSelectedUser(user);
        setForm(user);
        setEditModalOpen(true);
    };

    return (
        <div className="container">
            <div className="admin-panel">
                <div className='admin-header'>
                    <h1>Panel de Administración de Usuarios</h1>
                </div>

                {loading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <p>Cargando usuarios...</p>
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className="actions">
                                        <FaEdit className="icon edit-icon" onClick={() => openEditModal(user)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <EditUserModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onChange={handleChange}
                    onSubmit={handleUpdate}
                    form={form}
                />
            </div>

            <div className="mobile-warning">
                El panel de administración no está disponible en dispositivos móviles. Por favor, accede desde un equipo de escritorio.
            </div>
        </div>
    );
};

export default AdminUsersDashboard;
