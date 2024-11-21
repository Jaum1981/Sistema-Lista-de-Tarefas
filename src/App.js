import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import TaskList from './components/TaskList';  // Página inicial com lista de tarefas
import darkTheme from './components/style/theme';  // Importa o tema configurado

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />  {/* Aplica o tema global */}
            <TaskList />  {/* Página inicial */}
        </ThemeProvider>
    );
}

export default App;
