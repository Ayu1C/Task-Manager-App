import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getTasks = async (accessToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/tasks/task/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.results;
  } catch (error) {
    throw error;
  }
};

const createTask = async (taskData, accessToken) => {
  try {
    await axios.post(`${API_BASE_URL}/api/v1/tasks/task/`, taskData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

const updateTask = async (taskId, updatedData, accessToken) => {
  try {
    await axios.patch(`${API_BASE_URL}/api/v1/tasks/task/${taskId}/`, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId, accessToken) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/v1/tasks/task/${taskId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export { getTasks, createTask, updateTask, deleteTask };
