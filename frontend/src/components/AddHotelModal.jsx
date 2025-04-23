import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaTimes } from 'react-icons/fa';

const AddHotelModal = ({ isOpen, onClose, onChange, onSubmit, form, setImages }) => {
  // Aseguramos que los hooks estén al principio
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          title: file.name
        })
      );
      setImages(filesWithPreview); // Asignamos las imágenes con sus previsualizaciones
    }
  });

  // Ahora que todos los hooks están definidos, podemos hacer la comprobación condicional
  if (!isOpen) return null;

  // Función para manejar la validación del rating (entre 1 y 5)
  const handleRatingChange = (e) => {
    // Limita el valor entre 1 y 5
    const value = Math.min(Math.max(e.target.value, 1), 5);
    onChange({ target: { name: "rating", value: value } }); // Pasa solo el nombre y el valor
  };

  // Validación del formulario antes de enviar
  const handleFormSubmit = () => {
    if (!form.name || !form.city || !form.country || !form.pricePerNight) {
      alert("Por favor, completa los campos obligatorios: nombre, ciudad, país y precio.");
      return;
    }
    onSubmit(); // Envia el formulario
  };

  // Aseguramos que todos los campos tengan un valor inicial
  const safeValue = (field) => (form[field] === undefined || form[field] === null ? "" : form[field]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Cruz de cierre en la parte superior derecha */}
        <button onClick={onClose} className="close-btn">
          <FaTimes /> {/* Ícono de la "X" */}
        </button>

        <h2>Añadir Hotel</h2>

        <input
          name="name"
          placeholder="Nombre"
          value={safeValue('name')}  // Usamos safeValue para asegurar que nunca sea undefined
          onChange={onChange}
          required
        />
        <input
          name="description"
          placeholder="Descripción"
          value={safeValue('description')}
          onChange={onChange}
        />
        <input
          name="address"
          placeholder="Dirección"
          value={safeValue('address')}
          onChange={onChange}
        />
        <input
          name="city"
          placeholder="Ciudad"
          value={safeValue('city')}
          onChange={onChange}
          required
        />
        <input
          name="country"
          placeholder="País"
          value={safeValue('country')}
          onChange={onChange}
          required
        />
        <input
          name="pricePerNight"
          placeholder="Precio por noche"
          type="number"
          value={safeValue('pricePerNight')}
          onChange={onChange}
          required
        />
        <input
          name="capacity"
          placeholder="Capacidad"
          type="number"
          value={safeValue('capacity')}
          onChange={onChange}
        />

        {/* Campo para el rating con validación */}
        <input
          name="rating"
          placeholder="Valoración (1-5)"
          type="number"
          value={safeValue('rating')}
          onChange={handleRatingChange}
          min="1"
          max="5"
        />

        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arrastra tus imágenes aquí o haz click para seleccionar</p>
        </div>

        <div className="preview-container">
          {form.images?.map((file, i) => (
            <img key={i} src={file.preview} alt={`preview-${i}`} className="preview-image" />
          ))}
        </div>

        <button onClick={handleFormSubmit} className="btn btn-save">Guardar</button>
      </div>
    </div>
  );
};

export default AddHotelModal;
