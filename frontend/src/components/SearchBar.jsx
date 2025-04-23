// src/components/SearchBar.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';  // Importamos el componente DatePicker
import "react-datepicker/dist/react-datepicker.css";  // Importamos los estilos de DatePicker
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState(null);  // Fecha de entrada (check-in)
  const [endDate, setEndDate] = useState(null);      // Fecha de salida (check-out)

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", query);
    console.log("Fecha de entrada:", startDate);
    console.log("Fecha de salida:", endDate);
    // Aquí puedes agregar la lógica para realizar una búsqueda
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="A donde vas?" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      
      {/* DatePickers para seleccionar las fechas */}
      <div className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="dd/mm/yyy"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}  // No permitir seleccionar una fecha de salida anterior a la de entrada
          placeholderText="dd/mm/yyy"
        />
      </div>
      
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
