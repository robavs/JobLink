import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ova greska bi trebalo da izgleda malo drugacije
const Error = ({ redirect }) => {
    const navigate = useNavigate()
    return (
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#1976d2">
            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" align="center" style={{ color: '#fff' }}>
                        Greska 404!
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Button
                            onClick={() => navigate(redirect)}
                            variant="outlined"
                            style={{ background: "#fff" }} >
                            Vrati nazad
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Error;