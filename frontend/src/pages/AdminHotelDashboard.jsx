import React, { useEffect, useState } from 'react';
import '../styles/AdminDashboard.css';
import { FaEdit, FaTrash, FaPlus, FaStar } from 'react-icons/fa';
import { fetchHotelsAdmin } from '../services/adminService';
import { addHotel, deleteHotel, updateHotel } from '../services/hotelService';
import AddHotelModal from '../components/modals/AddHotelModal';
import EditHotelModal from '../components/modals/EditHotelModal';
import Swal from 'sweetalert2';

const AdminHotelDashboard = () => {

    const [hotels, setHotels] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [form, setForm] = useState({});

    useEffect(() => {
        fetchHotelsAdmin()
            .then(data => setHotels(data));
    }, []);

    const openAddModal = () => {
        setForm({
            name: '', description: '', address: '', city: '', country: '',
            pricePerNight: '', capacity: '', rating: '', images: [], category: [], features: [], contact: ''
        });
        setAddModalOpen(true);
    };

    const openEditModal = (hotel) => {
        setSelectedHotel(hotel);
        setForm(hotel);
        setEditModalOpen(true);
    };

    const handleChange = (e) => {
        if (!e?.target?.name) return;

        const { name, value } = e.target;

        let parsedValue = value;

        if (name === "rating") {
            parsedValue = parseFloat(value.replace(",", "."));
            if (parsedValue < 1) parsedValue = 1;
            if (parsedValue > 5) parsedValue = 5;
        }
        

        if (name === "category") {
            setForm(prev => ({
                ...prev,
                category: value
            }));
        }

        if (name === "features") {
            setForm(prev => ({
                ...prev,
                features: [...prev.features, value] // features es el estado anterior y le quiero sumar el valor del input
            }));
        }

        setForm(prev => ({ ...prev, [name]: parsedValue }));
    };



    const handleAdd = async () => {
        try {
            const newHotel = await addHotel(form);
            if (newHotel && newHotel.id) {
                const updatedHotels = await fetchHotelsAdmin(); // actualiza lista completa
                setHotels(updatedHotels);
                setAddModalOpen(false);
            } else {
                alert("Error al agregar hotel. Intente nuevamente.");
            }

        } catch (error) {

            if (error.message.includes("ya existe")) {
                alert("El nombre del hotel ya existe. Por favor, elige otro.");
            } else {
                alert("Ocurrió un error inesperado. Intente nuevamente.");
            }
        }
    };

    const handleUpdate = async () => {
        const cleanedForm = {
          ...form,
          features: form.features.map(f => ({ id: f.id })) // solo ids
        };
        const updated = await updateHotel(cleanedForm);
        if (!updated) {
          console.log("No se pudo actualizar el hotel");
          return;
        }
      
        const updatedHotels = await fetchHotelsAdmin();
        setHotels(updatedHotels);
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
        <div className="container">

            <div className='admin-panel'>
                <div className="admin-header">
                    <h1>Panel de Administración</h1>
                    <button onClick={openAddModal} className="add-btn">
                        <FaPlus /> Añadir Hotel
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Ubicación</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Valoración</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map((hotel) => (
                            <tr key={hotel.id}>
                                <td>{hotel.id}</td>
                                <td className="hotel-info">
                                    {hotel.images?.[0]?.url && (
                                        <img src={hotel.images[0].url} alt={hotel.name} className="hotel-image" />
                                    )}
                                    <span className="hotel-name-admin">{hotel.name}</span>
                                </td>
                                <td>{hotel.city}, {hotel.country}</td>
                                <td>{hotel.category?.title || 'Sin categoría'}</td>
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

                <AddHotelModal
                    isOpen={isAddModalOpen}
                    onClose={() => setAddModalOpen(false)}
                    onChange={handleChange}
                    onSubmit={handleAdd}
                    form={form}
                />
                <EditHotelModal
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
}

export default AdminHotelDashboard;
