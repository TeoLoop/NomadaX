import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/SearchBar.css';
import { Search } from 'lucide-react';
import { FiCalendar } from 'react-icons/fi';
import { fetchCategories } from '../services/categoryService';
import FilterDropdown from './FilterDropdown';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();



  const startRef = useRef();
  const endRef = useRef();

  useEffect(() => {
    fetchCategories().then(data => setCategories(data));
  }, []);

  const handleCategoryChange = (values) => {
    const categoriesString = values.toString();
    setSelectedCategories(categoriesString);
  };



  const handleSearch = (e) => {
    navigate(`/categorias/${selectedCategories}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="¿A dónde vas?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="date-picker-container">
        {/* Check-in */}
        <div className="custom-picker" onClick={() => startRef.current.setOpen(true)}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="dd/mm/yyyy"
            ref={startRef}
          />
          <FiCalendar className="calendar-icon" />
        </div>

        {/* Check-out */}
        <div className="custom-picker" onClick={() => endRef.current.setOpen(true)}>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            placeholderText="dd/mm/yyyy"
            ref={endRef}
          />
          <FiCalendar className="calendar-icon" />
        </div>
      </div>
      <FilterDropdown 
      categories={categories} 
      onCategoryChange={handleCategoryChange} />

      <button onClick={handleSearch}>
        <Search size={18} className="search-icon" />
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
