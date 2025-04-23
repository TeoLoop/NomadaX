import React, { useEffect, useState } from 'react';
import '../styles/AdminDashboard.css';
import { FaEdit, FaTrash, FaPlus, FaStar } from 'react-icons/fa';  
import { fetchHotels, addHotel, deleteHotel, updateHotel } from '../services/hotelService';
import AddHotelModal from '../components/AddHotelModal';
import EditHotelModal from '../components/EditHotelModal';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
    const [hotels, setHotels] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [form, setForm] = useState({
        name: '', city: '', country: '', pricePerNight: '', rating: '', images: [],
    });

    useEffect(() => {
        fetchHotels().then(setHotels);
    }, []);

    const openAddModal = () => {
        setForm({ name: '', city: '', country: '', pricePerNight: '', rating: '', images: [] });
        setAddModalOpen(true);
    };

    const openEditModal = (hotel) => {
        setSelectedHotel(hotel);
        setForm(hotel);
        setEditModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = async () => {
        // Solo validamos nombre, país y precio
        if (!form.name || !form.country || !form.pricePerNight) {
            alert('Por favor, completa los campos obligatorios: nombre, país y precio.');
            return;
        }
        const newHotel = await addHotel(form);
        setHotels([...hotels, newHotel]);
        setAddModalOpen(false);
    };

    const handleUpdate = async () => {
        // Solo validamos nombre, país y precio
        if (!form.name || !form.country || !form.pricePerNight) {
            alert('Por favor, completa los campos obligatorios: nombre, país y precio.');
            return;
        }
        const updated = await updateHotel(selectedHotel.id, form);
        setHotels(hotels.map(h => h.id === updated.id ? updated : h));
        setEditModalOpen(false);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Este hotel será eliminado permanentemente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
            cancelButtonText: 'Cancelar'
        });
    
        if (result.isConfirmed) {
            await deleteHotel(id);
            setHotels(hotels.filter(h => h.id !== id));
            Swal.fire('¡Eliminado!', 'El hotel ha sido eliminado.', 'success');
        }
    };

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h1>Panel de Administración</h1>
                <button onClick={openAddModal} className="add-btn">
                    <FaPlus /> Añadir Hotel
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Hotel</th>
                        <th>Ubicación</th>
                        <th>Precio</th>
                        <th>Valoración</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.map((hotel) => (
                        <tr key={hotel.id}>
                            <td className="hotel-info">
                                {hotel.images?.[0]?.url && (
                                    <img src={hotel.images[0].url} alt={hotel.name} className="hotel-image" />
                                )}
                                <span className="hotel-name">{hotel.name}</span>
                            </td>
                            <td>{hotel.city}, {hotel.country}</td>
                            <td>${hotel.pricePerNight}</td>
                            <td>
                                <FaStar style={{ color: 'rgb(234, 179, 8)', marginRight: '5px' }} />
                                {hotel.rating}
                            </td>
                            <td className="actions">
                                <FaEdit className="icon edit-icon" onClick={() => openEditModal(hotel)} />
                                <FaTrash className="icon delete-icon" onClick={() => handleDelete(hotel.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modales */}
            <AddHotelModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onChange={handleChange}
                onSubmit={handleAdd}
                form={form}
                setImages={(newImages) => setForm(prev => ({ ...prev, images: newImages }))}
            />
            <EditHotelModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onChange={handleChange}
                onSubmit={handleUpdate}
                form={form}
                setImages={(newImages) => setForm(prev => ({ ...prev, images: newImages }))}
            />
        </div>
    );
};

export default AdminDashboard;
