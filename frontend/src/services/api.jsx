import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const authAPI = { 
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data)
};
