import React, { useState, useEffect } from 'react';
import { login, refreshAccessToken } from './services/AuthServices';
import { getTasks, createTask, updateTask, deleteTask } from './services/TaskService';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const authenticateAndFetchTasks = async (email, password) => {
    try {
      const accesstoken = await login(email, password);
      setAccessToken(accesstoken);
      await fetchTasks(accesstoken);
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

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData, accessToken);
      await fetchTasks(accessToken);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (updatedData) => {
    try {
      const taskId = editId;
      await updateTask(taskId, updatedData, accessToken);
      await fetchTasks(accessToken);
      setEditTask(null);
      setEdit(false);
      setEditId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId, accessToken);
      await fetchTasks(accessToken);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = async (task) => {
     setEditTask(task);
     setEdit(true);
     setEditId(task.id);
  };

  useEffect(() => {
    const email = process.env.REACT_APP_EMAIL;
    const password = process.env.REACT_APP_PASSWORD;
    authenticateAndFetchTasks(email, password);
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500"> 
       <div className="max-w-md mx-auto px-4 py-8">
         <h1 className="text-3xl font-bold mb-4 text-red-600">Task Management App</h1>
         
         {editTask!=null ? (
           <div className="mb-4">
             <h2 className="text-xl font-semibold mb-2">Edit Task</h2>
             <TaskForm
               onSubmit={handleUpdateTask}
               initialLabel={editTask.label}
               initialDescription={editTask.description}
               initialDueDate={editTask.meta.dueDate}
               initialPriority={editTask.meta.priority}
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
    </div>
  );
};
 
export default App;

