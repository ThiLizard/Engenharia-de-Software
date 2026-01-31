import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Endereço padrão do Spring Boot
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
