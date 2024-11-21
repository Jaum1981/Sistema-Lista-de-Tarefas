import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/api';

const TaskForm = ({ onTaskUpdated, editingTask, onCancel }) => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [limitDate, setLimitDate] = useState('');

    useEffect(() => {
        if (editingTask) {
            setName(editingTask.name);
            setCost(editingTask.cost);
            setLimitDate(editingTask.limitDate.split('T')[0]); // Formata data
        }
    }, [editingTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const task = {
            name,
            cost: String(cost), // Converte 'cost' para string
            limitDate
        };

        try {
            if (editingTask) {
                await updateTask(editingTask.id, task);
            } else {
                await createTask(task);
            }
            onTaskUpdated();
            setName('');
            setCost('');
            setLimitDate('');
            onCancel();
        } catch (error) {
            alert('Erro ao salvar tarefa. Verifique se o nome é único.');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>{editingTask ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}</h2>
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Custo"
                value={cost}
                onChange={(e) => {
                    const value = parseFloat(e.target.value); // Converte para número
                    setCost(value >= 0 ? value : ''); // Aceita somente valores não negativos
                }}
                required
            />
            <input
                type="date"
                value={limitDate}
                onChange={(e) => setLimitDate(e.target.value)}
                required
            />
            <button type="submit">{editingTask ? 'Salvar' : 'Adicionar'}</button>
            {editingTask && <button type="button" onClick={onCancel}>Cancelar</button>}
        </form>
    );
};

export default TaskForm;
