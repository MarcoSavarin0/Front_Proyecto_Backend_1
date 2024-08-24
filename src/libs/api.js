const API_URL  = "http://localhost:8080"

/**
 * Función para hacer llamadas a la API.
 * @param {string} endpoint - El endpoint relativo de la API.
 * @param {string} method - El método HTTP (GET, POST, PUT, DELETE).
 * @param {Object} [body] - Los datos a enviar en el cuerpo de la solicitud.
 * @returns {Promise<Object>} - La respuesta de la API.
 */
export const apiCall = async (endpoint, method = 'GET', body = null) => {
    try {
      const url = `${API_URL}/${endpoint}`;
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(body && { body: JSON.stringify(body) }),
      };
  
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in API call:', error);
      throw error; 
    }
  };