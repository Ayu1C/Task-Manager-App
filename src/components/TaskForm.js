import React, { useState, useEffect } from "react";

const TaskForm = ({
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  initialDueDate = "",
  initialPriority = "",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [priority, setPriority] = useState(initialPriority);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setDueDate(initialDueDate);
    setPriority(initialPriority);
  }, [initialTitle, initialDescription, initialDueDate, initialPriority]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, description, dueDate, priority);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
  };

  return (
    <form
      className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-1">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="mb-1">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="dueDate" className="mb-1">
          Due Date:
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="priority" className="mb-1">
          Priority:
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
