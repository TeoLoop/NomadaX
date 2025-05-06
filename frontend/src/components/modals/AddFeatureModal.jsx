import React, { useState, useEffect } from 'react'; 
import '../../styles/modalStyle.css';
const AddFeatureModal = ({ isOpen, onClose, onChange, onSubmit, form }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setModalVisible(true);
    } else {
      const timer = setTimeout(() => setModalVisible(false), 300); // Añadir un pequeño retraso antes de ocultar
      return () => clearTimeout(timer); // Limpiar el timer si el modal se cierra
    }
  }, [isOpen]);


  if (!modalVisible) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Añadir Caracteristica</h2>

        <input name="name" placeholder="Nombre" value={form.name} onChange={onChange} />
        <input name="icon" placeholder="Icono" value={form.icon} onChange={onChange} />

        <button onClick={onSubmit} className="btn btn-save">
          Guardar
        </button>
        <button onClick={onClose} className="btn btn-cancel">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AddFeatureModal;
