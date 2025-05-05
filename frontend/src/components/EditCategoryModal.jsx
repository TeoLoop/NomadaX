import React, { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css'; // mismo CSS que usa el modal de hoteles

const EditUserModal = ({ isOpen, onClose, onChange, onSubmit, form }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setModalVisible(true);
    else {
      const timer = setTimeout(() => setModalVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!modalVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Categoria</h2>

        <input
          type="text"
          name="title"
          value={form.title || ''}
          onChange={onChange}
          placeholder="Titulo"
        />
        <input
          type="text"
          name="description"
          value={form.description || ''}
          onChange={onChange}
          placeholder="Descripción"
        />

        <button onClick={onSubmit} className="btn btn-save">Actualizar</button>
        <button onClick={onClose} className="btn btn-cancel">Cancelar</button>
      </div>
    </div>
  );
};

export default EditUserModal;
