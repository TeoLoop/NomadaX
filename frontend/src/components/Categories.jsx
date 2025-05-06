import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../services/categoryService';

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(data => setCategories(data));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/categorias/${category.title}`);
  };

  return (
    <div className="categories">
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id} className="category-item">
            <a onClick={() => handleCategoryClick(category)} className="category-link">
              <img src={category.image} alt={category.title} />
              <p>{category.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
