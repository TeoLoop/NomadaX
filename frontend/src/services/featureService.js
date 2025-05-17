const BASE_URL = 'http://localhost:8080';

export const fetchFeatures = async () => {
    const response = await fetch(`${BASE_URL}/caracteristicas`);
    return response.json();
}

export const addFeature = (feature) => {
    return fetch(`${BASE_URL}/caracteristicas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feature),
    }).then(res => {
      if(!res.ok){
        if(res.status === 400){
          throw new Error("Nombre de la caracteristica ya existe");
        }else{
          throw new Error('Error al agregar la caracteristica');
        }
      }
      return res.json();
    })
  };

  export const updateFeature= (updatedFeature) => {
    console.log("Mandando la siguiente caracteristica a actualizar:", updatedFeature); 
    console.log("/*******************************/");
  
    return fetch(`${BASE_URL}/caracteristicas`, {  
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFeature),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Fallo en actualizar la caracteristica');
        }
        return res.json();
      })
      .catch(err => {
        console.error('El error fue:', err);
        return null;
      });
  };


  export const deleteFeature = (id) => {
    return fetch(`${BASE_URL}/caracteristicas/${id}`, {
      method: 'DELETE',
    });
  };