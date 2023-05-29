import Freelancer from '../Freelancer/Freelancer'
import Employer from '../Employer/Employer'
import Administrator from '../Administrator/Administrator'
import Error from '../../Error'
import { useAuth } from '../../context/AuthContext'


export default function DashBoard() {
    const { user } = useAuth()
    // ako je user registrovan jedino smo ga tako setovali
    // i onda je prosto u nemogucnosti da mi prikaze
    // ostale usere zbog contexta, nzm sto sam mislio da je toliko
    // slozeno

    // sada treba da obradjujem profile
    return (
        <>
            {user.type === "Freelancer" ? <Freelancer /> :
                user.type === "Employer" ? <Employer /> :
                    user.type === "Administrator" ? <Administrator /> :
                        <Error />
            }
        </>
    )
}


