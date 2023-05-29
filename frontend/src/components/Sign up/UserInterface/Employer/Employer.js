import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

const Employer = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Link to="/">
                            <Button color="inherit">Logout</Button>
                        </Link>
                        <Link to="/login">
                            <Button color="inherit">Profil</Button>
                        </Link>
                        <Link to="/registration">
                            <Button color="inherit">Nesto tamo</Button>
                        </Link>

                        <Link to="/login">
                            <Button color="inherit">Employer : Ime</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}

export default Employer
