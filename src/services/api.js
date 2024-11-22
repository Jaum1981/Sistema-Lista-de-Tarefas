const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log('API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);


export const fetchTasks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/tarefas`);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        return [];
    }
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
