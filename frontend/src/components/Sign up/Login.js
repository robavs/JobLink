import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useEffect } from 'react'
import { METHODS } from './data/METHODS';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Loading from '../Custom/Loading';

//ovaj template je preuzet sa https://mui.com/material-ui/getting-started/templates/sign-in/
// generalno mi se ne svidja kako izgleda ovaj template ali cu da ga zamenim posle

const theme = createTheme();

export default function Login() {
    const { user, setUser } = useAuth()
    const [userNameOrEmail, setUserNameOrEmail] = useState("")
    const [password, setPassword] = useState("")
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    // sluzi da bi smo prikazali loading komponentu dok se user ne preusmeri na profilnu stranicu
    const [isLoginStarted, setIsLoginStarted] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            navigate("/user")
            setIsLoginStarted(false)
        }
    }, [user])

    const handleLogin = async () => {
        if (!userNameOrEmail.length || !password.length) {
            setErrorMessage(`Morate uneti ${!userNameOrEmail.length ? "korisničko ime" : "lozinku"}`)
            setInvalidCredentials(true)
            return
        }

        setIsLoginStarted(true)

        try {
            const result = await fetch(METHODS.User.UserLogin + `/${userNameOrEmail}/${password}`)
            const userData = await result.json()

            // setujem ga na localstorage da mi se user ne bi gubio prilikom
            // refresovanja (e sada ne znam da li sve one operacije updejtovanja
            // treba da se rade lokalno i direktno da reaguju sa bazom), pa onda
            // na neki logout da se tek tad updejtuje. 

            localStorage.setItem("user", JSON.stringify(userData))
            setUser(userData)
        }
        catch (err) {
            console.log(err)
            setInvalidCredentials(true)
            setIsLoginStarted(false)
            setErrorMessage("Podaci za prijavu korisnika su pogrešni. Ako nemate nalog pređite na regisrtaciju!")
        }
    }

    if (isLoginStarted) {
        return <Loading />
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Prijava
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }}>

                        <TextField
                            value={userNameOrEmail}
                            error={invalidCredentials}
                            onChange={e => {
                                setUserNameOrEmail(e.target.value)
                                setInvalidCredentials(false)
                            }}
                            margin="normal" required fullWidth id="emailOrUserName" label="Email ili Korisničko ime" name="email" autoComplete="off" autoFocus />

                        <TextField
                            value={password}
                            error={invalidCredentials}
                            onChange={e => {
                                setPassword(e.target.value)
                                setInvalidCredentials(false)
                            }}
                            margin="normal" required fullWidth name="password" label="Lozinka" type="password" id="password" autoComplete="off" />

                        {invalidCredentials &&
                            <Alert severity="error">
                                {errorMessage}
                            </Alert>
                        }

                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>
                            Prijava
                        </Button>

                    </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
                    {'Copyright © '}
                    <span color="inherit" >
                        JobLink
                    </span>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>

            </Container>
        </ThemeProvider >
    );
}