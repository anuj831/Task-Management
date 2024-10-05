import React, { useState, useEffect } from 'react';
import TaskService from '../services/TaskService';
import './TaskList.css'; // Import your custom styles

function TaskList() {
    const [tasks, setTasks] = useState([]); // State for the list of tasks
    const [newTask, setNewTask] = useState({ title: '', description: '', completed: false }); // State for the new task input
    const [editingTask, setEditingTask] = useState(null); // State for the task being edited
    const [currentTask, setCurrentTask] = useState(null); // State for viewing a specific task
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages

    useEffect(() => {
        fetchTasks(); // Fetch tasks when the component mounts
    }, []);

    // Fetch all tasks
    const fetchTasks = () => {
        TaskService.getAllTasks()
            .then(response => {
                setTasks(response.data); // Update tasks state with fetched data
                setErrorMessage(""); // Clear any previous error messages
            })
            .catch(e => {
                console.log(e);
                setErrorMessage("Error fetching tasks. Please try again.");
            });
    };

    // Fetch a task by ID
    const fetchTaskById = (id) => {
        TaskService.getTaskById(id)
            .then(response => {
                setCurrentTask(response.data); // Update current task to show its details
                setErrorMessage(""); // Clear any previous error messages
            })
            .catch(e => {
                console.log(e);
                setErrorMessage("Error fetching task details. Please try again.");
            });
    };

    // Create a new task
    const handleCreateTask = () => {
        TaskService.createTask(newTask)
            .then(() => {
                fetchTasks(); // Refresh task list after creating
                setNewTask({ title: '', description: '', completed: false }); // Reset the form
            })
            .catch(e => {
                console.log(e);
                setErrorMessage("Error creating task. Please try again.");
            });
    };

    // Edit a task
    const handleEditTask = (task) => {
        setEditingTask(task); // Set task to be edited
        setNewTask({ title: task.title, description: task.description, completed: task.completed });
    };

    // Update a task
    const handleUpdateTask = () => {
        TaskService.updateTask(editingTask.id, newTask)
            .then(() => {
                fetchTasks(); // Refresh task list after updating
                setEditingTask(null); // Clear editing state
                setNewTask({ title: '', description: '', completed: false }); // Reset the form
            })
            .catch(e => {
                console.log(e);
                setErrorMessage("Error updating task. Please try again.");
            });
    };

    // Delete a task
    const handleDeleteTask = (id) => {
        TaskService.deleteTask(id)
            .then(() => {
                fetchTasks(); // Refresh task list after deletion
            })
            .catch(e => {
                console.log(e);
                setErrorMessage("Error deleting task. Please try again.");
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Task List</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error messages */}
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control mb-2"
                    placeholder="Title" 
                    value={newTask.title} 
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
                />
                <textarea 
                    className="form-control mb-2"
                    placeholder="Description" 
                    value={newTask.description} 
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
                />
                <button 
                    className="btn btn-primary" 
                    onClick={editingTask ? handleUpdateTask : handleCreateTask}
                >
                    {editingTask ? 'Update Task' : 'Add Task'}
                </button>
            </div>

            <ul className="list-group">
                {tasks.map(task => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{task.title}</strong> - {task.completed ? 'Completed' : 'Pending'}
                            <button className="btn btn-info btn-sm me-2" onClick={() => fetchTaskById(task.id)}>View Task</button>
                        </div>
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditTask(task)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Display Current Task Details */}
            {currentTask && (
                <div className="mt-4">
                    <h4>Task Details</h4>
                    <p><strong>Title:</strong> {currentTask.title}</p>
                    <p><strong>Description:</strong> {currentTask.description}</p>
                    <p><strong>Status:</strong> {currentTask.completed ? 'Completed' : 'Pending'}</p>
                    <button className="btn btn-secondary" onClick={() => setCurrentTask(null)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default TaskList;
