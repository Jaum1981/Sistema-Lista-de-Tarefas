import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Modal,
    Typography,
    Grid,
    FormHelperText,
    FormControl,
} from '@mui/material';

const EditModal = ({ task, onSave, onClose }) => {
    const [name, setName] = useState(task?.name || '');
    const [cost, setCost] = useState(task?.cost || '');
    const [deadline, setDeadline] = useState(task?.deadline || '');
    const [error, setError] = useState(null);  // Novo estado para erros

    const handleSave = () => {
        // Verifica se o custo é negativo
        if (cost < 0) {
            setError('O custo não pode ser negativo!');
            return;
        }
        setError(null);  // Limpa o erro caso o custo seja válido

        const updatedTask = { ...task, name, cost, deadline };
        onSave(updatedTask);
    };

    return (
        <Modal
            open={!!task}
            onClose={onClose}
            aria-labelledby="edit-task-modal-title"
            aria-describedby="edit-task-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="edit-task-modal-title" variant="h6" component="h2">
                    Editar Tarefa
                </Typography>
                <Box component="form" sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!error}>
                                <TextField
                                    label="Custo"
                                    type="number"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                    fullWidth
                                    inputProps={{ min: 0 }}  // Impede valores negativos
                                />
                                {error && <FormHelperText>{error}</FormHelperText>} {/* Exibe a mensagem de erro */}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Data Limite"
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button onClick={onClose} variant="outlined" color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={handleSave} variant="contained" color="primary">
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditModal;
