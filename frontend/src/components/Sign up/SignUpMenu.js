import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavMenu from './NavMenu';
import Login from './Login';
import Registration from './Registration';
import Error from './Error';
import Home from './Home';

import { AuthProvider } from './context/AuthContext';
import { METHODS } from './data/METHODS';
import { RegistrationProvider } from './context/RegistrationContext';
import Profile from './UserInterface/General/Profile';
import UserAuthorization from './UserInterface/General/UserAuthorization'
import Loading from '../Custom/Loading';
import Jobs from './UserInterface/General/Jobs/ApplyForJob/Jobs';
import Freelancers from './UserInterface/General/Freelancers/Freelancers';
import ProfileViewMode from './UserInterface/ProfileTemplate/ProfileViewMode';
import PostJob from './UserInterface/General/Jobs/PostingJob/PostJob';
import { default as JobsAdmin } from './UserInterface/General/Jobs/AdminView/Jobs'
import General from '../Web site/General';
import { useNavigate } from 'react-router-dom';

export default function SignUpMenu() {
    const [freelancers, setFreelancers] = useState([])
    const [usersData, setUsersData] = useState([]) // svi podaci o korisnicima
    const [usersUniqueData, setUsersUniqueData] = useState([]) // samo userName, email, idNumber i phoneNumber
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const getUsers = async () => {
            try {
                const uniqueUsersValues = await (
                    (await fetch(METHODS.User.GetUniqueProperties)).json()
                )
                setUsersUniqueData(uniqueUsersValues)
                setIsLoading(false)

                const allFreelancerData = await (
                    await fetch(METHODS.Freelancer.GetAll)
                ).json()

                setFreelancers(allFreelancerData)

                const allEmployersData = await (
                    await fetch(METHODS.Employer.GetAll)
                ).json()

                setUsersData([...allFreelancerData, ...allEmployersData])
            }
            catch (err) {
                console.log("Doslo je do greske prilikom fecovanja podataka iz baze")
            }
        }
        getUsers()
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <AuthProvider props={{ freelancers, usersUniqueData, usersData }}>
            <Routes>
                <Route path="/" element={<General />} />

                <Route path="/signup/*" element={<NavMenu />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="registration"
                        element={
                            <RegistrationProvider>
                                <Registration />
                            </RegistrationProvider>
                        } />
                    <Route path="*" element={<Error redirect="/signup" />} />
                </Route>

                {/*Ovo su zasticene rute */}
                <Route path="/user/*" element={<UserAuthorization />}>
                    <Route index element={<h2>Index ruta</h2>} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="jobs" element={<Jobs />} />
                    <Route path="freelancers" element={<Freelancers setFreelancers={setFreelancers} />} />
                    <Route path="freelancers/:username" element={<ProfileViewMode />} />
                    <Route path="postJob" element={<PostJob />} />
                    <Route path="jobsAdmin" element={<JobsAdmin />} />
                    <Route path="*" element={<Error redirect="/user" />} />
                </Route>

                <Route path="/*" element={<Error redirect="/signup" />} />
            </Routes>
        </AuthProvider>
    );
}