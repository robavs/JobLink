import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import Loading from '../../../Custom/Loading'
import { default as FreelancerProfile } from '../Freelancer/Profile'
import { default as EmplyoerProfile } from '../Employer/Profile'
import { default as AdministratorProfile } from '../Administrator/Profile'
import { UserProvider } from '../../context/UserContext'
import '../../../../assets/css/profile.css'

export default function Profile() {
    const { user } = useAuth()
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            setIsUpdating(false)
        }
    }, [user])

    if (isUpdating) {
        return <Loading />
    }

    return (
        <UserProvider isUpdating={isUpdating} setIsUpdating={setIsUpdating}>
            {user.type === "Freelancer" && <FreelancerProfile />}
            {user.type === "Employer" && <EmplyoerProfile />}
            {user.type === "Administrator" && <AdministratorProfile />}
        </UserProvider>
    )
}