import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Container } from '@mui/material';  // Para centralizar a página
import TaskList from './components/TaskList';  // Supondo que TaskList é o seu componente principal
import theme from './components/style/theme';  // Importando o tema escuro

function App() {
    return (
        <ThemeProvider theme={theme}>
            {/* O CssBaseline ajuda a garantir uma aparência consistente com o tema */}
            <CssBaseline />
            <Container>
                <TaskList />
            </Container>
        </ThemeProvider>
    );
}

export default App;
