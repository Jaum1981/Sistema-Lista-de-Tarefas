import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'light', // Use 'light' para o estilo claro semelhante ao Notion
        background: {
            default: '#f9f9f9', // Cor de fundo clara para a página
            paper: '#ffffff',   // Fundo das cartas e modais
        },
        primary: {
            main: '#6c63ff',  // Cor principal dos botões (semelhante ao Notion)
        },
        secondary: {
            main: '#e1e1e1',  // Cor secundária para bordas e destaque
        },
        text: {
            primary: '#333', // Texto principal em cinza escuro
            secondary: '#666', // Texto secundário em cinza claro
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif', // Fonte mais simples e moderna
        h4: {
            fontSize: '1.5rem',  // Ajuste do título da página
            fontWeight: 600, // Títulos mais pesados, similar ao Notion
            color: '#333',
        },
        body1: {
            fontSize: '1rem', // Texto padrão
            color: '#666', // Texto em cinza mais suave
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true, // Desabilita as sombras para botões
            },
            styleOverrides: {
                root: {
                    borderRadius: 8, // Bordas arredondadas para botões
                    textTransform: 'none', // Para não deixar o texto em maiúsculas
                },
                contained: {
                    backgroundColor: '#6c63ff', // Cor do botão "Salvar" ou "Adicionar"
                    '&:hover': {
                        backgroundColor: '#5a54e6', // Cor no hover
                    },
                },
                outlined: {
                    borderColor: '#ccc', // Cor das bordas de botões secundários
                    '&:hover': {
                        backgroundColor: '#f1f1f1', // Hover suave
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '16px', // Aumenta o padding das células da tabela
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#f1f1f1', // Hover suave nas linhas
                    },
                },
            },
        },
    },
});

export default darkTheme;
