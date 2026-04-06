export const API_BASE = 'http://localhost:8081/RealStatePro/api';

export const buildAuthHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
