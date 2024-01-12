import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/token/`, {
      email: email,
      password: password,
    });

    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;

    // Store refreshToken in an HttpOnly cookie for enhanced security
    document.cookie = `refreshToken=${refreshToken}; path=/; HttpOnly; Secure`;
    return accessToken;
  } catch (error) {
    throw error;
  }
};

const refreshAccessToken = async () => {
 try{
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/token/refresh/`,
      {},
      {
        headers: {
          Authorization: `Basic ${btoa(`refresh:${document.cookie.refreshToken}`)}`,
        },
      }
    );

    const newAccessToken = response.data.access;

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

export { login, refreshAccessToken };
