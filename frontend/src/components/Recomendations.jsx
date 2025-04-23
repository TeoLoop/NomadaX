// src/components/Recommendations.js
import React from 'react';

const Recommendations = () => {
  const recommendations = [
    { id: 1, name: 'Hotel de lujo en París', description: 'Hotel 5 estrellas en el centro de París' },
    { id: 2, name: 'Apartamento en la playa', description: 'Apartamento con vista al mar en Cancún' },
    { id: 3, name: 'Casa rural en las montañas', description: 'Casa con chimenea y vista a la montaña' },
  ];

  return (
    <div className="recommendations">
      <h2>Recomendaciones</h2>
      <div className="recommendation-list">
        {recommendations.map((rec) => (
          <div key={rec.id} className="recommendation-item">
            <h3>{rec.name}</h3>
            <p>{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
