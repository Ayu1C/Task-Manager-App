import axios from 'axios';
import { getAccessToken } from './AuthServices';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to get headers with the access token
const getHeaders = () => {
  const accessToken = getAccessToken();
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`/tasks/task/`, getHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    await axios.post(`${API_BASE_URL}/tasks/task/`, taskData, getHeaders());
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    await axios.put(`${API_BASE_URL}/tasks/task/${taskId}/`, taskData, getHeaders());
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/task/${taskId}/`, getHeaders());
  } catch (error) {
    throw error;
  }
};

