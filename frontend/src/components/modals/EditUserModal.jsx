import React, { useState, useEffect } from 'react';
import '../../styles/modalStyle.css';

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
        <h2>Editar Usuario</h2>

        <input
          type="text"
          name="name"
          value={`${form.name || ''} ${form.lastName || ''}`}
          disabled
          placeholder="Nombre completo"
        />
        <input
          type="email"
          name="email"
          value={form.email || ''}
          disabled
          placeholder="Email"
        />
        <select
          name="role"
          value={form.role || ''}
          onChange={onChange}
          className="category-dropdown"
        >
          <option value="" disabled>Selecciona un rol</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>

        <button onClick={onSubmit} className="btn btn-save">Actualizar</button>
        <button onClick={onClose} className="btn btn-cancel">Cancelar</button>
      </div>
    </div>
  );
};

export default EditUserModal;
