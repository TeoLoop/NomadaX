import React, { useState, useEffect } from 'react';
import '../../styles/modalStyle.css';

const EditFeatureModal = ({ isOpen, onClose, onChange, onSubmit, form }) => {
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
      <h2>Editar Caracteristica</h2>

      <input
        type="text"
        name="name"
        value={form.name || ''}
        onChange={onChange}
        placeholder="Nombre"
      />
      <input
        type="text"
        name="icon"
        value={form.icon || ''}
        onChange={onChange}
        placeholder="Icono"
      />

      <button onClick={onSubmit} className="btn btn-save">Actualizar</button>
      <button onClick={onClose} className="btn btn-cancel">Cancelar</button>
    </div>
  </div>
);
};

export default EditFeatureModal;
