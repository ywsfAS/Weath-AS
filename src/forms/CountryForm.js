
import { useTheme } from '@emotion/react';
import { TextField, Button } from '@mui/material';

export default function CountryForm({ inputValue, setInputValue, handleSubmit, t }) {
    let theme = useTheme()

    // Country input field using Material ui 
    return (
        <form onSubmit={(e) => { handleSubmit(e) }}>
            <TextField
                id="outlined-basic"
                label={t("Country")}
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                sx={{
                    boxShadow: '0 4px 10px rgba(9, 71, 153, 0.67)', // apply shadow
                    '& .MuiOutlinedInput-root': {

                        backgroundColor: '#f0f0f0',
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: '#48cae4' },
                        '&.Mui-focused fieldset': { borderColor: '#dee2e6' },
                    }
                }}
                InputLabelProps={{
                    style: { color: '#abc4ff', fontWeight: 800 }
                }}
            />
            <Button type="submit" variant="contained" sx={{ height: "100%", marginLeft: "10px", bgcolor: theme.palette.primary.main }}>
                {t("Submit")}
            </Button>
        </form>
    );
}
