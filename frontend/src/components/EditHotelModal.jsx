import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const EditHotelModal = ({ isOpen, onClose, onChange, onSubmit, form, setImages }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setModalVisible(true);
    else {
      const timer = setTimeout(() => setModalVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  if (!modalVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Hotel</h2>

        <input name="name" placeholder="Nombre" value={form.name || ""} onChange={onChange} />
        <input name="description" placeholder="Descripción" value={form.description || ""} onChange={onChange} />
        <input name="address" placeholder="Dirección" value={form.address || ""} onChange={onChange} />
        <input name="city" placeholder="Ciudad" value={form.city || ""} onChange={onChange} />
        <input name="country" placeholder="País" value={form.country || ""} onChange={onChange} />
        <input name="pricePerNight" placeholder="Precio por noche" type="number" value={form.pricePerNight || ""} onChange={onChange} />
        <input name="capacity" placeholder="Capacidad" type="number" value={form.capacity || ""} onChange={onChange} />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          placeholder="Valoración (1-5)"
          value={form.rating || ""}
          onChange={onChange}
        />



        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arrastra nuevas imágenes o haz click para seleccionar</p>
        </div>

        <div className="preview-container">
          {form.images?.map((file, i) => (
            <img
              key={i}
              src={file.preview || file.url}
              alt={file.title || `preview-${i}`}
              className="preview-image"
            />
          ))}
        </div>

        <button onClick={onSubmit} className="btn btn-save">Actualizar</button>
        <button onClick={onClose} className="btn btn-cancel">Cancelar</button>
      </div>
    </div>
  );
};

export default EditHotelModal;
