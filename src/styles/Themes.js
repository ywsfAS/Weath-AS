import { createTheme } from '@mui/material/styles';
import { deepPurple, orange, lightBlue, teal, pink, blue } from '@mui/material/colors';

// imports from Material ui for themes

const blueTheme = createTheme({
    typography: {
        fontFamily: ['IBM', 'Pixelify'].join(','),
    },
    palette: {
        mode: 'light',
        primary: {
            main: blue[900],
            // "rgb(28 52 91 / 36%)"

        },
        background: { default: "#0052d0" },
    }

})
const lightBlueTheme = createTheme({
    typography: {
        fontFamily: ['IBM', 'Pixelify'].join(','),
    },
    palette: {
        mode: 'light',
        primary: { main: lightBlue[600] },
        background: { default: lightBlue[200] },
    },
});


const greenTheme = createTheme({
    typography: {
        fontFamily: ['IBM', 'Pixelify'].join(','),
    },
    palette: {
        mode: 'light',
        primary: { main: teal[400] },
        background: { default: teal[200] },
    },
});

const purpleTheme = createTheme({
    typography: {
        fontFamily: ['IBM', 'Pixelify'].join(','),
    },
    palette: {
        mode: 'light',
        primary: { main: deepPurple[300] },
        background: { default: deepPurple[200] },
    },
});
const sunTheme = createTheme({
    typography: {
        fontFamily: ['IBM', 'Pixelify'].join(','),
    },
    palette: {
        mode: 'light',
        primary: { main: orange[800] },
        background: { default: orange[100] },
    },
});
const pinkTheme = createTheme({
    typography: {
        fontFamily: ['IBM', 'Pixelify'].join(','),
    },
    palette: {
        mode: 'light',
        primary: { main: pink[300] },
        background: { default: pink[200] },
    },
});
let theme = {
    blue: blueTheme,
    pink: pinkTheme,
    sun: sunTheme,
    green: greenTheme,
    lightblue: lightBlueTheme,
    purple: purpleTheme
}

export { theme }


