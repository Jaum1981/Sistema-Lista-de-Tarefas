import React, { useState } from 'react';
import { Modal, Box, TextField, Button, FormHelperText } from '@mui/material';

const AddTaskModal = ({ onSave, onClose }) => {
    const [task, setTask] = useState({
        name: '',
        cost: '',
        deadline: '',
    });

    const [error, setError] = useState({
        name: false,
        cost: false,
        deadline: false,
    });

    const isFormValid = task.name.trim() && task.cost !== '' && task.deadline.trim();

    const handleChange = (field, value) => {
        setTask({ ...task, [field]: value });
    };

    const handleSave = () => {
        if (isFormValid) {
            const taskWithValidCost = {
                ...task,
                cost: parseFloat(task.cost), // Garantir que o custo seja um número
            };

            if (taskWithValidCost.cost < 0) {
                setError({ ...error, cost: true });
                alert('O custo não pode ser negativo.');
            } else {
                onSave(taskWithValidCost);
                setError({
                    name: false,
                    cost: false,
                    deadline: false,
                }); // Reset de erros ao salvar
            }
        } else {
            // Setar erros de campo se necessário
            setError({
                name: !task.name.trim(),
                cost: task.cost === '' || task.cost < 0,
                deadline: !task.deadline.trim(),
            });
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <TextField
                    fullWidth
                    label="Nome"
                    value={task.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    margin="normal"
                    required
                    error={error.name}
                    helperText={error.name && 'Nome é obrigatório.'}
                />
                <TextField
                    fullWidth
                    label="Custo"
                    type="number"
                    value={task.cost}
                    onChange={(e) => handleChange('cost', e.target.value)}
                    margin="normal"
                    required
                    error={error.cost}
                    helperText={error.cost && 'Custo deve ser um número válido e não negativo.'}
                    inputProps={{ min: 0 }}  // Impede a entrada de valores negativos
                />
                <TextField
                    fullWidth
                    label="Data Limite"
                    type="date"
                    value={task.deadline}
                    onChange={(e) => handleChange('deadline', e.target.value)}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    error={error.deadline}
                    helperText={error.deadline && 'Data limite é obrigatória.'}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={!isFormValid}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddTaskModal;
