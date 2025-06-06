import React, { useEffect, useState } from 'react';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../services/categoryService';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../styles/AdminDashboard.css';
import EditCategoryModal from '../components/modals/EditCategoryModal';
import AddCategoryModal from '../components/modals/AddCategoryModal';
import Swal from 'sweetalert2';

const AdminUsersDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [form, setForm] = useState({
        title: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        setLoading(true);
        fetchCategories()
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const openAddModal = () => {
        setForm({ title: '', description: '', image: '' });
        setAddModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: name === "category" ? { id: parseInt(value) } : value
        }));
    };

    const handleUpdate = async () => {
        const updated = await updateCategory(form);
        if (!updated) {
            console.log("No se pudo actualizar la categoria");
            return;
        }
        const updatedCategories = await fetchCategories();
        setCategories(updatedCategories);
        setEditModalOpen(false);
    };

    const handleAdd = async () => {
        try {
            const newCategory = await addCategory(form);
            if (newCategory && newCategory.id) {
                const updatedCategories = await fetchCategories();
                setCategories(updatedCategories);
                setAddModalOpen(false);
            } else {
                alert("Error al agregar categoria. Intente nuevamente.");
            }
        } catch (error) {
            if (error.message.includes("ya existe")) {
                alert("El nombre de la categoria ya existe. Por favor, elige otro.");
            }
            throw error;
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esta categoria será eliminada permanentemente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await deleteCategory(id);
            setCategories(categories.filter(c => c.id !== id));
            Swal.fire('¡Eliminado!', 'La categoria ha sido eliminada.', 'success');
        }
    };

    const openEditModal = (category) => {
        setSelectedCategory(category);
        setForm(category);
        console.log(category);
        setEditModalOpen(true);
    };

    return (
        <div className="container">
            <div className="admin-panel">
                <div className="admin-header">
                    <h1>Panel de Administración de Categorias</h1>
                    <button onClick={openAddModal} className="add-btn">
                        <FaPlus /> Añadir Categoria
                    </button>
                </div>

                {loading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <p>Cargando categorias...</p>
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imagen</th>
                                <th>Titulo</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>
                                        <img src={category.image} alt={category.title} className="category-image" />
                                    </td>
                                    <td>{category.title}</td>
                                    <td>{category.description}</td>
                                    <td className="actions">
                                        <FaEdit className="icon edit-icon" onClick={() => openEditModal(category)} />
                                        <FaTrash className="icon delete-icon" onClick={() => handleDelete(category.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <AddCategoryModal
                    isOpen={isAddModalOpen}
                    onClose={() => setAddModalOpen(false)}
                    onChange={handleChange}
                    onSubmit={handleAdd}
                    form={form}
                />
                <EditCategoryModal
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
