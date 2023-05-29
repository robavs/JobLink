import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavMenu from './NavMenu';
import Login from './Login';
import Registration from './Registration';
import Error from './Error';
import Home from './Home';
import Dashboard from './UserInterface/Template/DashBoard';
import { AuthProvider } from './context/AuthContext';
import { METHODS } from './data/METHODS';
import { RegistrationProvider } from './context/RegistrationContext';

export default function SignUpMenu() {
    const [usersData, setUsersData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getUsers = async () => {
            try {
                const freelancers = await (
                    await fetch(METHODS.Freelancer.GetAll)
                ).json()

                const employers = await (
                    await fetch(METHODS.Employer.GetAll)
                ).json()

                setUsersData([...freelancers, ...employers])
                console.log([...freelancers, ...employers])
            }
            catch (err) {
                console.log("Doslo je do greske prilikom fecovanja podataka iz baze")
            }
        }
        getUsers()
        setIsLoading(false)
    }, [])

    // i ovde customizuj
    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <AuthProvider usersData={usersData}>
            <Routes>
                <Route path="/" element={<NavMenu />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration"
                        element={
                            <RegistrationProvider>
                                <Registration />
                            </RegistrationProvider>
                        } />
                </Route>

                {/*Eventualno ce i ovde morati da se satvi custom 404 error */}
                {/*Profilna ruta treba da bude privatna znaci ja kliknem na profil
            ako nisam ulogvan vrati me na login stranicu
            ako jesam ulogvan onda ces da mi prikazes moje informacije
            */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </AuthProvider>
    );
}
