import { useState } from "react";
import Select from "react-select";
import { FiChevronDown } from "react-icons/fi";
import "../styles/FiltersDropdown.css";
import { IoFilterSharp } from "react-icons/io5";

function FiltersDropdown({ categories, onCategoryChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);


  const categoryOptions = categories.map((category) => ({
    label: category.title,
    value: category.title,
  }));

  const handleCategorySelect = (selected) => {
    const values = selected.map((item) => item.value);
    console.log("Categorías seleccionadas HIJO:", values);
    setSelectedCategories(values);
    if (onCategoryChange) {
      onCategoryChange(values); 
    }
  };

  return (
    <div className="filters-dropdown">
      <button className="filters-toggle" onClick={() => setIsOpen(!isOpen)}>
      <IoFilterSharp /> <FiChevronDown className="filters-icon" />
      </button>

      {isOpen && (
        <div className="filters-content">
          <div className="filter-group">
            <label>Categorías</label>
            <Select
              options={categoryOptions}
              isMulti
              className="filter-multiselect"
              classNamePrefix="select"
              onChange={handleCategorySelect}
              value={categoryOptions.filter(option =>
                selectedCategories.includes(option.value)
              )}
              placeholder="Selecciona una o más"
            />
          </div>

          <div className="filter-group">
            <label>Precio</label>
            <select className="filter-select">
              <option value="">Cualquier precio</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-200">$101 - $200</option>
              <option value="201+">$201+</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Valoración</label>
            <select className="filter-select">
              <option value="">Cualquier valoración</option>
              <option value="4">4+ estrellas</option>
              <option value="3">3+ estrellas</option>
              <option value="2">2+ estrellas</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltersDropdown;
