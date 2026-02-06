import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Check if backend is available
export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/registration/health`, { timeout: 3000 });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Health check at root level (new endpoint)
export const checkRootHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`, { timeout: 3000 });
    return response.data;
  } catch (error) {
    throw error;
  }
};;

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

export const deleteRegistration = async (id) => {
  try {
    const sessionId = localStorage.getItem('adminSessionId');
    const response = await api.delete(`/registration/${id}`, {
      headers: {
        'X-Session-ID': sessionId
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAllRegistrations = async () => {
  try {
    const sessionId = localStorage.getItem('adminSessionId');
    const response = await api.delete('/registration', {
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
    if (!sessionId) {
      return { success: true, message: "No active session" };
    }
    
    const response = await api.post('/admin/logout', {}, {
      headers: {
        'X-Session-ID': sessionId
      },
      timeout: 5000 // 5 second timeout
    });
    return response.data;
  } catch (error) {
    // Don't throw error for logout - return success so frontend can clean up
    console.warn('Logout API call failed:', error);
    return { success: true, message: "Local logout completed" };
  }
};

export default api;