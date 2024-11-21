const API_BASE_URL = 'http://localhost:8080';

export const fetchTasks = async () => {
    const response = await fetch(`${API_BASE_URL}/tarefas`);
    return response.json();
};

export const fetchTaskById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/tarefas/${id}`);
    return response.json();
};

export const updateTask = async (id, task) => {
    await fetch(`${API_BASE_URL}/tarefas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
};

export const deleteTask = async (id) => {
    await fetch(`${API_BASE_URL}/tarefas/${id}`, { method: 'DELETE' });
};

export const reorderTasks = async (tasks) => {
    await fetch(`${API_BASE_URL}/tarefas/reordenar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tasks),
    });
};
