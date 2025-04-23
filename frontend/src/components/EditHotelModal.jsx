import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaTimes } from 'react-icons/fa';  // Ícono de la "X" para cerrar

const EditHotelModal = ({ 
  isOpen, 
  onClose, 
  onChange,       
  onSubmit,      
  form,          
  setImages      
}) => {
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
      setImages(prev => [...prev, ...filesWithPreview]); // Añadir nuevas imágenes a las anteriores
    }
  });

  // Cierra el modal si se presiona la tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Asegura que rating quede entre 1 y 5
  const handleRatingChange = (e) => {
    let val = Number(e.target.value);
    if (val < 1) val = 1;
    if (val > 5) val = 5;
    onChange({ ...e, target: { ...e.target, value: val } });
  };

  // Función para manejar la validación antes de enviar
  const handleFormSubmit = () => {
    if (!form.name || !form.city || !form.country || !form.pricePerNight) {
      alert("Por favor, completa los campos obligatorios: nombre, ciudad, país y precio.");
      return;
    }
    onSubmit(); // Envia el formulario
  };

  // Ahora que todos los hooks están definidos, podemos hacer la comprobación condicional
  if (!isOpen) return null;  // Evita renderizar el modal si isOpen es falso

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="close-btn">
          <FaTimes /> {/* Ícono de la "X" */}
        </button>

        <h2>Editar Hotel</h2>

        <input 
          name="name" 
          placeholder="Nombre" 
          value={form.name} 
          onChange={onChange} 
          required
        />
        <input 
          name="city" 
          placeholder="Ciudad" 
          value={form.city} 
          onChange={onChange} 
          required
        />
        <input 
          name="country" 
          placeholder="País" 
          value={form.country} 
          onChange={onChange} 
          required
        />
        <input 
          name="pricePerNight" 
          placeholder="Precio por noche" 
          type="number" 
          value={form.pricePerNight} 
          onChange={onChange} 
          required
        />

        {/* Dropzone para nuevas imágenes */}
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arrastra nuevas imágenes o haz click para seleccionar</p>
        </div>

        {/* Vista previa de todas las imágenes (antiguas + nuevas) */}
        <div className="preview-container">
          {form.images?.map((file, i) => (
            <div key={i} className="image-container">
              <img 
                src={file.preview || file.url} 
                alt={file.title || `preview-${i}`} 
                className="preview-image" 
              />
              {/* Si es una imagen nueva, mostrar un icono de "eliminar" */}
              {!file.url && (
                <button
                  className="delete-image"
                  onClick={() => setImages(prev => prev.filter((_, index) => index !== i))}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>

        <button onClick={handleFormSubmit} className="btn btn-save">
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default EditHotelModal;
