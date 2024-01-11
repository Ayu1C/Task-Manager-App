import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/TaskService";

const Tasks = (props) => {
  const [tasks, setTasks] = useState(props.tasklist);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.results);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskSubmit = async (title, description, dueDate, priority) => {
    if (editTask) {
      // Edit existing task
      try {
        await updateTask(editTask.id, { title, description, dueDate, priority });
        fetchTasks();
        setEditTask(null);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      // Create new task
      try {
        await createTask({ title, description, dueDate, priority });
        fetchTasks();
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Task Management App</h1>

      {editTask ? (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Edit Task</h2>
          <TaskForm
            onSubmit={handleTaskSubmit}
            initialTitle={editTask.title}
            initialDescription={editTask.description}
            initialDueDate={editTask.dueDate}
            initialPriority={editTask.priority}
          />
        </div>
      ) : (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Create Task</h2>
          <TaskForm onSubmit={handleTaskSubmit} />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Tasks</h2>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
            <p className="mb-2">{task.description}</p>
            <p className="mb-2">Due Date: {task.dueDate}</p>
            <p className="mb-2">Priority: {task.priority}</p>
            <button
              onClick={() => handleEditTask(task)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
