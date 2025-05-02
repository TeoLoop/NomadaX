import React, { useState, useEffect } from 'react';

const EditHotelModal = ({ isOpen, onClose, onChange, onSubmit, form }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [imageTitle, setImageTitle] = useState("");

  const handleAddImage = () => {
    //preguntso que no esten vacias
    if (!image || !imageTitle) return;

    //creo el objeto
    const nuevaImagen = {
      url: image,
      title: imageTitle
    }

    //agrego sin borrar las anteriores
    onChange({
      target: {
        name: "images",
        value: [...form.images, nuevaImagen]
      }
    })

    //limpio los campos

    setImage("");
    setImageTitle("");
  };

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
        <h2>Editar Hotel</h2>

        <input name="name" placeholder="Nombre" value={form.name || ""} onChange={onChange} />
        <input name="description" placeholder="Descripción" value={form.description || ""} onChange={onChange} />
        <input name="address" placeholder="Dirección" value={form.address || ""} onChange={onChange} />
        <input name="city" placeholder="Ciudad" value={form.city || ""} onChange={onChange} />
        <input name="country" placeholder="País" value={form.country || ""} onChange={onChange} />
        <input name="pricePerNight" placeholder="Precio por noche" type="number" value={form.pricePerNight || ""} onChange={onChange} />
        <input name="capacity" placeholder="Capacidad" type="number" value={form.capacity || ""} onChange={onChange} />
        <select
          name="category"
          value={form.category || ""}
          onChange={onChange}
          className="category-dropdown"
        >
          <option value="" disabled>Selecciona una categoría</option>
          <option value="Hoteles">Hoteles</option>
          <option value="Apartamentos">Apartamentos</option>
          <option value="Casas">Casas</option>
          <option value="Bungalows">Bungalows</option>
          <option value="Lugares de lujo">Lugares de lujo</option>
        </select>
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          placeholder="Valoración (1-5)"
          value={form.rating || ""}
          onChange={onChange}
        />
        <input type='text'
          placeholder='Agregue el Url de la imagen' value={image}
          onChange={(e) => setImage(e.target.value)} />
        <input type='text'
          placeholder='Titulo de la imagen' value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)} />

        <button onClick={handleAddImage} className='add-image'>+ Añadir Imagen</button>

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
