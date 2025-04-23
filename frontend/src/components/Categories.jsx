import React from 'react';
import { FaHotel, FaHome, FaBriefcase, FaBed, FaStar } from 'react-icons/fa';
import "../styles/Categories.css"

const Categories = () => {
  const categories = [
    { name: "Hoteles", icon: <FaHotel /> },
    { name: "Apartamentos", icon: <FaHome /> },
    { name: "Casas", icon: <FaBed /> },
    { name: "Bungalows", icon: <FaBriefcase /> },
    { name: "Lugares de lujo", icon: <FaStar /> }
  ];

  return (
    <div className="categories">
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <a href={`/categorias/${category.name.toLowerCase()}`} className="category-link">
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
