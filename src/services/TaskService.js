import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

const getAllTasks = () => {
    return axios.get(API_URL);
};

const createTask = (task) => {
    return axios.post(API_URL, task);
};

const getTaskById = (id) => {
    return axios.get(`${API_URL}${id}/`); // Retrieve task by ID
};

const updateTask = (id, task) => {
    return axios.put(`${API_URL}${id}/`, task);
};

const deleteTask = (id) => {
    return axios.delete(`${API_URL}${id}/`); // Delete task by ID
};

export default {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
};
