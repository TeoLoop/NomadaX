import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/SearchBar.css';
import { Search } from 'lucide-react';
import { FiCalendar } from 'react-icons/fi';
import { fetchCategories } from '../services/categoryService';
import FilterDropdown from './FilterDropdown';
import { useNavigate } from 'react-router-dom';
import { fetchDestinations } from '../services/hotelService';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]); // todas las ciudades o lugares posibles
  const navigate = useNavigate();

  const startRef = useRef();
  const endRef = useRef();

  useEffect(() => {
    fetchCategories().then(data => setCategories(data));
  }, []);

  useEffect(() => {
    fetchDestinations()
      .then(data => setAllSuggestions(data));
  }, [])


  const handleCategoryChange = (values) => {

    const categoriesIds = values;
    console.log("Categorías seleccionadas:", categoriesIds);
    setSelectedCategories(categoriesIds);
  };


  const handleSearch = (e) => {
    const params = new URLSearchParams();

    console.log("las categorias seleccionadas dsp son: ", selectedCategories);

    console.log("Empieza el handleSearch");

    // Solo agrega los parámetros si tienen un valor válido
    if (query) params.append('query', query);
    console.log("Query", query);
    if (selectedCategories) params.append('categories', selectedCategories);

    console.log("selectedCategories", selectedCategories.toString());

    if (startDate) {
      params.append('checkIn', startDate.toISOString().split('T')[0]);
    }

    if (endDate) {
      params.append('checkOut', endDate.toISOString().split('T')[0]);
    }

    console.log("params", params);

    // Imprime los parámetros que se van a enviar en la solicitud
    console.log("Sending search with params: ", params.toString());

    // Enviar la solicitud con los parámetros
    navigate(`/resultados?${params.toString()}`);
  };



  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = allSuggestions.filter(s =>
      s.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
  }, [query, allSuggestions]);




  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="¿A dónde vas?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((s, index) => (
              <li key={index} onClick={() => {
                setQuery(s);
                setSuggestions([]);
              }}>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>



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
