import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#121212",
            paper: "#1c1c1c",
        },
        primary: {
            main: "#4caf50",
        },
        secondary: {
            main: "#fdd835",
        },
        text: {
            primary: "#fff",
            secondary: "#9e9e9e",
        },
    },
});

export default darkTheme;
