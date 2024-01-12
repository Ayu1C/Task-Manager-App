import React, { useState, useEffect } from 'react';
import { login, refreshAccessToken } from './services/AuthServices';
import { getTasks, createTask, updateTask, deleteTask } from './services/TaskService';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const authenticateAndFetchTasks = async (email, password) => {
    try {
      const accessToken = await login(email, password);
      await fetchTasks(accessToken);
    } catch (error) {
      console.error('Authentication or fetch tasks failed:', error);
    }
  };

  const fetchTasks = async (accessToken) => {
    try {
      const tasksData = await getTasks(accessToken);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // const handleRefreshToken = async () => {
  //   try {
  //     const newAccessToken = await refreshAccessToken();
  //     if (newAccessToken) {
  //       await fetchTasks(newAccessToken);
  //     }
  //   } catch (error) {
  //     console.error('Error refreshing access token:', error);
  //   }
  // };

  const handleCreateTask = async (taskData, accessToken) => {
    try {
      await createTask(taskData, accessToken);
      await fetchTasks(accessToken);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updatedData, accessToken) => {
    try {
      await updateTask(taskId, updatedData, accessToken);
      await fetchTasks(accessToken);
      setEditTask(null);
      setEdit(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId, accessToken) => {
    try {
      await deleteTask(taskId, accessToken);
      await fetchTasks(accessToken);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = async (taskId, taskTitle, taskDes, taskDate, taskPrio) => {
     const sentTask = {taskId, taskTitle, taskDes, taskDate, taskPrio};
     setEditTask(sentTask);
     setEdit(true);
  };

  useEffect(() => {
    const email = process.env.REACT_APP_EMAIL;
    const password = process.env.REACT_APP_PASSWORD;
    authenticateAndFetchTasks(email, password);
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Task Management App</h1>
      
      {editTask!=null ? (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Edit Task</h2>
          <TaskForm
            onSubmit={handleUpdateTask}
            initialTitle={editTask.title}
            initialDescription={editTask.description}
            initialDueDate={editTask.dueDate}
            initialPriority={editTask.priority}
          />
        </div>
      ) : (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Create Task</h2>
          <TaskForm onSubmit={handleCreateTask} />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Tasks</h2>
      <TaskList tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />
      {/* <button onClick={handleRefreshToken}>Refresh Access Token</button> */}
    </div>
  );
};
 
export default App;

