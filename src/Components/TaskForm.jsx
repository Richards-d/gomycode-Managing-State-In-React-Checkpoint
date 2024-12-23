// A form for adding/editing tasks with validation.
import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, taskToEdit, clearEdit }) => {
    const [task, setTask] = useState({ name: '', description: '' });

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        } else {
            setTask({ name: '', description: '' });
        }
    }, [taskToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.name || !task.description) {
            alert('Both fields are required!');
            return;
        }
        onSubmit(task);
        setTask({ name: '', description: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Task Name"
                value={task.name}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Task Description"
                value={task.description}
                onChange={handleChange}
            ></textarea>
            <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
            {taskToEdit && <button onClick={clearEdit}>Cancel</button>}
        </form>
    );
};

export default TaskForm;