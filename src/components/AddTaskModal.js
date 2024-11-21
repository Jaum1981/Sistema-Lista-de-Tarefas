import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const AddTaskModal = ({ onSave, onClose }) => {
    const [newTask, setNewTask] = useState({
        name: '',
        cost: 0,
        limitDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(newTask); // Chama a função para salvar a tarefa
    };

    return (
        <Modal open onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2">
                    Adicionar Tarefa
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        name="name"
                        value={newTask.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Custo"
                        name="cost"
                        value={newTask.cost}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        label="Data Limite"
                        name="limitDate"
                        value={newTask.limitDate}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Button variant="contained" type="submit">
                            Salvar
                        </Button>
                        <Button variant="outlined" onClick={onClose}>
                            Cancelar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

// Estilos personalizados do modal
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    padding: 4,
    boxShadow: 24,
    borderRadius: 2,
};

export default AddTaskModal;
