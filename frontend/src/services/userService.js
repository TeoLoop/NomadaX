const BASE_URL = 'http://localhost:8080';


//OBTENER USUARIOS
export const fetchUsers = async () => {
    try {
        const response = await fetch  (`${BASE_URL}/user`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

//AGREGAR USUARIO
export const addUser = async (user) => {
    
}

//USER IS ADMIN
export const isAdmin = async (email) => {
    try {
      const res = await fetch(`${BASE_URL}/user/isadmin/${email}`);
      const text = await res.text();
      const isAdmin = text === "true";
      console.log(isAdmin);
      return isAdmin;
    } catch (e) {
      console.error("Error:", e);
      return false;
    }
  };

  //OBTENER NOMBRE DE USUARIO
  export const infoOfUser = async (email) => {
    try {
      const res = await fetch(`${BASE_URL}/user/${email}`);
      const data = await res.json();
      return data;
    } catch (e) {
      console.error("Error:", e);
      return false;
    }
  };


  //UPDATE USER
  export const updateUser = async (user) => {
    try {
      const res = await fetch(`${BASE_URL}/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)  
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error("Error:", e);
      return false;
    }
  };
  