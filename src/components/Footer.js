
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const Footer = ({t}) => {
    let theme = useTheme()
    return (
        <Box sx={{ bgcolor: theme.palette.primary.main, color: 'white', py: 4, mt: 'auto' }}>
            <Container>
                <Grid container spacing={8} sx={{justifyContent : "center"}}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Weather AS
                        </Typography>
                        <Typography sx={{ color: '#e3f2fd' }}>{t("Providing accurate weather information and forecastsfor locations all around the world")}</Typography>
                    </Grid>



                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {t("contact")}
                        </Typography>
                        <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', fontFamily: "Montserrat" }}>
                            <Box component="li" sx={{ mb: 1, color: '#e3f2fd' }}>Email: ywsfm6320@gmail.com</Box>
                            <Box component="li" sx={{ mb: 1, color: '#e3f2fd' }}>{`${t("Phone")}: +123 456 7890`}</Box>
                            <Box component="li" sx={{ mb: 1, color: '#e3f2fd' }}>Address: Weather AS Center</Box>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{  mt: 3, pt: 3, textAlign: 'center', color: '#e3f2fd' }}>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} Weather AS. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;