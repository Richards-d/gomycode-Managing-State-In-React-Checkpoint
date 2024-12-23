// src/App.js
import React, { useState, useEffect } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (taskToEdit) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskToEdit.id ? { ...t, ...task } : t))
      );
      setTaskToEdit(null);
    } else {
      setTasks((prev) => [
        ...prev,
        { ...task, id: Date.now(), completed: false },
      ]);
    }
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (task) => {
    setTaskToEdit(task);
  };

  const clearEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm
        onSubmit={addTask}
        taskToEdit={taskToEdit}
        clearEdit={clearEdit}
      />
      <TaskList
        tasks={tasks}
        onEdit={editTask}
        onDelete={deleteTask}
        onToggle={toggleTaskCompletion}
      />
    </div>
  );
};

export default App;
