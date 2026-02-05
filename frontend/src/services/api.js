import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitRegistration = async (formData) => {
  try {
    const response = await api.post('/registration', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRegistrations = async () => {
  try {
    const sessionId = localStorage.getItem('adminSessionId');
    const response = await api.get('/registration', {
      headers: {
        'X-Session-ID': sessionId
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminLogin = async (credentials) => {
  try {
    const response = await api.post('/admin/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    const sessionId = localStorage.getItem('adminSessionId');
    const response = await api.post('/admin/logout', {}, {
      headers: {
        'X-Session-ID': sessionId
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;