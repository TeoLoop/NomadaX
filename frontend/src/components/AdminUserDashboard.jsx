// AdminUsersDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/userService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/AdminDashboard.css';
import EditUserModal from '../components/EditUserModal';

const AdminUsersDashboard = () => {
    const [users, setUsers] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [form, setForm] = useState({
        name: '',
        email: '',
        role: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await updateUser(selectedUser.id, form);
            setEditModalOpen(false);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);    
        }
    };

    useEffect(() => {
        fetchUsers().then(data => setUsers(data));   
    }, []);

    const openEditModal = (user) => {
        setSelectedUser(user);
        setForm(user);
        console.log(user);
        setEditModalOpen(true);
    };



    return (
        <div className="admin-panel">
            <div className='admin-header'>
                <h1>Panel de Administración de Usuarios</h1>
            </div>
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
            <EditUserModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onChange={handleChange}
                    onSubmit={handleUpdate}
                    form={form}
                />
        </div>
    );
};

export default AdminUsersDashboard;
