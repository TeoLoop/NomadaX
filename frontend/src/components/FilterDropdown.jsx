import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { FiChevronDown } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import "../styles/FiltersDropdown.css";

function FiltersDropdown({ categories, onCategoryChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dropdownRef = useRef(null);

  const categoryOptions = categories.map((category) => ({
    label: category.title,
    value: category.id,
  }));

  const handleCategorySelect = (selected) => {
    const values = selected.map((item) => item.value);
    setSelectedCategories(values);
    if (onCategoryChange) {
      onCategoryChange(values);
    }
  };

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="filters-dropdown" ref={dropdownRef}>
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
        </div>
      )}
    </div>
  );
}

export default FiltersDropdown;
