import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


const freelancerItems = [
    { name: "Početna", route: "/user" },
    { name: "Poslovi", route: "/user/jobs" },
]

// nisam siguran da li je ruta radnici zasticena od za koriscenje od drugih usera, sad cemo i da proverimo
// mozda ce morati da se stavi u employer provider ili tako nesto

const employerItems = [
    { name: "Početna", route: "/user" },
    { name: "Radnici", route: "/user/freelancers" },
    { name: "Postavi oglas", route: "/user/postJob" }
]

const administratorItems = [
    { name: "Početna", route: "/user" },
    { name: "Radnici", route: "/user/freelancers" },
    { name: "Poslovi", route: "/user/jobsAdmin" }
]

// ovaj template je preuzet sa bootstra
const DashboardMenu = () => {
    const { user } = useAuth()
    const [navItems, setNavItems] = useState([])

    useEffect(() => {
        if (user.type === "Freelancer") {
            setNavItems(freelancerItems)
        }
        else if (user.type === "Employer") {
            setNavItems(employerItems)
        }
        else {
            setNavItems(administratorItems)
        }
    }, [])


    // sve vrednosti koje se nalaze u navbaru trebaju da budu zamenjene Link elementima

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <List style={{ display: "flex" }}>
                            {navItems.map((item) => {
                                const { name, route } = item
                                return (
                                    <ListItem key={name} disablePadding>
                                        <Link to={route}>
                                            <ListItemButton sx={{ textAlign: 'center', color: "white" }}>
                                                <ListItemText primary={name} />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                )
                            })}
                        </List>

                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display: { md: 'flex' } }}>


                            <Link to="/user/profile" style={{ color: "white" }}>
                                <IconButton size="large" edge="end" color="inherit">
                                    <AccountCircle />
                                </IconButton>
                            </Link>

                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default DashboardMenu
