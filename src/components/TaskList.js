import React from 'react';

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
          <p className="mb-2">{task.description}</p>
          <p className="mb-2">Due Date: {task.dueDate}</p>
          <p className="mb-2">Priority: {task.priority}</p>
          <button
            onClick={() => onEditTask(task.Id, task.title, task.description, task.dueDate, task.priority)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

