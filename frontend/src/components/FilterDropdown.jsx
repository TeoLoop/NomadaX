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
    value: category.id,
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
        </div>
      )}
    </div>
  );
}

export default FiltersDropdown;
