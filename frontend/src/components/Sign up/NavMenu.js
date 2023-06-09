import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, Outlet } from 'react-router-dom';

export default function NavMenu() {
    return (
        <>
            <div className="app-container">
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Link to="/signup">
                                <Button style={{ color: "white" }}>Početna</Button>
                            </Link>
                            <Link to="/signup/login">
                                <Button style={{ color: "white" }}>Prijava</Button>
                            </Link>
                            <Link to="/signup/registration">
                                <Button style={{ color: "white" }}>Registracija</Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Outlet />
            </div>
        </>
    );
}
