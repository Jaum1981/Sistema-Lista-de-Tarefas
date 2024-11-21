import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const AddTaskModal = ({ onSave, onClose }) => {
    const [task, setTask] = useState({
        name: '',
        cost: '',
        deadline: '',
    });

    const isFormValid = task.name.trim() && task.cost.trim() && task.deadline.trim();

    const handleChange = (field, value) => {
        setTask({ ...task, [field]: value });
    };

    const handleSave = () => {
        if (isFormValid) {
            onSave(task);
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
                />
                <TextField
                    fullWidth
                    label="Custo"
                    type="number"
                    value={task.cost}
                    onChange={(e) => handleChange('cost', e.target.value)}
                    margin="normal"
                    required
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
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={!isFormValid} // Desabilita o botão se o formulário estiver inválido
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddTaskModal;
