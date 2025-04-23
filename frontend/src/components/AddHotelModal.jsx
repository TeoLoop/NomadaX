import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const AddHotelModal = ({
  isOpen,
  onClose,
  onChange,
  onSubmit,
  form,
  setImages,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setModalVisible(true);
    } else {
      const timer = setTimeout(() => setModalVisible(false), 300); // Añadir un pequeño retraso antes de ocultar
      return () => clearTimeout(timer); // Limpiar el timer si el modal se cierra
    }
  }, [isOpen]);

  // Configuración de react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          title: file.name,
        })
      );
      setImages(filesWithPreview);
    },
  });

  // Función para manejar la validación del rating (entre 1 y 5)
  const handleRatingChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = 1;
    if (value > 5) value = 5;
    onChange(e, value);  // Pasamos el valor validado al onChange
  };

  if (!modalVisible) return null; // Solo renderiza si el modal es visible

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Añadir Hotel</h2>

        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={onChange}
        />
        <input
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={onChange}
        />
        <input
          name="address"
          placeholder="Dirección"
          value={form.address}
          onChange={onChange}
        />
        <input
          name="city"
          placeholder="Ciudad"
          value={form.city}
          onChange={onChange}
        />
        <input
          name="country"
          placeholder="País"
          value={form.country}
          onChange={onChange}
        />
        <input
          name="pricePerNight"
          placeholder="Precio por noche"
          type="number"
          value={form.pricePerNight}
          onChange={onChange}
        />
        <input
          name="capacity"
          placeholder="Capacidad"
          type="number"
          value={form.capacity}
          onChange={onChange}
        />

        {/* Campo para el rating con validación */}
        <input
          name="rating"
          placeholder="Valoración (1-5)"
          type="number"
          value={form.rating}
          onChange={handleRatingChange}
          min="1"
          max="5"
        />

        {/* Dropzone para nuevas imágenes */}
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arrastra tus imágenes aquí o haz click para seleccionar</p>
        </div>

        {/* Vista previa de todas las imágenes (antiguas + nuevas) */}
        <div className="preview-container">
          {form.images?.map((file, i) => (
            <img
              key={i}
              src={file.preview || file.url} // Aseguramos que use el preview o la url
              alt={file.title || `preview-${i}`}
              className="preview-image"
            />
          ))}
        </div>

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

export default AddHotelModal;
