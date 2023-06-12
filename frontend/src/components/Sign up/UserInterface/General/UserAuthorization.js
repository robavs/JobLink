import Freelancer from '../Freelancer/Freelancer'
import Employer from '../Employer/Employer'
import Administrator from '../Administrator/Administrator'
import Error from '../../Error'
import { useAuth } from '../../context/AuthContext'

export default function UserAuthorization() {
    const { user } = useAuth()

    return (
        <>
            {user.type === "Freelancer" ? <Freelancer /> :
                user.type === "Employer" ? <Employer /> :
                    user.type === "Administrator" ? <Administrator /> :
                        <Error redirect="/signup/login" />
            }
        </>
    )
}


