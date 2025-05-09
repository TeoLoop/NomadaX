// AdminUsersDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchFeatures, addFeature, updateFeature, deleteFeature } from '../services/featureService';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../styles/AdminDashboard.css';
import EditFeatureModal from '../components/modals/EditFeatureModal';
import AddFeatureModal from '../components/modals/AddFeatureModal';
import Swal from 'sweetalert2';

const AdminUsersDashboard = () => {
    const [features, setFeatures] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState(null);

    useEffect(() => {
        fetchFeatures().then(data => setFeatures(data));
    }, []);


    const [form, setForm] = useState({
        name: '',
        icon: '',
    });

    const openAddModal = () => {
        setForm({
            name: '', icon: ''
        });
        setAddModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: name === "feature" ? { id: parseInt(value) } : value
        }));
    };

    const handleUpdate = async () => {
        const updated = await updateFeature(form);
        if (!updated) {
            console.log("No se pudo actualizar la categoria");
            return;
        }
        const updatedFeatures = await fetchFeatures();
        setFeatures(updatedFeatures);
        setEditModalOpen(false);
    };

    const handleAdd = async () => {
        try {
            const newFeature = await addFeature(form);
            if (newFeature && newFeature.id) {
                const updatedFeatures = await fetchFeatures(); // actualiza lista completa
                setFeatures(updatedFeatures);
                setAddModalOpen(false);
            } else {
                alert("Error al agregar caracteristica. Intente nuevamente.");
            }

        } catch (error) {

            if (error.message.includes("ya existe")) {
                alert("El nombre de la caracteristica ya existe. Por favor, elige otro.");
            }
            throw error;
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esta caracteristica será eliminada permanentemente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await deleteFeature(id);
            setFeatures(features.filter(f => f.id !== id));
            Swal.fire('¡Eliminado!', 'La caracteristica ha sido eliminada.', 'success');
        }
    };


    const openEditModal = (feature) => {
        setSelectedFeature(feature);
        setForm(feature);
        console.log(feature);
        setEditModalOpen(true);
    };



    return (
        <div className="container">
            <div className="admin-panel">
                <div className='admin-header'>
                    <h1>Panel de Administración de Caracteristicas</h1>
                    <button onClick={openAddModal} className="add-btn">
                        <FaPlus /> Añadir Caracteristica
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Icono</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature) => (
                            <tr key={feature.id}>
                                <td>{feature.id}</td>
                                <td><img src={feature.icon} alt={feature.name} className="feature-image" /></td>
                                <td>{feature.name}</td>
                                <td className="actions">
                                    <FaEdit className="icon edit-icon" onClick={() => openEditModal(feature)} />
                                    <FaTrash className="icon delete-icon" onClick={() => handleDelete(feature.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <AddFeatureModal
                    isOpen={isAddModalOpen}
                    onClose={() => setAddModalOpen(false)}
                    onChange={handleChange}
                    onSubmit={handleAdd}
                    form={form}
                />
                <EditFeatureModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onChange={handleChange}
                    onSubmit={handleUpdate}
                    form={form}
                />
            </div>
            <div className="mobile-warning" >
                El panel de administración no está disponible en dispositivos móviles. Por favor, accede desde un equipo de escritorio.
            </div>
        </div>
    );
};

export default AdminUsersDashboard;



