// Displays individual tasks with options to edit, delete, or mark as completed
import React from "react";

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3>
        {task.name}
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Unmark" : "Complete"}
        </button>
      </h3>
      <p>{task.description}</p>
      <div>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
