import React, { useEffect } from 'react';
import { FaHotel, FaHome, FaBriefcase, FaBed, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    { name: "Hoteles", icon: <FaHotel /> },
    { name: "Apartamentos", icon: <FaHome /> },
    { name: "Casas", icon: <FaBed /> },
    { name: "Bungalows", icon: <FaBriefcase /> },
    { name: "Lugares de lujo", icon: <FaStar /> }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/categorias/${category.name.toLowerCase()}`);
  };

  return (
    <div className="categories">
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <a onClick={() => handleCategoryClick(category)} className="category-link"> 
              <div className="category-icon">{category.icon}</div>
              <p>{category.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
