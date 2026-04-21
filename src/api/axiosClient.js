import axios from 'axios';

/**
 * Axios client centralizado para todas las llamadas al backend.
 * Apunta al backend apex-fitness-backend corriendo en localhost:8080.
 */
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de respuestas:
 * - Si todo va bien, devuelve la respuesta tal cual
 * - Si hay error, lo loguea y lo propaga
 */
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un status fuera del rango 2xx
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('No response from server. Is the backend running?');
    } else {
      // Algo pasó al configurar la petición
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;