const BASE_URL = 'http://localhost:8080';

export const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/categorias`);
    return response.json();
}

export const addCategory = (category) => {
    return fetch(`${BASE_URL}/categorias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    }).then(res => {
      if(!res.ok){
  
        if(res.status === 400){
          throw new Error("Nombre de la categoria ya existe");
        }else{
          throw new Error('Error al agregar la categoria');
        }
      }
      return res.json();
    })
  };

  export const updateCategory= (updatedCategory) => {
    console.log("Mandando la siguiente categoria a actualizar:", updatedCategory); 
    console.log("/*******************************/");
  
    return fetch(`${BASE_URL}/categorias`, {  
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCategory),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Fallo en actualizar la categoria');
        }
        return res.json();
      })
      .catch(err => {
        console.error('El error fue:', err);
        return null;
      });
  };


