import React from 'react';

const Categories = () => {
  const categories = ["Hoteles", "Apartamentos", "Casas", "Bungalows", "Lugares de lujo"];

  return (
    <div className="categories">
      <h2>Categorías</h2>
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
