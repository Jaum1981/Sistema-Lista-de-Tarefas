import React, { useState, useEffect } from 'react';
import { fetchTasks, deleteTask, reorderTasks } from '../services/api';
import TaskForm from './TaskForm';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    // Carrega as tarefas ao montar o componente
    useEffect(() => {
        const loadTasks = async () => {
            const tasksData = await fetchTasks();
            setTasks(tasksData);
        };
        loadTasks();
    }, []);

    // Função para excluir uma tarefa
    const handleDeleteTask = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
            try {
                await deleteTask(id);
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            } catch (error) {
                alert('Erro ao excluir tarefa.');
            }
        }
    };

    // Função para iniciar a edição de uma tarefa
    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    // Função para atualizar a lista após salvar ou editar
    const handleTaskUpdated = async () => {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
    };

    // Função para cancelar a edição
    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    // Função para reordenar as tarefas
    const handleReorderTasks = async (newOrder) => {
        try {
            await reorderTasks(newOrder);
            setTasks(newOrder);
        } catch (error) {
            alert('Erro ao reordenar tarefas.');
        }
    };

    return (
        <div>
            <h1>Gerenciador de Tarefas</h1>
            <TaskForm
                onTaskUpdated={handleTaskUpdated}
                editingTask={editingTask}
                onCancel={handleCancelEdit}
            />
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.name}</strong> - R$ {task.cost} - {task.limitDate}
                        <button onClick={() => handleEditTask(task)}>Editar</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
            {/* Exemplo de reordenação */}
            <button onClick={() => handleReorderTasks([...tasks].reverse())}>
                Reordenar Tarefas
            </button>
        </div>
    );
};

export default TaskManager;
