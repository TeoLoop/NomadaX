import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/SearchBar.css';
import { Search } from 'lucide-react';
import { FiCalendar } from 'react-icons/fi';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const startRef = useRef();
  const endRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", query, startDate, endDate);
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
          <FiCalendar className="calendar-icon" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="dd/mm/yyyy"
            ref={startRef}
          />
        </div>

        {/* Check-out */}
        <div className="custom-picker" onClick={() => endRef.current.setOpen(true)}>
          <FiCalendar className="calendar-icon" />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            placeholderText="dd/mm/yyyy"
            ref={endRef}
          />
        </div>
      </div>

      <button onClick={handleSearch}>
        <Search size={18} className="search-icon" />
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
