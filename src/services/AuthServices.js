import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const EMAIL = process.env.REACT_APP_EMAIL;
const PASSWORD = process.env.REACT_APP_PASSWORD;

export const login = async () => {
  try {
    const response = await axios.post(`/auth/token/`, {
      email: EMAIL,
      password: PASSWORD,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to save tokens in local storage
export const saveTokens = ({ access, refresh }) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

// Function to get the access token from local storage
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

// Function to get the refresh token from local storage
export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};
