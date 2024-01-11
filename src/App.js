import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { login, saveTokens, getAccessToken } from './services/AuthServices';
import { getTasks } from './services/TaskService';
import Tasks from './components/Tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Function to authenticate user and fetch tasks on component mount
  useEffect(() => {
    const authenticateAndFetchTasks = async () => {
      try {
        const accessToken = getAccessToken();
        if (!accessToken) {
          // If not authenticated, perform login
          const { access, refresh } = await login(process.env.REACT_APP_EMAIL, process.env.REACT_APP_PASSWORD);
          saveTokens({ access, refresh });
        }

        // Fetch tasks after authentication
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks.results);
      } catch (error) {
        console.error('Authentication or fetch tasks failed:', error);
      }
    };

    authenticateAndFetchTasks();
  }, []); 

  return (
    <Router>
      <Routes>
        <Route path="/" 
          exact element = {<Tasks tasklist={tasks}/>}
        >
        </Route>
      </Routes>      
    </Router>
  );
};

export default App;


