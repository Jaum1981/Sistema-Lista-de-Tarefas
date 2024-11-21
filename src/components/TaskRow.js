import React from 'react';
import { TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const TaskRow = ({ task, onEdit, onDelete }) => {
    const cost = parseFloat(task.cost) || 0;  // Garantir que 'cost' seja tratado como número

    return (
        <>
            <TableCell>{task.name}</TableCell>
            <TableCell>{cost.toFixed(2)}</TableCell>
            <TableCell>{new Date(task.limitDate).toLocaleDateString()}</TableCell>
            <TableCell>
                <IconButton color="primary" onClick={() => onEdit(task)}>
                    <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => onDelete(task.id)}>
                    <Delete />
                </IconButton>
            </TableCell>
        </>
    );
};

export default TaskRow;
