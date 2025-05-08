import React, { useState, useEffect } from 'react';
import '../../styles/modalStyle.css';
import { fetchCategories } from '../../services/categoryService';
import { fetchFeatures } from '../../services/featureService';

const AddHotelModal = ({ isOpen, onClose, onChange, onSubmit, form }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [featureIdSelected, setFeatureIdSelected] = useState("");

  useEffect(() => {
    if (isOpen) {
      setModalVisible(true);
    } else {
      const timer = setTimeout(() => setModalVisible(false), 300); // Añadir un pequeño retraso antes de ocultar
      return () => clearTimeout(timer); // Limpiar el timer si el modal se cierra
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("fetching features");
    fetchFeatures().then(data => setFeatures(data));
    console.log(features);
  }, []);

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

  const handleAddFeature = () => {
    if (!featureIdSelected) return;
  
    const selected = features.find(f => f.id === parseInt(featureIdSelected));
    if (!selected) return;
  
    // Evitar duplicados
    const alreadyAdded = form.features.some(f => f.id === selected.id);
    if (alreadyAdded) return;
  
    onChange({
      target: {
        name: "features",
        value: [...form.features, selected]
      }
    });
  
    setFeatureIdSelected("");
  };
  


  const handleRatingChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = 1;
    if (value > 5) value = 5;
    onChange(e, value);
  };

  if (!modalVisible) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Añadir Hotel</h2>

        <input name="name" placeholder="Nombre" value={form.name} onChange={onChange} />
        <input name="description" placeholder="Descripción" value={form.description} onChange={onChange} />
        <input name="address" placeholder="Dirección" value={form.address} onChange={onChange} />
        <input name="city" placeholder="Ciudad" value={form.city} onChange={onChange} />
        <input name="country" placeholder="País" value={form.country} onChange={onChange} />
        <input name="pricePerNight" placeholder="Precio por noche" type="number" value={form.pricePerNight} onChange={onChange} />
        <input name="capacity" placeholder="Capacidad" type="number" value={form.capacity} onChange={onChange} />
        <input name="rating" placeholder="Valoración (1-5)" type="number" value={form.rating} onChange={handleRatingChange} min="1" max="5" />
        <select
          name="category"
          value={form.category?.id || ""}
          onChange={(e) =>
            onChange({
              target: {
                name: "category",
                value: { id: parseInt(e.target.value) }
              }
            })}
          className="category-dropdown"
        >
          <option value="" disabled>Selecciona una categoría</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.title}</option>
          ))}
        </select>
        <select
          name="features"
          value={featureIdSelected}
          onChange={(e) => setFeatureIdSelected(e.target.value)}
          className="feature-dropdown"
        >
          <option value="" disabled>Selecciona una característica</option>
          {features.map(feature => (
            <option key={feature.id} value={feature.id}>{feature.name}</option>
          ))}
        </select>

        <button onClick={handleAddFeature} className='add-feature'>+ Añadir Caracteristica</button>

        <div className="preview-container">
          {form.features?.map((feature, i) => (
            <img
              key={i}
              src={feature.preview || feature.icon}
              alt={feature.name || `preview-${i}`}
              className="preview-image"
            />
          ))}
        </div>




        <input type='text'
          placeholder='Agregue el Url de las imagene' value={image}
          onChange={(e) => setImage(e.target.value)} />
        <input type='text'
          placeholder='Titulo de la imagen' value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)} />

        <button onClick={handleAddImage} className='add-image'>
          + Añadir Imagen</button>
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
