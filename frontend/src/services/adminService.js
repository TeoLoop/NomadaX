const BASE_URL = 'http://localhost:8080';

//GET HOTELES ADMIN
export const fetchHotelsAdmin = () => {
    const token = localStorage.getItem('token');
    return fetch(`${BASE_URL}/admin`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json())
    .catch(err => console.log(err));
  };