import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {fetchTaskById} from "../services/api";

const TaskEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({ name: '', cost: 0, limitDate: '' });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetchTaskById(id);
                const data = await response.json();
                setTask(data);
            } catch (error) {
                console.error('Erro ao buscar a tarefa:', error);
            }
        };

        fetchTask();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8080/tarefas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
            navigate('/');
        } catch (error) {
            console.error('Erro ao editar tarefa:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input
                    type="text"
                    name="name"
                    value={task.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Custo:</label>
                <input
                    type="number"
                    name="cost"
                    value={task.cost}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Data Limite:</label>
                <input
                    type="date"
                    name="limitDate"
                    value={task.limitDate}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
};

export default TaskEdit;
