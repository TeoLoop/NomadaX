import React, { useState, useEffect } from 'react';
import '../../styles/ModalStyle.css';
import { fetchCategories } from '../../services/categoryService';
import { fetchFeatures } from '../../services/featureService';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const EditHotelModal = ({ isOpen, onClose, onChange, onSubmit, form }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [featureIdSelected, setFeatureIdSelected] = useState("");



  useEffect(() => {
    fetchCategories().then(data => setCategories(data));
  }, []);

  useEffect(() => {
    fetchFeatures().then(data => setFeatures(data));
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



  useEffect(() => {
    if (isOpen) setModalVisible(true);
    else {
      const timer = setTimeout(() => setModalVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
        <PhoneInput
          country={'uy'}
          value={form.contact || ""}
          onChange={(value) => onChange({
            target: {
              name: 'contact',
              value: value
            }
          })}
        />
        <input name="capacity" placeholder="Capacidad" type="number" value={form.capacity || ""} onChange={onChange} />
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
            <div key={i} className="feature-item">
              <img
                src={feature.preview || feature.icon}
                alt={feature.name || `preview-${i}`}
                className="preview-icon"
              />
              <button
                onClick={() => onChange({
                  target: {
                    name: "features",
                    value: form.features.filter(f => f.id !== feature.id)
                  }
                })}
                className='remove-feature'
              >
                X
              </button>
            </div>
          ))}
        </div>


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
            <div key={i} className="image-item">
              <img
                src={file.preview || file.url}
                alt={file.title || `preview-${i}`}
                className="preview-image"
              />
              <button
                className="remove-image"
                onClick={() =>
                  onChange({
                    target: {
                      name: "images",
                      value: form.images.filter((_, index) => index !== i)
                    }
                  })
                }
              >
                X
              </button>
            </div>
          ))}
        </div>



        <button onClick={onSubmit} className="btn btn-save">Actualizar</button>
        <button onClick={onClose} className="btn btn-cancel">Cancelar</button>
      </div>
    </div>
  );
};

export default EditHotelModal;
