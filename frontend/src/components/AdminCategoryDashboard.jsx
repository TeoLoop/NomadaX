// AdminUsersDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchCategories, addCategory, updateCategory } from '../services/categoryService';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../styles/AdminDashboard.css';
import EditCategoryModal from './EditCategoryModal';
import AddCategoryModal from './AddCategoryModal';
import Swal from 'sweetalert2';

const AdminUsersDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetchCategories().then(data => setCategories(data));
    }, []);


    const [form, setForm] = useState({
        title: '',
        description: '',
        image: ''
    });

    const openAddModal = () => {
        setForm({
            title: '', description: '', image: ''
        });
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
                const updatedCategories = await fetchCategories(); // actualiza lista completa
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


    const openEditModal = (category) => {
        setSelectedCategory(category);
        setForm(category);
        console.log(category);
        setEditModalOpen(true);
    };



    return (
        <div className="admin-panel">
            <div className='admin-header'>
                <h1>Panel de Administración de Categorias</h1>
                <button onClick={openAddModal} className="add-btn">
                    <FaPlus /> Añadir Categoria
                </button>
            </div>
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
                            <td><img src={category.image} alt={category.title} /></td>
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
    );
};

export default AdminUsersDashboard;



