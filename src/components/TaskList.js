import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Button, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import TaskRow from './TaskRow';
import EditModal from './EditModal';
import AddTaskModal from './AddTaskModal';
import './style/TaskList.css';  // Certifique-se de que o CSS esteja sendo importado

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:8080/tarefas');
                const data = await response.json();
                setTasks(data.sort((a, b) => a.ordem - b.ordem)); // Ordena as tarefas
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTasks(items); // Atualiza a lista de tarefas
        updateTaskOrder(items); // Atualiza a ordem no backend
    };

    const updateTaskOrder = async (updatedTasks) => {
        const tasksWithNewOrder = updatedTasks.map((task, index) => ({
            ...task,
            ordem: index + 1,
        }));

        try {
            await fetch('http://localhost:8080/tarefas/reordenar', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tasksWithNewOrder),
            });
        } catch (error) {
            console.error('Erro ao atualizar ordem das tarefas:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
            try {
                await fetch(`http://localhost:8080/tarefas/${taskId}`, { method: 'DELETE' });
                setTasks(tasks.filter((task) => task.id !== taskId));
            } catch (error) {
                console.error('Erro ao excluir tarefa:', error);
            }
        }
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setIsEditing(true); // Exibe o modal de edição
    };

    const handleSaveTask = async (updatedTask) => {
        updatedTask.cost = parseFloat(updatedTask.cost) || 0;

        try {
            await fetch(`http://localhost:8080/tarefas/${updatedTask.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });

            setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
        } finally {
            setIsEditing(false);
        }
    };

    const handleAddTask = () => {
        setIsAdding(true); // Exibe o modal de adicionar tarefa
    };

    const handleCreateTask = async (newTask) => {
        newTask.cost = parseFloat(newTask.cost) || 0;

        try {
            const response = await fetch('http://localhost:8080/tarefas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });

            const createdTask = await response.json();
            setTasks([...tasks, createdTask]); // Adiciona a tarefa na lista local
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        } finally {
            setIsAdding(false); // Fecha o modal após salvar
        }
    };

    // Função para marcar a tarefa como concluída
    const handleCompleteTask = async (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );

        setTasks(updatedTasks);

        const taskToUpdate = updatedTasks.find((task) => task.id === taskId);

        try {
            await fetch(`http://localhost:8080/tarefas/${taskId}/completed`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskToUpdate.completed),
            });
        } catch (error) {
            console.error('Erro ao atualizar status da tarefa:', error);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom align="center">
                Lista de Tarefas
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTask}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 8,
                    }}
                >
                    Adicionar Tarefa
                </Button>
            </Box>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#f4f4f4', color: '#333' }}>
                                        <TableRow>
                                            <TableCell>Concluída</TableCell>
                                            <TableCell>Nome</TableCell>
                                            <TableCell>Custo</TableCell>
                                            <TableCell>Data Limite</TableCell>
                                            <TableCell>Ações</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                                        {tasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                {(provided) => (
                                                    <TableRow
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`table-row ${task.completed ? 'completed-task' : ''} ${task.cost >= 1000 ? 'expensive-task' : ''}`}
                                                    >
                                                        <TableCell>
                                                            <Checkbox
                                                                checked={task.completed || false}
                                                                onChange={() => handleCompleteTask(task.id)}
                                                            />
                                                        </TableCell>
                                                        <TaskRow
                                                            task={task}
                                                            onEdit={() => handleEditTask(task)}
                                                            onDelete={handleDeleteTask}
                                                            onComplete={handleCompleteTask}
                                                        />
                                                    </TableRow>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Droppable>
                </DragDropContext>
            )}

            {isEditing && (
                <EditModal task={currentTask} onSave={handleSaveTask} onClose={() => setIsEditing(false)} />
            )}

            {isAdding && (
                <AddTaskModal onSave={handleCreateTask} onClose={() => setIsAdding(false)} />
            )}
        </Box>
    );
};

export default TaskList;
