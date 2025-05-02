const BASE_URL = 'http://localhost:8080/auth';

//LOGIN
export const login = (user) => {
    return fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then(res => {
      if(!res.ok){ //Si no es ok, es porque el usuario o contraseña son incorrectos
  
        if(res.status === 400){
          throw new Error("Usuario o contraseña incorrectos");
        }else{
          throw new Error('Error al iniciar sesión');
        }
      }
      return res.json();
    })
};

//REGISTER
export const register = (user) => {
    // Agregamos admin: false al objeto
    const userWithAdmin = {
      ...user,
      admin: false
    };
  
    return fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userWithAdmin),
    }).then(res => {
      if (!res.ok) {
        throw new Error('Error al registrar usuario');
      }
      return res.json();
    });
  };
    