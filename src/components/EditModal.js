import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material'; // Importando componentes do MUI

const EditModal = ({ task, onSave, onClose }) => {
    const [updatedTask, setUpdatedTask] = useState({ ...task });

    useEffect(() => {
        setUpdatedTask({ ...task }); // Atualiza o estado do modal com os dados da tarefa
    }, [task]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cost') {
            setUpdatedTask({ ...updatedTask, [name]: parseFloat(value) || 0 }); // Garante que o custo seja numérico
        } else {
            setUpdatedTask({ ...updatedTask, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(updatedTask); // Chama a função de salvar tarefa
    };

    return (
        <Modal open onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                    Editar Tarefa
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        name="name"
                        value={updatedTask.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Custo"
                        name="cost"
                        value={updatedTask.cost}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        label="Data Limite"
                        name="limitDate"
                        value={updatedTask.limitDate}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Salvar
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

// Estilos para o modal
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

export default EditModal;
