import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',  // Modo escuro
        primary: {
            main: '#1976d2',  // Cor principal do tema
        },
        secondary: {
            main: '#f50057',  // Cor secundária do tema
        },
        background: {
            default: '#121212',  // Cor de fundo do layout
            paper: '#1c1c1c',     // Cor de fundo dos papéis (como tabelas, cards)
        },
        text: {
            primary: '#e0e0e0',  // Cor do texto principal (branco suave)
            secondary: '#b0b0b0',  // Cor do texto secundário (cinza)
        },
    },
    typography: {
        h4: {
            fontSize: '1.8rem',  // Ajusta o tamanho da fonte para o título (opcional)
        },
    },
    components: {
        MuiTable: {
            styleOverrides: {
                root: {
                    borderColor: '#3e3e3e',  // Cor das bordas da tabela
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#333',  // Cor de fundo escuro para o cabeçalho da tabela
                    color: '#ffffff',  // Cor do texto do cabeçalho (branco)
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: '#e0e0e0',  // Cor do texto dentro das células da tabela
                    borderColor: '#3e3e3e',  // Cor das bordas das células
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(even)': {
                        backgroundColor: '#2c2c2c', // Cor das linhas alternadas
                    },
                    '&:hover': {
                        backgroundColor: '#3e3e3e', // Cor ao passar o mouse
                    },
                },
            },
        },
    },
});

export default theme;
