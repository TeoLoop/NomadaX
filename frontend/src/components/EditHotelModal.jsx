import React from 'react';
import { useDropzone } from 'react-dropzone';

const EditHotelModal = ({ 
  isOpen, 
  onClose, 
  onChange,       // (e) => { setForm({...}) } 
  onSubmit,      // () => actualizar 
  form,          // { name, description, address, city, country, pricePerNight, capacity, rating, images }
  setImages      // (filesWithPreview) => actualizar form.images
}) => {
  if (!isOpen) return null;

  // Configuración de react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          title: file.name
        })
      );
      setImages(filesWithPreview);
    }
  });

  // Asegura que rating quede entre 1 y 5
  const handleRatingChange = (e) => {
    let val = Number(e.target.value);
    if (val < 1) val = 1;
    if (val > 5) val = 5;
    // simulamos un evento con el valor corregido
    onChange({ ...e, target: { ...e.target, value: val } });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Hotel</h2>

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

        {/* Rating validado */}
        <input
          name="rating"
          placeholder="Valoración (1-5)"
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleRatingChange}
        />

        {/* Dropzone para nuevas imágenes */}
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arrastra nuevas imágenes o haz click para seleccionar</p>
        </div>

        {/* Vista previa de todas las imágenes (antiguas + nuevas) */}
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

        <button onClick={onSubmit} className="btn btn-save">
          Actualizar
        </button>
        <button onClick={onClose} className="btn btn-cancel">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditHotelModal;
