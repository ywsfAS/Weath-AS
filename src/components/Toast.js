import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ColorToggel from './ColorToggel';
import { theme } from '../styles/Themes';


export default function Toast({changeTheme, menuColor, themChoice }) {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
        localStorage.setItem("Theme", themChoice)


    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color={theme[themChoice].palette.primary.main} size="small" onClick={handleClose} sx={{ fontFamily: "IBM", fontSize: "20px", padding: "20px" }}>
                {`The Theme is updated ${themChoice}`}
            </Button>
            <IconButton
                sx={{ color: theme[themChoice].palette.primary.main }}
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <ColorToggel clickEvent={handleClick} theme={theme} changeTheme={changeTheme} menuColor={menuColor} />
            <Snackbar
                sx={{ fontFamily: "IBM", fontSize: "20px", padding: "20px" }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Enjoy 💙"
                action={action}
            />
        </div>
    );
}
